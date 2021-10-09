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

export default function NutritionValues({
  nutritionValues,
  route,
  navigation,
  title,
}) {
  if (route != null && route != undefined) {
    nutritionValues = route.params.item;
  }
  const { applicationTheme } = useContext(themeContext);

  const nutritionValuesArray = [
    { title: "Calories", value: handleStringFixed(nutritionValues.CALORIES) },
    { title: "Protein", value: handleStringFixed(nutritionValues.PROTEIN) },
    { title: "Carbs", value: handleStringFixed(nutritionValues.CARBS) },
    {
      title: "Collesterol",
      value: handleStringFixed(nutritionValues.COLLESTEROL),
    },
    { title: "Fat", value: handleStringFixed(nutritionValues.FAT) },
    { title: "Fiber", value: handleStringFixed(nutritionValues.FIBER) },
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
          Serving size : {nutritionValues.grams}g
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
