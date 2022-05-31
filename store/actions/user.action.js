import { child, get, onValue, ref, update } from "firebase/database";

import { db } from "../../firebase/firebase-config";

export const ADD_DATA = "ADD_DATA";
export const ADD_LAST_RECIPE = "ADD_LAST_RECIPE";
export const ADD_NEW_RECIPE = "ADD_NEW_RECIPE";
export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const DONT_ADD_BOOKMARK = "DONT_ADD_BOOKMARK";
export const ADD_BOOKMARK_RECIPE = "ADD_BOOKMARK_RECIPE";
export const OFFLINE = "OFFLINE";

export const getUserData = (id) => {
  return async (dispatch) => {
    const starCountRef = ref(db, "users/" + id);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      dispatch({
        type: ADD_DATA,
        payload: {
          name: data.name,
          profilePic: data.profilePic,
          createdRecipes: data.createdRecipes,
          bookmarks: data.bookmarks,
        },
      });
    });
  };
};

export const getBookmarksRecipes = (bookmarks) => {
  return async (dispatch) => {
    const arr = [];
    bookmarks.forEach((id) => {
      get(child(dbRef, `recipes/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      });
    });
  };
};

export const getUserBookmarkRecipe = (id) => {
  return async (dispatch) => {
    const dbRef = ref(db);
    get(child(dbRef, `recipes/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        dispatch({
          type: ADD_BOOKMARK_RECIPE,
          payload: { id: id, item: snapshot.val() },
        });
      } else {
        console.log("No data available");
      }
    });
  };
};

export const addBookmark = (recipeId, recipeItem) => ({
  type: ADD_BOOKMARK,
  payload: { id: recipeId, recipe: recipeItem },
});

export const dontAddBookmark = () => ({
  type: DONT_ADD_BOOKMARK,
});

export const dontAddNewRecipe = () => ({
  type: ADD_NEW_RECIPE,
});

export const setOffline = () => ({
  type: OFFLINE,
});
