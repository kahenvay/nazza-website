import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Container, Flex, Section, Space } from "./ui"
import Address from "./address"
import NameAndAddress from "./name-and-address"

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
      <Section padding={4} background="muted">
        <Container>
          <Flex gap={4} variant="responsive">
            <Box width="half"></Box>
            <Box width="half">
              <NameAndAddress name={abdelName} number={abdelPhone} />
              <Space size={1} />
              <NameAndAddress name={zachName} number={zachPhone} />
              <Space size={1} />
              <Address />
            </Box>
          </Flex>
        </Container>
      </Section>
    </div>
  )
}
