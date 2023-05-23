import { graphql } from "gatsby"
import * as React from "react"
import { useState, useEffect } from "react"
import {
  heroImageDefault,
  heroImageFull,
  heroText,
  heroTextHidden,
  hideOverflowX,
  tooBigFlex,
} from "./hero.css"
import ImageSlider from "./imageSlider"

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
      // setisScrolledTop(window.scrollY > 250)
      setisScrolledTop(window.scrollY > 150)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Section style={{ padding: 0 }}>
      <Flex gap={0} variant="responsive" className={tooBigFlex}>
        <Box
          width="half"
          className={isScrolledTop ? heroImageFull : heroImageDefault}
          style={{ transition: "transform 0.2s ease-out" }}
        >
          <ImageSlider images={props.images} />
        </Box>
        <Box
          width="half"
          padding={4}
          // background="white"
          className={`${heroText} ${isScrolledTop ? heroTextHidden : ""}`}
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
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
            <ButtonList marginY={0} links={props.links} />
          </Container>
        </Box>
      </Flex>
    </Section>
  )
}

// export const query = graphql`
//   fragment HomepageHeroContent on HomepageHero {
//     id
//     kicker
//     h1: heading
//     subhead
//     text
//     links {
//       id
//       href
//       text
//     }
//     image {
//       id
//       gatsbyImageData
//       alt
//     }
//   }
// `

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
    images {
      id
      gatsbyImageData
      alt
    }
  }
`
