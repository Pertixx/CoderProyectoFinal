import { FILTER_RECIPES, GET_RECIPES } from "../actions/recipe.action";

const initialState = {
  recipes: [],
  filteredRecipes: [],
};

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_RECIPES:
      if (action.payload.selectedCategories.length > 0) {
        let new_filtered = [];
        action.payload.selectedCategories.forEach((category) => {
          state.recipes.map((recipe) => {
            if (recipe.item.category === category) {
              new_filtered.push(recipe);
            }
          });
        });
        return { ...state, filteredRecipes: new_filtered };
      } else {
        return { ...state, filteredRecipes: state.recipes };
      }
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
      };
    default:
      return state;
  }
};

export default RecipeReducer;
