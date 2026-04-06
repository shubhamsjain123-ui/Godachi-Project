import { API_URL } from "../../config/config";
import axios from "axios";
import { getCookie } from "cookies-next";




export default {
   login: (user) => {
      return axios
         .post(`${API_URL}/users/loginuser`, user)
         .then((res) => {
            return res.data;
         })
         .catch(() => {
            return {
               isAuthenticated: false,
               user: {
                  email: "",
                  id: "",
                  name: "",
               },
            };
         });
   },

   register: (user) => {
      return axios
         .post(`${API_URL}/users/register`, user)
         .then((res) => {
            return res.data;
         })
         .catch((err) => {
            return {
               error: err,
            };
         });
   },
   logout: async () => {
      // var token = await getCookie("access_token_user");
      // if (token !== undefined) {
      //    token = token.split(" ").join("");
      //    console.log(token, '-------------token');
      // }
      var token = await getCookie("access_token_user");
      return await axios
         .get(`${API_URL}/users/logoutUser`)
         .then((res) => {
            return res.data;
         }).catch((err) => {
            console.log(err.message, "----------------err.message");
            return {
               error: err.message,
            };
         });
   },

   isAuthenticated: async () => {
      var token = await getCookie("access_token_user");

      return await axios
         .get(`${API_URL}/users/authenticateduser`)
         .then((res) => {
            return res.data;
         })
         .catch((error) => {
            //console.log(error)
            return {
               isAuthenticated: false,
               user: { username: "", id: "", name: "", image: "", phone: "" },
            };
         });
   },
   sendOtp: (phoneNumber, type) => {
      return axios
         .post(`${API_URL}/users/sendOtp`, { phone: phoneNumber, type: type })
         .then((res) => {
            return res.data;
         })
         .catch((err) => {
            console.log(err)
            return {
               error: true,
               messagge: err.message
            };
         });
   },
   reSendOtp: (data) => {
      return axios
         .post(`${API_URL}/users/resendotp`, data)
         .then((res) => {
            return res.data;
         })
         .catch((err) => {
            console.log(err)
            return {
               error: true,
               messagge: err.message
            };
         });
   },
   verifyOtp: (phoneNumber, otp) => {
      return axios
         .post(`${API_URL}/users/verifyOtp`, { phone: phoneNumber, otp })
         .then((res) => {
            return res.data;
         })
         .catch((err) => {
            console.log(err)
            return {
               error: true,
               messagge: err.message
            };
         });
   },
};
