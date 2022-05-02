import { SELECT_CATEGORY } from "../actions/category.action";
import { dummyData } from "../../constants";

const initialState = {
  categories: dummyData.categories,
  selectedCategories: [],
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      const categoryIndex = state.selectedCategories.findIndex(
        (catId) => catId === action.payload.categoryId
      );
      if (categoryIndex === -1) {
        state.selectedCategories.push(action.payload.categoryId);
      } else {
        state.selectedCategories.splice(categoryIndex, 1);
      }
      return { ...state };
    default:
      return state;
  }
};

export default CategoryReducer;
