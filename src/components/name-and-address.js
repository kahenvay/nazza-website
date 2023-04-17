import * as React from "react"
import { Text, Space, Link } from "./ui"
import { noMarginTopBottom } from "./ui.css"

export default function NameAndAddress(props) {
  return (
    <div>
      <Text>
        <p className={noMarginTopBottom}>{props.name}</p>
        <Link href={`tel:${props.number}`} target="_blank">
          {props.number}
        </Link>
      </Text>
    </div>
  )
}
