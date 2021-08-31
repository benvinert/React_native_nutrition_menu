import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ValuesOfFood({ valuesOfFood, route, navigation }) {
  if (route != null && route != undefined) {
    valuesOfFood = route.params.item;
  }
  console.log(valuesOfFood);
  return (
    <View style={styleSheet.textContainer}>
      <Text>Values of food</Text>
      <Text>Calories : {valuesOfFood.CALORIES}</Text>
      <Text>Cabs : {valuesOfFood.CARBS}</Text>
      <Text>Collesterol : {valuesOfFood.COLLESTEROL}</Text>
      <Text>Fat : {valuesOfFood.FAT}</Text>
      <Text>Fiber : {valuesOfFood.FIBER}</Text>
      <Text>Protein : {valuesOfFood.PROTEIN}</Text>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  container: {
    borderWidth: 2,
    flex: 1,
  },
  textContainer: {
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
