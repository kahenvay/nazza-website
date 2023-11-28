import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Member from "../components/member"
import { FlexList, Space, Subhead } from "./ui"

export default function Team(props) {
  const data = useStaticQuery(graphql`
    query myTeamQuery {
      allTeam {
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
  `)

  const zach = data.allTeam.nodes[0]
  const abdel = data.allTeam.nodes[1]

  const lang = props.pageContext?.lang || ""
  const langForQuery =
    props.pageContext?.lang?.charAt(0)?.toUpperCase() +
      props.pageContext?.lang?.slice(1).toLowerCase() || ""
  // let teamTitle =
  //   "Our Team"
  // if (lang === "fr")
  //   description =
  //     "Notre Equipe"
  // if (lang === "nl")
  //   description =
  //     ""

  return (
    <div>
      <Space size={5} />
      <Subhead style={{ textAlign: "center" }}> Team </Subhead>
      <Space size={4} />
      <FlexList gap={3} alignItems="start" variant="center">
        <Member pageContext={props.pageContext} teamMember={zach}></Member>
        <Member pageContext={props.pageContext} teamMember={abdel}></Member>
      </FlexList>
      <Space size={5} />
    </div>
  )
}
