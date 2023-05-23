import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { Container, Box, Heading, List } from "../../components/ui"
import SEOHead from "../../components/head"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { brandImages, gridImage } from "../../components/brand.css"

import Modal from "../../components/modal"

export default function Brand(props) {
  const { brand } = props.data

  const [containerImageSrc, setContainerImageSrc] = React.useState("")
  const [containerImage, setContainerImage] = React.useState("")

  React.useEffect(() => {
    setContainerImageSrc(containerImageSrc)
    console.log(containerImageSrc)

    console.log(brand.images)

    const image = brand.images.find((obj) => obj.id === containerImageSrc)
    console.log(image)
    if (image) {
      setContainerImage(image)
    }
    console.log(containerImage)
    // else {
    //   setContainerImage("")
    // }
  }, [containerImageSrc])

  const handleMouseEnter = (id) => {
    // console.log(id)
    setContainerImageSrc(id)
  }

  const handleMouseLeave = () => {
    console.log("mouseout")
    setContainerImageSrc("")
    setContainerImage("")
  }

  return (
    <Layout>
      {console.log(brand) ||
        (brand?.image && (
          <GatsbyImage
            alt={brand.image.alt}
            image={getImage(brand.image.gatsbyImageData)}
          />
        ))}
      <Box paddingY={5}>
        <Container width="narrow">
          <Heading as="h1">{brand?.title}</Heading>
          <div
            dangerouslySetInnerHTML={{
              __html: brand?.html,
            }}
          />
        </Container>
      </Box>
      <Container>
        <List className={brandImages}>
          {brand?.images &&
            brand.images.map((image) => {
              return (
                <li
                  key={image.id}
                  onMouseEnter={() => handleMouseEnter(image.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <GatsbyImage
                    alt={image.alt}
                    image={getImage(image.gatsbyImageData)}
                    className={gridImage}
                  />
                </li>
              )
            })}
        </List>

        <Modal>
          <GatsbyImage
            alt={containerImage.alt}
            image={getImage(containerImage.gatsbyImageData)}
            // className={absoluteChild}
            // style={{ position: "absolute" }}
            // className={`${brandBack} ${absoluteChild}  ${
            //   containerImage ? showBack : ""
            // }`}
          />
        </Modal>
      </Container>
      <Box paddingY={5} style={{ textAlign: "center" }}>
        <a href={brand.link}>{brand.link}</a>
      </Box>
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
      link
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
