---
layout: post
title:  "Managing large Arduino projects"
subtitle: "How to organize code in complex code bases"
date:   2018-04-24 16:20:34 +0200
categories: arduino embedded cplusplus development
background: '/img/posts/intro-to-android-platform-development/android-header.jpg'
comments: false
---

Once you start working on more challenging Arduino projects than a blinking LED, you'll most likely very soon find various platform limitations. Some of these limitations rise from the hardware itself. Having [2 kB of RAM][arduino-memory] isn't much, especially if you are used to systems with gigabytes of it. Also, forget threading. ATMega chips run one instruction at a time and they have no runtime operating system to manage resources for you. On the other hand, programming Arduino is challenging and fun. In this article I would like to cover, how I deal with the limitations and I offer possible solutions for you to use.

## IDE
The first thing you should do when you plan working on a complex project is to get rid of the official [Arduino IDE][official-arduino-ide]. It's good enough for getting familiar with the environment and following some tutorials, but that's about it. The editor lacks proper syntax highlighting, code inspection, code completion etc.


[//]: # (Used references)
[arduino-memory]: https://www.arduino.cc/en/Tutorial/Memory
[official-arduino-ide]: https://www.arduino.cc/en/Main/Software
[visual-micro]: http://www.visualmicro.com/
[visual-studio]: https://www.visualstudio.com/
[visual-studio-code]: https://code.visualstudio.com/
[clion]: https://www.jetbrains.com/clion/
[eclipse]: https://www.eclipse.org/