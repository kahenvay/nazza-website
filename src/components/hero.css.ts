import { style } from "@vanilla-extract/css"
import { media } from "./ui.css"

export const heroImageFull = style({
    "@media": {
        [media.small]: {
            transform: "scale(200%) translateX(25%)"
        },
    },
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

  