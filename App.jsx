import React, { useState, useEffect, useRef } from "react";
import "react-native-gesture-handler";
import Home from "./src/Pages/Home/Home";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BmrCalculator } from "./src/Pages/BMRCalculator/BmrCalculator";
import NutritionTableNavigator from "./src/Components/NutritionMenu/NutritionTableNavigator";
import { ThemeProvider } from "styled-components/native";
import { ToastProvider } from "react-native-styled-toast";
import OnBoarding from "./src/Components/OnBoarding/OnBoarding";
import { SafeAreaView } from "react-native";
import { darkMode, themeContext } from "./src/ThemeProvider/ThemeManager";
import Settings from "./src/Pages/Settings/Settings";
import en from "./src/translations/en";
import he from "./src/translations/he";
import { translationsContext } from "./src/translations/LocaleManager";

const Drawer = createDrawerNavigator();
const theme = {
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  colors: {
    text: "#0A0A0A",
    background: "#FFF",
    border: "#E2E8F0",
    muted: "#F0F1F3",
    success: "#7DBE31",
    error: "#FC0021",
    info: "#00FFFF",
  },
};

export default function App() {
  const [applicationTheme, setApplicationTheme] = useState(darkMode);
  const [language, setLanguage] = useState(he);
  console.log(language);
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider maxToasts={2}>
        <themeContext.Provider value={{ applicationTheme }}>
          <translationsContext.Provider value={{ language }}>
            <NavigationContainer theme={applicationTheme}>
              <Drawer.Navigator initialRouteName={Home}>
                <Drawer.Screen
                  name="Tips"
                  component={OnBoarding}
                  initialParams={{ navigateTo: "Tips" }}
                />
                <Drawer.Screen
                  name="Home"
                  component={Home}
                  options={{ title: "Welcome" }}
                />
                <Drawer.Screen
                  name="My menus"
                  component={NutritionTableNavigator}
                  initialParams={{ navigateTo: "AllMenus" }}
                />
                <Drawer.Screen
                  name="BMR Calculator"
                  initialParams={{ myname: "ben" }}
                  component={BmrCalculator}
                />
                <Drawer.Screen
                  name="Create Menu"
                  component={NutritionTableNavigator}
                  initialParams={{ navigateTo: "Select name of menu" }}
                />
                <Drawer.Screen
                  name={language.app.Settings}
                  component={Settings}
                  initialParams={{
                    navigateTo: "Settings",
                    setTheme: setApplicationTheme,
                  }}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </translationsContext.Provider>
        </themeContext.Provider>
      </ToastProvider>
    </ThemeProvider>
  );
}
