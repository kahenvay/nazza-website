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
  evenlySpacedFlexChild,
  square,
} from "./ui.css"

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

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
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
            }
          }
        }
      }
    }
  `)

  const { links, meta, socialLinks, copyright } = data.layout.footer
  const { navItems } = data.layout.header

  return (
    <Box as="footer" paddingY={4}>
      <Space size={3} />
      <Container>
        <Flex responsive>
          <Flex className={evenlySpacedFlexChild}>
            <div>
              <NavLink to="/">
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
          <Flex variant="center" className={evenlySpacedFlexChild}>
            <div className={square}></div>
          </Flex>
          <Space size={2} />
          <Flex
            variant="justifyEnd"
            className={`${evenlySpacedFlexChild} ${atSmallTextAlignCenter}`}
          >
            <EventList />
          </Flex>
        </Flex>
        <Space size={5} />
        <Flex variant="start" responsive className={atSmallFlexAlignCenter}>
          <FlexList
            variant="start"
            responsive
            className={atSmallFlexAlignCenter}
          >
            {links &&
              links.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.href}>{link.text}</NavLink>
                </li>
              ))}
            {navItems &&
              navItems.map((navItem) => (
                <li key={navItem.id}>
                  <NavLink to={navItem.href}>{navItem.text}</NavLink>
                </li>
              ))}
          </FlexList>

          <Space />
          <FlexList>
            {meta &&
              meta.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.href}>
                    <Text variant="small">{link.text}</Text>
                  </NavLink>
                </li>
              ))}
          </FlexList>
          <Text variant="small">{copyright}</Text>
        </Flex>
      </Container>
      <Space size={0} />
    </Box>
  )
}
