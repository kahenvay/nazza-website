import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"
// import { media, padding } from "./ui.css"
import {colors} from "../colors.css"

const beforeAndAfter = (height, color) => {
    return {
        content:"",
        position: "absolute",
        display: "block",
        width: "0",
        height: height,
        backgroundColor: color,
        
        // transform: "translateX(-50%)",
        transition: "width 0.1s ease-in-out",
        
    }
}

const pseudoBeforeAfterEffect = (top,bottom,height, event) => {
    let returnObj = {}
    switch (event) {
        case "hover":
            returnObj = {
                selectors: {
                    "&::before": {
                        ...beforeAndAfter(height,colors.primary),
                        left:"0%",
                        top:top,
                        bottom:bottom
                       },
                       "&:hover::before": {
                        width:"50%"
                       },
                    "&::after": {
                        ...beforeAndAfter(height,colors.primary),
                        right:"0%",
                        top:top,
                        bottom:bottom
                       },
                       "&:hover::after": {
                        width:"50%"
                       }
                },
            }
            break;
        case "focus":
            returnObj = {
                selectors: {
                    "&::before": {
                        ...beforeAndAfter(height, colors.primary),
                        left:"0%",
                        top:top,
                        bottom:bottom
                       },
                       "&:focus-within::before": {
                        width:"50%"
                       },
                    "&::after": {
                        ...beforeAndAfter(height, colors.primary),
                        right:"0%",
                        top:top,
                        bottom:bottom
                       },
                       "&:focus-within::after": {
                        width:"50%"
                       }
                },
            }
        default:
            break;
    }
    return returnObj
}

const submit = () => {
    return {
        fontSize: theme.fontSizes[2],
        padding: `${theme.space[3]} ${theme.space[4]}`,
        maxWidth: "200px",
        width:"100%",
        zIndex: "1",
        // position: "relative",
        backgroundColor: "transparent",
        cursor:"pointer",
    }
}

export const form = style({
  maxWidth:"600px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"

})

export const inputGroup = style({
  position:"relative",
  width:"100%",
  display:"flex",
  ...pseudoBeforeAfterEffect("initial",0,"3px","focus")
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

// export const span = style({
//     width: "0",
//     height: "3Px",
//     position: "absolute",
//     background: colors.primary,
//     left: "50%",
//     bottom: "0",
//     transform: "translateX(-50%)",
//     transition: "width 0.2s ease-in-out"
// })

export const spanHighlight = style({
    width: "100%",
})



export const submitWhite = style({
    ...submit(),
    position: "relative",
    color:"#fff",
    border:"2px solid #fff",
    
    // selectors:{
    //     '&:hover':{
    //         color:"#000"
    //     }
    // }
})

export const submitBlack = style({
    ...submit(),
    position: "relative",
    color:"#000",
    border:"2px solid #000",
    
    selectors:{
        '&:hover':{
            color:"#fff"
        }
    }
})

export const feedbackWrapShow = style({
    visibility:"visible",
    opacity:1
}) 

export const submitWrapper = style({
    ...pseudoBeforeAfterEffect(0,0,"100%", "hover"),
    position: "relative", maxWidth: "200px", width: "100%" 
})
