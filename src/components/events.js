import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { List, Text, Kicker, Space } from "./ui"

// export const query = graphql`
//   query {
//     contentfulLayoutFooter {
//       eventLines
//       eventTitle
//     }
//   }
// `

export default function EventList(props) {
  const data = useStaticQuery(graphql`
    query eventQuery {
      contentfulLayoutFooter {
        eventLines
        eventTitle
      }
    }
  `)

  const { eventTitle, eventLines } = data.contentfulLayoutFooter

  return (
    // console.log("events", props, eventTitle) || (
    <div>
      <Kicker>{eventTitle}</Kicker>
      <Space size={2} />
      <List>
        {eventLines &&
          eventLines.map((eventLine, index) => (
            <li key={index}>
              <Text variant="small">{eventLine}</Text>
            </li>
          ))}
      </List>
    </div>
  )
}
