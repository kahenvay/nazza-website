import React, { useEffect, useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { absoluteChild, absoluteParent } from "./ui.css"
import { activeImage, slideImage } from "./imageSlider.css"

export default function ImageSlider(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Set an interval to change the current image every second
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (currentImageIndex) => (currentImageIndex + 1) % props.images.length
      )
    }, 3000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [props.images.length])

  return (
    <div className={absoluteParent} style={{ paddingBottom: "75%" }}>
      {props.images.map((image, index) => {
        return (
          image && (
            <GatsbyImage
              key={image.id}
              alt={image.alt}
              image={getImage(image.gatsbyImageData)}
              className={`${absoluteChild} ${slideImage} ${
                index === currentImageIndex ? activeImage : ""
              }`}
            />
          )
        )
      })}
    </div>
  )
}
