import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Container, Flex, Section, Space } from "./ui"
import Address from "./address"
import NameAndAddress from "./name-and-address"
import Form from "./form"
import { StaticImage } from "gatsby-plugin-image"
import { absoluteChild, absoluteParent, colorWhite } from "./ui.css"
import { contactContainer } from "./contact.css"

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
      <Section padding={4} background="muted" className={absoluteParent}>
        <StaticImage
          src="../images/hanger.jpg"
          className={absoluteChild}
          alt=""
        />
        <Space size={4} />
        <Container className={absoluteParent}>
          <Flex gap={4} variant="responsive">
            <Box width="half">
              <Form />
            </Box>
            <Box
              width="half"
              style={{ textAlign: "center" }}
              className={colorWhite}
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
        {/* <StaticImage src="../images/static-map-belgium.png" /> */}
      </Section>
    </div>
  )
}
