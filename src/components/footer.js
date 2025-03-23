import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Twitter,
  Twitch,
  Instagram,
  Facebook,
  Youtube,
  GitHub,
} from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Box,
  Space,
  NavLink,
  Text,
  IconLink,
  VisuallyHidden,
} from "./ui"
import BrandLogo from "./brand-logo"
import EventList from "./events"
import {
  atSmallFlexAlignCenter,
  atSmallTextAlignCenter,
  atXLFlexAlignCenter,
  atXLcol,
  evenlySpacedFlexChild,
} from "./ui.css"

import Whatsapp from "./whatsapp"
import { StaticImage } from "gatsby-plugin-image"
import { footyRes } from "./footer.css"


const socialMedia = {
  TWITTER: {
    url: "https://twitter.com",
    name: "Twitter",
    icon: <Twitter />,
  },
  INSTAGRAM: {
    url: "https://instagram.com",
    name: "Instagram",
    icon: <Instagram />,
  },
  FACEBOOK: {
    url: "https://facebook.com",
    name: "Facebook",
    icon: <Facebook />,
  },
  YOUTUBE: {
    url: "https://youtube.com",
    name: "YouTube",
    icon: <Youtube />,
  },
  GITHUB: {
    url: "https://github.com",
    name: "GitHub",
    icon: <GitHub />,
  },
  TWITCH: {
    url: "https://twitch.tv",
    name: "Twitch",
    icon: <Twitch />,
  },
}

const getSocialURL = ({ service, username }) => {
  const domain = socialMedia[service]?.url
  if (!domain) return false
  return `${domain}/${username}`
}

const getSocialIcon = ({ service }) => {
  return socialMedia[service]?.icon
}

const getSocialName = ({ service }) => {
  return socialMedia[service]?.name
}

export default function Footer(props) {
  // Dynamic state to hold BubbleChat once loaded
  const [BubbleChatComponent, setBubbleChatComponent] =
    React.useState(null)

  // Dynamically import BubbleChat on the client side only.
  React.useEffect(() => {
    import("flowise-embed-react")
      .then((module) => {
        // Save the BubbleChat component in state.
        setBubbleChatComponent(() => module.BubbleChat)
      })
      .catch((err) =>
        console.error("Error loading BubbleChat:", err)
      )
  }, [])

  const lang = props.pageContext?.lang || ""
  const langForQuery =
    props.pageContext?.lang?.charAt(0)?.toUpperCase() +
      props.pageContext?.lang?.slice(1).toLowerCase() ||
    ""

  const data = useStaticQuery(graphql`
    query socialQuery {
      layout {
        footer {
          id
          links {
            id
            href
            text
          }
          meta {
            id
            href
            text
          }
          copyright
          socialLinks {
            id
            service
            username
          }
        }
        header {
          id
          navItems {
            id
            navItemType
            ... on NavItem {
              href
              text
              hrefFr
              hrefNl
              textFr
              textNl
            }
            ... on NavItemGroup {
              name
              topLink
              navItems {
                id
                href
                hrefFr
                hrefNl
                text
                textFr
                textNl
                description
                icon {
                  alt
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  const { links, meta, socialLinks, copyright } =
    data.layout.footer
  const { navItems } = data.layout.header

  const footerLinks = () => {
    return (
      <FlexList className={footyRes}>
        {/* Render main links (where navItemType is not "Group") */}
        <FlexList
          variant="columnStart"
          responsive
          className={atSmallFlexAlignCenter}
        >
          {navItems &&
            navItems
              .filter((navItem) => navItem.navItemType !== "Group")
              .map((navItem) => (
                <li key={navItem.id}>
                  <NavLink
                    to={
                      lang !== ""
                        ? `/${lang}${navItem.href}`
                        : navItem.href
                    }
                  >
                    {navItem[`text${langForQuery}`]
                      ? navItem[`text${langForQuery}`]
                      : navItem.text}
                  </NavLink>
                </li>
              ))}
        </FlexList>

        {/* Render group items (where navItemType is "Group") */}
        <FlexList
          variant="columnStart"
          responsive
          className={atSmallFlexAlignCenter}
        >
          {navItems &&
            navItems
              .filter((navItem) => navItem.navItemType === "Group")
              .map(
                (navItem) =>
                  navItem.navItems &&
                  navItem.navItems.map((navSubItem) => (
                    <li key={navSubItem.id}>
                      <NavLink
                        to={
                          lang !== ""
                            ? `/${lang}${navSubItem.href}`
                            : navSubItem.href
                        }
                      >
                        {navSubItem[`text${langForQuery}`]
                          ? navSubItem[`text${langForQuery}`]
                          : navSubItem.text}
                      </NavLink>
                    </li>
                  ))
              )}
        </FlexList>
      </FlexList>
    )
  }

  return (
    <Box
      as="footer"
      paddingY={4}
      style={{ backgroundColor: "#fff8ffba" }}
    >
      <Space size={3} />
      <Container>
        <Flex responsive>
          <Flex className={evenlySpacedFlexChild}>
            <div>
              <NavLink to="/home">
                <VisuallyHidden>Home</VisuallyHidden>
                <BrandLogo />
              </NavLink>
              <Space size={2} />
              <FlexList variant="center" gap={1}>
                {socialLinks &&
                  socialLinks.map((link) => {
                    const url = getSocialURL(link)
                    return (
                      url && (
                        <li key={link.id}>
                          <IconLink to={url}>
                            <VisuallyHidden>
                              {getSocialName(link)}
                            </VisuallyHidden>
                            {getSocialIcon(link)}
                          </IconLink>
                        </li>
                      )
                    )
                  })}
              </FlexList>
            </div>
          </Flex>
          <Space size={2} />
          <Flex
            variant="column"
            className={evenlySpacedFlexChild}
          >
            <p style={{ margin: 0 }}>
              Scan and add contact!
            </p>
            <StaticImage
              src="../images/qrzach.png"
              alt="Zachary Zechnini Contact QR Code"
              width={150}
            />
          </Flex>
          <Space size={2} />
          <Flex
            variant="justifyEnd"
            className={`${evenlySpacedFlexChild} ${atSmallTextAlignCenter}`}
          >
            <EventList pageContext={props.pageContext} />
          </Flex>
        </Flex>
        <Space size={5} />
        <Flex className={`${atSmallFlexAlignCenter} ${atXLcol}`}>
          {footerLinks()}
          <Space />
          <FlexList>
            {meta &&
              meta.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.href}>
                    <Text variant="small">
                      {link.text}
                    </Text>
                  </NavLink>
                </li>
              ))}
          </FlexList>
          <Text variant="small">
            {copyright}
          </Text>
        </Flex>
      </Container>
      <Space size={0} />
      <Whatsapp />
      {/* Render BubbleChat only after it's been dynamically loaded */}
      {BubbleChatComponent && (
        <BubbleChatComponent
          chatflowid="941d84e3-ecc3-4dad-bfdd-ef98b47be44d"
          apiHost="https://pacs.thakaamed.com"
        />
      )}
    </Box>
  )
}
