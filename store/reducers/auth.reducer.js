import {
  CHECK_FORM,
  SIGN_IN,
  SIGN_UP,
  UPDATE_EMAIL,
  UPDATE_NAME,
  UPDATE_PASS,
} from "../actions/auth.action";

const initialState = {
  token: null,
  userId: null,
  displayName: null,
  formFields: { formName: "", formEmail: "", formPass: "" },
  formFieldsValidation: { formName: false, formEmail: false, formPass: false },
  formValid: null,
  formLogInFields: { formEmail: "", formPass: "" },
  formLogInValidation: { formEmail: false, formPass: false },
  formLogInValid: null,
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
    case UPDATE_NAME:
      state.formFields.formName = action.payload;
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

    default:
      return state;
  }
};

export default AuthReducer;
