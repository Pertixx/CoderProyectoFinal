import {
  SET_INACTIVE,
  SET_TEXT,
  SHOW_TOASTER,
} from "../actions/toaster.action";

const initialState = {
  visible: false,
  isActive: false,
  toasterText: null,
};

const ToasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOASTER:
      if (!state.isActive) {
        return { ...state, visible: true, isActive: true };
      }
    case SET_TEXT:
      return { ...state, toasterText: action.payload };
    case SET_INACTIVE:
      return { ...state, visible: false, isActive: false };
    default:
      return state;
  }
};

export default ToasterReducer;
