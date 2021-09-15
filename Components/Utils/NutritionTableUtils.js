import React from "react";
import { INIT_STATE_OF_MACROS } from "./InitStates";

export const calculateMealMacros = (eachMeal) => {
  const mealMacros = { ...INIT_STATE_OF_MACROS };
  eachMeal.foods.forEach((eachFood) => {
    mealMacros.CALORIES += eachFood.CALORIES;
    mealMacros.CARBS += eachFood.CARBS;
    mealMacros.PROTEIN += eachFood.PROTEIN;
    mealMacros.FIBER += eachFood.FIBER;
    mealMacros.COLLESTEROL += eachFood.COLLESTEROL;
  });
  return mealMacros;
};
