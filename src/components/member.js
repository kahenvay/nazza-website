import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { member } from "./member.css"
import { Link } from "./ui"

const Member = (props) => {
  // console.log(image)
  // console.log(props)
  // console.log(props.rounded)

  //   if (!props) return null

  const { name, phone, image, html } = props.data

  return (
    <div className={member}>
      <GatsbyImage alt={image.alt} image={getImage(image.gatsbyImageData)} />
      <div className="info">
        <p style={{ marginBottom: "5px" }}>
          <strong>{name}</strong>
        </p>
        <Link href={`tel:${phone.replaceAll(" ", "")}`} target="_blank">
          {phone}
        </Link>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      ></div>
    </div>
  )
}

export default Member
