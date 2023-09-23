import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Space, Container, Section, FlexList, Text, Subhead, Link } from "./ui"
import { logoListContainer, logoStyle } from "./logo-list.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import LogoItem from "./logo-item"
import { absoluteChild, absoluteParent } from "./ui.css"

export default function LogoList(props) {
  const data = useStaticQuery(graphql`
    query {
      contentfulHomepageLogoList {
        id
        text
        brands {
          slug
          id
          image {
            id
            alt
            gatsbyImageData
          }
          logo {
            id
            alt
            gatsbyImageData
          }
        }
      }
    }
  `)

  const { brands } = data.contentfulHomepageLogoList

  const [containerImageSrc, setContainerImageSrc] = React.useState("")
  const [containerImage, setContainerImage] = React.useState("")

  let lang = props.pageContext?.lang || ""
  lang = lang == "en" ? "" : lang
  const langForQuery =
    props.pageContext?.lang?.charAt(0)?.toUpperCase() +
      props.pageContext?.lang?.slice(1).toLowerCase() || ""

  React.useEffect(() => {
    const brand = brands.find((obj) => obj.id === containerImageSrc)

    if (brand) {
      setContainerImage(brand.image)
    }
  }, [containerImageSrc, brands])

  const handleMouseEnter = (id) => {
    // console.log(id)
    setContainerImageSrc(id)
  }

  const handleMouseLeave = () => {
    setContainerImageSrc("")
    setContainerImage("")
  }

  return (
    <Section paddingY={0} className={absoluteParent}>
      {/* <Space size={4} /> */}
      {props.dynamicBackground && (
        <GatsbyImage
          alt={containerImage.alt ? containerImage.alt : ""}
          image={getImage(containerImage.gatsbyImageData)}
          className={absoluteChild}
          style={{ position: "absolute" }}
          // className={`${brandBack} ${absoluteChild}  ${
          //   containerImage ? showBack : ""
          // }`}
        />
      )}
      <Container
        paddingY={2}
        width="narrow"
        className={logoListContainer}
        style={
          props.dynamicBackground && { background: "rgba(255,255,255,0.6)" }
        }
      >
        <Subhead style={{ textAlign: "center" }}>
          {lang === "" && "Our Brands"}
          {lang === "fr" && "Nos marques"}
          {lang === "nl" && "Onze merken"}
        </Subhead>
        <Space size={4} />
        <Text center variant="lead">
          {lang === "" &&
            "Discover our carefully curated selection of premium clothing brands."}
          {lang === "fr" &&
            "Découvrez notre sélection soigneusement choisie de marques de vêtements haut de gamme."}
          {lang === "nl" &&
            "Ontdek onze zorgvuldig geselecteerde collectie van premium kledingmerken."}
        </Text>

        <Space size={5} />
        <FlexList gap={4} variant="center" alignItems="stretch">
          {brands.map((brand) => {
            return (
              brand.logo && (
                <li
                  className={`${logoStyle} `}
                  key={brand.logo.id}
                  onMouseEnter={() => handleMouseEnter(brand.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    style={{ display: "flex" }}
                    to={
                      lang
                        ? `/${lang}/brands/${brand.slug}`
                        : `/brands/${brand.slug}`
                    }
                  >
                    <LogoItem {...brand.logo} rounded={true} />
                  </Link>
                </li>
              )
            )
          })}
        </FlexList>
      </Container>
    </Section>
  )
}
