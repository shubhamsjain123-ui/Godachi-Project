import { combineReducers } from "redux";
import Settings from "./Settings";
import Login from "./Login";
import Brands from "./Brands";
import FilterMasters from "./FilterMasters";
import FilterProducts from "./FilterProducts";
import Categories from "./Categories";
import Basket from "./Basket";
import Wishlist from "./Wishlist";
import Topmenu from "./Topmenu";

const reducers = combineReducers({
   settings: Settings,
   login: Login,
   brands: Brands,
   filterProducts: FilterProducts,
   filterMasters: FilterMasters,
   categories: Categories,
   basket: Basket,
   wishlist: Wishlist,
   topmenu: Topmenu,
});

export default reducers;
