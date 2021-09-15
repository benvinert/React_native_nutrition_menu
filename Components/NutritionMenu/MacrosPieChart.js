import { PieChart, ProgressChart } from "react-native-chart-kit";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  Dimensions,
} from "react-native";
export default function MacrosPieChart({ nutritionValues }) {
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
  console.log("NUTRITION VALUES::", nutritionValues);

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
  return (
    <View>
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
