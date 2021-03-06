import { applyMiddleware, combineReducers, createStore } from "redux";

import AuthReducer from "./reducers/auth.reducer";
import CategoryReducer from "./reducers/category.reducer";
import CreateRecipeReducer from "./reducers/createRecipe.reducer";
import RecipeReducer from "./reducers/recipe.reducer";
import ThemeReducer from "./reducers/theme.reducer";
import ToasterReducer from "./reducers/toaster.reducer";
import UserReducer from "./reducers/user.reducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
  categories: CategoryReducer,
  recipes: RecipeReducer,
  createRecipe: CreateRecipeReducer,
  auth: AuthReducer,
  toaster: ToasterReducer,
  user: UserReducer,
  appTheme: ThemeReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));
