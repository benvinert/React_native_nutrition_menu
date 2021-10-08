import React, { useState, useReducer } from "react";
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

const menuReducer = (state, action) => {
  switch (action.execute) {
    case "ADD_FOOD":
      state.menu[action.param.indexOfMeal].foods.push(
        action.param.valuesOfFood
      );
      return { ...state, menu: state.menu };
    case "REMOVE_FOOD":
      let indexOfMeal = action.param.indexOfMeal;
      let indexOfFoodToRemove = action.param.indexOfFoodToRemove;
      console.log(state.menu);
      state.menu[indexOfMeal].foods.splice(indexOfFoodToRemove, 1);
      return { ...state };
    case "SAVE_NAME_MENU":
      return { ...state, nameOfMenu: action.param };
    case "PUT_MENU_TO_EDIT":
      return action.param.menuToEdit;
    case "CLEAR_AFTER_SAVE_MENU":
      const deepCopyMenu = [
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
      ];
      return { ...INIT_STATE_OF_MENU, menu: [...deepCopyMenu] };
    default:
      return state;
  }
};

export default function NutritionTableNavigator({ route, navigation }) {
  const Stack = createStackNavigator();
  const deepCopyMenu = [
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
  ];
  const [menuState, menuDispatch] = useReducer(menuReducer, {
    ...INIT_STATE_OF_MENU,
    menu: deepCopyMenu,
  });

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
        <Stack.Screen name="Values of food" component={NutritionValues} />
      </Stack.Navigator>
    </createMenuContext.Provider>
  );
}

const styles = StyleSheet.create({
  tableView: {
    marginTop: 30,
  },
});
