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
        }
      }
    }
  `)

  const timeLineBlocks = data.allTimelineBlock.nodes

  return (
    <section>
      <ul className={timeline}>
        {timeLineBlocks.map((block, index) => {
          return <TimlineBlock index={index} key={index} {...block} />
        })}
      </ul>
    </section>
  )
}

// // define variables
// var items = document.querySelectorAll(".timeline li")

// // check if an element is in viewport
// // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
// function isElementInViewport(el) {
//   var rect = el.getBoundingClientRect()
//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight) &&
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//   )
// }

// function callbackFunc() {
//   for (var i = 0; i < items.length; i++) {
//     if (isElementInViewport(items[i])) {
//       items[i].classList.add("in-view")
//     }
//   }
// }

// // listen for events
// window.addEventListener("load", callbackFunc)
// window.addEventListener("resize", callbackFunc)
// window.addEventListener("scroll", callbackFunc)
