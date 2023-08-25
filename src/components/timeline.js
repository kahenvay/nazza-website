import { graphql, useStaticQuery } from "gatsby"
import React, { useRef, useEffect, useState } from "react"
import TimlineBlock from "./timeline-block"
import { timeline } from "./timeline.css"

export default function Timline(props) {
  const [scrollTop, setScrollTop] = useState(0)

  //   useEffect(() => {
  //     const handleScroll = (event) => {
  //       setScrollTop(window.scrollY)
  //     }

  //     window.addEventListener("scroll", handleScroll)

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll)
  //     }
  //   }, [])

  const data = useStaticQuery(graphql`
    query TimelineBlockQuery {
      allTimelineBlock {
        nodes {
          id
          title
          time
          html
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
            return <TimlineBlock index={index} key={index} {...block} />
          })}
      </ul>
    </section>
  )
}
