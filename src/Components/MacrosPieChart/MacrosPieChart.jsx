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
import { chartConfig, dataSerializer } from "./MacrosPieChartUtils";
export default function MacrosPieChart({ nutritionValues }) {
  const data = dataSerializer(nutritionValues);

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
      />
    </View>
  );
}
