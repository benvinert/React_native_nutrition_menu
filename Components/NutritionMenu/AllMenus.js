import React, { useState, useEffect } from "react";
import { menusObject } from "../../Utils/menusJson";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function AllMenus() {
  const [isLoading, setIsLoading] = useState(true);
  const [userMenus, setUserMenus] = useState({ userMenus: [] });

  useEffect(() => {
    AsyncStorage.getItem("userMenus").then((userMenusFromStorage) => {
      if (userMenusFromStorage != null) {
        setUserMenus(JSON.parse(userMenusFromStorage));
        setIsLoading(false);
      }
    });
  }, []);

  const navigation = useNavigation();
  // make this show name of menus from localstorage!!!!!!!!!!!!!!!
  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : userMenus.userMenus.length !== 0 ? (
        userMenus.userMenus.map((eachMenu, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => {
              navigation.navigate("NutritionTable", userMenus.userMenus[index]);
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{eachMenu.nameOfMenu}</ListItem.Title>
              <ListItem.Subtitle>Subtitle</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      ) : (
        <Text style={styles.textStyle}>You're don't have menu yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
