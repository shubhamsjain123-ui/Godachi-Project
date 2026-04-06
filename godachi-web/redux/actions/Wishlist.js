import { WISHLIST_FETCH } from "../types";
import axios from "axios";
import { API_URL } from "../../config/config";

export const updateWishlist_r = (data) => {
   return {
      type: WISHLIST_FETCH,
      payload: data,
   };
};

export const getWishlist_r = (id) => async (dispatch) => {
   if (id) {
      await axios.get(`${API_URL}/wishlist/customer/${id}`).then((res) => {
         dispatch({
            type: WISHLIST_FETCH,
            payload: res.data,
         });
      });
   }
};
