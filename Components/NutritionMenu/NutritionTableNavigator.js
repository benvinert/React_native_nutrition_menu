import React, { useState, useReducer } from "react";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { StyleSheet } from "react-native";
import { AutoComplete } from "./SearchFood";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { createMenuContext } from "./Context/createMenuContext";
import { NutritionTable } from "./NutritionTable";
import AllMenus from "./AllMenus";
import SelectMenuName from "./SelectMenuName";
import ValuesOfFood from "./ValuesOfFood";
import { INIT_STATE_OF_MENU } from "./initStateOfMenu";

const menuReducer = (state, action) => {
  switch (action.execute) {
    case "ADD_FOOD":
      var prevMenu = state.menu;
      prevMenu[action.param.indexOfMeal].foods.push(action.param.valuesOfFood);
      return { ...state, menu: prevMenu };
    case "REMOVE_FOOD":
      return;
    case "SAVE_NAME_MENU":
      return { ...state, nameOfMenu: action.param };
    default:
      return state;
  }
};

export default function NutritionTableNavigator({ route, navigation }) {
  const Stack = createStackNavigator();
  const [menuState, menuDispatch] = useReducer(menuReducer, INIT_STATE_OF_MENU);

  return (
    <createMenuContext.Provider value={{ menuState, menuDispatch }}>
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
