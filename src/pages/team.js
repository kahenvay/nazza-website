import React from "react"
import Layout from "../components/layout"
import { Box, Container, Space, Subhead } from "../components/ui"
import Team from "../components/team"

export default function TeamPage(props) {
  return (
    <Layout style={{ overflowX: "hidden" }}>
      <Container>
        <Team />
      </Container>
    </Layout>
  )
}
