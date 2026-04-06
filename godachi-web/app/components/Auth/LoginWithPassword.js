import { useState } from "react";
import { Input, Form, Button, Checkbox, message } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import AuthService from "../../../util/services/authservice";
import { setCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated_r, login_r, updateBasket_r, updateWishlist_r } from "../../../redux/actions";
import Router from "next/router";
import axios from "axios";
import { API_URL } from "../../../config/config";
import VerifyOtp from './VerifyOtp'
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber } from 'react-phone-number-input'
import authservice from "../../../util/services/authservice";

const Default = ({
   routeTo = null,
   setLoginWithPass,
   onSuccess
}) => {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const { isAuthenticated } = useSelector((state) => state.login);
   const { basket } = useSelector((state) => state.basket);
   const { wishlist } = useSelector((state) => state.wishlist);
   const [verifyNumber, setVerifyNumber] = useState('')
   const [sentOtp, setSentOtp] = useState(false)

   const onLogin = async (Data) => {
      if (isValidPhoneNumber("+91" + Data["email"]))
         Data["email"] = "+91" + Data["email"];
      else
         Data["email"] = Data.email.toLowerCase();

      try {
         var authResponse = await AuthService.login(Data);
         const { isAuthenticated, user } = authResponse;
         if (isAuthenticated) {
            onSuccess(authResponse)
         } else {
            // message.error("Login not Successfully");
            if (isValidPhoneNumber(Data["email"])) {
               authservice.reSendOtp({ phone: Data["email"], type: "+91" }).then((data) => {
                  if (data.error) {
                     if (data.messagge) {
                        message.error(data.messagge);
                     }
                     if (data.message) {
                        message.error(data.message);
                     }
                  } else {
                     setVerifyNumber(Data['email'])
                     setSentOtp(true)
                  }
               })
            }

         }
      }
      catch (error) {
         message.error("Login not Successfully");
         console.log(error);
      }
   };

   const checkEmailPhoneValidity = (rule, value) => {
      if (!value) {
         return Promise.reject("Please Enter Phone/Email");
      }
      else {
         var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
         if (isValidPhoneNumber("+91" + value) || value.match(emailRegex)) {
            return Promise.resolve();
         }
         else {
            return Promise.reject("Please Enter valid Phone/Email");
         }
      }
   }

   return (

      <>

         {verifyNumber && sentOtp ? <>
            <VerifyOtp
               phoneNumber={verifyNumber}
               onSuccess={onSuccess}
            />
         </>
            : <>
               <div className="login-reg-form-wrap">
                  <h5>Sign In</h5>
                  <Form onFinish={onLogin} form={form}>
                     <div className="single-input-item">
                        <Form.Item
                           rules={[
                              { validator: checkEmailPhoneValidity },
                           ]}
                           name="email"
                        >
                           <Input size="large" placeholder="Enter email or 10 digit phone number" />
                        </Form.Item>
                     </div>

                     <div className="single-input-item">
                        <Form.Item
                           rules={[
                              {
                                 required: true,
                                 message: (
                                    <IntlMessages id="app.userAuth.Please input your Password!" />
                                 ),
                              },
                           ]}
                           name="password"
                        >
                           <Input.Password size="large" placeholder="Enter your Password" />
                        </Form.Item>
                     </div>
                     <div className="single-input-item">
                        <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                           <div className="remember-meta">
                              {<div className="custom-control custom-checkbox">
                                 <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="rememberMe"
                                 />
                                 <label
                                    className="custom-control-label"
                                    htmlFor="rememberMe"
                                    style={{
                                       textTransform: "unset",
                                       color: "#999"
                                    }}
                                 >
                                    Remember Me
                                 </label>
                              </div>}
                           </div>
                           <span style={{ cursor: "pointer" }} className="forget-pwd" onClick={() => setLoginWithPass(false)}>
                              Login with OTP?
                           </span>
                        </div>
                     </div>
                     <p
                        style={{
                           textTransform: "unset",
                           fontSize: 11,
                           marginTop: 10
                        }}
                     >
                        By continuing, I agree to Terms of Use & Privacy Policy of www.godachi.com
                     </p>
                     <div className="single-input-item">
                        <Form.Item>
                           <Button className="btn btn-cart2" htmlType="submit"
                              style={{ lineHeight: "35px", height: "35px", width: "170px", borderRadius: "5px" }}
                           >
                              Login
                           </Button>
                        </Form.Item>
                     </div>
                  </Form>
               </div></>
         }
      </>

   );
};

export default Default;
