import React, { useContext, useEffect } from "react";
import { CellVariant, HeaderSection } from "./NutritionTableStyleSheet";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { createMenuContext } from "./Context/createMenuContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStorageKeys } from "../../Utils/Definitions";
import { useToast } from "react-native-styled-toast";
import { useNavigation } from "@react-navigation/native";

const addMenuToLocalStorage = (userMenus, menuObject) => {
  userMenus.userMenus.push(menuObject);
  AsyncStorage.setItem(localStorageKeys.USER_MENUS, JSON.stringify(userMenus));
};

export const NutritionTable = ({ route, navigation }) => {
  const { menuState, menuDispatch } = useContext(createMenuContext);
  const { toast } = useToast();
  var userMenus = null;
  AsyncStorage.getItem(localStorageKeys.USER_MENUS).then((userMenusStorage) => {
    if (userMenusStorage !== null) {
      userMenus = JSON.parse(userMenusStorage);
    }
  });

  var menuObject;
  const isEditable = route.params.isEditable;
  //Get it from Menus Component
  if (!isEditable) {
    menuObject = route.params;
  } else {
    //If is from process of creating menu
    menuObject = menuState;
  }

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

        setTimeout(() => {
          navigation.navigate("AllMenus");
        }, 2000);
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}> Save </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TableView style={styles.tableView}>
        <View>
          <FlatList
            data={menuObject.menu}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Section
                headerComponent={
                  <HeaderSection mealTime={item.mealTime} indexOfMeal={index} />
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
    </SafeAreaView>
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
