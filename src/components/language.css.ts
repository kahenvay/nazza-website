import { style } from "@vanilla-extract/css"
import {colors} from "../colors.css"



  export const langStyle = style({
    opacity: 0.3,
    color: colors.primary,
    textDecoration: "none",
    transition: "opacity 0.2s ease-in-out",
    selectors: {
        '&:hover': {
            opacity:1
        }
    }
  })