import React, { useState } from "react"
import axios from "axios"
import * as qs from "./qs"
import { feedbackWrapShow, form, submit, submitWrapper } from "./form.css"
import { Space } from "./ui"
import InputGroup from "./InputGroup"
import useIsClient from "./useIsClient"

const Form = () => {
  const [feedbackMsg, setFeedbackMsg] = useState(null)
  const [formData, setFormData] = useState({
    "form-name": "contact-form",
    email: "",
    FLname: "",
    message: "",
  })
  const { isClient, key } = useIsClient()

  const handleSubmit = (event) => {
    event.preventDefault()

    const axiosOptions = {
      url: "/",
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(formData),
    }

    axios(axiosOptions)
      .then((response) => {
        setFeedbackMsg("Form submitted successfully!")
        setFormData({
          "form-name": "contact-form",
          email: "",
          FLname: "",
          message: "",
        })
      })
      .catch((err) => {
        console.log(err)
        setFeedbackMsg("Form could not be submitted.")
      })
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!isClient) return null
  return (
    <div key={key}>
      <div className={` ${feedbackMsg ? feedbackWrapShow : ""}`}>
        <p>{feedbackMsg}</p>
      </div>

      <form
        name="contact-form"
        method="POST"
        data-netlify="true"
        onSubmit={(event) => handleSubmit(event)}
        className={form}
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="contact-form" value="contact-form" />

        <InputGroup
          handleInputChange={handleInputChange}
          inputType="input"
          labelTitle="Name"
          name="FLname"
          type="text"
        />
        <Space size={2} />
        <InputGroup
          handleInputChange={handleInputChange}
          inputType="input"
          labelTitle="Email"
          name="email"
          type="email"
        />
        <Space size={2} />
        <InputGroup
          handleInputChange={handleInputChange}
          inputType="textArea"
          labelTitle="Message"
          name="message"
        />
        <Space size={2} />
        <div
          style={{ position: "relative", maxWidth: "200px", width: "100%" }}
          className={submitWrapper}
        >
          <input className={`${submit}`} type="submit" value="Send" />
        </div>
      </form>
    </div>
  )
}

export default Form
