import * as React from "react"
import "../styles.css"
import { Slice } from "gatsby"

const Layout = ({ children, pageContext }) => {
  return (
    <>
      <Slice pageContext={pageContext} alias="header" />
      {children}
      <Slice pageContext={pageContext} alias="footer" />
    </>
  )
}

export default Layout
