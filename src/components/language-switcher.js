import React from "react"
import { navigate } from "gatsby"

const languages = {
  en: {
    flag: "🇬🇧",
    prefix: "",
  },
  fr: {
    flag: "🇫🇷",
    prefix: "/fr",
  },
  nl: {
    flag: "🇳🇱",
    prefix: "/nl",
  },
}

const LanguageSwitcher = ({ currentLang }) => {
  const handleClick = (lang) => {
    const { pathname } = window.location

    // Construct the new path
    let newPath = pathname

    // If we're currently on a non-English page, remove the current language prefix
    if (currentLang !== "en") {
      newPath = newPath.replace(
        new RegExp(`^${languages[currentLang].prefix}`),
        ""
      )
    }

    // Add the new language prefix (if not English)
    const newUrl = languages[lang].prefix + newPath
    navigate(newUrl)
  }

  return (
    <div>
      {Object.keys(languages).map((lang) => {
        if (lang !== currentLang) {
          return (
            <span
              key={lang}
              style={{ cursor: "pointer", margin: "0 5px" }}
              onClick={() => handleClick(lang)}
            >
              {languages[lang].flag}
            </span>
          )
        }
        return null
      })}
    </div>
  )
}

export default LanguageSwitcher
