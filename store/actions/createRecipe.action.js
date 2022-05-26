export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const SET_RECIPE_NAME = "SET_RECIPE_NAME";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_DURATION = "SET_DURATION";
export const SET_AUTHOR = "SET_AUTHOR";
export const ADD_IMAGE = "ADD_IMAGE";
export const CONFIRM_RECIPE = "CONFIRM_RECIPE";

import * as FileSystem from "expo-file-system";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { ADD_LAST_RECIPE } from "./user.action";
import { API_URL } from "../../constants/Database";
import { db } from "../../firebase/firebase-config";
import { firebaseConfig } from "../../firebase/firebase-config";
import { initializeApp } from "firebase/app";
import { insertRecipe } from "../../db";

const app = initializeApp(firebaseConfig);

const addUserRecipe = (recipe) => {
  update(ref(db, "users/" + userId), {
    createdRecipes: createdRecipes.push(),
  }).catch((error) => {
    console.log(error);
  });
};

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

export const setAuthor = (authorName, id) => ({
  type: SET_AUTHOR,
  payload: { authorName: authorName, id: id },
});

export const confirmRecipe = (recipe, localImage) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/recipes.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: Date.now(),
          item: { ...recipe },
        }),
      });

      const result = await response.json();
      console.log(result);
      const dbResult = await insertRecipe(
        recipe.name,
        localImage,
        recipe.duration,
        recipe.category,
        recipe.author.id
      );
      dispatch({
        type: ADD_LAST_RECIPE,
        payload: { id: result.name },
      });
      dispatch({
        type: CONFIRM_RECIPE,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

const dispatchPromise = (name) => {
  const dispatchPromise = new Promise((resolve, reject) => {
    dispatch({
      type: ADD_LAST_RECIPE,
      payload: { id: name },
    });
    dispatch({
      type: CONFIRM_RECIPE,
    });
  });

  return dispatchPromise;
};

export const generateImageUrl = (userId, image) => {
  return async (dispatch) => {
    const storage = getStorage(app);
    const reference = ref(storage, "recipes/" + `${userId}${Date.now()}`);

    const img = await fetch(image);
    const bytes = await img.blob();

    await uploadBytes(reference, bytes);

    // Get new firebase image url from cloud store
    await getDownloadURL(reference).then((resolve) => {
      dispatch({ type: ADD_IMAGE, payload: { image: resolve } });
    });
  };
};

export const addImage = (image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;

    try {
      FileSystem.moveAsync({
        from: image,
        to: Path,
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }

    dispatch({ type: ADD_IMAGE, payload: { image: Path } });
  };
};
