import React from "react";
import { menusObject } from "../../Utils/menusJson";
import { View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function AllMenus() {
  const userMenus = menusObject;
  const navigation = useNavigation();
  return (
    <View>
      {userMenus.map((eachMenu, index) => (
        <ListItem
          key={index}
          bottomDivider
          onPress={() => {
            navigation.navigate("NutritionTable", userMenus[index]);
          }}
        >
          <ListItem.Content>
            <ListItem.Title>{eachMenu.nameOfMenu}</ListItem.Title>
            <ListItem.Subtitle>Subtitle</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
