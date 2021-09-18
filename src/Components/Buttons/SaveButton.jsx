import React from "react";
import { useToast } from "react-native-styled-toast";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
export default SaveButton = ({
  addMenuToLocalStorage,
  userMenus,
  menuObject,
  menuDispatch,
}) => {
  const navigation = useNavigation();
  const { toast } = useToast();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        addMenuToLocalStorage(userMenus, menuObject);
        toast({
          message: "Menu save successfully",
          iconFamily: "FontAwesome",
          iconName: "check-circle",
        });
        menuDispatch({ execute: "CLEAR_AFTER_SAVE_MENU" });
        setTimeout(() => {
          navigation.navigate("AllMenus");
        }, 2000);
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}> Save </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    color: "white",
    backgroundColor: "#86C232",
  },
});
