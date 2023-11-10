import React from "react"
import { navigate } from "gatsby"
import { langStyle } from "./language.css"

const languages = {
  en: {
    // flag: "🇬🇧",
    flag: "EN",
    prefix: "",
  },
  fr: {
    // flag: "🇫🇷",
    flag: "FR",
    prefix: "/fr",
  },
  nl: {
    // flag: "🇳🇱",
    flag: "NL",
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
            <a
              className={langStyle}
              href="#"
              ariaLabel={`Change language to ${lang}`}
              key={lang}
              style={{ cursor: "pointer", margin: "0 5px" }}
              onClick={() => handleClick(lang)}
            >
              {languages[lang].flag}
            </a>
          )
        }
        return null
      })}
    </div>
  )
}

export default LanguageSwitcher
