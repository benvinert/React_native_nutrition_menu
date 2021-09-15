import React, { useContext, useEffect, useState } from "react";
import { CellVariant, HeaderSection } from "./NutritionTableStyleSheet";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  StyleSheet,
  View,
  Button,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { createMenuContext } from "./Context/createMenuContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStorageKeys } from "../Utils/Definitions";
import { useToast } from "react-native-styled-toast";
import NutritionValues from "./NutritionValues";
import { calculateMealMacros } from "../Utils/NutritionTableUtils";
import { INIT_STATE_OF_MACROS } from "../Utils/InitStates";
import MacrosPieChart from "./MacrosPieChart";

const addMenuToLocalStorage = (userMenus, menuObject) => {
  console.log(userMenus);
  userMenus.userMenus.push(menuObject);
  AsyncStorage.setItem(localStorageKeys.USER_MENUS, JSON.stringify(userMenus));
};

export const NutritionTable = ({ route, navigation }) => {
  const { menuState, menuDispatch } = useContext(createMenuContext);
  const { toast } = useToast();
  let sumOfMenuMacros = { ...INIT_STATE_OF_MACROS };
  var menuObject;
  var userMenus = { userMenus: [] };
  // need to move it to another function -V-V-V
  //we get localStorage Because on "NutritionTable" component we Edit/Add menus so we need to get the current state of local storage.
  AsyncStorage.getItem(localStorageKeys.USER_MENUS).then((userMenusStorage) => {
    if (userMenusStorage !== null) {
      userMenus = JSON.parse(userMenusStorage);
    }
  });
  const [isEditable, setIsEditable] = useState(route.params.isEditable);
  //Get it from Menus Component
  if (!isEditable) {
    menuObject = route.params;
  } else {
    //If is NOW creating menu
    menuObject = menuState;
  }

  console.log("menu object", menuObject);
  menuObject.menu.map((eachMeal) => {
    if (eachMeal.foods.length > 0) {
      let macrosMeal = calculateMealMacros(eachMeal);
      Object.keys(macrosMeal).forEach((eachMacroProperty) => {
        sumOfMenuMacros[eachMacroProperty] =
          macrosMeal[eachMacroProperty] + sumOfMenuMacros[eachMacroProperty];
      });
    }
  });
  console.log("SUMOFMACROSSS:::", sumOfMenuMacros);
  const SaveButton = () => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        addMenuToLocalStorage(userMenus, menuObject);
        toast({
          message: "Menu save successfully",
          iconFamily: "FontAwesome",
          iconName: "check-circle",
        });
        menuDispatch({ execute: "CLEAR_AFTER_SAVE_MENU" });
        setTimeout(() => {
          navigation.navigate("AllMenus");
        }, 2000);
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}> Save </Text>
    </TouchableOpacity>
  );

  const EditButton = () => {
    return (
      <View>
        <Button
          title="Edit menu"
          onPress={() => {
            menuDispatch({
              execute: "PUT_MENU_TO_EDIT",
              param: { menuToEdit: menuObject },
            });
            setIsEditable(true);
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView>
      {!isEditable ? <EditButton /> : null}
      <TableView style={styles.tableView}>
        <View>
          <FlatList
            data={menuObject.menu}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Section
                headerComponent={
                  <HeaderSection
                    mealTime={item.mealTime}
                    indexOfMeal={index}
                    isEditable={isEditable}
                  />
                }
              >
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={item.foods}
                    keyExtractor={(food, index) => index.toString()}
                    renderItem={(food) => (
                      <CellVariant title={food.item.name} foodDetails={food} />
                    )}
                  />
                </View>
              </Section>
            )}
          />
        </View>
      </TableView>
      {isEditable ? <SaveButton /> : null}
      <View>
        <Text>Sum of Macros menu</Text>
        <MacrosPieChart nutritionValues={sumOfMenuMacros} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableView: {
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    padding: 10,
    color: "white",
    backgroundColor: "#86C232",
  },
});
