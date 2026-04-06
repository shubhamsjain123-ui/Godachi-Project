import { useState, useCallback } from "react";
import { Input, Form, Button, Select, Divider, message } from "antd";
const { TextArea } = Input;
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { API_URL } from "../../../config/config";

import axios from "axios";
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber } from 'react-phone-number-input'

import { useDropzone } from 'react-dropzone';
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
const getColor = (props) => {
    if (props.isDragAccept) {
        return "#00e676";
    }
    if (props.isDragReject) {
        return "#ff1744";
    }
    if (props.isFocused) {
        return "#2196f3";
    }
    return "#eeeeee";
};
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const Default = ({
    show,
    setShow,
    routeTo = null
}) => {
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
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
    }, [])
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        maxFiles: 3,
        accept: {
            'image/*': [],
        },
        onDrop
    });
    const acceptedFileItems = acceptedFiles.map((file, index) => (
        <li key={index}>
            {/* <img src={URL.createObjectURL(file)} width={80} /> */}
            <Image src={URL.createObjectURL(file)} width={80} height={50} loading="lazy" />
            {console.log(file, '------file')}
            <div className="upload-file-name">
                {/* {file.path.substring(0, 40)}... */}
                {
                    file.path.length > 40
                        ?
                        <> {file.path.replace(file.type.replace("image/", ""), "").substring(0, 40)}...{file.type.replace("image/", "")}</>
                        :
                        <>{file.path}</>
                }
            </div>
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors, index }) => (
        <li key={index}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e, ind) => (
                    <li key={ind}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const intl = useIntl();
    const [form] = Form.useForm();
    const [phone, setPhone] = useState();


    const onSubmit = async (Data) => {
        Data["email"] = Data.email.toLowerCase();
        Data["origPhoneInput"] = phone;
        var phoneNumber = formatPhoneNumber(phone);
        Data["phone"] = phoneNumber;
        Data["country"] = "IN";
        Data["countryCode"] = "91";
        if (ckeckterms && check) {
            try {
                if (acceptedFiles.length > 0) {
                    const formData = new FormData();
                    for (let i = 0; i < acceptedFiles.length; i += 1) {
                        formData.append('image', acceptedFiles[i]);
                    }

                    const dataImage = await axios.post(
                        `${API_URL}/upload/uploadReturnImage`,
                        formData,
                        { headers: { "Content-Type": "multipart/form-data" } }
                    );
                    Data["images"] = dataImage.data?.path?.map((filePath) => filePath.replace(/\\/g, '/').replace("../admin/public/", "/"))
                }
                var axiosResponse = await axios.post(`${API_URL}/customers/customizeJewelleryRequest/`, Data)
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
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Customize Your Jewellery</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onFinish={onSubmit} form={form}>
                        <div className="row">
                            <div className="col-lg-8">
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
                                        name="productCode"
                                    >
                                        <Input placeholder="ProductCode" />
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
                            <div className="col-lg-4">
                                <div className="mt-3">
                                    <Container {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop image files here, or click to select files</p>
                                        <em>(Only image files will be accepted)</em>
                                    </Container>
                                </div>
                                <aside>

                                    {
                                        acceptedFileItems.length > 0 &&
                                        <>
                                            <h4>Uploaded Images</h4>
                                            <ul>{acceptedFileItems}</ul>
                                        </>
                                    }
                                    {
                                        fileRejectionItems.length > 0 &&
                                        <>
                                            <h4>Rejected files</h4>
                                            <ul>{fileRejectionItems}</ul>
                                        </>
                                    }
                                </aside>
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
