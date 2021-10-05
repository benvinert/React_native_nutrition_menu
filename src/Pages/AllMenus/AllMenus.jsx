import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { localStorageKeys } from "../../Constants";
import { calculatMenuMacros } from "../../Components/NutritionMenu/NutritionTableUtils";
import { themeContext } from "../../ThemeProvider/ThemeManager";

export default function AllMenus() {
  const [isLoading, setIsLoading] = useState(true);
  const [userMenus, setUserMenus] = useState({ userMenus: [] });
  const { applicationTheme } = useContext(themeContext);
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
  }, [setIsLoading]); //Was also userMenus for some reason

  console.log("From Menu L ", applicationTheme);
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
            containerStyle={{
              backgroundColor: applicationTheme.styles.background,
            }}
          >
            <ListItem.Content>
              <ListItem.Title
                style={{
                  color: applicationTheme.styles.textColor,
                  fontWeight: "bold",
                }}
              >
                {eachMenu.nameOfMenu}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{
                  color: applicationTheme.styles.textColor,
                  fontWeight: "bold",
                }}
              >
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
