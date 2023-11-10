import { graphql } from "gatsby"
import * as React from "react"
import { useState, useEffect } from "react"
import {
  heroImageDefault,
  heroText,
  heroTextHidden,
  tooBigFlex,
} from "./hero.css"
import ImageSlider from "./imageSlider"

import {
  Box,
  Container,
  Flex,
  Heading,
  Kicker,
  NavLink,
  Section,
  Subhead,
  Text,
} from "./ui"
import {
  submitBlack,
  submitBlackFull,
  submitWrapper,
  submitWrapperBlackFull,
  submitWrapperInverse,
} from "./form.css"

export default function Hero(props) {
  // to reformat, maybe could use js media query instead?
  const lang = props.pageContext?.lang || ""
  const langForQuery =
    props.pageContext?.lang?.charAt(0)?.toUpperCase() +
      props.pageContext?.lang?.slice(1).toLowerCase() || ""

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
    console.log("hero props", props) || (
      <Section style={{ padding: 0 }}>
        <Flex gap={0} variant="responsive" className={tooBigFlex}>
          <Box
            width="half"
            className={heroImageDefault}
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
                {props[`heading${langForQuery}`]
                  ? props[`heading${langForQuery}`]
                  : props[`heading`]}
              </Heading>
              <Text
                as="p"
                dangerouslySetInnerHTML={{
                  __html: props[`html${langForQuery}`]
                    ? props[`html${langForQuery}`]
                    : props[`html`],
                }}
              />

              {/* <ButtonList marginY={0} links={props.links} /> */}
              <div className={submitWrapperInverse}>
                <NavLink
                  style={{ display: "block", textAlign: "center", zIndex: 100 }}
                  to={lang ? `/${lang}/about` : "/about"}
                  className={`${submitBlackFull}`}
                >
                  Read More
                </NavLink>
              </div>
            </Container>
          </Box>
        </Flex>
      </Section>
    )
  )
}

export const query = graphql`
  fragment HomepageHeroContent on HomepageHero {
    id
    kicker
    heading
    headingFr
    headingNl
    subhead
    html
    htmlFr
    htmlNl
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
