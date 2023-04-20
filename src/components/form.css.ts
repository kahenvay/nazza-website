import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"
import { media, padding } from "./ui.css"
import {colors} from "../colors.css"

export const form = style({
  maxWidth:"600px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"

})

export const inputGroup = style({
  position:"relative",
  width:"100%",
  display:"flex"
})

export const labelAndInput = style({
    // backgroundColor:colors.muted,
    backgroundColor:colors.white,
    borderTop:"none",
    borderLeft:"none",
    borderRight:"none",
    borderBottom: `3px solid #ccc`,
    borderRadius: "0",
    padding: `${theme.space[2]} ${theme.space[3]}`,
    fontSize: theme.fontSizes[2],
    fontFamily: "inherit"
    
})

export const label = style({
    // borderLeft:"1px solid #000",

})

export const textInput = style({
    // borderRight:"1px solid #000",
    width:"100%",
    selectors:{
        '&:focus-visible':{
            // outline: `1px solid ${colors.primary}`
            outline: "none"
        }
    }
})

export const span = style({
    width: "0",
    height: "3Px",
    position: "absolute",
    background: colors.primary,
    left: "50%",
    bottom: "0",
    transform: "translateX(-50%)",
    transition: "width 0.2s ease-in-out"
})

export const spanHighlight = style({
    width: "100%",
})

export const submit = style({
    fontSize: theme.fontSizes[2],
    padding: `${theme.space[2]} ${theme.space[3]}`,
    maxWidth: "200px",
    width:"100%",
    zIndex: "1",
    position: "relative",
    backgroundColor: "transparent",
    color:"#000",
    transition:"color 0.2s ease-in-out"
})

export const fillSpan = style({
    // position: "absolute",
    // display: "block",
    // width: "0",
    // height: "0",
    // borderRadius: "50%",
    // backgroundColor: "#233433",
    // transition: "width 0.4s ease-in-out, height 0.4s ease-in-out",
    // transform: "translate(-50%, -50%)",
    // zIndex: "-1",
    pointerEvents:"none",
    position: "absolute",
    display: "block",
    width: "0",
    height: "100%",
    backgroundColor: colors.primary,
    left:"50%",
    transform: "translateX(-50%)",
    transition: "width 0.1s ease-in-out",
    top:0,
})

// export const wrappy = style({
//     selectors:{
//         ':hover span':{
//             // color: tint($btn-color, 75%);
//             width: "100%",
//         }
//     }
// })

export const hoverSubmit = style({
    width: "100%"
})

export const hoverText = style({
    color:colors.muted
})

