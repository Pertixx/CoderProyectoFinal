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

import { API_URL } from "../../constants/Database";
import { firebaseConfig } from "../../firebase/firebase-config";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

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

export const addImage = (image, userId) => {
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

    // Upload image to cloud store
    const storage = getStorage(app);
    const reference = ref(storage, "recipes/" + `${userId}`);

    const img = await fetch(Path);
    const bytes = await img.blob();

    await uploadBytes(reference, bytes);

    // Get new firebase image url from cloud store
    await getDownloadURL(reference).then((resolve) => {
      dispatch({ type: ADD_IMAGE, payload: { image: resolve } });
    });

    //dispatch({ type: ADD_IMAGE, payload: { image: Path } });
  };
};
