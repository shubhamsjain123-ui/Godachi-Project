import { useState, useRef } from "react";
import { Input, Form, Button, Select, Divider, message } from "antd";
import { useIntl } from "react-intl";
import AuthService from "../../../util/services/authservice";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber } from 'react-phone-number-input'
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import Countdown from 'react-countdown';
import { isAuthenticated_r, login_r } from "../../../redux/actions";
import Router from "next/router";

const Default = ({
    phoneNumber,
    onSuccess
}) => {
    const dispatch = useDispatch();
    const AuthInputRef = useRef(null);
    const [enableResend, setEnableResend] = useState(false)
    const [otp, setOtp] = useState(null);
    const onResendOtp = async () => {
        // AuthService.sendOtp(phoneNumber, "resend").then((data) => {
        //     if (data.error) {
        //         message.error(data.messagge);
        //     }
        //     else {
        //         setEnableResend(false);
        //         AuthInputRef.current?.clear()
        //         message.success(`OTP successfully sent to ${phoneNumber}`);
        //     }
        // });

        AuthService.reSendOtp({ "phone": phoneNumber, "type": "+91" }).then((data) => {
            if (data.error) {
                message.error(data.messagge);
            }
            else {
                setEnableResend(false);
                AuthInputRef.current?.clear()
                message.success(`OTP successfully sent to ${phoneNumber}`);
            }
        });

    }

    const verifyOtp = () => {
        if (!otp || otp?.length < 6) {
            return message.error("Please Enter valid OTP");
        }
        AuthService.verifyOtp(phoneNumber, otp).then((data) => {
            if (data.error) {
                message.error(data.messagge);
                AuthInputRef.current?.clear()
            }
            else {
                onSuccess(data)
            }
        });
    }
    if (!phoneNumber)
        return (<></>)
    return (
        <>
            <div className="login-reg-form-wrap sign-up-form">
                <h5>Verify Mobile OTP</h5>
                <p
                    style={{
                        textAlign: "center",
                        marginTop: 25,
                        marginBottom: 25
                    }}
                >OTP Sent to mobile number {phoneNumber}</p>

                <div className="verify-otp">
                    <p style={{
                        color: "#bbb"
                    }}>Enter OTP</p>
                    <AuthCode
                        onChange={(code) => setOtp(code)}
                        ref={AuthInputRef}
                    />
                    <p style={{
                        color: "#bbb"
                    }}>
                        Haven't received the OTP?

                    </p>
                    {
                        enableResend ?
                            <p
                                style={{ textDecoration: "underline", fontWeight: 700, cursor: "pointer" }}
                                onClick={() => onResendOtp()}
                            >
                                Resend OTP
                            </p>
                            :
                            <p>
                                <span style={{ fontWeight: 700, color: "#bbb", paddingRight: 5 }}>
                                    Resend in
                                </span>
                                <Countdown
                                    date={Date.now() + 120000}
                                    zeroPadTime={2}
                                    renderer={({ minutes, seconds }) => {
                                        return <span style={{ color: "#bbb", fontWeight: 700 }}>{minutes}:{seconds}</span>
                                    }}
                                    onComplete={() => setEnableResend(true)}
                                />
                            </p>
                    }


                    <Button className="btn btn-cart2" htmlType="submit"
                        style={{ marginTop: 50, lineHeight: "35px", height: "35px", width: "170px", borderRadius: "5px" }}
                        onClick={() => verifyOtp()}
                    >
                        Verify OTP
                    </Button>
                </div>

            </div>
        </>
    );


};

export default Default;
