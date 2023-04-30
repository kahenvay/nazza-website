import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Container, Box, Heading } from "../components/ui"
import SEOHead from "../components/head"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { brandImages, gridImage } from "../components/brand.css"

export default function Brand(props) {
  const { brand } = props.data

  return (
    <Layout>
      {brand.image && (
        <GatsbyImage
          alt={brand.image.alt}
          image={getImage(brand.image.gatsbyImageData)}
        />
      )}
      <Box paddingY={5}>
        <Container width="narrow">
          <Heading as="h1">{brand.title}</Heading>
          <div
            dangerouslySetInnerHTML={{
              __html: brand.html,
            }}
          />
        </Container>
      </Box>
      <Container className={brandImages}>
        {brand.images &&
          brand.images.map((image) => {
            return (
              <GatsbyImage
                key={image.id}
                alt={image.alt}
                image={getImage(image.gatsbyImageData)}
                className={gridImage}
              />
            )
          })}
      </Container>
    </Layout>
  )
}
export const Head = (props) => {
  const { brand } = props.data
  return <SEOHead {...brand} />
}
export const query = graphql`
  query BrandContent($id: String!) {
    brand(id: { eq: $id }) {
      id
      title
      slug
      description
      image {
        id
        alt
        url
        gatsbyImageData
      }
      images {
        id
        alt
        url
        gatsbyImageData
      }
      html
    }
  }
`
