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

import { Header } from "./Components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import HelloScreen from "./Components/HelloScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { BmrCalculator } from "./Components/BmrCalculator";
import CreateMenu from "./Components/CreateMenu/CreateMenu";

const Stack = createStackNavigator();
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
        <Drawer.Screen name="Create menu" component={CreateMenu} />
        <Drawer.Screen name="BMR Calculator" component={BmrCalculator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
  },
  item: {
    display: "flex",
    marginTop: 24,
    padding: 30,
    backgroundColor: "#cfd1d0",
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  delete: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
