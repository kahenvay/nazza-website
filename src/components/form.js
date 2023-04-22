import React from "react"
import axios from "axios"
import * as qs from "./qs"
import { feedbackWrapShow, form, submit, submitWrapper } from "./form.css"
import { Space } from "./ui"
import InputGroup from "./InputGroup"
// const stringify = require("./stringify")

class Form extends React.Component {
  constructor(props) {
    super(props)
    // this.domRef = React.createRef()
    this.state = {
      feedbackMsg: null,
      submitHovered: false,
      formData: {
        "form-name": "contact-form",
        email: "",
        FLname: "",
        message: "",
      },
    }
  }

  handleSubmit(event) {
    // console.log("formData", this.state.formData)
    // console.log("formData", this.state.formData["FLname"])
    // console.log("formData", this.state.formData["email"])
    // console.log("formData", this.state.formData["message"])

    // Do not submit form via HTTP, since we're doing that via XHR request.
    event.preventDefault()
    // Loop through this component's refs (the fields) and add them to the
    // formData object. What we're left with is an object of key-value pairs
    // that represent the form data we want to send to Netlify.
    // const formData = {}
    // Object.keys(this.refs).map((key) => (formData[key] = this.refs[key].value))
    // Set options for axios. The URL we're submitting to
    // (this.props.location.pathname) is the current page.
    const axiosOptions = {
      // url: this.props.location.pathname,
      url: "/",
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
        // this.domRef.current.reset()
        this.setState({
          formData: {
            "form-name": "contact-form",
            email: "",
            FLname: "",
            message: "",
          },
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          feedbackMsg: "Form could not be submitted.",
        })
      })
  }

  handleInputChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    })
  }

  render() {
    return (
      <>
        <div className={` ${this.state.feedbackMsg ? feedbackWrapShow : ""}`}>
          <p>{this.state.feedbackMsg}</p>
        </div>

        <form
          // ref={this.domRef}
          name="contact-form"
          method="POST"
          data-netlify="true"
          onSubmit={(event) => this.handleSubmit(event)}
          className={form}
          data-netlify-honeypot="bot-field"
        >
          <input
            ref="contact-form"
            type="hidden"
            name="contact-form"
            value="contact-form"
          />

          <InputGroup
            handleInputChange={this.handleInputChange}
            inputType="input"
            labelTitle="Name"
            name="FLname"
            type="text"
          />
          <Space size={1} />
          <InputGroup
            handleInputChange={this.handleInputChange}
            inputType="input"
            labelTitle="Email"
            name="email"
            type="email"
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
            className={submitWrapper}
          >
            <input
              className={`${submit}`}
              ref="submit"
              type="submit"
              value="Send"
            />
          </div>
        </form>
      </>
    )
  }
}

export default Form
