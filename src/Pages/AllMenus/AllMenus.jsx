import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { localStorageKeys } from "../../Constants/Definitions";
import { calculatMenuMacros } from "../../Utils/NutritionTableUtils";
export default function AllMenus() {
  const [isLoading, setIsLoading] = useState(true);
  const [userMenus, setUserMenus] = useState({ userMenus: [] });
  const navigation = useNavigation();
  useEffect(() => {
    AsyncStorage.getItem(localStorageKeys.USER_MENUS).then(
      (userMenusFromStorage) => {
        if (userMenusFromStorage != null) {
          setUserMenus(JSON.parse(userMenusFromStorage));
          setIsLoading(false);
        }
      }
    );
  }, []);
  // make this show name of menus from localstorage!!!!!!!!!!!!!!!
  return (
    <ScrollView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : userMenus.userMenus.length !== 0 ? (
        userMenus.userMenus.map((eachMenu, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => {
              navigation.navigate("NutritionTable", {
                menu: userMenus.userMenus[index],
                indexOfMenu: index,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{eachMenu.nameOfMenu}</ListItem.Title>
              <ListItem.Subtitle>
                Calories : {calculatMenuMacros(eachMenu).CALORIES}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      ) : (
        <Text style={styles.textStyle}>You're don't have menu yet</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
