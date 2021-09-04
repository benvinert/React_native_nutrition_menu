import React from "react";
import SelectDropdown from "react-native-select-dropdown";

export default function GramsPicker({ setValuesOfFood, valuesOfFood }) {
  const serviceGram = [50, 100, 150, 200, 250, 300, 400];

  const getMacroPerServingSize = (selectedGram, macroPer100Gram) => {
    return ((macroPer100Gram / 100) * selectedGram).toFixed(2);
  };

  const calculateMacrosPerServingSize = (selectedGram) => {
    setValuesOfFood((prev) => {
      return {
        ...prev,
        grams: selectedGram,
        CALORIES: getMacroPerServingSize(
          prev.foodFromRequest.CALORIES,
          selectedGram
        ),
        CARBS: getMacroPerServingSize(prev.foodFromRequest.CARBS, selectedGram),
        COLLESTEROL: getMacroPerServingSize(
          prev.foodFromRequest.COLLESTEROL,
          selectedGram
        ),
        FAT: getMacroPerServingSize(prev.foodFromRequest.FAT, selectedGram),
        FIBER: getMacroPerServingSize(prev.foodFromRequest.FIBER, selectedGram),
        PROTEIN: getMacroPerServingSize(
          prev.foodFromRequest.PROTEIN,
          selectedGram
        ),
      };
    });
  };

  return (
    <SelectDropdown
      data={serviceGram}
      onSelect={(selectedGram, index) => {
        calculateMacrosPerServingSize(selectedGram);
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
