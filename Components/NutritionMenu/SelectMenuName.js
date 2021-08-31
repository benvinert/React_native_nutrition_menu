import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { createMenuContext } from "./Context/createMenuContext";
import { useNavigation } from "@react-navigation/native";

export default function SelectMenuName() {
  const [nameofMenu, setNameOfMenu] = useState("");
  const { menuState, setMenuState } = useContext(createMenuContext);
  const navigation = useNavigation();
  return (
    <View>
      <Input
        placeholder="Comment"
        onChangeText={(value) => setNameOfMenu(value)}
      />
      <Button
        title="Save"
        onPress={() => {
          setMenuState({ ...menuState, nameOfMenu: nameofMenu });
          navigation.navigate("NutritionTable", { isNowCreated: true });
        }}
      />
    </View>
  );
}
