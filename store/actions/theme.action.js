import { darkTheme, lightTheme } from "../../constants/theme";

export const TOGGLE_THEME = "TOGGLE_THEME";
export const TOGGLE_THEME_FAILURE = "TOGGLE_THEME_FAILURE";

export const selectTheme = (theme) => {
  return (dispatch) => {
    switch (theme) {
      case "light":
        dispatch({
          type: TOGGLE_THEME,
          payload: { selectedTheme: lightTheme },
        });
        break;
      case "dark":
        dispatch({
          type: TOGGLE_THEME,
          payload: { selectedTheme: darkTheme },
        });
        break;
      default:
        dispatch({
          type: TOGGLE_THEME_FAILURE,
          payload: { error: "Invalid Theme error" },
        });
    }
  };
};
