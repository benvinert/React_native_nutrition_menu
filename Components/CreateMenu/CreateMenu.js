import React from "react";
import { AutoComplete } from "./AutoComplete";
import { View } from "react-native";
import MenuTable from "./MenuTable";

export default function CreateMenu({ navigation }) {
  const menuObject = [
    {
      mealTime: "Breakfast",
      foods: [
        {
          name: "eghsaasgs",
          calories: 0,
          carbs: 0,
        },
        {
          name: "breahsad",
          calories: 0,
          carbs: 0,
        },
        {
          name: "eggshsadsag",
          calories: 0,
          carbs: 0,
        },
        {
          name: "breagsagsad",
          calories: 0,
          carbs: 0,
        },
        {
          name: "hgfhdgf",
          calories: 0,
          carbs: 0,
        },
        {
          name: "bredsaad",
          calories: 0,
          carbs: 0,
        },
        {
          name: "eggags",
          calories: 0,
          carbs: 0,
        },
        {
          name: "bresdsaasad",
          calories: 0,
          carbs: 0,
        },
        {
          name: "egaaags",
          calories: 0,
          carbs: 0,
        },
        {
          name: "bread",
          calories: 0,
          carbs: 0,
        },
      ],
    },
    {
      mealTime: "Lunch",
      foods: [
        {
          name: "rice",
          calories: 0,
          carbs: 0,
        },
        {
          name: "chicken",
          calories: 0,
          carbs: 0,
        },
      ],
    },
  ];

  return (
    <View>
      <AutoComplete />
      <MenuTable menuObject={menuObject} />
    </View>
  );
}
