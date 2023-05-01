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
import { GatsbyImage } from "gatsby-plugin-image"
import LogoItem from "./logo-item"

export default function LogoList(props) {
  const data = useStaticQuery(graphql`
    query {
      contentfulHomepageLogoList {
        id
        text
        brands {
          slug
          id
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

  // const [containerImageSrc, setContainerImageSrc] = React.useState("")

  // React.useEffect(() => {
  //   setContainerImageSrc(containerImageSrc)
  // }, [containerImageSrc])

  // const handleMouseEnter = (id) => {
  //   console.log(id)
  //   setContainerImageSrc(id)
  // }

  // const handleMouseLeave = () => {
  //   setContainerImageSrc("")
  // }

  // const dynamicBackground = () => {
  //   return
  // }

  return (
    <Section paddingY={4}>
      {/* <Space size={4} /> */}
      {
        // props.background ?? <GatsbyImage image={}/>
      }
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
            return (
              brand.logo && (
                <li
                  className={`${logoStyle} `}
                  key={brand.logo.id}
                  // onMouseEnter={handleMouseEnter(brand.logo.id)}
                  // onMouseLeave={handleMouseLeave}
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
