import {
  ADD_DATA,
  ADD_LAST_RECIPE,
  ADD_NEW_RECIPE,
} from "../actions/user.action";

const initialState = {
  createdRecipes: [],
  bookmarks: [],
  profilePic: null,
  name: null,
  addNewRecipe: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        name: action.payload.name,
        profilePic: action.payload.profilePic,
        createdRecipes: action.payload.createdRecipes,
        bookmarks: action.payload.bookmarks,
      };
    case ADD_LAST_RECIPE:
      if (state.createdRecipes[0] === 0) {
        state.createdRecipes = [];
      }
      state.createdRecipes.push(action.payload.id);
      state.addNewRecipe = true;
      return {
        ...state,
      };
    case ADD_NEW_RECIPE:
      state.addNewRecipe = false;
      return { ...state };
    default:
      return state;
  }
};

export default UserReducer;
