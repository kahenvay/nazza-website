import { style } from "@vanilla-extract/css"
import { maxMedia } from "./ui.css"

export const modal = style({
    backgroundColor: "#fff",
    // opacity:0,
    pointerEvents:"none",
    position:"fixed",
    top:"50%",
    left:'50%',
    transform:"translate(-50%,-50%)",
    zIndex:1,
    transition:"all 0.2s ease-in-out",
    // selectors:{
    //     '&:hover':{
    //         opacity:1,
    //         pointerEvents:"all",
    //     }
    // }
    "@media": {
        [maxMedia.small]: {
          display:"none"
        },
      },
  })