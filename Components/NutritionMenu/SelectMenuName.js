import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { createMenuContext } from "./Context/createMenuContext";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-styled-toast";

export default function SelectMenuName() {
  const [nameofMenu, setNameOfMenu] = useState("");
  const { menuState, menuDispatch } = useContext(createMenuContext);
  const navigation = useNavigation();
  const { toast } = useToast();

  return (
    <View>
      <Input
        placeholder="Comment"
        onChangeText={(value) => {
          setNameOfMenu(value);
        }}
        value={nameofMenu}
      />
      <Button
        title="Save"
        onPress={() => {
          if (nameofMenu.length >= 3) {
            menuDispatch({ execute: "SAVE_NAME_MENU", param: nameofMenu });
            setNameOfMenu("");
            navigation.navigate("NutritionTable", {
              isNowCreated: true,
              nameOfMenu: nameofMenu,
            });
          } else {
            toast({
              message: "Minimum lenght is 3 characters",
              iconFamily: "FontAwesome",
              iconName: "exclamation-circle",
              accentColor: "red",
              iconColor: "red",
            });
          }
        }}
      />
    </View>
  );
}
