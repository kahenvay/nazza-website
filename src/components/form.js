import React from "react"
import axios from "axios"
import * as qs from "./qs"
import { fillSpan, form, hoverSubmit, hoverText, submit } from "./form.css"
import { Space } from "./ui"
import InputGroup from "./InputGroup"
// const stringify = require("./stringify")

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.domRef = React.createRef()
    this.state = {
      feedbackMsg: null,
      submitHovered: false,
      formData: {
        email: "",
        name: "",
        message: "",
      },
    }
  }

  handleSubmit(event) {
    // Do not submit form via HTTP, since we're doing that via XHR request.
    event.preventDefault()
    // Loop through this component's refs (the fields) and add them to the
    // formData object. What we're left with is an object of key-value pairs
    // that represent the form data we want to send to Netlify.
    // const formData = {}
    // Object.keys(this.refs).map((key) => (formData[key] = this.refs[key].value))

    // console.log("formData", this.state.formData)
    // Set options for axios. The URL we're submitting to
    // (this.props.location.pathname) is the current page.
    const axiosOptions = {
      url: this.props.location.pathname,
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(this.state.formData),
    }

    // Submit to Netlify. Upon success, set the feedback message and clear all
    // the fields within the form. Upon failure, keep the fields as they are,
    // but set the feedback message to show the error state.
    axios(axiosOptions)
      .then((response) => {
        this.setState({
          feedbackMsg: "Form submitted successfully!",
        })
        this.domRef.current.reset()
      })
      .catch((err) =>
        this.setState({
          feedbackMsg: "Form could not be submitted.",
        })
      )
  }

  handleInputChange = (e) => {
    // console.log("change", e)

    // this.setState({ [e.target.name]: e.target.value })
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    })
  }

  handleMouseEnter = (e) => {
    // const parentOffset = e.currentTarget.getBoundingClientRect()
    // const relX = e.pageX - parentOffset.left
    // const relY = parentOffset.top
    // e.currentTarget.querySelector("span").style.top = `${relY}px`
    // e.currentTarget.querySelector("span").style.left = `${relX}px`
    // console.log(e.currentTarget.getBoundingClientRect())
    // console.log(parentOffset)
    this.setState({ submitHovered: true })
  }

  handleMouseOut = (e) => {
    // const parentOffset = e.currentTarget.getBoundingClientRect()
    // const relX = e.pageX - parentOffset.left
    // const relY = parentOffset.top
    // e.currentTarget.querySelector("span").style.top = `${relY}px`
    // e.currentTarget.querySelector("span").style.left = `${relX}px`
    this.setState({ submitHovered: false })
  }

  render() {
    return (
      // console.log("props", this.props) || (
        <>
          {this.state.feedbackMsg && <p>{this.state.feedbackMsg}</p>}

          <form
            ref={this.domRef}
            name="Contact Form"
            method="POST"
            data-netlify="true"
            onSubmit={(event) => this.handleSubmit(event)}
            className={form}
          >
            <input
              ref="form-name"
              type="hidden"
              name="form-name"
              value="Contact Form"
            />

            <InputGroup
              handleInputChange={this.handleInputChange}
              inputType="input"
              labelTitle="Name"
              name="name"
            />
            <Space size={1} />
            <InputGroup
              handleInputChange={this.handleInputChange}
              inputType="input"
              labelTitle="Email"
              name="email"
            />
            <Space size={1} />
            <InputGroup
              handleInputChange={this.handleInputChange}
              inputType="textArea"
              labelTitle="Message"
              name="message"
            />
            <Space size={1} />
            <div
              style={{ position: "relative", maxWidth: "200px", width: "100%" }}
              onMouseEnter={this.handleMouseEnter}
              onMouseOut={this.handleMouseOut}
            >
              <input
                className={`${submit} ${
                  this.state.submitHovered ? hoverText : ""
                }`}
                ref="submit"
                type="submit"
                value="Send"
              />
              <span
                className={`${fillSpan} ${
                  this.state.submitHovered ? hoverSubmit : ""
                }`}
              ></span>
            </div>
          </form>
        </>
      )
    )
  }
}

export default Form
