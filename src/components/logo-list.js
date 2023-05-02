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
import { logoListContainer, logoStyle } from "./logo-list.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import LogoItem from "./logo-item"
import { absoluteChild, absoluteParent } from "./ui.css"
import { brandBack, show, showBack } from "./brand.css"

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

  const { text, brands } = data.contentfulHomepageLogoList

  const [containerImageSrc, setContainerImageSrc] = React.useState("")
  const [containerImage, setContainerImage] = React.useState("")

  React.useEffect(() => {
    // setContainerImageSrc(containerImageSrc)
    // console.log(containerImageSrc)

    const brand = brands.find((obj) => obj.id === containerImageSrc)
    console.log(brand)
    if (brand) {
      setContainerImage(brand.image)
    }
    // else {
    //   setContainerImage("")
    // }
  }, [containerImageSrc])

  const handleMouseEnter = (id) => {
    // console.log(id)
    setContainerImageSrc(id)
  }

  const handleMouseLeave = () => {
    console.log("mouseout")
    setContainerImageSrc("")
    setContainerImage("")
  }

  const dynamicBackground = () => {
    return
  }

  return (
    <Section paddingY={5} className={absoluteParent}>
      {/* <Space size={4} /> */}
      {props.dynamicBackground && (
        <GatsbyImage
          alt={containerImage.alt}
          image={getImage(containerImage.gatsbyImageData)}
          className={absoluteChild}
          style={{ position: "absolute" }}
          // className={`${brandBack} ${absoluteChild}  ${
          //   containerImage ? showBack : ""
          // }`}
        />
      )}
      <Container
        width="narrow"
        className={logoListContainer}
        style={
          props.dynamicBackground && { background: "rgba(255,255,255,0.6)" }
        }
      >
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
                    to={`/brands/${brand.slug}`}
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
