import React from "react"
import {
  inputGroup,
  label,
  labelAndInput,
  span,
  spanHighlight,
  textInput,
} from "./form.css"

class InputGroup extends React.Component {
  // export default function InputGroup({ inputType, labelTitle, name }) {

  constructor(props) {
    super(props)
    this.name = props.name
    this.labelTitle = props.labelTitle
    this.inputType = props.inputType
    this.state = {
      isFocused: false,
    }
  }
  inputGroupActive = () => {}

  handleFocus = (event) => {
    this.setState({ isFocused: true })
    console.log(event)
  }

  handleBlur = (event) => {
    this.setState({ isFocused: false })
  }

  render() {
    return this.inputType == "input" ? (
      <div className={inputGroup}>
        <label className={`${labelAndInput} ${label} `} htmlFor={this.name}>
          {this.labelTitle}:
        </label>
        <input
          className={`${textInput} ${labelAndInput}`}
          ref={this.name}
          type={this.name}
          name={this.name}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <span
          className={`${span} ${this.state.isFocused ? spanHighlight : ""}`}
        ></span>
      </div>
    ) : (
      <div className={inputGroup}>
        <label className={`${labelAndInput} ${label} `} htmlFor={this.name}>
          {this.labelTitle}:
        </label>
        <textarea
          className={`${textInput} ${labelAndInput}`}
          ref={this.name}
          type={this.name}
          name={this.name}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={{ height: "100px" }}
        />
        <span
          className={`${span} ${this.state.isFocused ? spanHighlight : ""}`}
        ></span>
      </div>
    )
  }
}

export default InputGroup
