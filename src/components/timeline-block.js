import React, { useRef, useEffect, useState } from "react"
import {
  block,
  listItem,
  even,
  odd,
  listItemInView,
  blockInView,
} from "./timeline-block.css"

export default function TimlineBlock(props) {
  const { time, title, html, id } = props
  const evenOrOdd = props.index % 2 ? even : odd
  const myRef = useRef()
  const [myElementIsVisible, updateMyElementIsVisible] = useState()

  useEffect(() => {
    // console.log("myRef", myRef.current)
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0]
      console.log("entry", entry)
      console.log("entry.isIntersecting", entry.isIntersecting)
      updateMyElementIsVisible(entry.isIntersecting)
    })
    observer.observe(myRef.current)
  }, [])

  return (
    <li
      ref={myRef}
      className={`${listItem} ${myElementIsVisible ? listItemInView : ""}`}
    >
      <div
        className={` ${block} ${evenOrOdd} ${
          myElementIsVisible ? blockInView : ""
        }`}
      >
        <time>{time}</time>
        <h4>{title}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </div>
    </li>
  )
}
