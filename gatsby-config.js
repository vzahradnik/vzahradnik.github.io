module.exports = {
  siteMetadata: {
    title: `Vladimír Záhradník | Blog`,
    name: `Vladimír Záhradník`,
    siteUrl: `https://zahradnik.io`,
    description: `A personal blog about entrepreneurship, software development, open-source, and content creation.`,
    hero: {
      heading: `Welcome! If you're interested in entrepreneurship and software development, you're in the right place.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/VladoZahradnik`,
      },
      {
        name: `youtube`,
        url: `https://www.youtube.com/channel/UCogZ6qxqKa_WIsw7NnU2IaA`,
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
        name: `linkedin`,
        url: `https://www.linkedin.com/in/vladimirzahradnik`,
      },
      {
        name: `medium`,
        url: `https://medium.com/@vladimir.zahradnik`,
      },
      {
        name: `github`,
        url: `https://github.com/vzahradnik`,
      },
      {
        name: `paypal`,
        url: `https://www.paypal.me/vzahradnik`,
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
        mailchimp: true,
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
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
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://zahradnik.us4.list-manage.com/subscribe/post?u=c838929e4f4a4860aaa982d2c&amp;id=ab314a0059',
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `zahradnik-io`
      }
    },
  ],
};
