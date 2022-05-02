export const FILTER_RECIPES = "FILTER_RECIPES";
export const GET_RECIPES = "GET_RECIPES";

import { API_URL } from "../../constants/Database";

export const filterRecipes = (selectedCategories) => ({
  type: FILTER_RECIPES,
  payload: { selectedCategories: selectedCategories },
});

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/recipes.json`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      const recipes = Object.keys(result).map((key) => ({
        ...result[key],
        id: key,
      }));
      console.log(recipes);

      dispatch({
        type: GET_RECIPES,
        payload: recipes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
