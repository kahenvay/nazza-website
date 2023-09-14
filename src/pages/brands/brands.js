import React from "react"
import Layout from "../../components/layout"
import SEOHead from "../../components/head"

import LogoList from "../../components/logo-list"

export default function Brands(props) {
  return (
    <Layout pageContext={props.pageContext} style={{ overflowX: "hidden" }}>
      <LogoList
        pageContext={props.pageContext}
        rounded={true}
        dynamicBackground={true}
      />
    </Layout>
  )
}

export const Head = (props) => {
  // const { homepage } = props.data
  const lang = props.pageContext?.lang || ""
  let description =
    "Discover our carefully curated selection of premium clothing brands."
  if (lang === "fr")
    description =
      "Découvrez notre sélection soigneusement choisie de marques de vêtements haut de gamme."
  if (lang === "nl")
    description =
      "Ontdek onze zorgvuldig geselecteerde collectie van premium kledingmerken."

  return (
    <SEOHead
      title={"Nazza Agency | Brands"}
      description={description}
      image={""}
    />
  )
}
