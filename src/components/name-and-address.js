import * as React from "react"
import { Text, Link } from "./ui"
import { noMarginTopBottom } from "./ui.css"

export default function NameAndAddress(props) {
  return (
    <div>
      <Text>
        <p className={noMarginTopBottom}>{props.name}</p>
        <Link href={`tel:${props.number?.replaceAll(" ", "")}`} target="_blank">
          {props.number}
        </Link>
      </Text>
    </div>
  )
}
