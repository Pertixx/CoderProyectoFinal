import {
  ADD_BOOKMARK,
  ADD_BOOKMARK_RECIPE,
  ADD_DATA,
  ADD_LAST_RECIPE,
  ADD_NEW_RECIPE,
  DONT_ADD_BOOKMARK,
  OFFLINE,
} from "../actions/user.action";

const initialState = {
  createdRecipes: [],
  bookmarks: [],
  profilePic: null,
  name: null,
  addNewRecipe: false,
  addBookmark: false,
  offline: false,
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
      return { ...state };
    case ADD_NEW_RECIPE:
      state.addNewRecipe = false;
      return { ...state };
    case ADD_BOOKMARK:
      if (state.bookmarks[0] === 0) {
        state.bookmarks = [];
      }
      const index = state.bookmarks.findIndex(
        (bookmark) => bookmark.id === action.payload.id
      );
      //state.bookmarksRecipes = [];
      if (index === -1) {
        state.bookmarks.push(action.payload);
      } else {
        state.bookmarks.splice(index, 1);
        if (state.bookmarks.length === 0) {
          state.bookmarks = [0];
        }
      }
      state.addBookmark = true;
      return { ...state };
    case DONT_ADD_BOOKMARK:
      state.addBookmark = false;
      return { ...state };
    case ADD_BOOKMARK_RECIPE:
      state.bookmarksRecipes.push(action.payload);
      return { ...state };
    case OFFLINE:
      return {
        ...state,
        offline: true,
      };
    default:
      return state;
  }
};

export default UserReducer;
