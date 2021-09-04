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

export const NutritionTable = ({ route, navigation }) => {
  const { menuState, menuDispatch } = useContext(createMenuContext);
  var userMenus;
  AsyncStorage.getItem("userMenus").then((userMenusStorage) => {
    if (userMenusStorage !== null) {
      userMenus = JSON.parse(userMenusStorage);
    }
  });

  var menuObject;
  const isNowCreated = route.params.isNowCreated;
  //get it from Menus Component
  if (!isNowCreated) {
    menuObject = route.params;
  } else {
    //if is from process of creating menu
    menuObject = menuState;
  }

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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          userMenus.userMenus.push(menuObject);
          AsyncStorage.setItem("userMenus", JSON.stringify(userMenus));
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}> Save </Text>
      </TouchableOpacity>
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
