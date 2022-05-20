export const FILTER_RECIPES = "FILTER_RECIPES";
export const GET_RECIPES = "GET_RECIPES";
export const GET_CREATED_RECIPES = "GET_CREATED_RECIPES";

import { API_URL } from "../../constants/Database";
import { fetchCreatedRecipes } from "../../db";

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
      //console.log(recipes);

      dispatch({
        type: GET_RECIPES,
        payload: recipes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getCreatedRecipes = (userId) => {
  return async (dispatch) => {
    try {
      const result = await fetchCreatedRecipes(userId);
      console.log(result);
      dispatch({
        type: GET_CREATED_RECIPES,
        payload: { createdRecipes: result.rows._array },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
