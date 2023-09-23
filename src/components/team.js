import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Member from "../components/member"
import { FlexList, Space, Subhead } from "./ui"

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

  const zach = data.allMember.nodes[0]
  const abdel = data.allMember.nodes[1]

  return (
    <div>
      <Space size={5} />
      <Subhead style={{ textAlign: "center" }}> Our Team </Subhead>
      <Space size={4} />
      <FlexList gap={3} alignItems="start" variant="center">
        <Member pageContext={props.pageContext} teamMember={zach}></Member>
        <Member pageContext={props.pageContext} teamMember={abdel}></Member>
      </FlexList>
      <Space size={5} />
    </div>
  )
}
