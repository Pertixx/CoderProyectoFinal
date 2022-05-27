import {
  ADD_INGREDIENTS,
  DELETE_RECIPE,
  FILTER_RECIPES,
  GET_CREATED_RECIPES,
  GET_RECIPES,
  GET_SEARCHED_RECIPES,
  GET_TRENDING_RECIPES,
} from "../actions/recipe.action";

const initialState = {
  recipes: [],
  ingredients: [],
  filteredRecipes: [],
  createdRecipes: [],
  trendingRecipes: [],
  searchedRecipes: [],
  lastRecipe: null,
  maxTrending: 5,
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
      action.payload.recipes.forEach((recipe) => {
        const response = state.recipes.find(
          (element) => element.id === recipe.id
        );
        if (response === undefined) {
          state.recipes.push(recipe);
          state.filteredRecipes.push(recipe);
        }
      });
      return {
        ...state,
        lastRecipe: action.payload.lastRecipe,
      };
    case GET_CREATED_RECIPES:
      return {
        ...state,
        createdRecipes: action.payload.createdRecipes,
      };
    case DELETE_RECIPE:
      const index = state.createdRecipes.findIndex(
        (recipeId) => recipeId === action.payload.id
      );
      if (index !== -1) {
        state.createdRecipes.splice(index, 1);
      }
      return { ...state };
    case GET_TRENDING_RECIPES:
      state.trendingRecipes = state.recipes;
      state.trendingRecipes.sort((a, b) => {
        if (a.item.views < b.item.views) return 1;
        if (a.item.views > b.item.views) return -1;
        return 0;
        //return a.item.views - b.item.views;
      });
      state.trendingRecipes = state.trendingRecipes.slice(0, state.maxTrending);
      return { ...state };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };
    case GET_SEARCHED_RECIPES:
      state.recipes.forEach((recipe) => {
        if (
          recipe.item.name
            .toUpperCase()
            .trim()
            .includes(action.payload.toUpperCase().trim())
        ) {
          const index = state.searchedRecipes.findIndex(
            (element) => element.id === recipe.id
          );
          if (index === -1) {
            state.searchedRecipes.push(recipe);
          }
        }
      });
      return { ...state };
    default:
      return state;
  }
};

export default RecipeReducer;
