import React from "react";
import { useNavigation } from "@react-navigation/native";
import { localStorageKeys } from "../../Constants/Definitions";

export const clickSaveMenu = ({ userMenus, menuObject, menuDispatch }) => {
  {
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
  }
};

export const addMenuToLocalStorage = (userMenus, menuObject) => {
  console.log(userMenus);
  userMenus.userMenus.push(menuObject);
  AsyncStorage.setItem(localStorageKeys.USER_MENUS, JSON.stringify(userMenus));
};
