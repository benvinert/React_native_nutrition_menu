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
import MacrosPieChart from "./MacrosPieChart";

export default function NutritionValues({
  nutritionValues,
  route,
  navigation,
}) {
  if (route != null && route != undefined) {
    nutritionValues = route.params.item;
  }

  return (
    <View style={styleSheet.container}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "sans-serif-light",
          fontSize: 30,
        }}
      >
        Values of food
      </Text>
      <Text style={{ textAlign: "center", fontSize: 22 }}>
        {nutritionValues.name}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 22 }}>
        Serving size : {nutritionValues.grams}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", fontSize: 22 }}>
        Calories : {nutritionValues.CALORIES}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#E27D60", fontSize: 22 }}>
        Protein : {nutritionValues.PROTEIN}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#8D8741", fontSize: 22 }}>
        Carbs : {nutritionValues.CARBS}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#F64C72", fontSize: 22 }}>
        Collesterol : {nutritionValues.COLLESTEROL}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#41B3A3", fontSize: 22 }}>
        Fat : {nutritionValues.FAT}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#C38D9E", fontSize: 22 }}>
        Fiber : {nutritionValues.FIBER}g
      </Text>
      <MacrosPieChart nutritionValues={nutritionValues} />
    </View>
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
