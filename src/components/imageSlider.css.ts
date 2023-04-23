import { style } from "@vanilla-extract/css"

export const slideImage = style({
    opacity:0,
    visibility:"hidden",
    transition: "opacity 0.4s ease-in-out"

  })

export const activeImage = style({
    opacity:1,
    visibility:"visible"

  })