import { TOPMENU_FETCH, GET_ALL_FETCH_FAIL } from "../types";
import axios from "axios";
import { API_URL } from "../../config/config";

export const getTopmenu_r = () => async (dispatch) => {
   await axios
      .post(`${API_URL}/homemenu/public`)
      .then((res) => {
         dispatch({
            type: TOPMENU_FETCH,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch({
            type: GET_ALL_FETCH_FAIL,
            payload: err.message + ": " + err.config.url.replace(API_URL, "api"),
         });
      });
};
