import * as React from "react"
import backVid from "../videos/nazza-background-video.mp4"
import { submitWhite, submitWrapper } from "../components/form.css"
import { button, pageWrap, video } from "../components/landingPage.css"
import { NavLink } from "../components/ui"

export default function LandingPage(props) {
  return (
    <div className={pageWrap}>
      <video
        className={video}
        src={backVid}
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className={`${submitWrapper} ${button}`}>
        <NavLink
          style={{ display: "block", textAlign: "center", zIndex: 100 }}
          to="/home"
          className={`${submitWhite}`}
        >
          Enter
        </NavLink>
      </div>
    </div>
  )
}
