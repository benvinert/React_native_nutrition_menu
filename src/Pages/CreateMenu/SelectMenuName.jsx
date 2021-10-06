import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { createMenuContext } from "../../Components/NutritionMenu/Context/createMenuContext";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-styled-toast";
import { themeContext } from "../../ThemeProvider/ThemeManager";

export default function SelectMenuName() {
  const [nameOfMenu, setNameOfMenu] = useState("");
  const { menuState, menuDispatch } = useContext(createMenuContext);
  const navigation = useNavigation();
  const { toast } = useToast();
  const { applicationTheme } = useContext(themeContext);

  const saveMenuEvent = () => {
    menuDispatch({ execute: "SAVE_NAME_MENU", param: nameOfMenu });
    setNameOfMenu(""); //Clear state
    navigation.navigate("NutritionTable", {
      isEditable: true,
      nameOfMenu: nameOfMenu,
    });
  };

  return (
    <View>
      <Input
        inputStyle={{
          color: applicationTheme.styles.textColor,
          textAlign: "center",
        }}
        placeholder="Enter name of menu"
        onChangeText={(value) => {
          setNameOfMenu(value);
        }}
        value={nameOfMenu}
      />
      <Button
        title="Save"
        onPress={() => {
          if (nameOfMenu.length >= 3) {
            saveMenuEvent();
          } else {
            //Drop toast
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
