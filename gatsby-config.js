module.exports = {
  siteMetadata: {
    title: `Vladimír Záhradník | Blog`,
    name: `Vladimír Záhradník`,
    siteUrl: `https://www.zahradnik.io`,
    description: `A personal blog about technology and entrepreneurship.`,
    hero: {
      heading: `Welcome to my site about technology and entrepreneurship.`,
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
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        mailchimp: false,
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
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
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: 'https://zahradnik.us4.list-manage.com/subscribe/post?u=c838929e4f4a4860aaa982d2c&amp;id=ab314a0059',
      },
    },
    {
      resolve: "gatsby-plugin-disqus",
      options: {
        shortname: `zahradnik-io`
      }
    },
    {
    	resolve: "gatsby-plugin-sitemap"
    },
  ],
};
