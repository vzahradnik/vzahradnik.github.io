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
        name: `github`,
        url: `https://github.com/vzahradnik`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/vladimir.zahradnik`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/vladimirzahradnik`,
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
  ],
};
