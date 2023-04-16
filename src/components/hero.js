import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import { useState, useEffect } from "react"
import { heroImageFull, heroTextHidden } from "./hero.css"

import {
  Box,
  ButtonList,
  Container,
  Flex,
  Heading,
  Kicker,
  Section,
  Subhead,
  Text,
} from "./ui"

export default function Hero(props) {
  // to reformat, maybe could use js media query instead?

  const [isScrolledTop, setisScrolledTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setisScrolledTop(window.scrollY > 250)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Section>
      <Flex gap={0} variant="responsive">
        <Box
          width="half"
          className={isScrolledTop ? heroImageFull : ""}
          style={{ transition: "transform 0.2s ease-in-out" }}
        >
          {props.image && (
            <GatsbyImage
              alt={props.image.alt}
              image={getImage(props.image.gatsbyImageData)}
            />
          )}
        </Box>
        <Box
          width="half"
          padding={4}
          className={isScrolledTop ? heroTextHidden : ""}
          style={{
            transition:
              "transform 0.2s ease-in-out, opacity 0.2s ease-in-out, width 0.2s ease-in-out",
          }}
        >
          <Container>
            <Heading as="h1">
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.h1}
            </Heading>
            <Subhead as="h2">{props.subhead}</Subhead>
            <Text as="p">{props.text}</Text>
            <ButtonList links={props.links} />
          </Container>
        </Box>
      </Flex>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageHeroContent on HomepageHero {
    id
    kicker
    h1: heading
    subhead
    text
    links {
      id
      href
      text
    }
    image {
      id
      gatsbyImageData
      alt
    }
  }
`
