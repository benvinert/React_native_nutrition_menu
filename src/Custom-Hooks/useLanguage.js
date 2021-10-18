import React, { useCallback, useEffect, useState } from "react";
import en from "../translations/en";
import he from "../translations/he";

export const useLanguage = (initLanguage = en) => {
  const [language, setLanguage] = useState(initLanguage);

  const switchLanguage = () => {
    setLanguage((prev) => {
      console.log(prev.language);
      if (prev.language == "English") {
        return he;
      } else {
        return en;
      }
    });
  };

  return [language, switchLanguage];
};
