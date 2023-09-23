import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"
import Contact from "../components/contact"

import InstaLatestsPhotos from "../components/lastest-instagram-photos"

export default function Homepage(props) {
  const { homepage } = props.data

  return (
    <Layout pageContext={props.pageContext}>
      <div style={{ overflowX: "hidden" }}>
        {homepage.blocks.map((block) => {
          const { id, blocktype, ...componentProps } = block
          const Component = sections[blocktype] || Fallback
          return (
            <Component
              pageContext={props.pageContext}
              key={id}
              {...componentProps}
            />
          )
        })}
        <InstaLatestsPhotos />
        <Contact pageContext={props.pageContext} />
      </div>
    </Layout>
  )
}

export const Head = (props) => {
  // const { homepage } = props.data
  const lang = props.pageContext?.lang || ""
  let description =
    "An exclusive agency specialized in the distribution of high quality clothing brands and accessories for men, women & kids. Discover the new collections:"
  if (lang === "fr")
    description =
      "Une agence exclusive spécialisée dans la distribution de marques de vêtements et d'accessoires de haute qualité pour hommes, femmes & enfants. Découvrez les nouvelles collections :"
  if (lang === "nl")
    description =
      "Een exclusief agentschap gespecialiseerd in de distributie van hoogwaardige kledingmerken en accessoires voor mannen, vrouwen & kinderen. Ontdek de nieuwe collecties:"

  return <SEOHead title={"Nazza Agency"} description={description} image={""} />
}
export const query = graphql`
  {
    homepage {
      blocks: content {
        id
        blocktype
        ...HomepageHeroContent
      }
    }
  }
`
