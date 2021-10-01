import React, { useEffect } from "react";
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

export default function NutritionValues({
  nutritionValues,
  route,
  navigation,
  title,
}) {
  if (route != null && route != undefined) {
    nutritionValues = route.params.item;
  }

  const nutritionValuesArray = [
    { title: "Calories", value: nutritionValues.CALORIES.toFixed(2) },
    { title: "Protein", value: nutritionValues.PROTEIN.toFixed(2) },
    { title: "Carbs", value: nutritionValues.CARBS.toFixed(2) },
    { title: "Collesterol", value: nutritionValues.COLLESTEROL.toFixed(2) },
    { title: "Fat", value: nutritionValues.FAT.toFixed(2) },
    { title: "Fiber", value: nutritionValues.FIBER.toFixed(2) },
  ];

  return (
    <ScrollView style={styleSheet.container}>
      {!!title ? (
        <Text
          style={{
            textAlign: "center",
            fontFamily: "sans-serif-light",
            fontSize: 30,
          }}
        >
          {title}
        </Text>
      ) : null}
      <Text style={{ textAlign: "center", fontSize: 22 }}>
        {!!nutritionValues.name ? nutritionValues.name : null}
      </Text>
      {!!nutritionValues.grams ? (
        <Text style={{ textAlign: "center", fontSize: 22 }}>
          Serving size : {nutritionValues.grams}g
        </Text>
      ) : null}
      <Divider orientation="horizontal" />
      {nutritionValuesArray.map((eachMacro) => (
        <View>
          <Text style={{ textAlign: "center", fontSize: 22, padding: 5 }}>
            {eachMacro.title}: {eachMacro.value}g{" "}
          </Text>
          <Divider orientation="horizontal" />
        </View>
      ))}

      <MacrosPieChart nutritionValues={nutritionValues} />
    </ScrollView>
  );
}

const styleSheet = StyleSheet.create({
  title: {
    fontSize: 24,
    margin: 10,
  },
  container: {
    flex: 1,
    textAlign: "center",
  },
});
