import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"
import { maxMedia } from "./ui.css"

export const logoListContainer = style({
    background: "white",
    zIndex: 0,
    position: "relative",
    padding: theme.space[5],
    "@media": {
        [maxMedia.small]: {
          paddingLeft: theme.space[4],
          paddingRight: theme.space[4],
        //   padding: theme.space[2]
           paddingTop: theme.space[2],
        //   paddingBottom: theme.space[2]
        },
      },
    
  })


  export const rounded = style({
    border:"1px solid black",
    borderRadius:"100%",
    backgroundColor:'#fff'
    // height: "100%"
  })

  export const logoStyle = style({
    filter: "grayscale(1)",
    transform: "scale(1)",
    transition: "all 0.2s ease-in-out, filter 0.2s ease-in-out",
    display: "flex",
    selectors: {
        '&:hover': {
            transform: "scale(1.25)",
            filter: "grayscale(0)"
        }
    }
  })