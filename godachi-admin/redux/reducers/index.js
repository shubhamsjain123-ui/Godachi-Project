import { combineReducers } from "redux";
import Settings from "./Settings";
import Login from "./Login";
import ProductList from "../ProductList";
const reducers = combineReducers({
  settings: Settings,
  login: Login,
  productList:ProductList
});

export default reducers;
