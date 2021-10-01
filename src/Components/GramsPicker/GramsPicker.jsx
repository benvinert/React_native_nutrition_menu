import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { setValuesOfFoodMacrosByServingSize } from "./GramsPickerUtils";

export default function GramsPicker({ setValuesOfFood, valuesOfFood }) {
  const servingSizeGram = [50, 100, 150, 200, 250, 300, 400];
  return (
    <SelectDropdown
      data={servingSizeGram}
      onSelect={(selectedGram, index) => {
        setValuesOfFoodMacrosByServingSize(selectedGram, setValuesOfFood);
      }}
      defaultValue={valuesOfFood.grams}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
}
