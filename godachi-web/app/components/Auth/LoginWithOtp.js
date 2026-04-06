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
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber } from 'react-phone-number-input'
import VerifyOtp from "../Auth/VerifyOtp";
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

   const [phone, setPhone] = useState();
   const [otpSent, setOtpSent] = useState(false);

   const onSendOtp = async () => {
      AuthService.sendOtp(phone, "send").then((data) => {
         if (data.error) {
            // message.error(data.messagge);
            // if (isValidPhoneNumber(Data["email"])) {
            authservice.reSendOtp({ phone, type: "+91" }).then((data) => {
               if (data.error) {
                  if (data.messagge) {
                     message.error(data.messagge);
                  }
                  if (data.message) {
                     message.error(data.message);
                  }
               } else {
                  setOtpSent(true)
               }
            })
            // }
         }
         else {
            setOtpSent(true);
            message.success(`OTP successfully sent to ${phone}`);
         }
      });

   }

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

   if (otpSent) {
      return (
         <>
            <VerifyOtp
               phoneNumber={phone}
               onSuccess={onSuccess}
            />
         </>
      )
   }
   return (
      <div className="login-reg-form-wrap">
         <h5>Sign In</h5>
         <Form onFinish={onSendOtp} form={form}>
            <div className="single-input-item">
               <Form.Item
                  name="phone"
                  rules={[
                     { validator: checkPhoneValidity },
                  ]}
               >
                  <PhoneInput
                     country="IN"
                     placeholder="Enter 10 digit phone number"
                     value={phone}
                     onChange={setPhone} />
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
                  <span style={{ cursor: "pointer" }} className="forget-pwd" onClick={() => setLoginWithPass(true)}>
                     Login with password?
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
                     Send OTP
                  </Button>
               </Form.Item>
            </div>
         </Form>
      </div>

   );
};

export default Default;
