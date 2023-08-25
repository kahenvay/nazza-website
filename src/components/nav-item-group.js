import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Box, Flex, FlexList, NavLink } from "./ui"
import Caret from "./caret"
import * as styles from "./nav-item-group.css"
import { media } from "./ui.css"

export default function NavItemGroup({
  name,
  topLink,
  navItems,
  mouseOverHeader,
  diffHeaderAnchorHobered,
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [popupVisible, setPopupVisible] = React.useState(false)
  const [mouseOverPopup, setMouseOverPopup] = React.useState(false)
  const isSmallScreen = () => {
    return !window.matchMedia(media.small).matches
  }

  //TODO Surely a better way... maybe conditionally render Link item, or rewrite how NavGroups works totally

  const onGroupButtonClick = React.useCallback(() => {
    if (!isOpen) {
      setIsOpen(true)
      setPopupVisible(true)
      console.log("set open")
    } else {
      // ensures that sub-menu closes when no animation is available
      // if (isSmallScreen()) {
      setIsOpen(false)
      // }
      setPopupVisible(false)
      console.log("set !open")
    }
  }, [isOpen])

  const handleMouseEnter = React.useCallback(() => {
    setIsOpen(true)
    setPopupVisible(true)
  }, [])

  React.useEffect(() => {
    // crude implementation of animating the popup without a library
    const popupBox = document.querySelector(`[data-id="${name}-popup-box"]`)
    const onAnimationEnd = ({ animationName }) => {
      if (animationName === `zoomOutDown`) {
        setIsOpen(false)
      }
    }
    if (popupBox) {
      popupBox.addEventListener("animationend", onAnimationEnd)
      return () => {
        popupBox.removeEventListener("animationend", onAnimationEnd)
      }
    }
  }, [isOpen, name])

  React.useEffect(() => {
    // hide menu when clicked outside
    const handleClickOutside = (event) => {
      const wrapper = document.querySelector(
        `[data-id="${name}-group-wrapper"]`
      )
      if (
        !isSmallScreen() &&
        isOpen &&
        wrapper &&
        !wrapper.contains(event.target)
      ) {
        onGroupButtonClick()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [name, isOpen, onGroupButtonClick])

  const handlePopupMouseEnter = () => {
    setMouseOverPopup(true)
  }

  const handlePopupMouseLeave = () => {
    setMouseOverPopup(false)

    if (mouseOverPopup === true && mouseOverHeader === true) {
      setIsOpen(false)
      setPopupVisible(false)
    }
  }

  React.useEffect(() => {
    if (mouseOverPopup === false && mouseOverHeader === false) {
      setIsOpen(false)
      setPopupVisible(false)
    }
  }, [mouseOverHeader, mouseOverPopup])

  React.useEffect(() => {
    setIsOpen(false)
    setPopupVisible(false)
  }, [diffHeaderAnchorHobered])

  return (
    console.log("topLink", topLink) || (
      <Flex
        data-id={`${name}-group-wrapper`}
        variant="columnStart"
        gap={4}
        className={styles.navGroupWrapper}
      >
        <NavLink
          onClick={onGroupButtonClick}
          to={topLink}
          onMouseEnter={() => handleMouseEnter()}
          className={styles.navGroupTitle}
        >
          <Flex gap={2} className={styles.navGroupTitleInner}>
            {name}
            <Caret direction={isOpen ? "up" : "down"} />
          </Flex>
        </NavLink>
        {isOpen && (
          <Box
            data-id={`${name}-popup-box`}
            className={
              styles.navLinkListWrapper[popupVisible ? "opened" : "closed"]
            }
            onMouseEnter={() => handlePopupMouseEnter()}
            onMouseLeave={() => handlePopupMouseLeave()}
          >
            <FlexList
              variant="columnStart"
              gap={2}
              className={styles.navLinkListWrapperInner}
            >
              {navItems.map((navItem) => (
                <li key={navItem.id}>
                  <NavLink to={navItem.href} className={styles.navLinkListLink}>
                    <Flex variant="start" gap={3}>
                      {navItem.icon && (
                        <GatsbyImage
                          alt={navItem.icon.alt}
                          image={getImage(navItem.icon.gatsbyImageData)}
                          className={styles.navIcon}
                        />
                      )}
                      <Flex variant="columnStart" marginY={1} gap={0}>
                        <Box as="span" className={styles.navLinkTitle}>
                          {navItem.text}
                        </Box>
                        {!!navItem.description && (
                          <Box as="p" className={styles.navLinkDescription}>
                            {navItem.description}
                          </Box>
                        )}
                      </Flex>
                    </Flex>
                  </NavLink>
                </li>
              ))}
            </FlexList>
          </Box>
        )}
      </Flex>
    )
  )
}
