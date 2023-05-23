import React from "react"
import { modal } from "./modal.css"

const Modal = (props) => {
  // console.log(image)
  // console.log(props)
  // console.log(props.rounded)

  //   if (!props) return null

  return <div class={modal}>{props.children}</div>
}

export default Modal
