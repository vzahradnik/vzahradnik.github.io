const siteMetadata = {
  title: `Vladimír Záhradník | Blog`,
  name: `Vladimír Záhradník`,
  siteUrl: `https://www.zahradnik.io`,
  description: `A personal blog about everything around us.`,
  hero: {
    heading: `Welcome to my world. It's lovely to see you here!`,
    maxWidth: 652,
  },
  social: [
    {
      name: `github`,
      url: `https://github.com/vzahradnik`,
    },
    {
      name: `medium`,
      url: `https://medium.com/@vladimir.zahradnik`,
    },
    {
      name: `youtube`,
      url: `https://www.youtube.com/channel/UCogZ6qxqKa_WIsw7NnU2IaA`,
    },
    {
      name: `twitter`,
      url: `https://twitter.com/VladoZahradnik`,
    },
    {
      name: `linkedin`,
      url: `https://www.linkedin.com/in/vladimirzahradnik`,
    },
    {
      name: `facebook`,
      url: `https://www.facebook.com/vzahradnik`,
    },
    {
      name: `instagram`,
      url: `https://www.instagram.com/vladimir.zahradnik`,
    },
    {
      name: `patreon`,
      url: `https://www.patreon.com/vzahradnik`,
    },
    {
      name: `paypal`,
      url: `https://paypal.me/vzahradnik`,
    },
  ],
};

const plugins = [
  {
    resolve: "@zahradnik-io/gatsby-theme-novela",
    options: {
      contentPosts: "content/posts",
      contentAuthors: "content/authors",
      basePath: "/",
      authorsPage: true,
      disqus: true,
      sources: {
        local: true,
        // contentful: true,
      },
    },
  },
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: `Vladimír Záhradník | Blog`,
      short_name: `Vladimír Záhradník`,
      start_url: `/`,
      background_color: `#fff`,
      theme_color: `#fff`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
    },
  },
  {
    resolve: `gatsby-plugin-cookiehub-banner`,
    options: {
      cookieHubId: "6553fca9",
      cookieHubV2Api: true,
      categories: [
        {
          categoryName: 'analytics',
          cookieName: 'gatsby-plugin-google-analytics-gdpr_cookies-enabled'
        }
      ]
    }
  },
  {
    resolve: `gatsby-plugin-google-analytics-gdpr`,
    options: {
      trackingId: "UA-142286862-1",
      anonymizeIP: true,
      autoStartWithCookiesEnabled: false,
    },
  },
  {
    resolve: "gatsby-plugin-sitemap"
  },
  {
    resolve: "gatsby-plugin-disqus",
    options: {
      shortname: `zahradnik-io`
    }
  },
];

module.exports = {
  siteMetadata,
  plugins,
};