import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { localStorageKeys } from "../../Constants";
import { calculatMenuMacros } from "../../Components/NutritionMenu/NutritionTableUtils";
import { darkMode, themeContext } from "../../ThemeProvider/ThemeManager";
import { textStyleUtils } from "../../Styles/StyleUtils";
import { handleStringFixed } from "../../Components/NutritionMenu/NutritionValuesUtils";
import { translationsContext } from "../../translations/LocaleManager";

export default function AllMenus() {
  const [isLoading, setIsLoading] = useState(true);
  const [userMenus, setUserMenus] = useState({ userMenus: [] });
  const { applicationTheme } = useContext(themeContext);
  const { language } = useContext(translationsContext);
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
  }, [setIsLoading, userMenus]); //When userMenus changes we need to rerender the page because user need to see his new Menus

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
                  ...textStyleUtils.text_bold,
                  color: applicationTheme.styles.textColor,
                }}
              >
                {eachMenu.nameOfMenu}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{
                  ...textStyleUtils.text_bold,
                  color: applicationTheme.styles.textColor,
                }}
              >
                {handleStringFixed(calculatMenuMacros(eachMenu).CALORIES)}
                {" " + language.app.calories}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      ) : (
        <Text style={textStyleUtils.text_center_bold_font_20}>
          You're don't have menu yet
        </Text>
      )}
    </ScrollView>
  );
}
