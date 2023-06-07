import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Member from "../components/member"
import { FlexList, Space, Subhead } from "./ui"
import { StaticImage } from "gatsby-plugin-image"

export default function Whatsapp(props) {
  return (
    <a
      href="https://wa.me/351912883734?text=Hi%20there!"
      target="_blank"
      style={{
        position: "fixed",
        bottom: "50px",
        right: "50px",
        zIndex: "100",
      }}
    >
      <StaticImage
        alt="Chat on WhatsApp"
        src="../images/WhatsAppButtonWhiteMedium.svg"
      />
    </a>
  )
}
