import * as React from "react"

export default function Iframe(props) {
  function convertToEmbedURL(url) {
    const videoId = url.split("v=")[1]
    const ampersandPosition = videoId.indexOf("&")
    if (ampersandPosition !== -1) {
      return (
        "https://www.youtube.com/embed/" +
        videoId.substring(0, ampersandPosition)
      )
    } else {
      return "https://www.youtube.com/embed/" + videoId
    }
  }

  return (
    <iframe
      src={props.src && convertToEmbedURL(props.src)}
      title={`Some title`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
      className={props.className}
    />
  )
}
