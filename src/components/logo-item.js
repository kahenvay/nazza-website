import React from "react"
import { Logo } from "./ui"
import { rounded } from "./logo-list.css"

const LogoItem = React.memo((props) => {
  return (
    console.log(props) || (
      <Logo
        alt={props.alt}
        image={props.gatsbyImageData}
        size="large"
        className={`${props.rounded ? rounded : ""}`}
        imgStyle={props.rounded ? { width: "70%", margin: "auto" } : ""}
      />
    )
  )
})

export default LogoItem
