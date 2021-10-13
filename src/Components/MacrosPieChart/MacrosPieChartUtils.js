import NutritionValues from "../NutritionMenu/NutritionValues";
import { translationsContext } from "../../translations/LocaleManager";
import react, { useContext } from "react";
export const chartConfig = {
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 4) => `rgba(211, 255, 255, ${opacity})`,
  labelColor: (opacity = 4) => `rgba(215, 255, 255, ${opacity})`,
  propsForDots: {
    r: "446",
    strokeWidth: "16",
    stroke: "green",
  },
};

/**
 * Receive nutritionValues object and create data array that fit to PieChart.
 * @param {*} nutritionValues
 */
export const dataSerializer = (nutritionValues) => {
  const { language } = useContext(translationsContext);
  const data = [
    {
      name: language.app.protein,
      amount: nutritionValues.PROTEIN / 100,
      color: "#E27D60",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: language.app.carbs,
      amount: nutritionValues.CARBS / 100,
      color: "#8D8741",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: language.app.collesterol,
      amount: nutritionValues.COLLESTEROL / 100,
      color: "#F64C72",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: language.app.fat,
      amount: nutritionValues.FAT / 100,
      color: "#41B3A3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: language.app.fiber,
      amount: nutritionValues.FIBER / 100,
      color: "#C38D9E",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return data;
};
