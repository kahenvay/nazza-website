import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FlexList } from "./ui"
import {
  Twitter,
  Twitch,
  Instagram,
  Facebook,
  Youtube,
  GitHub,
} from "react-feather"

const social = (link, icon) => {
  if (icon == "instagram") {
    return (
      <a href={link}>
        <Instagram />
      </a>
    )
  } else if (icon == "facebook") {
    return (
      <a href={link}>
        <Facebook />
      </a>
    )
  } else if (icon == "twitter") {
    return (
      <a href={link}>
        <Twitter />
      </a>
    )
  } else if (icon == "youtube") {
    return (
      <a href={link}>
        <Youtube />
      </a>
    )
  }
}

export default function Socials(props) {
  return (
    <FlexList gap={3} alignItems="start" variant="center">
      {props.socials?.map((socialItem, index) => {
        console.log("social", socialItem)
        return <li key={index}>{social(socialItem.link, socialItem.icon)}</li>
      })}
    </FlexList>
  )
}
