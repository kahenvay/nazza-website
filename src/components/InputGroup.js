import React from "react"
import { inputGroup, label, labelAndInput, textInput } from "./form.css"

class InputGroup extends React.Component {
  // export default function InputGroup({ inputType, labelTitle, name }) {

  constructor(props) {
    super(props)
    this.name = props.name
    this.type = props.type
    this.labelTitle = props.labelTitle
    this.inputType = props.inputType
  }

  inputGroupActive = () => {}

  render() {
    return this.inputType === "input" ? (
      <div className={inputGroup}>
        <label className={`${labelAndInput} ${label} `} htmlFor={this.name}>
          {this.labelTitle}:
        </label>
        <input
          onChange={this.props.handleInputChange}
          className={`${textInput} ${labelAndInput}`}
          ref={this.name}
          type={this.type}
          name={this.name}
          id={this.name}
        />
      </div>
    ) : (
      <div className={inputGroup}>
        <label className={`${labelAndInput} ${label} `} htmlFor={this.name}>
          {this.labelTitle}:
        </label>
        <textarea
          onChange={this.props.handleInputChange}
          className={`${textInput} ${labelAndInput}`}
          ref={this.name}
          name={this.name}
          style={{ height: "100px" }}
          id={this.name}
        />
      </div>
    )
  }
}

export default InputGroup
