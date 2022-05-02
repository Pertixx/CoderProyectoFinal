export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const SET_RECIPE_NAME = "SET_RECIPE_NAME";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_DURATION = "SET_DURATION";
export const CONFIRM_RECIPE = "CONFIRM_RECIPE";

import { API_URL } from "../../constants/Database";

export const selectIngredient = (ingredient) => ({
  type: SELECT_INGREDIENT,
  payload: { ingredient: ingredient },
});

export const setRecipeName = (name) => ({
  type: SET_RECIPE_NAME,
  payload: { name: name },
});

export const setDescription = (description) => ({
  type: SET_DESCRIPTION,
  payload: { description: description },
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: { category: category },
});

export const setDuration = (duration) => ({
  type: SET_DURATION,
  payload: { duration: duration },
});

export const confirmRecipe = (payload) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/recipes.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: Date.now(),
          item: { ...payload },
        }),
      });

      const result = await response.json();
      console.log(result);
      dispatch({
        type: CONFIRM_RECIPE,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
