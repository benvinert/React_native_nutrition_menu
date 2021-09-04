import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image,
  Alert,
  Button,
  SafeAreaView,
  Platform,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";

import { MaterialIcons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import HelloScreen from "./Components/HelloScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BmrCalculator } from "./Components/BmrCalculator";
import NutritionTableNavigator from "./Components/NutritionMenu/NutritionTableNavigator";
import AllMenus from "./Components/NutritionMenu/AllMenus";
import { ThemeProvider } from "styled-components/native";
import { ToastProvider } from "react-native-styled-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  AsyncStorage.getItem("userMenus").then((resp) =>
    console.log("APP.js FROM storage : ", resp)
  );
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider maxToasts={2}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen
              name="Home"
              component={HelloScreen}
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
