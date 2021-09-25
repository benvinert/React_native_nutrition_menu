import React from "react";
import { localStorageKeys } from "../../Constants/Definitions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const clickSaveMenu = (
  userMenus,
  menuObject,
  menuDispatch,
  toast,
  indexOfMenu
) => {
  addMenuToLocalStorage(userMenus, menuObject, indexOfMenu);
  toast({
    message: "Menu saved successfully",
    iconFamily: "FontAwesome",
    iconName: "check-circle",
  });
  menuDispatch({ execute: "CLEAR_AFTER_SAVE_MENU" });
};

const addMenuToLocalStorage = (userMenus, menuObject, indexOfMenu) => {
  // If indexOfMenu not null so edit menu section
  if (indexOfMenu.current != null) {
    userMenus.userMenus[indexOfMenu.current] = menuObject;
  } else {
    userMenus.userMenus.push(menuObject);
  }
  AsyncStorage.setItem(localStorageKeys.USER_MENUS, JSON.stringify(userMenus));
};

export const uploadMenuToContextState = (menuDispatch, menuObject) => {
  menuDispatch({
    execute: "PUT_MENU_TO_EDIT",
    param: { menuToEdit: menuObject },
  });
};
