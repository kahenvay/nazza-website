import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"
import { maxMedia } from "./ui.css"

export const timeline = style({
    // background: "#456990",
    padding: "50px 0",
    overflow:"hidden",
    "@media": {
        'screen and (max-width:900px)': {
            marginLeft:"-30px",
            marginRight:"-30px"
         },
    },
  })



