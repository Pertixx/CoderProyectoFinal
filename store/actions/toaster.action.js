export const SHOW_TOASTER = "SHOW_TOASTER";
export const SET_TEXT = "SET_TEXT";
export const SET_INACTIVE = "SET_INACTIVE";

export const showToaster = () => ({
  type: SHOW_TOASTER,
});

export const setText = (text) => ({
  type: SET_TEXT,
  payload: text,
});

export const setInactive = () => ({
  type: SET_INACTIVE,
});
