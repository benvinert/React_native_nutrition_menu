import { INIT_STATE_OF_MENU } from "../../Constants";

export const menuReducer = (state, action) => {
  switch (action.execute) {
    case "ADD_FOOD":
      state.menu[action.param.indexOfMeal].foods.push(
        action.param.valuesOfFood
      );
      return { ...state, menu: state.menu };
    case "REMOVE_FOOD":
      let indexOfMeal = action.param.indexOfMeal;
      let indexOfFoodToRemove = action.param.indexOfFoodToRemove;
      state.menu[indexOfMeal].foods.splice(indexOfFoodToRemove, 1);
      return { ...state };
    case "SAVE_NAME_MENU":
      return { ...state, nameOfMenu: action.param };
    case "PUT_MENU_TO_EDIT":
      return action.param.menuToEdit;
    case "CLEAR_AFTER_SAVE_MENU":
      //Use JSON because i want to do Deep copy
      return JSON.parse(JSON.stringify(INIT_STATE_OF_MENU));
    default:
      return state;
  }
};
