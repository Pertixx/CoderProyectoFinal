import { applyMiddleware, combineReducers, createStore } from "redux";

import AuthReducer from "./reducers/auth.reducer";
import CategoryReducer from "./reducers/category.reducer";
import CreateRecipeReducer from "./reducers/createRecipe.reducer";
import RecipeReducer from "./reducers/recipe.reducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
  categories: CategoryReducer,
  recipes: RecipeReducer,
  createRecipe: CreateRecipeReducer,
  auth: AuthReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));
