import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Container, Flex, Link, Section, Space } from "./ui"
import Address from "./address"
import NameAndAddress from "./name-and-address"
import Form from "./form"
import { StaticImage } from "gatsby-plugin-image"
import { absoluteChild, absoluteParent, colorWhite } from "./ui.css"
import { contactText } from "./contact.css"

export default function Contact() {
  const data = useStaticQuery(graphql`
    query {
      contentfulLayoutFooter {
        zachPhone
        zachName
        abdelPhone
        abdelName
      }
    }
  `)

  const { zachPhone, zachName, abdelPhone, abdelName } =
    data.contentfulLayoutFooter

  return (
    // console.log("events", props, eventTitle) || (
    <div>
      <Section padding={3} background="muted" className={absoluteParent}>
        <StaticImage
          src="../images/hanger-4.jpg"
          className={absoluteChild}
          style={{ position: "absolute" }}
          alt=""
        />
        <Space size={4} />
        <Container className={absoluteParent}>
          <Flex gap={4} variant="stretchResponsive">
            <Box width="half">
              <Form />
            </Box>
            <Box
              width="half"
              style={{ textAlign: "center" }}
              className={`${colorWhite} ${contactText}`}
            >
              <NameAndAddress name={abdelName} number={abdelPhone} />
              <Space size={1} />
              <NameAndAddress name={zachName} number={zachPhone} />
              <Space size={1} />
              <Address />
            </Box>
          </Flex>
        </Container>
        <Space size={4} />
      </Section>
      <Link
        target="_blank"
        href="https://www.google.com/maps/place/Chau.+de+Waterloo+1006,+1180+Uccle,+Belgium/@50.8009555,4.3717523,17z/data=!3m1!4b1!4m6!3m5!1s0x47c3c51f3a2012db:0x9899e34bac24c1a4!8m2!3d50.8009555!4d4.3743272!16s%2Fg%2F11csmv3lvv"
      >
        <StaticImage
          alt="map of europe with belgium highlighted and a pin where nazza agency is located"
          src="../images/static-map-long-think-belgium-v2.jpg"
        />
      </Link>
    </div>
  )
}
