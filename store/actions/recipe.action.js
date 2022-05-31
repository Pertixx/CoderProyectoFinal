export const FILTER_RECIPES = "FILTER_RECIPES";
export const GET_RECIPES = "GET_RECIPES";
export const GET_CREATED_RECIPES = "GET_CREATED_RECIPES";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const GET_TRENDING_RECIPES = "GET_TRENDING_RECIPES";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const GET_SEARCHED_RECIPES = "GET_SEARCHED_RECIPES";
export const OFFLINE = "OFFLINE";

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

export const filterRecipes = (selectedCategories) => ({
  type: FILTER_RECIPES,
  payload: { selectedCategories: selectedCategories },
});

export const getSearchedRecipes = (text) => ({
  type: GET_SEARCHED_RECIPES,
  payload: text,
});

export const getIngredients = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/ingredients.json`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      const ingredients = Object.keys(result).map((key) => ({
        ...result[key],
        id: key,
      }));

      dispatch({
        type: ADD_INGREDIENTS,
        payload: ingredients,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getRecipes = (amount, lastRecipe = null) => {
  let fetchUrl;
  if (lastRecipe) {
    fetchUrl = `${API_URL}/recipes.json?orderBy="$key"&limitToFirst=2&startAt="${lastRecipe}"`;
  } else {
    fetchUrl = `${API_URL}/recipes.json?orderBy="$key"&limitToFirst=${amount}`;
  }

  return async (dispatch) => {
    try {
      const response = await fetch(fetchUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (!response.ok) {
        dispatch({
          type: OFFLINE,
        });
      } else {
        const recipes = Object.keys(result).map((key) => ({
          ...result[key],
          id: key,
        }));

        const lastReadRecipe = recipes[recipes.length - 1].id;
        console.log(lastReadRecipe);

        dispatch({
          type: GET_RECIPES,
          payload: { recipes: recipes, lastRecipe: lastReadRecipe },
        });
        dispatch({
          type: GET_TRENDING_RECIPES,
        });
      }
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: OFFLINE,
      });
    }
  };
};

export const getTrendingRecipes = (page) => {
  return async (dispatch) => {
    const mostViewedRecipes = query(ref(db, "recipes"), limitToFirst(3));
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
