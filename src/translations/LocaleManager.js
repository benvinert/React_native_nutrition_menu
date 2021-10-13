import en from "./en";
import he from "./he";
import react, { createContext } from "react";

export const translationsContext = createContext();

const LANGUAGES = {
  he,
  en,
};

const LocaleManager = (langKey) => {
  const LANG_CODES = Object.keys(LANGUAGES);
  LANG_CODES.forEach((eachLangCode) => {
    if (eachLangCode == langKey) {
      setState = LANGUAGES[langKey];
      return;
    }
  });
};
