import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../theme.css"
import { maxMedia, media } from "./ui.css"


export const header = style({
  "@media": {
    [media.small]: {
    backgroundColor:"#fff"
    },
    
  },
})

export const headerOpenMobile = style({
"@media":{
  [maxMedia.small]:{
    position:"fixed",
    zIndex:"101",
    overflowY:"scroll",
    top:0,
    height:"100%",
    backgroundColor:"#000"
  }
}
})

export const brandLogo = style({
  transition: "all 0.2s ease-in-out",
  padding:"5px",
  ":hover": {
    color: "#fff",
    backgroundColor:"#000"
  },
  "@media": {
    [media.small]: {
      width:"200px"
    }
  },
})

export const desktopHeaderNavWrapper = style({
  position: "relative",
  zIndex: 1,
  display: "none",
  "@media": {
    [media.small]: {
      display: "block",
      paddingTop: theme.space[4],
      fontSize: theme.fontSizes[3],

      paddingBottom: theme.space[4],
      
    },
  },
})

const mobileHeaderNavWrapperBase = style({
  display: "block",
  position: "relative",
  // paddingTop: theme.space[3],

  "@media": {
    [media.small]: {
      display: "none",
    },
  },
})

export const mobileHeaderNavWrapper = styleVariants({
  open: [
    mobileHeaderNavWrapperBase,
    {
      background: theme.colors.primary,
    },
  ],
  closed: [mobileHeaderNavWrapperBase],
})

export const mobileNavSVGColorWrapper = styleVariants({
  primary: [{ color: theme.colors.primary }],
  reversed: [{ color: theme.colors.background }],
})

export const mobileNavOverlay = style({
  // position: "absolute",
  width: "100vw",
  height: "115vh",
  paddingTop: theme.space[4],
  background: theme.colors.primary,
  // zIndex: 101,
  "@media": {
    [media.small]: {
      display: "none",
    },
  },
})

export const mobileNavLink = style({
  display: "block",
  color: theme.colors.background,
  fontSize: theme.fontSizes[4],
  paddingTop: theme.space[2],
  paddingBottom: theme.space[2],
  paddingLeft: theme.space[4],
  paddingRight: theme.space[4],
})
