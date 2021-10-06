import { serverPath, getFood } from "../../Constants";

export const getFoodById = async (food, setShowValues) => {
  await fetch(`${serverPath}${getFood.getFoodById}${food.id}`)
    .then((response) => response.json())
    .then((jsonResponse) => {
      setValuesOfFood({
        ...jsonResponse,
        foodFromRequest: { ...jsonResponse }, //with that original object we calculate serving size(150g,200g,250g)
        name: food.title,
        grams: 100,
      });
      setShowValues(true);
    })
    .catch((e) => console.log("api request failed!"));
};
