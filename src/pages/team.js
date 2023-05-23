import React from "react"

import Layout from "../components/layout"
import { Box, Container, FlexList, Space, Subhead } from "../components/ui"
import { graphql, useStaticQuery } from "gatsby"
import Member from "../components/member"

export default function Team(props) {
  const data = useStaticQuery(graphql`
    query TeamQuery {
      allMember {
        nodes {
          name
          phone
          html
          image {
            alt
            gatsbyImageData
          }
        }
      }
    }
  `)

  return (
    console.log(data) || (
      <Layout style={{ overflowX: "hidden" }}>
        <Container>
          <Space size={5} />
          <Subhead style={{ textAlign: "center" }}> Our Team </Subhead>
          <Space size={4} />
          <FlexList alignItems="start" variant="center">
            <Member data={data.allMember.nodes[0]}></Member>
            <Member data={data.allMember.nodes[1]}></Member>
          </FlexList>
          <Space size={5} />
        </Container>
      </Layout>
    )
  )
}
