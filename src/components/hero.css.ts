import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"
import { media } from "./ui.css"

export const hideOverflowX = style({
    "@media": {
        [media.small]: {
            overflowX:"hidden"
        },
    },
})

export const tooBigFlex = style({
    "@media": {
        [media.small]: {
            width:"125%"
        },
    },
})

export const heroImageFull = style({
    "@media": {
        [media.small]: {
            // transform: "scale(200%) translateX(25%)"
            transform: "scale(160%) translateX(18.75%)"
        },
    },
  })

export const heroImageDefault = style({
    "@media": {
        [media.small]: {
            // transform: "scale(150%) translateX(0)",
            transform: "scale(100%) translateX(0)",
            zIndex: -1,
            width:"75%"
        },
    },
  })

export const heroText = style({
    "@media": {
        [media.small]: {
            position:"relative",
            // paddingBottom: theme.space[4],
            transform: "translateX(-50%)"
        }
    }
})

export const heroTextHidden = style({
    "@media": {
        [media.small]: {
            transform: "translateX(100%)",
            opacity: 0,
            transitionDelay: "0.25s",
            // width:"0"
        }
    }
})

  