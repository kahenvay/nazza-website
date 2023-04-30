import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Space,
  Container,
  Section,
  FlexList,
  Text,
  Logo,
  Subhead,
  Link,
} from "./ui"
import { logoListContainer, logoStyle, rounded } from "./logo-list.css"

export default function LogoList(props) {
  const data = useStaticQuery(graphql`
    query {
      contentfulHomepageLogoList {
        id
        text
        brands {
          slug
          logo {
            id
            alt
            gatsbyImageData
          }
        }
      }
    }
  `)

  const { text, brands } = data.contentfulHomepageLogoList

  const LogoItem = (image) => {
    // console.log(image)
    // console.log(props)
    // console.log(props.rounded)

    if (!image) return null

    return (
      <Logo
        alt={image.alt}
        image={image.gatsbyImageData}
        size="medium"
        className={`${props.rounded ? rounded : ""}`}
        imgStyle={props.rounded ? { width: "70%", margin: "auto" } : ""}
      />
    )
  }

  return (
    <Section paddingY={4}>
      {/* <Space size={4} /> */}
      <Container width="narrow" className={logoListContainer}>
        <Subhead style={{ textAlign: "center" }}> Our Brands </Subhead>
        <Space size={4} />
        {text && (
          <Text center variant="lead">
            {text}
          </Text>
        )}
        <Space size={5} />
        <FlexList gap={4} variant="center" alignItems="stretch">
          {brands.map((brand) => {
            console.log(brand)
            return (
              brand.logo && (
                <li className={`${logoStyle} `} key={brand.logo.id}>
                  <Link style={{ display: "flex" }} to={`${brand.slug}`}>
                    <LogoItem {...brand.logo} />
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

// return (
//   <Section paddingY={4}>
//     {/* <Space size={4} /> */}
//     <Container width="narrow" className={logoListContainer}>
//       <Subhead style={{ textAlign: "center" }}> Our Brands </Subhead>
//       <Space size={4} />
//       {text && (
//         <Text center variant="lead">
//           {text}
//         </Text>
//       )}
//       <Space size={5} />
//       <FlexList gap={4} variant="center" alignItems="stretch">
//         {logos.map(
//           (logo) =>
//             logo.image && (
//               <li className={`${logoStyle} `} key={logo.id}>
//                 <LogoItem {...logo.image} />
//               </li>
//             )
//         )}
//       </FlexList>
//     </Container>
//   </Section>
// )
// }

// export const query = graphql`
//   fragment HomepageLogoListContent on HomepageLogoList {
//     id

//     text
//     logos {
//       id
//       alt
//       image {
//         id
//         gatsbyImageData
//         alt
//       }
//     }
//   }
// `
