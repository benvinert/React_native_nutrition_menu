export const setValuesOfFoodMacrosByServingSize = (
  selectedGram,
  setValuesOfFood
) => {
  setValuesOfFood((prev) => {
    return {
      ...prev,
      grams: selectedGram,
      CALORIES: getMacrosBySelectedServingSize(
        prev.foodFromRequest.CALORIES,
        selectedGram
      ),
      CARBS: getMacrosBySelectedServingSize(
        prev.foodFromRequest.CARBS,
        selectedGram
      ),
      COLLESTEROL: getMacrosBySelectedServingSize(
        prev.foodFromRequest.COLLESTEROL,
        selectedGram
      ),
      FAT: getMacrosBySelectedServingSize(
        prev.foodFromRequest.FAT,
        selectedGram
      ),
      FIBER: getMacrosBySelectedServingSize(
        prev.foodFromRequest.FIBER,
        selectedGram
      ),
      PROTEIN: getMacrosBySelectedServingSize(
        prev.foodFromRequest.PROTEIN,
        selectedGram
      ),
    };
  });
};

const getMacrosBySelectedServingSize = (selectedGram, macroPer100Gram) => {
  return ((macroPer100Gram / 100) * selectedGram).toFixed(2);
};
