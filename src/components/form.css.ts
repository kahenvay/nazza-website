import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"
// import { media, padding } from "./ui.css"
import {colors} from "../colors.css"

const beforeAndAfter = (height, color, direction) => {
    let eleWidth = "0%";
    if (direction == "inverse"){
        eleWidth ="50%";
    }
    return {
        content:"",
        position: "absolute",
        display: "block",
        width: eleWidth,
        height: height,
        backgroundColor: color,
        
        // transform: "translateX(-50%)",
        transition: "width 0.1s ease-in-out",
        
    }
}

const pseudoBeforeAfterEffect = (top,bottom,height, event, color, direction) => {
    let returnObj = {};
    let eleWidth = "50%";
    if (direction == "inverse"){
        eleWidth = "0";
    }
    switch (event) {
        case "hover":
            returnObj = {
                selectors: {
                    "&::before": {
                        ...beforeAndAfter(height,color, direction),
                        left:"0%",
                        top:top,
                        bottom:bottom
                       },
                       "&:hover::before": {
                        width:eleWidth
                       },
                    "&::after": {
                        ...beforeAndAfter(height,color, direction),
                        right:"0%",
                        top:top,
                        bottom:bottom
                       },
                       "&:hover::after": {
                        width:eleWidth
                       }
                },
            }
            break;
        case "focus":
            returnObj = {
                selectors: {
                    "&::before": {
                        ...beforeAndAfter(height, color, direction),
                        left:"0%",
                        top:top,
                        bottom:bottom
                       },
                       "&:focus-within::before": {
                        width:eleWidth
                       },
                    "&::after": {
                        ...beforeAndAfter(height, color, direction),
                        right:"0%",
                        top:top,
                        bottom:bottom
                       },
                       "&:focus-within::after": {
                        width:eleWidth
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
        padding: `${theme.space[2]} ${theme.space[3]}`,
        maxWidth: "180px",
        width:"100%",
        zIndex: "1",
        // position: "relative",
        backgroundColor: "transparent",
        cursor:"pointer",
    }
}

const submitBlackBase = () => {
    return {
        fontSize: theme.fontSizes[2],
        padding: `${theme.space[2]} ${theme.space[3]}`,
        maxWidth: "180px",
        width:"100%",
        zIndex: "1",
        // position: "relative",
        backgroundColor: "#000",
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
  ...pseudoBeforeAfterEffect("initial",0,"3px","focus", colors.primary, "")
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
    
    selectors:{
        '&:hover':{
            color:"#fff"
        }
    }
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

export const submitBlackFull = style({
    ...submit(),
    position: "relative",
    color:"#fff",
    border:"2px solid #000",
    
    selectors:{
        '&:hover':{
            color:"#000"
        }
    }
})

export const submitBlackAlt = style({
    ...submit(),
    position: "relative",
    color:"#000",
    border:"2px solid #fff",
    // background:'#fff',
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
    ...pseudoBeforeAfterEffect(0,0,"100%", "hover", colors.primary, ""),
    position: "relative", maxWidth: "180px", width: "100%" 
})

export const submitWrapperInverse = style({
    ...pseudoBeforeAfterEffect(0,0,"100%", "hover", colors.primary, "inverse"),
    position: "relative", maxWidth: "180px", width: "100%" 
})