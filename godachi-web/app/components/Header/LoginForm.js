import { useState } from "react";
import { Input, Form, Button, Checkbox, message } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import AuthService from "../../../util/services/authservice";
import { getCookie, setCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated_r, login_r, updateBasket_r, updateWishlist_r, mergeBasket } from "../../../redux/actions";
import Router from "next/router";
import axios from "axios";
import { API_URL } from "../../../config/config";

import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber } from 'react-phone-number-input'

import LoginWithPassword from "../Auth/LoginWithPassword";
import LoginWithOtp from "../Auth/LoginWithOtp";
import VerifyOtp from "../Auth/VerifyOtp";
const Default = ({ routeTo = null }) => {
   const dispatch = useDispatch();
   const { isAuthenticated } = useSelector((state) => state.login);

   if (isAuthenticated) {
      var routeUrl = routeTo ? routeTo : "/"
      Router.push(routeUrl);
   }
   const { basket } = useSelector((state) => state.basket);
   const { wishlist } = useSelector((state) => state.wishlist);

   const [loginWithPass, setLoginWithPass] = useState(false);
   const onSuccess = async (authResponse) => {
      const { isAuthenticated, user } = authResponse;
      console.log(basket)
      dispatch(login_r(user));
      dispatch(isAuthenticated_r(true));
      message.success("Login Successfully");
      setCookie("iswebuser", true);
      setCookie("access_token_user", user?.access_token);

      dispatch(mergeBasket(basket));
      //wishlist merge
      const wishlistMergeResponse = await axios.post(`${API_URL}/wishlist/customer`, wishlist);

      if (wishlistMergeResponse.data) {
         if (wishlistMergeResponse.data.success) {
            dispatch(updateWishlist_r(wishlistMergeResponse.data.data));
         }
      }

      //cart merge
      /* const cartMergeResponse =  await axios.post(`${API_URL}/basket/customer`, basket);
      if(cartMergeResponse.data){
         if(cartMergeResponse.data.success){
            dispatch(updateBasket_r(cartMergeResponse.data.data));
         }
      } */
      routeTo ? Router.push(routeTo) : null;
   };

   const checkPhoneValidity = (value) => {
      if (!phone) {
         return Promise.reject("Please Enter Phone Number");
      }
      else {
         if (isValidPhoneNumber(phone)) {
            return Promise.resolve();
         }
         else {
            return Promise.reject("Please Enter a valid Phone Number");
         }
      }
   }

   if (loginWithPass) {
      return (
         <LoginWithPassword
            setLoginWithPass={setLoginWithPass}
            onSuccess={onSuccess}
         />
      )
   }
   return (
      <LoginWithOtp
         setLoginWithPass={setLoginWithPass}
         onSuccess={onSuccess}
      />

   );
};

export default Default;
