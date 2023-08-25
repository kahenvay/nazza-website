import React from "react"
import { modal } from "./modal.css"

const Modal = (props) => {
  return <div class={modal}>{props.children}</div>
}

export default Modal
