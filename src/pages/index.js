import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"
import Contact from "../components/contact"

export default function Homepage(props) {
  const { homepage } = props.data

  return (
    <Layout style={{ overflowX: "hidden" }}>
      {homepage.blocks.map((block) => {
        const { id, blocktype, ...componentProps } = block
        const Component = sections[blocktype] || Fallback
        // console.log(sections[blocktype])
        return <Component key={id} {...componentProps} />
      })}
      <Contact />
    </Layout>
  )
}
export const Head = (props) => {
  const { homepage } = props.data
  return <SEOHead {...homepage} />
}
export const query = graphql`
  {
    homepage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...HomepageHeroContent
      }
    }
  }
`

// export const query = graphql`
//   {
//     homepage {
//       id
//       title
//       description
//       image {
//         id
//         url
//       }
//       blocks: content {
//         id
//         blocktype
//         ...HomepageHeroContent
//         ...HomepageLogoListContent
//       }
//     }
//   }
// `

// ...HomepageHeroContent
// ...HomepageFeatureListContent
// ...HomepageCtaContent
// ...HomepageLogoListContent
// ...HomepageTestimonialListContent
// ...HomepageBenefitListContent
// ...HomepageStatListContent
// ...HomepageProductListContent
