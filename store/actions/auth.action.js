import { URL_AUTH_SIGNIN, URL_AUTH_SIGNUP } from "../../constants/Database";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASS = "UPDATE_PASS";
export const CHECK_FORM = "CHECK_FORM";

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

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorId = errorResponse.error.message;

      let message = "No se ha podido registrar";
      if (errorId === "EMAIL_EXISTS") message = "Este email ya esta registrado";

      console.error(message); // mostrar toaster con mensaje
    }

    const data = await response.json();
    console.log(data);

    dispatch({
      type: SIGN_UP,
      token: data.idToken,
      userId: data.localId,
      displayName: data.displayName,
    });
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
    console.log(data);

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
