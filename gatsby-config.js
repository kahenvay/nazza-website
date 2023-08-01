// support for .env, .env.development, and .env.production

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://nazza.be",
    title: "Nazza Agency",
    author: `Ulysse Coates`,
    description: `Nazza Agency is an exclusive agency for the BeLux  in high quality clothing for men, women, kids and accessories.
    Here you can find the following collections: Eden Park, Olivier Strelli, Saint James, Europann and Le Parapluie de Cherbourg.`,
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        downloadLocal: true,
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
      // resolve: "@ccalamos/gatsby-source-googlemaps-static",
      // options: {
      //   key: process.env.GOOGLE_MAPS_STATIC_API_KEY,
      //   center: "41.8781,-87.6298",
      // },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-vanilla-extract",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Nazza Agency",
        short_name: "Nazza",
        start_url: "/",
        // These can be imported once ESM support lands
        background_color: "#ffe491",
        theme_color: "#004ca3",
        icon: "src/favicon.png",
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `nazza_agency`,
        access_token: process.env.GATSBY_INSTA_ACCESS_TOKEN,
        instagram_id: "1022681471981458",
        hashtags: {
          enabled: true,
          commentDepth: 10,
        },
      },
    },
  ],
}
