import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Menu, X } from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  InteractiveIcon,
  Nudge,
  VisuallyHidden,
} from "./ui"
import {
  mobileNavOverlay,
  mobileNavLink,
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
  mobileNavSVGColorWrapper,
  header,
} from "./header.css"

import BrandLogo from "./brand-logo-2"
import { hideOverflowX } from "./hero.css"

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      layout {
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

  const { navItems } = data.layout.header
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }, [isOpen])

  return (
    <header className={header}>
      <Container className={desktopHeaderNavWrapper}>
        <Flex variant="spaceBetween">
          <NavLink to="/" style={{ height: "82px" }}>
            <VisuallyHidden>Home</VisuallyHidden>
            <BrandLogo />
          </NavLink>
          <nav>
            <FlexList gap={4}>
              {navItems &&
                navItems.map((navItem) => (
                  <li key={navItem.id}>
                    <NavLink to={navItem.href}>{navItem.text}</NavLink>
                  </li>
                ))}
            </FlexList>
          </nav>
        </Flex>
      </Container>
      <Container className={mobileHeaderNavWrapper[isOpen ? "open" : "closed"]}>
        <Flex variant="spaceBetween">
          <span
            className={
              mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
            }
            style={{ height: "60px", display: "flex" }}
          >
            <NavLink to="/">
              <VisuallyHidden>Home</VisuallyHidden>
              <BrandLogo />
            </NavLink>
          </span>
          <Flex>
            <Space />
            <Nudge right={3}>
              <InteractiveIcon
                title="Toggle menu"
                onClick={() => setOpen(!isOpen)}
                className={
                  mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
                }
              >
                {isOpen ? <X /> : <Menu />}
              </InteractiveIcon>
            </Nudge>
          </Flex>
        </Flex>
      </Container>
      {isOpen && (
        <div className={mobileNavOverlay}>
          <nav>
            <FlexList responsive variant="stretch">
              {navItems?.map((navItem) => (
                <li key={navItem.id}>
                  (
                  <NavLink to={navItem.href} className={mobileNavLink}>
                    {navItem.text}
                  </NavLink>
                  )
                </li>
              ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  )
}
