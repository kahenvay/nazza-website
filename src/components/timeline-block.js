import React, { useRef, useEffect, useState } from "react"
import {
  listItem,
  even,
  odd,
  listItemInView,
  blockInView,
  evenIcon,
  oddIcon,
  iconBlock,
  textBlock,
} from "./timeline-block.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function TimlineBlock(props) {
  const { time, title, html, image } = props
  const evenOrOdd = props.index % 2 ? even : odd
  const evenOrOddAlt = evenOrOdd === even ? odd : even
  const evenOrOddIcon = evenOrOdd === even ? oddIcon : evenIcon

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
        className={` ${textBlock} ${evenOrOdd} ${
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
      <div
        className={` ${iconBlock} ${evenOrOddAlt} ${evenOrOddIcon} ${
          myElementIsVisible ? blockInView : ""
        }`}
      >
        {image && image.gatsbyImageData ? (
          <GatsbyImage
            className={image}
            alt={image.alt}
            image={getImage(image.gatsbyImageData)}
          />
        ) : (
          image && <img src={image.url} alt={image.alt} />
        )}
      </div>
    </li>
  )
}
