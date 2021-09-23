import React from "react";
import { localStorageKeys } from "../../Constants/Definitions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const clickSaveMenu = (userMenus, menuObject, menuDispatch, toast) => {
  addMenuToLocalStorage(userMenus, menuObject);
  toast({
    message: "Menu save successfully",
    iconFamily: "FontAwesome",
    iconName: "check-circle",
  });
  menuDispatch({ execute: "CLEAR_AFTER_SAVE_MENU" });
};

export const addMenuToLocalStorage = (userMenus, menuObject) => {
  userMenus.userMenus.push(menuObject);
  AsyncStorage.setItem(localStorageKeys.USER_MENUS, JSON.stringify(userMenus));
};
