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
  formFields: { formName: null, formEmail: null, formPass: null },
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
