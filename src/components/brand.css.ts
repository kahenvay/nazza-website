import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"
import { maxMedia, media } from "./ui.css"

export const brandImages = style({
    
    "@media": {
        [media.small]: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px"
        },
    },
})

export const gridImage = style({
    
    "@media": {
        [maxMedia.small]: {
            marginBottom:"32px"
        },
    },
})

export const brandBack = style({
    opacity:0,
    transition:"opacity 1s ease-in-out"
})

export const showBack = style({
    opacity:1
})

export const brandExtrasUl = style({
    paddingLeft:0
})

export const brandExtrasLi = style({
    listStyle:"none"
})

export const brandExtrasAnchor = style({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    transition:"color 0.2s ease-in-out",
    ':hover':{
        // color:theme.colors.active,
        // opacity: 0.6
        color:"#000"
    }
})

export const brandExtrasSVG = style({
    width:"14px",
    marginRight:"10px"
})