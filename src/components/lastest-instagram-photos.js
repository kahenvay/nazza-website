import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import {
  instaImage,
  instaLink,
  instaList,
  background,
} from "./insta-latest-photos.css"
import { Box, Container, Space } from "./ui"

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
    <Box>
      <Container>
        <h2>
          <a href="https://www.instagram.com/nazza_agency/" target="_blank">
            @nazza_agency
          </a>
        </h2>
        <ul className={instaList}>
          {data.allInstagramPhoto.nodes.map((node) => {
            console.log("node", node) // Separate log statement
            return (
              // Make sure to return the JSX
              <li key={node.permalink} style={{ position: "relative" }}>
                <a
                  href={node.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className={instaLink}
                >
                  <img
                    className={instaImage}
                    src={node.media_url}
                    alt={`Insta image, caption: ${node.caption}`}
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </Container>
      <Space size={5} />
    </Box>
  )
}
