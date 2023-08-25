import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEOHead from "../components/head"
import { Container, Space } from "../components/ui"
import Team from "../components/team"
import Timline from "../components/timeline"

export default function About(props) {
  const data = useStaticQuery(graphql`
    query {
      aboutPage {
        id
        title
        description
        image {
          id
          alt
          gatsbyImageData
        }
        html
      }
    }
  `)

  const { aboutPage } = data

  return (
    console.log(aboutPage, props) || (
      <Layout>
        <Container>
          <Timline />
          <Space size={4} />
          <Team />
          <Space size={5} />
        </Container>
      </Layout>
    )
  )
}
export const Head = (props) => {
  const { aboutPage } = props.data
  return <SEOHead {...aboutPage} />
}
