import { style } from "@vanilla-extract/css"
import { maxMedia } from "./ui.css"

export const member = style({
    width:"30%",
    "@media": {
        [maxMedia.small]: {
            width:"100%"
        },
      },
  })