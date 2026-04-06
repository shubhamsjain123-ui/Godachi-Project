import { WISHLIST_FETCH } from "../types";

const initialSettings = {
   wishlist: [ ],
};

const wishlist = (state = initialSettings, action) => {
   switch (action.type) {
   case WISHLIST_FETCH:
      return {
         ...state,
         wishlist: action.payload,
      };

   default:
      return state;
   }
};

export default wishlist;
