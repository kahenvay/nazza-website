import * as React from "react"

const handleSubmit = (event) => {
  event.preventDefault()

  const myForm = event.target
  const formData = new FormData(myForm)

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => alert("Submision received, thank you!"))
    .catch((error) => alert(error))
}

export default function Form(props) {
  return (
    <form
      data-netlify="true"
      name="pizzaOrder"
      method="post"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="pizzaOrder" />
      <label>
        What order did the pizza give to the pineapple?
        <input name="order" type="text" />
      </label>
      <input type="submit" />
    </form>
  )
}
