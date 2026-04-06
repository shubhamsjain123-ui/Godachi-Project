import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import useRazorpay from "react-razorpay";
import { Input, Button, message } from "antd";
import { Form } from "react-bootstrap";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import ProductHeader from "./productHeader";
import ProductRow from "./productRow";
import CartPrice from "./CartPrice";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import CheckoutAddress from "./CheckoutAddress";
import Price from "../Price";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import func from "../../../util/helpers/func";
import { resetBasket, updateBasket_r, updateBasketFromProduct } from "../../../redux/actions";
import dynamic from "next/dynamic";
import Router from "next/router";
import { getCookie } from "cookies-next";

const LoginForm = dynamic(() => import("../Header/LoginForm"));
const RegisterForm = dynamic(() => import("../Header/RegisterForm"));
let timeInterval = "";
const Default = (props) => {
    const Razorpay = useRazorpay();
    const { basket } = useSelector((state) => state.basket);
    const { isAuthenticated, user } = useSelector(({ login }) => login);
    const kuchhBhi = useSelector(({ login }) => login);
    const [state, seTstate] = useState([]);
    const [isLoaded, seTisLoaded] = useState(false);
    const [totalCartProductPrice, setTotalCartProductPrice] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);
    const [usableCredits, setUsableCredits] = useState(0);
    const [billingAddress, setBillingAddress] = useState(null)
    const [shippingAddress, setShippingAddress] = useState(null)
    const [shipToDiffAddress, setShipToDiffAddress] = useState(false)
    const [showError, setShowError] = useState(false);
    const [validated, setValidated] = useState(false);
    //const [orderId, setOrderId] = useState(null);
    const dispatch = useDispatch();
    const basketProductUpdate = async (post, messageStr = "Product Update!") => {
        message.success({ content: messageStr, duration: 3 });
        await dispatch(updateBasketFromProduct(post));
    };
    const fetchWalletBalance = async () => {
        try {
            var walletResponse = await axios.get(`${API_URL}/customers/getMyWalletBalance`);
            if (walletResponse?.data?.variant == "success") {
                setWalletBalance(walletResponse.data.result)
            }
            else {
                setWalletBalance(0);
            }
        }
        catch (error) {
            setWalletBalance(0);
        }
    }

    const placeOrder = async () => {
        var token = await getCookie("access_token_user");

        if (isAuthenticated) {

            try {
                var placeOrderResponse = await axios.post(`${API_URL}/payment/placeOrder`, user)
                if (placeOrderResponse.data.success) {

                    var orderPaymentDetails = placeOrderResponse.data.result;
                    if (orderPaymentDetails.paymentType == "cash" || orderPaymentDetails.paymentAmount == 0) {
                        message.success({ content: "Order Placed Successfully", duration: 3 });
                        dispatch(resetBasket());
                        Router.push("/profile/orders")
                    }
                    else if (orderPaymentDetails.paymentType == "gateway" && orderPaymentDetails?.paymentGatewayOrderDetails?.success) {
                        handlePayment(orderPaymentDetails);
                    }
                    else {
                        message.error({ content: "Some Error occurred. Please Try again later", duration: 3 });
                    }
                    seTisLoaded(false);
                }
                else {
                    message.error({ content: "Some Error occurred. Please Try again later", duration: 3 });
                }
            }
            catch (err) {
                message.error({
                    content: "Some Error, Please Try Again",
                    duration: 3,
                });
                console.log(err);
            }

        }
    }

    const onPlaceOrder = async (event) => {

        const thisForm = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (thisForm.checkValidity() === false) {
            setShowError(true)
        }
        else {
            setShowError(false)
            /* var formTarget = event.target;
            var paymentType = formTarget?.paymentmethod?.value;
            console.log(paymentType);
            var {_id, ...basketShippingAddress} = shippingAddress;
            var {_id, ...basketBillingAddress} = billingAddress;
            var basketDetails = {
                ...basket,
                shipping_address: basketShippingAddress,
                billing_address: basketBillingAddress,
                paymentType: paymentType,
                shipToDiffAddress: shipToDiffAddress
            }
            await basketProductUpdate(basketDetails); */
            placeOrder();
        }
        setValidated(true);

    }

    const handlePaymentResponse = async (type, orderId, result) => {
        if (isAuthenticated) {
            axios
                .post(`${API_URL}/payment/updatePaymentResponse`, {
                    orderId: orderId,
                    type: type,
                    result: result
                })
                .then(async (response) => {
                    if (response.data.success) {
                        message.success({ content: "Order Placed Successfully", duration: 3 });
                        await dispatch(resetBasket());
                        Router.push("/profile/orders")
                        seTisLoaded(false);
                    }
                    else {
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

    const handlePayment = useCallback((orderPaymentDetails) => {
        var redirectPaymentUrl = orderPaymentDetails.paymentGatewayOrderDetails?.data?.instrumentResponse?.redirectInfo?.url;
        console.log(redirectPaymentUrl);
        if (redirectPaymentUrl) {
            window.location.href = redirectPaymentUrl;
        }
    }, [isAuthenticated]);

    /* const handlePaymentRazorpay = useCallback((orderPaymentDetails) => {
        var orderId = orderPaymentDetails.order;
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
          amount: Math.round(orderPaymentDetails.paymentAmount * 100),
          currency: "INR",
          name: "Godachi",
          description: "Test Transaction",
          image: "http://godachi.com/assets/img/logo/logo.png",
          order_id: orderPaymentDetails.paymentGatewayOrderDetails.id,
          handler: (res) => {
            console.log("---------------on payment response-----------------------");
            console.log(res);
            handlePaymentResponse("success", orderId, res)
          },
          prefill: prefillData,
          notes: {},
          theme: {
            color: "#3399cc",
          },
        };
        const rzpay = new Razorpay(options);
        rzpay.on("payment.failed", function (response) {
            console.log("---------------on payment failed-----------------------");
            handlePaymentResponse("error", orderId, response.error)
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
        });
        rzpay.open();
      }, [Razorpay, isAuthenticated]); */

    /* useEffect(() => {
        getProducts();
    }, [basket]); */

    useEffect(() => {

        if (shipToDiffAddress == false) {
            setShippingAddress(billingAddress)
        }
    }, [shipToDiffAddress, billingAddress])


    useEffect(() => {
        var billing_address = billingAddress ? billingAddress : {};
        var shipping_address = shipToDiffAddress ? (shippingAddress ? shippingAddress : {}) : billingAddress;
        clearTimeout(timeInterval);
        timeInterval = setTimeout(() => {
            dispatch(updateBasketFromProduct({
                ...basket,
                shipping_address: shipping_address,
                billing_address: billing_address,
                shipToDiffAddress: shipToDiffAddress,
            })
            )
        }, 2000);
    }, [shipToDiffAddress, billingAddress, shippingAddress]);

    useEffect(() => {
        dispatch(updateBasketFromProduct(basket));
        if (isAuthenticated) {
            fetchWalletBalance();
        }
    }, [])

    useEffect(() => {
        var canUse = walletBalance;
        if (walletBalance > basket.finalPrice) {
            canUse = basket.finalPrice
        }
        setUsableCredits(canUse);
    }, [walletBalance, basket])




    return (
        <>
            <div className="checkout-page-wrapper section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Checkout Login Coupon Accordion Start */}
                            <div className="checkoutaccordion" id="checkOutAccordion">
                                {
                                    !isAuthenticated &&
                                    <div className="card returningCustomerDiv">
                                        <h6>
                                            Returning Customer?{" "}
                                            <span
                                                data-bs-toggle="collapse"
                                                data-bs-target="#logInaccordion"
                                            >
                                                Click Here To Login
                                            </span>
                                        </h6>
                                        <div
                                            id="logInaccordion"
                                            className="collapse"
                                            data-parent="#checkOutAccordion"
                                        >
                                            <div className="card-body">

                                                <div className="row">
                                                    {/* Login Content Start */}
                                                    <div className="col-lg-6">
                                                        <LoginForm />
                                                    </div>
                                                    {/* Login Content End */}
                                                    {/* Register Content Start */}
                                                    <div className="col-lg-6">
                                                        <RegisterForm />
                                                    </div>
                                                    {/* Register Content End */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                            {/* Checkout Login Coupon Accordion End */}
                        </div>
                    </div>
                    <Form onSubmit={onPlaceOrder} noValidate validated={validated}>
                        <div className="row">
                            {/* Checkout Billing Details */}
                            <div className="col-lg-6">
                                <CheckoutAddress title="Billing Address" setParentAddress={setBillingAddress} />
                                {
                                    showError && !basket.shipToDiffAddress && !basket.isShippable &&
                                    <div className="alert alert-danger mt-2">Please Enter a valid pincode. Currently, this pincode is not servable.</div>
                                }
                                <div className="single-input-item">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="ship_to_different"
                                            onClick={(event) => { setShipToDiffAddress(event.target.checked) }}
                                        />
                                        <label className="custom-control-label" for="ship_to_different">Ship to a
                                            different address?</label>
                                    </div>
                                </div>
                                {
                                    shipToDiffAddress &&
                                    <CheckoutAddress setParentAddress={setShippingAddress} />
                                }
                                {
                                    showError && basket.shipToDiffAddress && !basket.isShippable &&
                                    <div className="alert alert-danger mt-2">Please Enter a valid pincode. Currently, this pincode is not servable.</div>
                                }
                            </div>
                            {/* Order Summary Details */}
                            <div className="col-lg-6">
                                <CheckoutOrderSummary usableCredits={usableCredits} showError={showError} />
                            </div>
                        </div>
                    </Form>

                </div>
            </div>

        </>

    );
};

export default Default;
