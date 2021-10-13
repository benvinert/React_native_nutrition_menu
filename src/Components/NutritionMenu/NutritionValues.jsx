import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  Dimensions,
} from "react-native";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import { Divider } from "react-native-elements";
import MacrosPieChart from "../MacrosPieChart/MacrosPieChart";
import { themeContext } from "../../ThemeProvider/ThemeManager";
import { handleStringFixed } from "./NutritionValuesUtils";
import { translationsContext } from "../../translations/LocaleManager";

export default function NutritionValues({
  nutritionValues,
  route,
  navigation,
  title,
}) {
  if (route != null && route != undefined) {
    nutritionValues = route.params.item;
  }
  const { language } = useContext(translationsContext);
  const { applicationTheme } = useContext(themeContext);

  const nutritionValuesArray = [
    {
      title: language.app.calories,
      value: handleStringFixed(nutritionValues.CALORIES),
    },
    {
      title: language.app.protein,
      value: handleStringFixed(nutritionValues.PROTEIN),
    },
    {
      title: language.app.carbs,
      value: handleStringFixed(nutritionValues.CARBS),
    },
    {
      title: language.app.collesterol,
      value: handleStringFixed(nutritionValues.COLLESTEROL),
    },
    { title: language.app.fat, value: handleStringFixed(nutritionValues.FAT) },
    {
      title: language.app.fiber,
      value: handleStringFixed(nutritionValues.FIBER),
    },
  ];

  const styleSheet = StyleSheet.create({
    title: {
      fontSize: 24,
      margin: 10,
    },
    container: {
      flex: 1,
      textAlign: "center",
    },
    textStyle: {
      textAlign: "center",
      color: applicationTheme.styles.textColor,
      fontSize: 22,
      padding: 5,
    },
  });

  return (
    <ScrollView style={styleSheet.container}>
      {!!title ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            color: applicationTheme.styles.textColor,
          }}
        >
          {title}
        </Text>
      ) : null}
      <Text style={styleSheet.textStyle}>
        {!!nutritionValues.name ? nutritionValues.name : null}
      </Text>
      {!!nutritionValues.grams ? (
        <Text style={styleSheet.textStyle}>
          {language.app.serving_size} : {nutritionValues.grams}g
        </Text>
      ) : null}
      <Divider orientation="horizontal" />
      {nutritionValuesArray.map((eachMacro, index) => (
        <View key={index}>
          <Text style={styleSheet.textStyle}>
            {eachMacro.title}: {eachMacro.value}g{" "}
          </Text>
          <Divider orientation="horizontal" />
        </View>
      ))}

      <MacrosPieChart nutritionValues={nutritionValues} />
    </ScrollView>
  );
}
