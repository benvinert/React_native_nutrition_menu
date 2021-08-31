import React, { useState } from "react";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { AutoComplete } from "./SearchFood";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { createMenuContext } from "./Context/createMenuContext";
import { NutritionTable } from "./NutritionTable";
import AllMenus from "./AllMenus";
import SelectMenuName from "./SelectMenuName";
import ValuesOfFood from "./ValuesOfFood";

export default function NutritionTableNavigator({ route, navigation }) {
  const Stack = createStackNavigator();

  const [menuState, setMenuState] = useState({
    nameOfMenu: "default",
    menu: [
      {
        mealTime: "Breakfast",
        foods: [],
      },
      {
        mealTime: "Lunch",
        foods: [],
      },
      {
        mealTime: "Dinner",
        foods: [],
      },
    ],
  });

  return (
    <createMenuContext.Provider value={{ menuState, setMenuState }}>
      <Stack.Navigator initialRouteName={route.params.navigateTo}>
        <Stack.Screen name="AllMenus" component={AllMenus} />
        <Stack.Screen
          name="NutritionTable"
          options={({ route }) => ({ title: route.params.nameOfMenu })}
          component={NutritionTable}
        />
        <Stack.Screen name="Select name of menu" component={SelectMenuName} />
        <Stack.Screen name="Add food" component={AutoComplete} />
        <Stack.Screen name="Values of food" component={ValuesOfFood} />
      </Stack.Navigator>
    </createMenuContext.Provider>
  );
}

const styles = StyleSheet.create({
  tableView: {
    marginTop: 30,
  },
});
