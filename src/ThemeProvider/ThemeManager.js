import { DefaultTheme } from "@react-navigation/native";
import React, { createContext } from "react";

export const themeContext = createContext();

export const darkMode = {
  //Our component
  mode: "dark",
  styles: {
    background: "#363252",
    textColor: "#F1F3F6",
  },
  //Only for NavigationContainer Component Don't touch
  colors: {
    primary: "white",
    background: "#363252",
    card: "#334379",
    text: "white",
    border: "red",
    notification: "yellow",
  },
};

export const defaultMode = { ...DefaultTheme, mode: "default" };
