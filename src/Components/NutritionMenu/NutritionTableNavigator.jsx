import React, { useState, useReducer, useContext } from "react";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { AutoComplete } from "../SearchFood/SearchFood";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { createMenuContext } from "./Context/createMenuContext";
import { NutritionTable } from "./NutritionTable";
import AllMenus from "../../Pages/AllMenus/AllMenus";
import SelectMenuName from "../../Pages/CreateMenu/SelectMenuName";
import { INIT_STATE_OF_MENU } from "../../Constants";
import NutritionValues from "./NutritionValues";
import { translationsContext } from "../../translations/LocaleManager";
import { menuReducer } from "./NutritionTableReducer";

export default function NutritionTableNavigator({ route, navigation }) {
  const Stack = createStackNavigator();
  const [menuState, menuDispatch] = useReducer(
    menuReducer,
    //Use JSON because i want to do Deep copy
    JSON.parse(JSON.stringify(INIT_STATE_OF_MENU))
  );
  const { language } = useContext(translationsContext);
  return (
    <createMenuContext.Provider value={{ menuState, menuDispatch }}>
      <Stack.Navigator initialRouteName={route.params.navigateTo}>
        <Stack.Screen
          name="AllMenus"
          component={AllMenus}
          options={{ headerShown: false, title: language.app.all_menus }}
        />
        <Stack.Screen
          name="NutritionTable"
          options={({ route }) => ({ title: route.params.nameOfMenu })}
          component={NutritionTable}
        />
        <Stack.Screen
          name="Select name of menu"
          component={SelectMenuName}
          options={{ title: language.app.select_name_of_menu }}
        />
        <Stack.Screen
          name="Add food"
          component={AutoComplete}
          options={{ title: language.app.add_food }}
        />
        <Stack.Screen
          name="Values of food"
          component={NutritionValues}
          options={{ title: language.app.value_of_food }}
        />
      </Stack.Navigator>
    </createMenuContext.Provider>
  );
}

const styles = StyleSheet.create({
  tableView: {
    marginTop: 30,
  },
});
