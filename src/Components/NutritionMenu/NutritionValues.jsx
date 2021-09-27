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
      <Text style={{ textAlign: "center", fontSize: 22 }}>
        Calories : {nutritionValues.CALORIES.toFixed(2)}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#E27D60", fontSize: 22 }}>
        Protein : {nutritionValues.PROTEIN.toFixed(2)}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#8D8741", fontSize: 22 }}>
        Carbs : {nutritionValues.CARBS.toFixed(2)}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#F64C72", fontSize: 22 }}>
        Collesterol : {nutritionValues.COLLESTEROL.toFixed(2)}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#41B3A3", fontSize: 22 }}>
        Fat : {nutritionValues.FAT.toFixed(2)}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#C38D9E", fontSize: 22 }}>
        Fiber : {nutritionValues.FIBER.toFixed(2)}g
      </Text>
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
