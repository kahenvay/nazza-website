import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FlexList, List } from "./ui"
import { StaticImage } from "gatsby-plugin-image"

export default function InstaLatestsPhotos() {
  const data = useStaticQuery(graphql`
    query {
      allInstagramPhoto {
        nodes {
          media_url
          permalink
          caption
        }
      }
    }
  `)

  return (
    <ul
      style={{
        display: "grid",
        // gridTemplateColumns: "repeat(4, 1fr)",
        // gap: "10px",
        listStyle: "none",
        // gridAutoRows: "minmax(100px, auto)",

        gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
        gridGap: "1rem",
        padding: "0 2rem",
      }}
    >
      {data.allInstagramPhoto.nodes.map((node) => {
        console.log("node", node) // Separate log statement
        return (
          // Make sure to return the JSX
          <li key={node.permalink} style={{ position: "relative" }}>
            <a
              href={node.permalink}
              target="_blank"
              rel="noreferrer"
              style={{
                position: "relative",
                height: "0",
                display: "block",
                paddingBottom: "100%",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                }}
                src={node.media_url}
                alt={`Insta image, caption: ${node.caption}`}
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
