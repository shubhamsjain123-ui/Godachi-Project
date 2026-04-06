import { useState, useCallback } from "react";
import { Input, Form, Button, Select, Divider, message } from "antd";
const { TextArea } = Input;
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { API_URL } from "../../../config/config";

import axios from "axios";
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber } from 'react-phone-number-input'
import Link from "next/link";


const Default = ({
    show,
    setShow,
    routeTo = null
}) => {

    const intl = useIntl();
    const [form] = Form.useForm();
    const [phone, setPhone] = useState();
    const [ckeckterms, setCheckterm] = useState()
    const [check, setCheck] = useState(true)
    const checkHandler = (e) => {
        setCheckterm(e.target.checked)
        setCheck(e.target.checked)
        console.log(ckeckterms);

        if (e.target.checked) {
            message.success({ content: "Accepted the Terms of Use & Privacy Policy of www.godachi.com", duration: 3 });
        }
    }

    const onSubmit = async (Data) => {
        Data["email"] = Data?.email?.toLowerCase();
        Data["origPhoneInput"] = phone;
        var phoneNumber = formatPhoneNumber(phone);
        Data["phone"] = phoneNumber;
        Data["country"] = "IN";
        Data["countryCode"] = "91";
        if (ckeckterms && check) {
            try {

                var axiosResponse = await axios.post(`${API_URL}/customers/contactRequest/`, Data)
                if (axiosResponse && axiosResponse.data) {
                    var response = axiosResponse.data;
                    if (!response.success) {
                        message.error(response.messagge);
                    }
                    else {
                        message.success("Request Sent Successfully");
                        form.resetFields();
                        setShow(false)
                    }
                }
            }
            catch (error) {
                message.error("Some error occured. Please try again after some time")
            }
        }

        console.log(Data);
        return

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
    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Write to Us</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onFinish={onSubmit} form={form}>
                        <div className="row">
                            <div className="col-lg-12">
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




                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <Form.Item
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        type: "email",
                                                        message: "The input is not valid E-mail!",
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="Enter your Email" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <Form.Item
                                                name="phone"
                                                rules={[
                                                    { validator: checkPhoneValidity },
                                                ]}
                                            >
                                                <PhoneInput
                                                    country="IN"
                                                    placeholder="Enter 10 digit mobile number"
                                                    value={phone}
                                                    onChange={setPhone} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>

                                <div className="single-input-item">
                                    <Form.Item
                                        name="type"
                                        rules={[
                                            {
                                                required: true,
                                                message: intl.messages["app.pages.common.pleaseFill"],
                                                whitespace: true,
                                            },
                                        ]}
                                        valuePropName="value"
                                    >
                                        <select >
                                            <option>Please Select</option>
                                            <option value="Support">Support</option>
                                            <option value="Feedback">Feedback</option>
                                            <option value="Complain">Complain</option>
                                            <option value="General">General</option>
                                        </select>
                                    </Form.Item>

                                </div>

                                <div className="single-input-item">
                                    <Form.Item
                                        name="comments"
                                    >
                                        <TextArea placeholder="Comments /Instructions" />
                                    </Form.Item>
                                </div>


                            </div>
                        </div>

                        <div className="single-input-item">
                            <div className="login-reg-form-meta ">
                                <div className="">
                                    <Form.Item
                                        name="terms"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Accept Terms & Privacy Policy",

                                            },
                                        ]}
                                    >
                                        {<div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="subnewsletter"
                                                onChange={checkHandler}
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="subnewsletter"
                                                style={{
                                                    textTransform: "unset",
                                                    color: "#999"
                                                }}
                                            >
                                                I agree to Terms of Use &
                                                <a href='/privacy-policy' target="blank"> Privacy Policy </a> of <b style={{ color: "#000" }}>www.godachi.com</b>
                                            </label>
                                        </div>}
                                    </Form.Item>
                                </div>
                            </div>
                            {check ? "" : <p style={{ color: "red" }}>Accept Terms & Privacy Policy </p>}
                        </div>
                        <div className="single-input-item">
                            <Form.Item>
                                <Button className="btn btn-cart2" htmlType="submit"
                                    style={{ lineHeight: "35px", height: "35px", width: "170px", borderRadius: "5px" }}
                                >
                                    Send Request
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );

};

export default Default;
