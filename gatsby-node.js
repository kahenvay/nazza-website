const { documentToHtmlString } = require("@contentful/rich-text-html-renderer")
const { getGatsbyImageResolver } = require("gatsby-plugin-image/graphql-utils")
const getInstagramPhotos = require("./src/api/api")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "blocktype",
    extend(options) {
      return {
        resolve(source) {
          return source.internal.type.replace("Contentful", "")
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "imagePassthroughArgs",
    extend(options) {
      const { args } = getGatsbyImageResolver()
      return {
        args,
      }
    },
  })

  actions.createFieldExtension({
    name: "imageUrl",
    extend(options) {
      const schemaRE = /^\/\//
      const addURLSchema = (str) => {
        if (schemaRE.test(str)) return `https:${str}`
        return str
      }
      return {
        resolve(source) {
          return addURLSchema(source.file.url)
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "navItemType",
    args: {
      name: {
        type: "String!",
        defaultValue: "Link",
      },
    },
    extend(options) {
      return {
        resolve() {
          switch (options.name) {
            case "Group":
              return "Group"
            default:
              return "Link"
          }
        },
      }
    },
  })

  // @richText function to transform JSON to HTML(string)
  actions.createFieldExtension({
    name: "richText",
    args: {
      fieldName: {
        type: "String!",
        defaultValue: "body",
      },
    },
    extend(options) {
      const fieldName = options.fieldName
      return {
        resolve(source) {
          const body = source[fieldName]
          const doc = body ? JSON.parse(body.raw) : ""
          const html = documentToHtmlString(doc)
          return html
        },
      }
    },
  })

  // abstract interfaces
  actions.createTypes(/* GraphQL */ `
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
    }

    interface HomepageLink implements Node {
      id: ID!
      href: String
      text: String
    }

    interface HeaderNavItem implements Node {
      id: ID!
      navItemType: String
    }

    interface NavItem implements Node & HeaderNavItem {
      id: ID!
      navItemType: String
      href: String
      hrefFr: String
      hrefNl: String
      text: String
      textFr: String
      textNl: String
      icon: HomepageImage
      description: String
    }

    interface NavItemGroup implements Node & HeaderNavItem {
      id: ID!
      navItemType: String
      name: String
      topLink: String
      navItems: [NavItem]
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: GatsbyImageData @imagePassthroughArgs
      url: String
    }

    interface HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String!
      headingFr: String!
      headingNl: String!
      kicker: String
      subhead: String
      image: HomepageImage
      images: [HomepageImage]
      html: String
      htmlFr: String
      htmlNl: String
      links: [HomepageLink]
    }

    interface HomepageLogo implements Node {
      id: ID!
      image: HomepageImage
      alt: String
    }

    interface HomepageLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      text: String
      logos: [HomepageLogo]
    }

    interface Homepage implements Node {
      id: ID!
      title: String

      image: HomepageImage
      content: [HomepageBlock]
    }

    interface LayoutHeader implements Node {
      id: ID!
      navItems: [HeaderNavItem]
      cta: HomepageLink
    }

    enum SocialService {
      TWITTER
      FACEBOOK
      INSTAGRAM
      YOUTUBE
      LINKEDIN
      GITHUB
      DISCORD
      TWITCH
    }

    interface SocialLink implements Node {
      id: ID!
      username: String!
      service: SocialService!
    }

    interface LayoutFooter implements Node {
      id: ID!
      links: [HomepageLink]
      meta: [HomepageLink]
      socialLinks: [SocialLink]
      copyright: String
      eventTitle: String
      eventTitleFr: String
      eventTitleNl: String
      eventLines: [String]
      eventLinesFr: [String]
      eventLinesNl: [String]
    }

    interface Layout implements Node {
      id: ID!
      header: LayoutHeader
      footer: LayoutFooter
    }

    interface AboutPage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage
      html: String
    }

    interface TimelineBlock implements Node {
      id: ID!
      title: String
      titleFr: String
      titleNl: String
      time: String
      html: String
      htmlFr: String
      htmlNl: String
      image: HomepageImage @link(from: "image___NODE")
    }

    interface Page implements Node {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage
      html: String!
    }

    interface Brand implements Node {
      id: ID!
      slug: String!
      title: String
      image: HomepageImage
      logo: HomepageImage
      html: String!
      htmlFr: String
      htmlNl: String
      topImage: HomepageImage
      featuredVideo: String
      featuredVideoFr: String
      featuredVideoNl: String
      images: [HomepageImage]
      website: String
      websiteFr: String
      websiteNl: String
      lookbook: HomepageImage
      lookbookFr: HomepageImage
      lookbookNl: HomepageImage
      b2b: String
      b2bFr: String
      b2bNl: String
      socials: [SocialMedia]
    }

    interface Member implements Node {
      id: ID!
      image: HomepageImage @link(from: "image___NODE")
      name: String
      phone: String
      email: String
      html: String
      htmlFr: String
      htmlNl: String
    }

    interface SocialMedia implements Node {
      id: ID!
      name: String
      link: String
      icon: String
    }
  `)

  // CMS-specific types for Homepage
  actions.createTypes(/* GraphQL */ `
    type ContentfulHomepageLink implements Node & HomepageLink @dontInfer {
      id: ID!
      href: String
      text: String
    }

    type ContentfulNavItem implements Node & NavItem & HeaderNavItem
      @dontInfer {
      id: ID!
      navItemType: String @navItemType(name: "Link")
      href: String
      hrefFr: String
      hrefNl: String
      text: String
      textFr: String
      textNl: String
      icon: HomepageImage @link(from: "icon___NODE")
      description: String
    }

    type ContentfulNavItemGroup implements Node & NavItemGroup & HeaderNavItem
      @dontInfer {
      id: ID!
      navItemType: String @navItemType(name: "Group")
      name: String
      topLink: String
      navItems: [NavItem] @link(from: "navItems___NODE")
    }

    type ContentfulAsset implements Node & HomepageImage {
      id: ID!
      alt: String @proxy(from: "title")
      gatsbyImageData: GatsbyImageData
      url: String @imageUrl
      file: JSON
      title: String
    }

    type ContentfulHomepageHero implements Node & HomepageHero & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      heading: String!
      headingFr: String!
      headingNl: String!
      kicker: String
      subhead: String
      image: HomepageImage @link(from: "image___NODE")
      images: [HomepageImage] @link(from: "images___NODE")
      html: String! @richText
      htmlFr: String! @richText(fieldName: "bodyFr")
      htmlNl: String! @richText(fieldName: "bodyNl")
      links: [HomepageLink] @link(from: "links___NODE")
    }

    type ContentfulHomepageLogo implements Node & HomepageLogo @dontInfer {
      id: ID!
      image: HomepageImage @link(from: "image___NODE")
      alt: String
    }

    type ContentfulHomepageLogoList implements Node & HomepageBlock & HomepageLogoList
      @dontInfer {
      blocktype: String @blocktype
      text: String
      logos: [HomepageLogo] @link(from: "logos___NODE")
      brands: [Brand] @link(from: "brands___NODE")
    }

    type ContentfulHomepage implements Node & Homepage @dontInfer {
      id: ID!
      title: String

      image: HomepageImage @link(from: "image___NODE")
      content: [HomepageBlock] @link(from: "content___NODE")
    }
  `)

  // Layout types
  actions.createTypes(/* GraphQL */ `
    type ContentfulLayoutHeader implements Node & LayoutHeader @dontInfer {
      id: ID!
      navItems: [HeaderNavItem] @link(from: "navItems___NODE")
      cta: HomepageLink @link(from: "cta___NODE")
    }

    type ContentfulSocialLink implements Node & SocialLink @dontInfer {
      id: ID!
      username: String!
      service: SocialService!
    }

    type ContentfulLayoutFooter implements Node & LayoutFooter @dontInfer {
      id: ID!
      links: [HomepageLink] @link(from: "links___NODE")
      meta: [HomepageLink] @link(from: "meta___NODE")
      eventTitle: String
      eventTitleFr: String
      eventTitleNl: String
      eventLines: [String]
      eventLinesFr: [String]
      eventLinesNl: [String]
      socialLinks: [SocialLink] @link(from: "socialLinks___NODE")
      copyright: String
    }

    type ContentfulLayout implements Node & Layout @dontInfer {
      id: ID!
      header: LayoutHeader @link(from: "header___NODE")
      footer: LayoutFooter @link(from: "footer___NODE")
    }
  `)

  // Page types
  actions.createTypes(/* GraphQL */ `
    type ContentfulPage implements Node & Page {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage @link(from: "image___NODE")
      html: String! @richText
    }
  `)

  //Brand types
  actions.createTypes(/* GraphQL */ `
    type ContentfulBrand implements Node & Brand {
      id: ID!
      slug: String!
      title: String
      titleFr: String
      titleNl: String
      image: HomepageImage @link(from: "image___NODE")
      logo: HomepageImage @link(from: "logo___NODE")
      topImage: HomepageImage @link(from: "image___NODE")
      featuredVideo: String
      featuredVideoFr: String
      featuredVideoNl: String
      images: [HomepageImage] @link(from: "images___NODE")
      html: String! @richText
      htmlFr: String @richText(fieldName: "bodyFr")
      htmlNl: String @richText(fieldName: "bodyNl")
      website: String
      websiteFr: String
      websiteNl: String
      lookbook: HomepageImage @link(from: "image___NODE")
      lookbookFr: HomepageImage @link(from: "image___NODE")
      lookbookNl: HomepageImage @link(from: "image___NODE")
      b2b: String
      b2bFr: String
      b2bNl: String
      socials: [SocialMedia] @link(from: "socials___NODE")
    }
  `)

  //Member types
  // ahh htlm is getting a value of a field called body
  actions.createTypes(/* GraphQL */ `
    type ContentfulMember implements Node & Member {
      id: ID!
      image: HomepageImage @link(from: "image___NODE")
      name: String
      phone: String
      email: String
      html: String! @richText
      htmlFr: String @richText(fieldName: "bodyFr")
      htmlNl: String @richText(fieldName: "bodyNl")
    }
  `)

  actions.createTypes(/* GraphQL */ `
    type ContentfulSocialMedia implements Node & SocialMedia @dontInfer {
      id: ID!
      name: String
      link: String
      icon: String
    }
  `)

  actions.createTypes(/* GraphQL */ `
    type ContentfulAboutPage implements Node & AboutPage {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link(from: "image___NODE")
      html: String! @richText
    }
  `)

  actions.createTypes(/* GraphQL */ `
    type ContentfulTimelineBlock implements Node & TimelineBlock {
      id: ID!
      title: String
      titleFr: String
      titleNl: String
      time: String
      html: String! @richText
      htmlFr: String @richText(fieldName: "bodyFr")
      htmlNl: String @richText(fieldName: "bodyNl")
      image: HomepageImage @link(from: "image___NODE")
    }
  `)
}

// exports.createPages = ({ actions }) => {
//   const { createSlice } = actions
//   createSlice({
//     id: "header",
//     component: require.resolve("./src/components/header.js"),
//   })
//   createSlice({
//     id: "footer",
//     component: require.resolve("./src/components/footer.js"),
//   })
// }

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  const instagramPhotos = await getInstagramPhotos(
    process.env.GATSBY_INSTA_ACCESS_TOKEN
  )
  console.log("instagramPhotos", instagramPhotos)
  instagramPhotos.forEach((photo) => {
    const nodeContent = JSON.stringify(photo)
    const nodeMeta = {
      id: createNodeId(`instagram-photo-${photo.id}`),
      parent: null,
      children: [],
      internal: {
        type: `InstagramPhoto`,
        mediaType: `text/json`,
        content: nodeContent,
        contentDigest: createContentDigest(photo),
      },
    }
    const node = Object.assign({}, photo, nodeMeta)
    createNode(node)
  })
}

const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Static pages
  const pages = ["home", "team", "index", "home", "contact", "about", "404"]
  const languages = ["en", "fr", "nl"]

  pages.forEach((page) => {
    languages.forEach((lang) => {
      createPage({
        path: lang === "en" ? page : `${lang}/${page}`,
        component: path.resolve(`./src/pages/${page}.js`),
        context: { lang },
      })
    })
  })

  //brands page
  languages.forEach((lang) => {
    createPage({
      path: lang === "en" ? "brands" : `${lang}/brands`,
      component: path.resolve(`./src/pages/brands/brands.js`),
      context: { lang },
    })
  })

  // Dynamic pages: Brands
  const brandTemplate = path.resolve("./src/pages/brands/{Brand.slug}.js")
  const result = await graphql(`
    query {
      allContentfulBrand {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error("Error querying for brands:", results, result.errors)
    return
  } else {
    console.log("brrands result", result)
  }

  const brands = result.data.allContentfulBrand.edges

  brands.forEach((brand) => {
    languages.forEach((lang) => {
      const slug = brand.node.slug // Adjust this if the structure is different

      const pagePath =
        lang === "en" ? `brands/${slug}` : `${lang}/brands/${slug}`

      console.log(`Creating page: ${pagePath}`)
      // console.log(`The id for the query is ${brand.node.id}`)
      console.log(`The slug for the query is ${slug}`)

      createPage({
        path: pagePath,
        component: brandTemplate,
        context: { lang, slug },
      })
    })
  })

  // Slices
  const { createSlice } = actions
  createSlice({
    id: "header",
    component: require.resolve("./src/components/header.js"),
  })
  createSlice({
    id: "footer",
    component: require.resolve("./src/components/footer.js"),
  })
}
