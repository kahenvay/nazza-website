import React from "react"
import Layout from "../components/layout"

import LogoList from "../components/logo-list"

export default function Brands(props) {
  return (
    <Layout style={{ overflowX: "hidden" }}>
      <LogoList rounded={true} />
    </Layout>
  )
}
