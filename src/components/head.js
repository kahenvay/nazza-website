import * as React from "react"

export default function Head({ title, description, image }) {
  if (title == "") title = "Nazza Agency"
  return (
    console.log(
      "seeoooooooooo title, description, image",
      title,
      description,
      image
    ) || (
      <>
        <meta charSet="utf-8" />
        <title>{title}</title>
        {description && (
          <meta
            name="description"
            property="og:description"
            content={description}
          />
        )}
        <meta property="og:title" content={title} />
        {
          <meta
            property="og:image"
            content={
              image == "../nazza-logo-long.svg" ||
              image == "" ||
              image == undefined
                ? "../nazza-logo-long.svg"
                : image.url
            }
          />
        }
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        {
          <meta
            name="twitter:image"
            content={
              image == "../nazza-logo-long.svg" ||
              image == "" ||
              image == undefined
                ? "../nazza-logo-long.svg"
                : image.url
            }
          />
        }
      </>
    )
  )
}
