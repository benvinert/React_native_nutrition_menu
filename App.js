import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import Home from "./src/Pages/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BmrCalculator } from "./src/Pages/BMRCalculator/BmrCalculator";
import NutritionTableNavigator from "./src/Components/NutritionMenu/NutritionTableNavigator";
import { ThemeProvider } from "styled-components/native";
import { ToastProvider } from "react-native-styled-toast";

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
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider maxToasts={2}>
        <NavigationContainer>
          <Drawer.Navigator>
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
          </Drawer.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </ThemeProvider>
  );
}
