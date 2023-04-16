import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"

export const logoListContainer = style({
    background: "white",
    zIndex: 1,
    position: "relative",
    padding: theme.space[5]
  })


  export const logoStyle = style({
    filter: "grayscale(1)",
    transform: "scale(1)",
    transition: "all 0.2s ease-in-out, filter 0.2s ease-in-out",
    selectors: {
        '&:hover': {
            transform: "scale(1.2)",
            filter: "grayscale(0)"
        }
    }
  })