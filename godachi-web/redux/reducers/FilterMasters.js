import { FILTER_MASTERS } from "../types";

const initialSettings = {
  /*  filterMasters: {
      materials: [],
      price: [],
      occassions: [],
      shopFor: [],
      offers: [],
      productType: [],
      stones: [],
      trending: [],
      metalColor: [],
      virtualTry: [],
      productRating: [],
      stoneColor: [],
      diamondFilters: [],
      metalFilters:[],
      weight: []
   }, */
   filterMasters:[]
};

const masters = (state = initialSettings, action) => {
   //console.log(action.type,action.payload)
   switch (action.type) {
   case FILTER_MASTERS:
      return {
         ...state,
         filterMasters: action.payload,
      };


   default:
      return state;
   }
};

export default masters;
