import { style, styleVariants } from "@vanilla-extract/css"
const caretBase = style({
  transitionProperty: "transform",
  transitionDuration: "0.15s",
  transitionTimingFunction: "ease-in-out",
  transform: "translate(2px,-2px)"
})

export const caret = styleVariants({
  up: [caretBase, { transform: "rotate(-180deg) translate(-2px,2px)" }],
  right: [caretBase, { transform: "rotate(90deg) translate(-2px,2px)" }],
  left: [caretBase, { transform: "rotate(-90deg) translate(-2px,2px)" }],
  down: [caretBase],
})
