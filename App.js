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

const Drawer = createDrawerNavigator();

export default function App() {
  return (
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
  );
}
