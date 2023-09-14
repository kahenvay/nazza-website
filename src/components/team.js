import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Member from "../components/member"
import { FlexList, Space, Subhead } from "./ui"

export default function Team(props) {
  return (
    <div>
      <Space size={5} />
      <Subhead style={{ textAlign: "center" }}> Our Team </Subhead>
      <Space size={4} />
      <FlexList gap={3} alignItems="start" variant="center">
        <Member
          pageContext={props.pageContext}
          teamMember={props.members[0]}
        ></Member>
        <Member
          pageContext={props.pageContext}
          teamMember={props.members[1]}
        ></Member>
      </FlexList>
      <Space size={5} />
    </div>
  )
}
