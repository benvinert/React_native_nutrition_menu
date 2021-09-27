import React from "react";
import { INIT_STATE_OF_MACROS } from "../../Constants/InitStates";

export const calculateMealMacros = (eachMeal) => {
  const mealMacros = { ...INIT_STATE_OF_MACROS };
  eachMeal.foods.forEach((eachFood) => {
    mealMacros.CALORIES += eachFood.CALORIES;
    mealMacros.CARBS += eachFood.CARBS;
    mealMacros.PROTEIN += eachFood.PROTEIN;
    mealMacros.FIBER += eachFood.FIBER;
    mealMacros.COLLESTEROL += eachFood.COLLESTEROL;
    mealMacros.FAT += eachFood.FAT;
  });
  return mealMacros;
};

export const calculatMenuMacros = (menuObject) => {
  const sumOfMenuMacros = { ...INIT_STATE_OF_MACROS };
  menuObject.menu.map((eachMeal) => {
    if (eachMeal.foods.length > 0) {
      let macrosMeal = calculateMealMacros(eachMeal);
      Object.keys(macrosMeal).forEach((eachMacroProperty) => {
        sumOfMenuMacros[eachMacroProperty] =
          macrosMeal[eachMacroProperty] + sumOfMenuMacros[eachMacroProperty];
      });
    }
  });
  return sumOfMenuMacros;
};
