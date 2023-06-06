import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEOHead from "../components/head"
import { Box, Container, Flex, Space, Subhead } from "../components/ui"
import Team from "../components/team"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function About(props) {
  const data = useStaticQuery(graphql`
    query {
      aboutPage {
        id
        title
        description
        image {
          id
          alt
          gatsbyImageData
        }
        html
      }
    }
  `)

  const { aboutPage } = data

  return (
    console.log(aboutPage, props) || (
      <Layout>
        <Container>
          <Space size={5} />
          <Subhead style={{ textAlign: "center" }}> About </Subhead>
          <Space size={4} />
          <Flex gap={4} variant="responsive">
            <Box width="half">
              <GatsbyImage
                alt={aboutPage.image.alt}
                image={getImage(aboutPage.image.gatsbyImageData)}
              />
            </Box>
            <Box width="half">
              <div
                dangerouslySetInnerHTML={{
                  __html: aboutPage.html,
                }}
              />
            </Box>
          </Flex>
          <Space size={4} />
          <Team />
          <Space size={5} />
        </Container>
      </Layout>
    )
  )
}
export const Head = (props) => {
  const { aboutPage } = props.data
  return <SEOHead {...aboutPage} />
}
