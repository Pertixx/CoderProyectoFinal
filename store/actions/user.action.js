import { onValue, ref, update } from "firebase/database";

import { db } from "../../firebase/firebase-config";

export const ADD_DATA = "ADD_DATA";
export const ADD_LAST_RECIPE = "ADD_LAST_RECIPE";
export const ADD_NEW_RECIPE = "ADD_NEW_RECIPE";

export const getUserData = (id) => {
  return async (dispatch) => {
    const starCountRef = ref(db, "users/" + id);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
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

export const dontAddNewRecipe = () => ({
  type: ADD_NEW_RECIPE,
});
