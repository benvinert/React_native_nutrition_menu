import React, { useContext, useEffect, useState, useRef } from "react";
import { CellVariant, HeaderSection } from "./NutritionTableStyleSheet";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  StyleSheet,
  View,
  Button,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { createMenuContext } from "./Context/createMenuContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStorageKeys } from "../../Constants";
import { useToast } from "react-native-styled-toast";
import NutritionValues from "./NutritionValues";
import { calculatMenuMacros } from "../NutritionMenu/NutritionTableUtils";
import TouchableOpacityButton from "../Buttons/TouchableOpacityButton";
import {
  clickSaveMenu,
  uploadMenuToContextState,
} from "./NutritionTableService";
import Icon from "react-native-vector-icons/FontAwesome";
import { themeContext } from "../../ThemeProvider/ThemeManager";
import { translationsContext } from "../../translations/LocaleManager";

//That Component uses on 2 pages 1-> AllMenus 2-> Create new menu
export const NutritionTable = ({ route, navigation }) => {
  const { toast } = useToast();
  const { menuState, menuDispatch } = useContext(createMenuContext);
  const { language } = useContext(translationsContext);
  var menuObject;
  var userMenus = { userMenus: [] };
  let indexOfMenu = useRef(null);
  //we get localStorage Because on "NutritionTable" component we Edit/Add menus so we need to get the current state of local storage.
  AsyncStorage.getItem(localStorageKeys.USER_MENUS).then((userMenusStorage) => {
    if (userMenusStorage !== null) {
      userMenus = JSON.parse(userMenusStorage);
    }
  });

  const [isEditable, setIsEditable] = useState(route.params.isEditable); // if isEditable undefined so we came from Menus page
  //Get it from Menus Component
  if (!isEditable) {
    menuObject = route.params.menu;
    indexOfMenu.current = route.params.indexOfMenu;
  } else {
    //If is NOW creating/Edit menu
    menuObject = menuState;
  }
  //TODO When save menu save NOT DUPLICATE!!!
  const sumOfMenuMacros = calculatMenuMacros(menuObject);
  const { applicationTheme } = useContext(themeContext);
  return (
    <ScrollView
      style={{
        backgroundColor: applicationTheme.styles.background,
      }}
    >
      {!isEditable ? (
        <TouchableOpacityButton
          buttonStyles={{
            alignItems: "center",
            padding: 10,
            color: "blue",
            backgroundColor: "#5B00BC",
          }}
          text={language.app.edit_menu}
          onPress={() => {
            uploadMenuToContextState(menuDispatch, menuObject);
            setIsEditable(true);
          }}
        />
      ) : null}
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
                      <CellVariant
                        isEditable={isEditable}
                        title={food.item.name}
                        foodDetails={food}
                        indexOfMeal={index}
                      />
                    )}
                  />
                </View>
              </Section>
            )}
          />
        </View>
      </TableView>
      {isEditable ? (
        <TouchableOpacityButton
          onPress={() => {
            clickSaveMenu(
              userMenus,
              menuObject,
              menuDispatch,
              toast,
              indexOfMenu
            );
            setTimeout(() => {
              navigation.navigate("AllMenus");
            }, 2000);
          }}
          text={language.app.save}
        />
      ) : null}
      <View>
        {sumOfMenuMacros.CALORIES >= 0 ? (
          <NutritionValues
            nutritionValues={sumOfMenuMacros}
            title={language.app.sum_of_menu_macros}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableView: {
    marginTop: 5,
  },
});
