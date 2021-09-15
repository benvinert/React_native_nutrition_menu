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

export default function NutritionValues({
  nutritionValues,
  route,
  navigation,
}) {
  if (route != null && route != undefined) {
    nutritionValues = route.params.item;
  }
  const data = [
    {
      name: "Protein",
      amount: nutritionValues.PROTEIN / 100,
      color: "#E27D60",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Carbs",
      amount: nutritionValues.CARBS / 100,
      color: "#8D8741",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Collesterol",
      amount: nutritionValues.COLLESTEROL / 100,
      color: "#F64C72",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Fat",
      amount: nutritionValues.FAT / 100,
      color: "#41B3A3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Fiber",
      amount: nutritionValues.FIBER / 100,
      color: "#C38D9E",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  useEffect(() => {
    console.log(nutritionValues);
  }, [nutritionValues]);

  const chartConfig = {
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 4) => `rgba(211, 255, 255, ${opacity})`,
    labelColor: (opacity = 4) => `rgba(215, 255, 255, ${opacity})`,
    propsForDots: {
      r: "446",
      strokeWidth: "16",
      stroke: "green",
    },
  };

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
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 20]}
        bezier
        avoidFalseZero
      />
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
