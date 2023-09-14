import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import TimlineBlock from "./timeline-block"
import { timeline } from "./timeline.css"

export default function Timline(props) {
  const data = useStaticQuery(graphql`
    query TimelineBlockQuery {
      allTimelineBlock {
        nodes {
          id
          title
          titleFr
          titleNl
          time
          html
          htmlFr
          htmlNl
          image {
            id
            alt
            gatsbyImageData
            url
          }
        }
      }
    }
  `)

  const timeLineBlocks = data.allTimelineBlock.nodes

  return (
    <section>
      <ul className={timeline}>
        {timeLineBlocks
          .sort((a, b) => a.time - b.time)
          .map((block, index) => {
            return (
              <TimlineBlock
                pageContext={props.pageContext}
                index={index}
                key={index}
                {...block}
              />
            )
          })}
      </ul>
    </section>
  )
}
