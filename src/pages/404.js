import * as React from "react"
import Layout from "../components/layout"
import { Container, Box, Heading, Text, Link, Flex } from "../components/ui"
import ChevronRight from "../components/chevron-right"
import * as styles from "../components/404.css"
import SEOHead from "../components/head"

export default function NotFound(props) {
  const lang = props.pageContext?.lang || ""
  return (
    <Layout>
      <Box paddingY={4}>
        <Container>
          <Flex variant="column">
            <Heading variant="mega" className={styles.heading}>
              404
            </Heading>
            <Heading as="h1">
              {lang === "" && "Page not found"}
              {lang === "fr" && "Page non trouvée"}
              {lang === "nl" && "Pagina niet gevonden"}
            </Heading>
            <Flex variant="column" gap={0}>
              <Text variant="lead" className={styles.text}>
                {lang === "" &&
                  "Sorry! We couldn’t find the page you were looking for."}
                {lang === "fr" &&
                  "Désolé ! Nous n'avons pas pu trouver la page que vous cherchiez."}
                {lang === "nl" &&
                  "Sorry! We konden de pagina die u zocht niet vinden."}
              </Text>
              <Link
                to={lang !== "" ? `/${lang}/home` : "/home"}
                className={styles.link}
              >
                <span>Back to home</span>
                <ChevronRight className={styles.linkChevron} />
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Layout>
  )
}
export const Head = () => {
  return <SEOHead title="404: Page not found" />
}
