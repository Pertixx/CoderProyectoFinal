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
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        displayName: action.displayName,
      };
    case UPDATE_NAME:
      state.formFields.formName = action.payload;
      return {
        ...state,
      };
    case UPDATE_EMAIL:
      state.formFields.formEmail = action.payload;
      return {
        ...state,
      };
    case UPDATE_PASS:
      state.formFields.formPass = action.payload;
      return {
        ...state,
      };
    case CHECK_FORM:
      let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
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

    default:
      return state;
  }
};

export default AuthReducer;
