import { SET_LOGIN, SET_ISAUTHENTICATED, SET_LOGOUT } from "../types";
import axios from "axios";
import { API_URL } from "../../config/config";
export const login_r = (data) => {
   return {
      type: SET_LOGIN,
      payload: data,
   };
};

export const logout_r = () => {
   return {
      type: SET_LOGOUT,
   };
};

export function isAuthenticated_r(isAuthenticated) {
   return {
      type: SET_ISAUTHENTICATED,
      payload: isAuthenticated,
   };
}

export const checkAuthenticated = (header) => async (dispatch) => {
   await axios
   .get(`${API_URL}/users/authenticateduser`,{
      headers: header,
      withCredentials: true 
   })
   .then((res) => {
      if(res?.data?.isAuthenticated){
         dispatch({
            type: SET_ISAUTHENTICATED,
            payload: true,
         });
         dispatch({
            type: SET_LOGIN,
            payload: res.data.user,
         });
      }
   })
   .catch((error) => {
      console.log(error)
      
   });
};