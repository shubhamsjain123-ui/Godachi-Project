import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import IntlMessages from "../../util/IntlMessages";
import authservice from "../../util/services/authservice";
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber } from 'react-phone-number-input'
import VerifyOTP from '../../app/components/Auth/VerifyOtp'
import { isAuthenticated_r, login_r, mergeBasket, updateWishlist_r } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../config/config";
import { setCookie } from "cookies-next";
import axios from "axios";
import Router from "next/router";

const VerifyMobile = ({ routeTo = null }) => {
    const [form] = Form.useForm();
    const [sentOtp, setSentOtp] = useState(false);
    const [phone, setPhone] = useState();
    const dispatch = useDispatch();

    const { basket } = useSelector((state) => state.basket);
    const { wishlist } = useSelector((state) => state.wishlist);

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

    const onSuccess = async (authResponse) => {
        // const { isAuthenticated, user } = authResponse;
        // dispatch(login_r(user));
        // dispatch(isAuthenticated_r(true));
        // dispatch(mergeBasket(basket));
        // message.success("Account Registered Successfully");
        // setCookie("iswebuser", true);
        // //wishlist merge
        // const wishlistMergeResponse = await axios.post(`${API_URL}/wishlist/customer`, wishlist);

        // if (wishlistMergeResponse.data) {
        //     if (wishlistMergeResponse.data.success) {
        //         dispatch(updateWishlist_r(wishlistMergeResponse.data.data));
        //     }
        // }

        // routeTo ? Router.push(routeTo) : null;

        Router.push('/signin')
    }

    const onSubmit = async (Data) => {
        console.log(phone, 'phone');
        if (isValidPhoneNumber(phone))
            var phoneNumber = formatPhoneNumber(phone);
        Data["phone"] = phone
        Data['type'] = '+91'
        console.log(Data, '-----------dta--------');
        authservice.reSendOtp(Data).then((data) => {
            if (data.error) {
                if (data.messagge) {
                    message.error(data.messagge);
                }
                if (data.message) {
                    message.error(data.message);
                }
            } else {
                setSentOtp(true)
            }
        })
    }

    if (sentOtp) {
        return (<>
            <VerifyOTP
                phoneNumber={phone}
                onSuccess={onSuccess}
            />
        </>)
    } else {
        return (<>
            <div className="login-register-wrapper section-padding">
                <div className="container">
                    <div className="member-area-from-wrap">
                        <div className="row">
                            {/* Login Content Start */}
                            <div className="number-container">
                                <div className="col-lg-6">
                                    <div className="login-reg-form-wrap">
                                        <h5>Verify Your Mobile Number</h5>
                                        <Form onFinish={onSubmit} form={form}>
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
                                                <div className="single-input-item">
                                                    <Form.Item>
                                                        <Button className="btn btn-cart2" htmlType="submit"
                                                            style={{ lineHeight: "35px", height: "35px", width: "170px", borderRadius: "5px" }}
                                                        >
                                                            Send Otp
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}
export default VerifyMobile;