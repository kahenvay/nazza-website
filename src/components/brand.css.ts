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