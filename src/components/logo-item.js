import React from "react"
import { Logo } from "./ui"
import { rounded } from "./logo-list.css"

const LogoItem = React.memo((props) => {
  // console.log(image)
  // console.log(props)
  // console.log(props.rounded)

  //   if (!props) return null

  return (
    console.log(props) || (
      <Logo
        alt={props.alt}
        image={props.gatsbyImageData}
        size="medium"
        className={`${props.rounded ? rounded : ""}`}
        imgStyle={props.rounded ? { width: "70%", margin: "auto" } : ""}
      />
    )
  )
})

export default LogoItem
