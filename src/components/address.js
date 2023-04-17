import * as React from "react"
import { Link, Text } from "./ui"
import { noMarginTopBottom } from "./ui.css"

export default function Address() {
  return (
    <Text>
      <Link
        target="_blank"
        href="https://www.google.com/maps/place/Chau.+de+Waterloo+1006,+1180+Uccle,+Belgium/@50.8009555,4.3717523,17z/data=!3m1!4b1!4m6!3m5!1s0x47c3c51f3a2012db:0x9899e34bac24c1a4!8m2!3d50.8009555!4d4.3743272!16s%2Fg%2F11csmv3lvv"
      >
        <p className={noMarginTopBottom}>Chaussée de Waterloo 1006,</p>
        <p className={noMarginTopBottom}> 1180 Bruxelles</p>
      </Link>
      <Link target="_blank" href="mailto:info@nazza.be">
        info@nazza.be
      </Link>
    </Text>
  )
}
