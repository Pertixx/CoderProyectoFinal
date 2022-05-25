export const FILTER_RECIPES = "FILTER_RECIPES";
export const GET_RECIPES = "GET_RECIPES";
export const GET_CREATED_RECIPES = "GET_CREATED_RECIPES";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const GET_TRENDING_RECIPES = "GET_TRENDING_RECIPES";

import { deleteRecipe, fetchCreatedRecipes } from "../../db";
import {
  limitToFirst,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";

import { API_URL } from "../../constants/Database";
import { db } from "../../firebase/firebase-config";

const RECIPE_AMOUNT = 3;

export const filterRecipes = (selectedCategories) => ({
  type: FILTER_RECIPES,
  payload: { selectedCategories: selectedCategories },
});

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/recipes.json?`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      const recipes = Object.keys(result).map((key) => ({
        ...result[key],
        id: key,
      }));

      dispatch({
        type: GET_RECIPES,
        payload: recipes,
      });
      dispatch({
        type: GET_TRENDING_RECIPES,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getTrendingRecipes = (page) => {
  return async (dispatch) => {
    const mostViewedRecipes = query(ref(db, "recipes"), limitToFirst(3));
    console.log(mostViewedRecipes);
    dispatch({
      type: GET_TRENDING_RECIPES,
      payload: mostViewedRecipes,
    });
  };
};

export const getCreatedRecipes = (userId) => {
  return async (dispatch) => {
    try {
      const result = await fetchCreatedRecipes(userId);
      dispatch({
        type: GET_CREATED_RECIPES,
        payload: { createdRecipes: result.rows._array },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteCreatedRecipe = (id) => {
  return async (dispatch) => {
    try {
      const result = await deleteRecipe(id);
      dispatch({
        type: DELETE_RECIPE,
        payload: { id: id },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
