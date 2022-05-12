import { onValue, ref } from "firebase/database";

import { db } from "../../firebase/firebase-config";

export const ADD_DATA = "ADD_DATA";
//export const UPDATE_DATA = "UPDATE_DATA";

export const getUserData = (id) => {
  return async (dispatch) => {
    const starCountRef = ref(db, "users/" + id);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      dispatch({
        type: ADD_DATA,
        payload: { name: data.name, profilePic: data.profilePic },
      });
    });
  };
};
