import {
  ADD_IMAGE,
  CHECK_FORM,
  CLEAR_ERROR,
  OFFLINE_LOGIN,
  SET_ERROR,
  SET_ID,
  SIGN_IN,
  SIGN_UP,
  UPDATE_EMAIL,
  UPDATE_IMAGE,
  UPDATE_NAME,
  UPDATE_PASS,
} from "../actions/auth.action";

const initialState = {
  token: null,
  userId: null,
  displayName: null,
  theme: null,
  formFields: { formName: "", formEmail: "", formPass: "", image: "" },
  formFieldsValidation: {
    formName: false,
    formEmail: false,
    formPass: false,
    formImage: false,
  },
  formValid: false,
  formLogInFields: { formEmail: "", formPass: "" },
  formLogInValidation: { formEmail: false, formPass: false },
  formLogInValid: false,
  error: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        displayName: action.displayName,
        formFields: initialState.formFields,
        formFieldsValidation: initialState.formFieldsValidation,
        formValid: initialState.formValid,
        formLogInFields: initialState.formLogInFields,
        formLogInValidation: initialState.formLogInValidation,
        formLogInValid: initialState.formLogInValid,
      };
    case SIGN_IN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        displayName: action.displayName,
        formFields: initialState.formFields,
        formFieldsValidation: initialState.formFieldsValidation,
        formValid: initialState.formValid,
        formLogInFields: initialState.formLogInFields,
        formLogInValidation: initialState.formLogInValidation,
        formLogInValid: initialState.formLogInValid,
      };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: initialState.error };
    case UPDATE_NAME:
      state.formFields.formName = action.payload.name;
      return {
        ...state,
      };
    case UPDATE_EMAIL:
      switch (action.payload.form) {
        case "login":
          state.formLogInFields.formEmail = action.payload.email;
          return { ...state };
        case "signup":
          state.formFields.formEmail = action.payload.email;
          return { ...state };
      }
    case UPDATE_PASS:
      switch (action.payload.form) {
        case "login":
          state.formLogInFields.formPass = action.payload.password;
          return { ...state };
        case "signup":
          state.formFields.formPass = action.payload.password;
          return { ...state };
      }
    case UPDATE_IMAGE:
      state.formFields.image = action.payload;
      return { ...state };
    case CHECK_FORM:
      let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      switch (action.payload) {
        case "login":
          if (emailReg.test(state.formLogInFields.formEmail)) {
            state.formLogInValidation.formEmail = true;
          } else {
            state.formLogInValidation.formEmail = false;
          }
          if (state.formLogInFields.formPass.trim()) {
            state.formLogInValidation.formPass = true;
          } else {
            state.formLogInValidation.formPass = false;
          }
          for (const key in state.formLogInValidation) {
            if (!state.formLogInValidation[key]) {
              return { ...state, formLogInValid: false };
            } else {
              state.formLogInValid = true;
            }
          }
          return { ...state };
        case "signup":
          if (state.formFields.image.trim()) {
            state.formFieldsValidation.formImage = true;
          } else {
            state.formFieldsValidation.formImage = false;
          }
          if (state.formFields.formName.trim()) {
            state.formFieldsValidation.formName = true;
          } else {
            state.formFieldsValidation.formName = false;
          }
          if (emailReg.test(state.formFields.formEmail)) {
            state.formFieldsValidation.formEmail = true;
          } else {
            state.formFieldsValidation.formEmail = false;
          }
          if (passReg.test(state.formFields.formPass)) {
            state.formFieldsValidation.formPass = true;
          } else {
            state.formFieldsValidation.formPass = false;
          }
          for (const key in state.formFieldsValidation) {
            if (!state.formFieldsValidation[key]) {
              return { ...state, formValid: false };
            } else {
              state.formValid = true;
            }
          }
          return { ...state };
      }
    case SET_ID:
      return {
        ...state,
        userId: null,
      };
    case OFFLINE_LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        displayName: action.payload.displayName,
        theme: action.payload.theme,
      };
    case ADD_IMAGE:
      state.formFields.image = action.payload.image;
      return { ...state };
    default:
      return state;
  }
};

export default AuthReducer;
