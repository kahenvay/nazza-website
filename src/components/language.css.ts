import { style } from "@vanilla-extract/css"
import {colors} from "../colors.css"
import { maxMedia } from "./ui.css"
import { theme } from "../theme.css"


  export const langWrapMobile = style({
    "@media": {
      [maxMedia.small]: { 
        padding:  theme.space[4]
      }}
    
  }) 

  export const langStyle = style({
    opacity: 0.3,
    color: colors.primary,
    textDecoration: "none",
    transition: "opacity 0.2s ease-in-out",
    selectors: {
        '&:hover': {
            opacity:1
        },
        
    },
    "@media": {
      [maxMedia.small]: { 
          opacity:1,
          color:"#fff",
          fontSize:theme.fontSizes[4],
      },
  }
  })