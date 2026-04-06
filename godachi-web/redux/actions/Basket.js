import { BASKET_FETCH, RESET_BASKET } from "../types";
import axios from "axios";
import { API_URL } from "../../config/config";
import { getCookie } from "cookies-next";

export const updateBasketFromProduct = (data) => async (dispatch) => {
   await axios.post(`${API_URL}/basket/buildBasket`, data).then((res) => {
      if (res?.data?.variant == "success") {
         dispatch({
            type: BASKET_FETCH,
            payload: res.data.result,
         });
      }

   });
}

export const mergeBasket = (data) => async (dispatch) => {
   // console.log(data)
   await axios.post(`${API_URL}/basket/mergeBasket`, data).then((res) => {
      console.log("merge basket response")
      console.log(res.data)
      if (res?.data?.variant == "success") {
         dispatch({
            type: BASKET_FETCH,
            payload: res.data.result,
         });
      }

   });

}

export const resetBasket = () => {
   return {
      type: RESET_BASKET,
   };
}

export const updateBasket_r = (data) => {
   return {
      type: BASKET_FETCH,
      payload: data,
   };
};

export const getBasket_r = (id) => async (dispatch) => {
   if (id) {
      await axios.get(`${API_URL}/basket/customer/${id}`).then((res) => {
         dispatch({
            type: BASKET_FETCH,
            payload: res.data,
         });
      });
   }
};
