import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import SEOHead from "../components/head"
import { Container, Space } from "../components/ui"
import Timline from "../components/timeline"

export default function About(props) {
  const timeLineBlocks = props.data.allTimelineBlock.nodes
  return (
    console.log(props) || (
      <Layout pageContext={props.pageContext}>
        <Container>
          <Timline
            timeLineBlocks={timeLineBlocks}
            pageContext={props.pageContext}
          />
          <Space size={4} />
        </Container>
      </Layout>
    )
  )
}

export const Head = (props) => {
  // const { homepage } = props.data
  const lang = props.pageContext?.lang || ""

  return <SEOHead title={"Nazza Agency | About"} />
}

export const pageQuery = graphql`
  query TimelineBlockQuery {
    allTimelineBlock {
      nodes {
        id
        title
        titleFr
        titleNl
        time
        html
        htmlFr
        htmlNl
        image {
          id
          alt
          gatsbyImageData
          url
        }
      }
    }
  }
`
