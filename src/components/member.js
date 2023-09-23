import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { member } from "./member.css"
import { Link } from "./ui"

const Member = (props) => {
  const { name, phone, image } = props.teamMember

  const lang = props.pageContext?.lang || ""
  const langForQuery =
    props.pageContext?.lang?.charAt(0)?.toUpperCase() +
      props.pageContext?.lang?.slice(1).toLowerCase() || ""

  return (
    console.log("member props", props) || (
      <div className={member}>
        <GatsbyImage
          alt={image.alt ? image.alt : ""}
          image={getImage(image.gatsbyImageData)}
        />
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
            __html: props.teamMember[`html${langForQuery}`]
              ? props.teamMember[`html${langForQuery}`]
              : props.teamMember[`html`],
          }}
        ></div>
      </div>
    )
  )
}

export default Member
