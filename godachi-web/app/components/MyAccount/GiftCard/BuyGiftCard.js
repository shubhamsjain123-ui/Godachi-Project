import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {Row, Col, Form, Button, InputGroup } from "react-bootstrap"
import { isValidPhoneNumber  } from 'react-phone-number-input'
import { message } from "antd";
import axios from "axios";
import { API_URL } from "../../../../config/config";
import useRazorpay from "react-razorpay";
import { useRouter } from 'next/router'

const Defaut = () => {
    const Razorpay = useRazorpay();
    const router = useRouter()
    const { isAuthenticated, user } = useSelector(({ login }) => login);
    const [validated, setValidated] = useState(false);
    const initialFormState = {
        amount: 500,
        receiverName:"",
        receiverEmail:"",
        receiverPhoneNumber:"",
        receiverCountryCode:"+91",
        receiverMessage:""
    }
    const [defaultFormData, setDefaultFormData] = useState(initialFormState)

    const handlePaymentResponse = async (type, gifCardId, result) =>{
        if(isAuthenticated){
            axios
            .post(`${API_URL}/customers/onPlaceGiftCardOrder`, {
                gifCardId: gifCardId,
                type: type,
                result: result
            })
            .then(async (response) => {
                if(response.data.success){
                    message.success({ content: "Gift Card Successfully sent to receiver email/mobile", duration: 3 });
                    setValidated(false);
                    setDefaultFormData(initialFormState);
                    router.reload(window.location.pathname)
                }
                else{
                    message.error({ content: "Some Error occurred. Please Try again later", duration: 3 });
                }
            })
            .catch((err) => {
                message.error({
                    content: "Some Error, Please Try Again",
                    duration: 3,
                });
                console.log(err);
            });
        }
    }

    const handleSubmit = async(event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if(!isValidPhoneNumber(defaultFormData.receiverCountryCode+defaultFormData.receiverPhoneNumber)){
            message.error("Please Enter a valid Phone Number")
            return;
        }
        if (form.checkValidity() === false) {
            
        }
        else{
            try{
                var response = await axios.post(`${API_URL}/customers/createGiftCardOrder`, defaultFormData);
                if(response.data){
                    
                    if(response.data.variant=="success"){
                        var orderPaymentDetails = response.data.result;
                        if(orderPaymentDetails?.paymentGatewayOrderDetails?.success){
                            handlePayment(orderPaymentDetails);
                        }
                        else{
                            message.error({ content: "Some Error occurred. Please Try again later", duration: 3 });
                        }
                    }
                    else if(response.data.variant=="error"){
                        message.error(response.data.messagge);
                    }
                }
            }
            catch(error){
                message.error(error.message)
            }
        }
        
    }

    const handlePayment = useCallback((giftCardOrder) => {
        var redirectPaymentUrl = giftCardOrder.paymentGatewayOrderDetails?.data?.instrumentResponse?.redirectInfo?.url;
        if(redirectPaymentUrl){
            window.location.href = redirectPaymentUrl;
        }
      }, [isAuthenticated]);

    /* const handlePaymentRazorpay = useCallback((giftCardOrder) => {
        var gifCardId = giftCardOrder._id;
        var prefillData = {}
        if(isAuthenticated){
            prefillData.name = user.name;
            if(user.email)
                prefillData.email = user.email;
            if(user.phone){
                prefillData.contact = user.phone;
            }
        }
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: giftCardOrder.amount*100,
          currency: "INR",
          name: "Godachi",
          description: "Gift Card Transaction",
          image: "http://godachi.com/assets/img/logo/logo.png",
          order_id: giftCardOrder.paymentGatewayOrderDetails.order_id,
          handler: (res) => {
            handlePaymentResponse("success", gifCardId, res)
          },
          prefill: prefillData,
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
    
        const rzpay = new Razorpay(options);
        rzpay.on("payment.failed", function (response) {
            handlePaymentResponse("error", gifCardId, response.error)
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
        });
        rzpay.open();
    }, [Razorpay]); */

   return (
      <>
        <div className="gift-card" style={{}}>
            <h4 className="contact-title">Buy a Gift Card</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="single-input-item">
                    <Row>
                        <Col md={4}>
                            <Form.Label>Gift Card Amount</Form.Label>
                        </Col>
                        <Col md={8}>
                            <InputGroup >
                                <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
                                <Form.Control required type="number" placeholder="Enter Amount" value={defaultFormData.amount} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, amount:value})} />
                            </InputGroup>
                            
                        </Col>
                    </Row>
                    
                    
                </Form.Group>
                <Form.Group className="single-input-item">
                    {/* <Form.Label>Receiver Name</Form.Label> */}
                    <Form.Control required type="text" placeholder="Receiver Name" value={defaultFormData.receiverName} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, receiverName:value})} />
                </Form.Group>
                <Form.Group className="single-input-item">
                    {/* <Form.Label>Receiver Email</Form.Label> */}
                    <Form.Control required type="email" placeholder="Receiver Email" value={defaultFormData.receiverEmail} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, receiverEmail:value})} />
                    <Form.Control.Feedback type="invalid">
                        Please Enter Valid Email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Row>
                    <Col md={4}>
                        <Form.Group className="single-input-item">
                           {/*  <Form.Label>Country Code</Form.Label> */}
                            <Form.Control required type="text" placeholder="Country Code" value={defaultFormData.receiverCountryCode} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, receiverCountryCode:value})} />
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <Form.Group className="single-input-item">
                            {/* <Form.Label>Mobile</Form.Label> */}
                            <Form.Control required type="tel" placeholder="Receiver Mobile" value={defaultFormData.receiverPhoneNumber} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, receiverPhoneNumber:value})} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Valid Mobile.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="single-input-item">
                    {/* <Form.Label>Message</Form.Label> */}
                    <Form.Control required as="textarea" rows={3} placeholder="Enter Message" value={defaultFormData.receiverMessage} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, receiverMessage:value})} />
                </Form.Group>
                <button className="btn btn-sqr mt-3">
                    Buy Now
                </button>
            </Form>
        </div>
        
      </>
   );
};

export default Defaut;
