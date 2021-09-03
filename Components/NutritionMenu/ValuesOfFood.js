import React from "react";
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

export default function ValuesOfFood({ valuesOfFood, route, navigation }) {
  if (route != null && route != undefined) {
    valuesOfFood = route.params.item;
  }
  const data = [
    {
      name: "Protein",
      amount: valuesOfFood.PROTEIN,
      color: "#E27D60",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Carbs",
      amount: valuesOfFood.CARBS,
      color: "#8D8741",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Collesterol",
      amount: valuesOfFood.COLLESTEROL,
      color: "#F64C72",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Fat",
      amount: valuesOfFood.FAT,
      color: "#41B3A3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Fiber",
      amount: valuesOfFood.FIBER,
      color: "#C38D9E",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

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
          fontSize: 40,
        }}
      >
        Values of food
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", fontSize: 22 }}>
        Calories : {valuesOfFood.CALORIES}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#E27D60", fontSize: 22 }}>
        Protein : {valuesOfFood.PROTEIN}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#8D8741", fontSize: 22 }}>
        Carbs : {valuesOfFood.CARBS}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#F64C72", fontSize: 22 }}>
        Collesterol : {valuesOfFood.COLLESTEROL}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#41B3A3", fontSize: 22 }}>
        Fat : {valuesOfFood.FAT}g
      </Text>
      <Divider orientation="horizontal" />
      <Text style={{ textAlign: "center", color: "#C38D9E", fontSize: 22 }}>
        Fiber : {valuesOfFood.FIBER}g
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
