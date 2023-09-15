import * as React from "react"
import Layout from "../components/layout"
import SEOHead from "../components/head"
import { Container, Space } from "../components/ui"
import Timline from "../components/timeline"

export default function About(props) {
  return (
    <Layout pageContext={props.pageContext}>
      <Container>
        <Timline pageContext={props.pageContext} />
        <Space size={4} />
      </Container>
    </Layout>
  )
}

export const Head = (props) => {
  // const { homepage } = props.data
  const lang = props.pageContext?.lang || ""

  return <SEOHead title={"Nazza Agency | About"} />
}
