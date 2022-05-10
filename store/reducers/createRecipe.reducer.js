import {
  ADD_IMAGE,
  CONFIRM_RECIPE,
  SELECT_INGREDIENT,
  SET_AUTHOR,
  SET_CATEGORY,
  SET_DESCRIPTION,
  SET_DURATION,
  SET_RECIPE_NAME,
} from "../actions/createRecipe.action";

const initialState = {
  recipe: {
    name: null,
    description: null,
    duration: null,
    category: null,
    ingredients: null,
    views: 0,
    image: null,
    author: {
      id: null,
      name: "Agustin Perticaro",
      profilePic: null,
    },
  },
  name: null,
  description: null,
  duration: null,
  category: null,
  ingredients: null,
};

const CreateRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_INGREDIENT:
      if (state.ingredients === null) {
        state.ingredients = [];
      }
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.ingredient.id
      );
      if (ingredientIndex === -1) {
        state.ingredients.push(action.payload.ingredient);
      } else {
        state.ingredients.splice(ingredientIndex, 1);
        if (state.ingredients.length === 0) {
          state.ingredients = null;
        }
      }
      state.recipe.ingredients = state.ingredients;
      return { ...state };
    case SET_RECIPE_NAME:
      state.name = action.payload.name;
      state.recipe.name = state.name;
      return { ...state };
    case SET_DESCRIPTION:
      state.description = action.payload.description;
      state.recipe.description = state.description;
      return { ...state };
    case SET_CATEGORY:
      state.category = action.payload.category;
      state.recipe.category = state.category;
      return { ...state };
    case SET_DURATION:
      state.duration = action.payload.duration;
      state.recipe.duration = state.duration;
      return { ...state };
    case SET_AUTHOR:
      state.recipe.author.name = action.payload.authorName;
      state.recipe.author.id = action.payload.id;
      return { ...state };
    case CONFIRM_RECIPE:
      return initialState;
    case ADD_IMAGE:
      state.recipe.image = action.payload.image;
      return { ...state };
    default:
      return state;
  }
};

export default CreateRecipeReducer;
