import React from "react"
import Contact from "../components/contact"
import Layout from "../components/layout"

export default function ContactPage(props) {
  return (
    <Layout style={{ overflowX: "hidden" }}>
      <Contact />
    </Layout>
  )
}
