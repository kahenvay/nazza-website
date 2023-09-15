import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import { Container } from "../components/ui"
import Team from "../components/team"
import SEOHead from "../components/head"

export default function TeamPage(props) {
  const members = props.data?.allMember?.nodes
  return (
    console.log("team page props", props) || (
      <Layout pageContext={props.pageContext} style={{ overflowX: "hidden" }}>
        <Container>
          {members && (
            <Team members={members} pageContext={props.pageContext} />
          )}
          {!members &&
            "Loading members, if this takes too long, please try again later"}
        </Container>
      </Layout>
    )
  )
}

export const pageQuery = graphql`
  query TeamQuery {
    allMember {
      nodes {
        name
        phone
        html
        htmlFr
        htmlNl
        image {
          alt
          gatsbyImageData
        }
      }
    }
  }
`

export const Head = (props) => {
  // const { homepage } = props.data

  return <SEOHead title={"Nazza Agency | Team"} image={""} />
}
