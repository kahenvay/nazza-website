import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import {
  instaImage,
  instaLink,
  instaList,
  instaTitle,
  instaListItem,
} from "./insta-latest-photos.css"
import { Box, Container, Space, Subhead } from "./ui"
import { StaticImage } from "gatsby-plugin-image"

export default function InstaLatestsPhotos() {
  const data = useStaticQuery(graphql`
    query instaQuery {
      allInstagramPhoto {
        nodes {
          media_url
          permalink
          caption
          media_type
        }
      }
    }
  `)

  return (
    <Box>
      <Space size={5} />
      <Container>
        <Subhead>
          <a
            className={instaTitle}
            href="https://www.instagram.com/nazza_agency/"
            target="_blank"
            rel="noreferrer"
          >
            <StaticImage
              style={{ maxWidth: "300px", marginRight: "20px" }}
              src="../images/follow.png"
            />
            <span style={{ textDecoration: "underline" }}>@NAZZA_AGENCY</span>
          </a>
        </Subhead>
        <Space size={4} />
        <ul className={instaList}>
          {data.allInstagramPhoto?.nodes.map((node, index) => {
            // console.log("node", node) // Separate log statement

            return (
              index < 8 && (
                // Make sure to return the JSX
                <li key={node.permalink} className={instaListItem}>
                  <a
                    href={node.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className={instaLink}
                  >
                    {node.media_type == "VIDEO" && (
                      <video
                        className={instaImage}
                        src={node.media_url}
                        alt={`Insta post, caption: ${node.caption}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                      ></video>
                    )}
                    {node.media_type != "VIDEO" && (
                      <img
                        className={instaImage}
                        src={node.media_url}
                        alt={`Insta post, caption: ${node.caption}`}
                      />
                    )}
                  </a>
                </li>
              )
            )
          })}
        </ul>
        {/* {data == null ||
          data.allInstagramPhoto == "" ||
          data.allInstagramPhoto == null || (
            <p>Error fetching instagram images</p>
          )} */}
      </Container>
      <Space size={5} />
    </Box>
  )
}
