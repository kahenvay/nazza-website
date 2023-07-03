import { style } from "@vanilla-extract/css"

export const video = style({
  objectFit: "cover",
  width: "100vw",
  height: "100vh",
  })

export const button = style({
    position:"absolute"
  })

  export const pageWrap = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  })