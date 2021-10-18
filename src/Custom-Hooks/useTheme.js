import React, { useState } from "react";

export const useTheme = (initTheme) => {
  const [applicationTheme, setApplicationTheme] = useState(initTheme);

  return [applicationTheme, setApplicationTheme];
};
