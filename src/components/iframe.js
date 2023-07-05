import * as React from "react"
import {
  Nudge,
  Container,
  Section,
  Heading,
  Text,
  ButtonList,
  Kicker,
} from "./ui"

export default function Iframe(props) {
  function convertToEmbedURL(url) {
    const videoId = url.split("v=")[1]
    const ampersandPosition = videoId.indexOf("&")
    if (ampersandPosition != -1) {
      return (
        "https://www.youtube.com/embed/" +
        videoId.substring(0, ampersandPosition)
      )
    } else {
      return "https://www.youtube.com/embed/" + videoId
    }
  }

  return (
    console.log("src", props.src) || (
      <iframe
        src={convertToEmbedURL(props.src)}
        title={`Some title`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
        className={props.className}
      />
    )
  )
}
