import * as React from "react"
import backVid from "../videos/nazza-background-video.mp4"
import { submitWhite, submitWrapper } from "../components/form.css"
import { button, pageWrap, video } from "../components/landingPage.css"
import { NavLink } from "../components/ui"
import SEOHead from "../components/head"

export default function LandingPage(props) {
  const [isVideoLoaded, setVideoLoaded] = React.useState(false)

  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }

  return (
    console.log("welcome to the nazza landing page") || (
      <div className={pageWrap}>
        <video
          className={video}
          src={backVid}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
        ></video>

        {isVideoLoaded && (
          <div className={`${submitWrapper} ${button}`}>
            <NavLink
              style={{ display: "block", textAlign: "center", zIndex: 100 }}
              to="/home"
              className={`${submitWhite}`}
            >
              Enter
            </NavLink>
          </div>
        )}
      </div>
    )
  )
}

export const Head = (props) => {
  // const { homepage } = props.data
  const lang = props.pageContext?.lang || ""
  let description =
    "An exclusive agency specialized in the distribution of high quality clothing brands and accessories for men, women & kids. Discover the new collections:"
  if (lang === "fr")
    description =
      "Une agence exclusive spécialisée dans la distribution de marques de vêtements et d'accessoires de haute qualité pour hommes, femmes & enfants. Découvrez les nouvelles collections :"
  if (lang === "nl")
    description =
      "Een exclusief agentschap gespecialiseerd in de distributie van hoogwaardige kledingmerken en accessoires voor mannen, vrouwen & kinderen. Ontdek de nieuwe collecties:"

  return <SEOHead title={"Nazza Agency"} description={description} image={""} />
}
