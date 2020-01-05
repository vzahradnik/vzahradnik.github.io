In this article I will talk about building clean AOSP ROM which can be run in emulator. This is the easiest thing you can do with respect to Android platform development, but it's definitely a start. You get acquainted with build system, overall workflow, resolve issues on your Linux distribution and hopefully you'll produce fully working Android image. Let's get started.

## Directly supported devices in AOSP
Before I go through building instructions, let's do a brief detour. I already mentioned that we're going to build AOSP ROM for an emulator. The reason is that support for building AOSP image is directly in AOSP sources and therefore build instructions are straightforward. AOSP also includes built-in support for several selected phones, tablets and some Android TV devices, usually Pixel or (older) Nexus devices, among others still popular LG Nexus 5X (codename [Bullhead][bullhead-dev-tree]).

Maybe you are lucky and your phone or tablet is supported. In such case building AOSP ROM for your phone is as simple as for the emulator. You'll just select different build target. More on that later.

### Is my device supported?
Easiest way to determine device support is by reading the [documentation][docs-build-numbers]. First select Android version you plan to build and then look into [Source Code Tags and Builds][source-code-tags-and-builds] section. There is a column called "Supported devices". If you are able to see your device next to your selected AOSP version, then it's supported.

### Device Tree
AOSP supports different devices and different configurations by using [Device Tree][device-tree]. After you clone the AOSP source code, you can find these configurations in `/device` subdirectory:

```sh
ls device/

asus  common  generic  google  htc  huawei  lge  moto  sample
```

In the root of device tree are folders of supported vendors. And if you go into vendor directory, it lists all supported devices for this vendor.

```sh
ls device/lge/

bullhead  bullhead-kernel  hammerhead  hammerhead-kernel
```

Note that directories are usually named after device codenames. In this case, hammerhead refers to LG Nexus 5. Use Google to find out which codename is used for your phone.

## Prerequisities
[Android Open Source Project][aosp] gives us enough information to start quickly. I recommend taking a look at [requirements][aosp-requirements] and other relevant pages.
Basically if you meet following points, you should be all right:

- Linux or macOS
- Lots of free disk space. You need to have at least 100 GB free space.
- Java Development Kit, correct version depends on version of Android you're trying to build
- Python 2.7, used by build scripts

If you have Windows, you could setup virtual environment with Linux. [VirtualBox][virtualbox] should work OK. If you own Windows 10 with Anniversary Update, you have another option thanks to [Windows Subsystem for Linux][sh-on-windows]. See [this guide][aosp-windows-build-guide] for further information.

Ideally your PC should have fast CPU. New Ryzen CPUs seem to be a great deal. It should be also equipped with lots of RAM (8 GB and more) and if possible, use SSD for storage. If you can't affort a high-end PC, you should be able to use any PC/laptop with Linux, only build times will take much longer. I build AOSP on a laptop and on a desktop PC and I can tell that build times vary significantly between the two. On a PC I get clean AOSP build within an hour, on a laptop it takes 2,5 hours. Luckily if you plan to do only customization, most of the time you'll do full build only once. Then you build only code, which has changed.

## Downloading the source
Android source code is stored in hundreds of Git repositories. Usually each component or system package has its own repository, be it Telephony service or Gallery app. To avoid managing this mess by user, Google has made a tool which downloads and keeps track of all of these repositories for you. This tool is called [repo][repo-command-guide]. How appropriate.

I plan to write separate article covering [repo][repo-command-guide] and its operations.

### Installing the Repo tool
If you have more bleeding-edge Linux distribution, like [Arch Linux][arch-linux] in my case, Repo in it's latest version is present in [community][arch-community-repo] package repository. But for most distributions it's either not present or it's version is outdated, which is a case for Ubuntu. You should always use latest Repo version. Because Repo is just a Python script, it can be easily downloaded and run.

To install Repo into user's home directory:

1. Make sure you have a bin/ directory in your home directory and that it is included in your path:

```sh
mkdir ~/bin
PATH=~/bin:$PATH
```

2. Download the Repo tool and ensure that it is executable:

```sh
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
```

If Repo is properly downloaded and present in $PATH, after you enter "repo", you should see following message:

```sh
repo 
error: repo is not installed.  Use "repo init" to install it here.
```

If you instead get something like "command not found", you need to investigate yourself. Or you could just run Repo directly.

Go into directory where Repo script is downloaded and run it like this:

```sh
# Running command from current directory

cd path/where/repo/is/downloaded
./repo
error: repo is not installed.  Use "repo init" to install it here.

# Running from different repository

path/where/repo/is/downloaded/repo
error: repo is not installed.  Use "repo init" to install it here.
```

### Initializing AOSP repository
Create an empty directory to hold your working files and run `repo init` command. This will download additional Repo files into `.repo` subdirectory. It will also download AOSP manifest with description which components should be downloaded and in which version. By default `master` GIT branch is used.

```sh
repo init -u https://android.googlesource.com/platform/manifest
```

To check out branch other than `master`, specify it with `-b` flag. For example this way you'll download latest release of Android 8 Oreo:

```sh
repo init -u https://android.googlesource.com/platform/manifest -b android-8.0.0_r34
```

`-b` flag supports both Git branches and tags. For a list of branches you could take a look at [Source Code Tags][source-code-tags-and-builds] or if you are familiar with Git, just download Git repository for AOSP manifest and list all branches and tags by yourself.

First clone AOSP manifest repository:
```sh
git clone https://android.googlesource.com/platform/manifest
Cloning into 'manifest'...
remote: Counting objects: 535, done
remote: Total 5833 (delta 1562), reused 5833 (delta 1562)
Receiving objects: 100% (5833/5833), 4.40 MiB | 18.38 MiB/s, done.
Resolving deltas: 100% (1562/1562), done.
```

Then go into cloned repository:
```sh
cd manifest/
```

And list all branches and/or tags. You can filter the results with `grep`:
```sh
git branch -a | grep android-6.0.1_r80
  remotes/origin/android-6.0.1_r80

git tag | grep android-6.0.1
android-6.0.1_r1
android-6.0.1_r10
android-6.0.1_r11

<output abbreviated>
```

Hint: Entering the URL into your browser will allow you to see how such [manifest][aosp-manifest-master] looks like and you should get better idea how various resources are defined.

### Downloading Android Source Tree
Finally, it is time to actually download source code. Depending on your Internet speed it may take hours to download whole source. Also do not download source via Internet service, which has data limits, usually mobile 4G Internet service.

When you're ready, just type `repo sync` command and download will start.

```sh
repo sync
```

## Preparing the build
After the AOSP source code is downloaded you need to do few more steps before you can start building the image. Most importantly you need to setup correct Python and Java Development Kit version depending on which AOSP version you're trying to build.

At this moment all AOSP versions require Python 2. Correct Java version depends on AOSP version you're trying to build.

### Set up Python 2 environment
Make sure you have Python 2 installed. Follow installation guide for your Linux distribution.

This way you can check for installed Python version:

```sh
python --version
Python 3.6.2
```

If you got version Python 2.7.x, your Linux distribution uses Python 2 by default. But in my case it uses newer Python 3, which is not backwards compatible. One of ways how to solve this problem is to use [virtual environment][python-virtual-environment]. Such setup is officially supported by Python and you should be able to find and install a package called `virtualenv2`.

First install `virtualenv2` Python library:
```sh
sudo pacman -S python2-virtualenv
```

Look at the documentation to your Linux distribution on details how to install this package.

Next, create virtual environment inside your AOSP source directory:
```sh
cd /my/aosp/repo
virtualenv2 venv
```

And finally load the virtual environment. Note that it is active only for current shell session and you need to load it every time you work with AOSP.
```sh
source venv/bin/activate
(venv) $
```

If you prompt for Python version now, it will show that we use Python 2.7:
```sh
(venv) $ python --version
Python 2.7.14
```

### Install correct Java Development Kit (JDK) version
Master branch of AOSP includes a prebuilt version of OpenJDK. All other branches require separate JDK install. Recent AOSP version on Linux support only OpenJDK, on macOS you have to install OracleJDK.

| Android version                                      | JDK on Linux      | JDK on macOS                  |
|------------------------------------------------------|-------------------|-------------------------------|
| Android 7.0 (Nougat) - Android 8.0 (Oreo)       | OpenJDK 8         | Oracle Java JDK 8u45 or newer |
| Android 5.x (Lollipop) - Android 6.0 (Marshmallow)   | OpenJDK 7         | Oracle Java JDK 7u71          |
| Android 2.3.x (Gingerbread) - Android 4.4.x (KitKat) | Oracle Java JDK 6 | Oracle Java JDK 6             |
| Android 1.5 (Cupcake) - Android 2.2.x (Froyo)        | Oracle Java JDK 5 | Android build not supported   |

Look at [JDK requirements][java-requirements] for more details. These requirements are also specified in main AOSP build script, defined in `<aosp-root>/build/make/core/main.mk`, which will prompt an error if expected JDK is not found (link to [complete file][aosp-build-main]):

```make
# Check for the current JDK.
#
# For Java 1.7/1.8, we require OpenJDK on linux and Oracle JDK on Mac OS.
requires_openjdk := false
ifeq ($(BUILD_OS),linux)
requires_openjdk := true
endif
```



[//]: # (Used references)
[aosp]: https://source.android.com/
[aosp-requirements]: https://source.android.com/source/requirements
[virtualbox]: https://www.virtualbox.org/
[sh-on-windows]: https://msdn.microsoft.com/en-us/commandline/wsl/about
[aosp-windows-build-guide]: https://forum.xda-developers.com/android/general/guide-build-rom-source-windows-10-t3469420
[bullhead-dev-tree]: https://android.googlesource.com/device/lge/bullhead/
[docs-build-numbers]: https://source.android.com/source/build-numbers
[source-code-tags-and-builds]: https://source.android.com/source/build-numbers#source-code-tags-and-builds
[device-tree]: https://en.wikipedia.org/wiki/Device_tree
[repo-command-guide]: https://source.android.com/source/using-repo
[arch-linux]: https://www.archlinux.org/
[arch-community-repo]: https://www.archlinux.org/packages/community/any/repo/
[aosp-manifest-master]: https://android.googlesource.com/platform/manifest/+/master/default.xml
[python-virtual-environment]: https://wiki.archlinux.org/index.php/Python/Virtual_environment
[java-requirements]: https://source.android.com/setup/requirements#older-versions
[aosp-build-main]: https://android.googlesource.com/platform/build/+/android-8.0.0_r30/core/main.mk