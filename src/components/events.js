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
    query {
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
          eventLines.map((eventLine) => (
            <li key={eventLine.id}>
              <Text variant="small">{eventLine}</Text>
            </li>
          ))}
      </List>
    </div>
  )
}
