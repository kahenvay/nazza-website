import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { Container, Box, Heading, List, Flex, Space } from "../../components/ui"
import SEOHead from "../../components/head"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { brandImages, gridImage } from "../../components/brand.css"

import Modal from "../../components/modal"
import Iframe from "../../components/iframe"
import { absoluteChild, absoluteParent } from "../../components/ui.css"
import BrandExtras from "../../components/brand-extras"
import Socials from "../../components/socials"

export default function Brand(props) {
  const { brand } = props.data

  const [containerImageSrc, setContainerImageSrc] = React.useState("")
  const [containerImage, setContainerImage] = React.useState("")

  React.useEffect(() => {
    setContainerImageSrc(containerImageSrc)
    console.log(containerImageSrc)

    console.log(brand.images)

    const image = brand.images?.find((obj) => obj.id === containerImageSrc)
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
      <Space size={4} />
      <Container>
        <Flex gap={4} variant="horizontalAlignedCenter">
          <Box width="half">
            {/* <Heading as="h1">{brand?.title}</Heading> */}
            {brand?.logo && (
              <div>
                <Flex variant="center">
                  <GatsbyImage
                    alt={brand.logo.alt}
                    image={getImage(brand.logo.gatsbyImageData)}
                  />
                </Flex>
              </div>
            )}
          </Box>
          <Box width="half">
            {brand?.topImage && (
              <a href={brand?.website}>
                <GatsbyImage
                  alt={brand.topImage.alt}
                  image={getImage(brand.topImage.gatsbyImageData)}
                />
              </a>
            )}
          </Box>
        </Flex>
      </Container>
      <Space size={5} />
      <Container>
        <Flex gap={4} variant="startResponsive">
          <Box width="half">
            <div
              dangerouslySetInnerHTML={{
                __html: brand?.html,
              }}
            />
            <Space size={5} />
            <BrandExtras
              website={brand?.website}
              b2b={brand?.b2b}
              lookbook={brand?.lookbook}
            />
          </Box>
          <Box width="half">
            <Space size={3} />
            {brand?.featuredVideo && (
              <div>
                <div
                  className={absoluteParent}
                  style={{ paddingBottom: "56.25%" }}
                >
                  <Iframe
                    className={absoluteChild}
                    src={brand?.featuredVideo}
                  />
                </div>
                <Space size={4} />
              </div>
            )}

            <List className={brandImages}>
              {brand?.images &&
                brand.images.map((image) => {
                  return (
                    <li
                      key={image.id}
                      onMouseEnter={() => handleMouseEnter(image.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a href={brand?.website}>
                        <GatsbyImage
                          alt={image.alt}
                          image={getImage(image.gatsbyImageData)}
                          className={gridImage}
                        />
                      </a>
                    </li>
                  )
                })}
            </List>
            <Space size={4} />
            <Socials socials={brand.socials} />

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
          </Box>
        </Flex>
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
      website
      b2b
      lookbook {
        url
      }
      logo {
        id
        alt
        url
        gatsbyImageData
      }
      image {
        id
        alt
        url
        gatsbyImageData
      }
      topImage {
        id
        alt
        url
        gatsbyImageData
      }
      featuredVideo
      images {
        id
        alt
        url
        gatsbyImageData
      }
      html
      socials {
        icon
        link
      }
    }
  }
`
