import { FILTER_PRODUCTS, FILTER_RESET, UPDATE_FILTER_PRODUCTS } from "../types";

const initialSettings = {
   filterProducts: {
      text: "",
      sort: "relevance",
      limit: 12,
      skip: 0,
   },
};

const brands = (state = initialSettings, action) => {
   switch (action.type) {
   case FILTER_PRODUCTS:
      return {
         ...state,
         filterProducts: action.payload,
      };
   case UPDATE_FILTER_PRODUCTS:
      return {
         ...state,
         filterProducts: {
            ...action.payload,
            ...state.filterProducts
         },
      };
   case FILTER_RESET:
      return {
         ...state,
         filterProducts: {
            brands: [],
            categories: [],
            text: "",
            variants: [],
            minPrice: null,
            maxPrice: null,
         },
      };

   default:
      return state;
   }
};

export default brands;
