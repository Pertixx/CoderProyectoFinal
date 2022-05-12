import {
  API_URL,
  URL_AUTH_SIGNIN,
  URL_AUTH_SIGNUP,
} from "../../constants/Database";
import { ref, set } from "firebase/database";

import { db } from "../../firebase/firebase-config";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASS = "UPDATE_PASS";
export const CHECK_FORM = "CHECK_FORM";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

const createUserDataBase = (userId, name) => {
  set(ref(db, "users/" + userId), {
    name: name,
    profilePic:
      "https://cdn.pixabay.com/photo/2015/05/26/00/48/basketball-784097_1280.jpg",
  })
    .then(() => {
      console.log("User database created!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signup = (name, email, password) => {
  return async (dispatch) => {
    const response = await fetch(URL_AUTH_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: name,
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      //const errorResponse = await response.json();
      const errorId = data.error.message;

      let message = "No se ha podido registrar";
      if (errorId === "EMAIL_EXISTS") message = "Este email ya esta registrado";
      dispatch({
        type: SET_ERROR,
        payload: message,
      });
    }
    console.log(data);

    dispatch({
      type: SIGN_UP,
      token: data.idToken,
      userId: data.localId,
      displayName: data.displayName,
    });
    createUserDataBase(data.localId, data.displayName);
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(URL_AUTH_SIGNIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      //const errorResponse = await response.json();
      const errorId = data.error.message;

      let message = "No se ha podido iniciar sesion";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "No existe cuenta registrada con este email";
      }
      if (errorId === "INVALID_PASSWORD") {
        message = "La contraseña no es válida";
      }
      dispatch({
        type: SET_ERROR,
        payload: message,
      });
    }
    //console.log(data);

    dispatch({
      type: SIGN_IN,
      token: data.idToken,
      userId: data.localId,
      displayName: data.displayName,
    });
  };
};

export const updateName = (name) => ({
  type: UPDATE_NAME,
  payload: name,
});

export const updateEmail = (email, form) => ({
  type: UPDATE_EMAIL,
  payload: { email: email, form: form },
});

export const updatePass = (password, form) => ({
  type: UPDATE_PASS,
  payload: { password: password, form: form },
});

export const checkForm = (form) => ({
  type: CHECK_FORM,
  payload: form,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
