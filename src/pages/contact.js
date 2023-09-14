import React from "react"
import Contact from "../components/contact"
import Layout from "../components/layout"
import SEOHead from "../components/head"

export default function ContactPage(props) {
  return (
    <Layout pageContext={props.pageContext} style={{ overflowX: "hidden" }}>
      <Contact pageContext={props.pageContext} />
    </Layout>
  )
}

export const Head = (props) => {
  return <SEOHead title={"Nazza Agency | Contact"} image={""} />
}
