import { ADD_DATA } from "../actions/user.action";

const initialState = {
  createdRecipes: [],
  bookmarks: [],
  profilePic: null,
  name: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        name: action.payload.name,
        profilePic: action.payload.profilePic,
      };
    default:
      return state;
  }
};

export default UserReducer;
