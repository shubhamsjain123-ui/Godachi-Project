import { FILTER_MASTERS, UPDATE_FILTER_PRODUCTS, GET_ALL_FETCH_FAIL } from "../types";
import axios from "axios";
import { API_URL } from "../../config/config";

export const getFilterMaster  = (selectedFilters = {}) => async (dispatch) => {
   await axios
      .post(`${API_URL}/filterMaster/web`, selectedFilters)
      .then((res) => {
         dispatch({
            type: FILTER_MASTERS,
            payload: res.data,
         });
         var filterProductList = {};
         res.data.forEach((filterMaster)=>{
            filterProductList[filterMaster.shortName] = [];
         })
         dispatch({
            type: UPDATE_FILTER_PRODUCTS,
            payload: filterProductList,
         });
      })
      .catch((err) => {
         
         dispatch({
            type: GET_ALL_FETCH_FAIL,
            payload: err.message + ": " + err.config.url.replace(API_URL, "api"),
         });
      });
};

