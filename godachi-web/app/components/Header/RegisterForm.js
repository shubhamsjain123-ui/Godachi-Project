import { useState } from "react";
import { Input, Form, Button, Select, Divider, message } from "antd";
import { useIntl } from "react-intl";
import AuthService from "../../../util/services/authservice";
import { setCookie } from "cookies-next";
import axios from "axios";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated_r, login_r, updateBasket_r, updateWishlist_r, mergeBasket } from "../../../redux/actions";
import { API_URL } from "../../../config/config";
import IntlMessages from "../../../util/IntlMessages";

import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber } from 'react-phone-number-input'
import VerifyOTP from "../Auth/VerifyOtp"
const Default = ({ routeTo = null }) => {

   const dispatch = useDispatch();
   const { isAuthenticated } = useSelector((state) => state.login);
   if (isAuthenticated) {
      var routeUrl = routeTo ? routeTo : "/"
      Router.push(routeUrl);
   }
   const { basket } = useSelector((state) => state.basket);
   const { wishlist } = useSelector((state) => state.wishlist);

   const intl = useIntl();
   const [form] = Form.useForm();
   const [state, seTstate] = useState();
   const [phone, setPhone] = useState();
   const [otpSent, setOtpSent] = useState(false);

   const onSuccess = async (authResponse) => {
      const { isAuthenticated, user } = authResponse;
      dispatch(login_r(user));
      dispatch(isAuthenticated_r(true));
      dispatch(mergeBasket(basket));
      message.success("Account Registered Successfully");
      setCookie("iswebuser", true);
      //wishlist merge
      const wishlistMergeResponse = await axios.post(`${API_URL}/wishlist/customer`, wishlist);

      if (wishlistMergeResponse.data) {
         if (wishlistMergeResponse.data.success) {
            dispatch(updateWishlist_r(wishlistMergeResponse.data.data));
         }
      }
      //cart merge
      /*  const cartMergeResponse =  await axios.post(`${API_URL}/basket/customer`, basket);
       if(cartMergeResponse.data){
          if(cartMergeResponse.data.success){
             dispatch(updateBasket_r(cartMergeResponse.data.data));
          }
       } */
      routeTo ? Router.push(routeTo) : null;
   };

   const onSubmitSignup = (Data) => {
      Data["email"] = Data?.email?.toLowerCase();
      Data["origPhoneInput"] = phone;
      var phoneNumber = formatPhoneNumber(phone);
      Data["phone"] = phoneNumber;
      Data["country"] = "IN";
      Data["countryCode"] = "91";
      AuthService.register(Data).then((data) => {
         if (data.error) {
            if (data.messagge) {
               message.error(data.messagge);
            }
            if (data.message) {
               message.error(data.message);
            }
         }
         else {
            setOtpSent(true);
            //form.resetFields();
            //message.success(data.messagge);
         }
      });

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
   if (otpSent) {
      return (
         <>
            <VerifyOTP
               phoneNumber={phone}
               onSuccess={onSuccess}
            />
         </>
      );
   }
   else {
      return (
         <>
            <div className="login-reg-form-wrap sign-up-form">
               <h5>Signup Form</h5>
               <Form onFinish={onSubmitSignup} form={form}>
                  <div className="single-input-item">
                     <Form.Item
                        name="name"
                        rules={[
                           {
                              required: true,
                              message: intl.messages["app.pages.common.pleaseFill"],
                              whitespace: true,
                           },
                        ]}
                     >
                        <Input placeholder="Full Name" />
                     </Form.Item>
                  </div>
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
                     <Form.Item
                        name="email"
                        rules={[
                           {
                              type: "email",
                              message: "The input is not valid E-mail!",
                           }
                        ]}
                     >
                        <Input placeholder="Enter your Email" />
                     </Form.Item>
                  </div>

                  <div className="row">
                     <div className="col-lg-6">
                        <div className="single-input-item">
                           <Form.Item
                              name="password"
                              rules={[
                                 {
                                    message: intl.messages["app.pages.common.inputNotValid"],
                                 },
                              ]}
                              hasFeedback
                           >
                              <Input.Password placeholder="Enter your Password" />
                           </Form.Item>
                           {/* <input
                        type="password"
                        placeholder="Enter your Password"
                        required=""
                        /> */}
                        </div>
                     </div>
                     <div className="col-lg-6">
                        <div className="single-input-item">
                           <Form.Item
                              name="confirm"
                              dependencies={["password"]}
                              hasFeedback
                              rules={[
                                 {
                                    message: intl.messages["app.pages.common.inputNotValid"],
                                 },
                                 ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                       if (!value || getFieldValue("password") === value) {
                                          return Promise.resolve();
                                       }
                                       return Promise.reject(
                                          intl.messages["app.pages.common.passwordNotMatch"]
                                       );
                                    },
                                 }),
                              ]}
                           >
                              <Input.Password placeholder="Repeat your Password" />
                           </Form.Item>
                        </div>
                     </div>
                  </div>
                  <div className="single-input-item">
                     <div className="login-reg-form-meta">
                        <div className="remember-meta">
                           {<div className="custom-control custom-checkbox">
                              <input
                                 type="checkbox"
                                 className="custom-control-input"
                                 id="subnewsletter"
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="subnewsletter"
                                 style={{
                                    textTransform: "unset",
                                    color: "#999"
                                 }}
                              >
                                 Subscribe Our Newsletter
                              </label>
                           </div>}
                        </div>
                     </div>
                  </div>
                  <div className="single-input-item">
                     <Form.Item>
                        <Button className="btn btn-cart2" htmlType="submit"
                           style={{ lineHeight: "35px", height: "35px", width: "170px", borderRadius: "5px" }}
                        >
                           Register
                        </Button>
                     </Form.Item>
                  </div>
               </Form>
            </div>
         </>
      );
   }

};

export default Default;
