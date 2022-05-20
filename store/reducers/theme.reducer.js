import { TOGGLE_THEME, TOGGLE_THEME_FAILURE } from "../actions/theme.action";

import { selectedTheme } from "../../constants/theme";

const initialState = {
  appTheme: selectedTheme,
  error: null,
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        appTheme: action.payload.selectedTheme,
        error: null,
      };
    case TOGGLE_THEME_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
