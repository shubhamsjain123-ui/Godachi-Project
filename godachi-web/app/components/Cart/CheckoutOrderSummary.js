import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Form, Button, message } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import ProductHeader from "./productHeader";
import CheckoutProductRow from "./CheckoutProductRow";
import CheckoutProducts from "./CheckoutProducts";
import CheckoutCartPrice from "./CheckoutCartPrice";
import ApplyCoupon from "./ApplyCoupon";
import Price from "../Price";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import func from "../../../util/helpers/func";
import { getBasket_r, updateBasket_r, updateBasketFromProduct } from "../../../redux/actions";


const Default = ({
    usableCredits,
    showError,
}) => {

    const { basket } = useSelector((state) => state.basket);
    const { isAuthenticated, user } = useSelector(({ login }) => login);
    const [state, seTstate] = useState([]);
    const [isLoaded, seTisLoaded] = useState(false);
    const [totalCartProductPrice , setTotalCartProductPrice] = useState(0);
    const [showCouponModal, setShowCouponModal] = useState(false);
    const dispatch = useDispatch();

    const useWalletBalance = (value)=>{
        dispatch(updateBasketFromProduct({
            ...basket,
            useWalletCredits: value
        }))
    }
    const updatePaymentType = (value) =>{
        dispatch(updateBasketFromProduct({
            ...basket,
            paymentType: value
        }))
    }
    const onRemoveCoupon = async()=>{
        await dispatch(updateBasketFromProduct({
            ...basket,
            couponCode: null
        }));
    }

    return (
        <>
            <div className="order-summary-details">
                <h5 className="checkout-title">Your Order Summary</h5>
                <div className="order-summary-content">
                    {/* Order Summary Table */}
                    <div className="order-summary-table table-responsive p-3">
                        <h5 className="m-2 pb-2 border-bottom">Product Details</h5>
                        {
                    basket?.products?.length>0 &&
                    basket.products.map((cartProductList)=>{
                                return (
                                    <CheckoutProducts
                                        {...cartProductList}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="checkoutaccordion mt-4 mb-0" id="checkOutAccordion">
                        <div className="card">
                            <h6 className="d-flex justify-content-between">
                                Have A Coupon?
                                <span
                            onClick={()=>setShowCouponModal(true)}
                                >
                                    Click Here To Enter Your Code
                                </span>
                            </h6>
                            {
                                basket.couponCode &&
                                <div style={{
                            backgroundColor:"#f7f7f7",
                                    paddingLeft: "20px",
                            paddingBottom:"15px"
                                }}>
                                    <div className="appliedCouponCode">
                                        <i className="fa fa-tag pe-2"></i>
                                        {basket.couponCode}
                                        <i className="fa fa-times ps-3"
                                    onClick={()=>onRemoveCoupon()}
                                        ></i>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    {
                usableCredits>0 &&
                        <div className="checkoutaccordion mt-4 mb-0" id="checkOutAccordion">
                            <div className="card">
                                <h6 className="d-flex justify-content-between">
                                    Use Wallet Balance
                                    <span>
                                        <div className="single-input-item m-0">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="useWalletBalance"
                                                    checked={basket.useWalletCredits}
                                            onClick={(event)=>{useWalletBalance(event.target.checked)}}
                                                />
                                                <label className="custom-control-label" for="useWalletBalance">
                                                    <strong><Price data={usableCredits} /></strong>
                                                </label>
                                            </div>
                                        </div>
                                    </span>
                                </h6>
                            </div>
                        </div>
                    }

                    {/*  {
                usableCredits>0 &&
                <div className="order-summary-table table-responsive p-3">
                    <div className="d-flex justify-content-between">
                        <h6 className="">Use Wallet Balance</h6>
                        <div className="single-input-item m-0">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="useWalletBalance"
                                    checked={basket.useWalletCredits}
                                    onClick={(event)=>{useWalletBalance(event.target.checked)}}
                                />
                                <label className="custom-control-label" for="useWalletBalance">
                                    <strong><Price data={usableCredits} /></strong>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                </div>
            } */}



                    <div className="order-summary-table table-responsive">
                        <CheckoutCartPrice />
                    </div>
                    {/* Order Payment Method */}
                    <div className="order-payment-method">
                        {
                    basket.payableAmount>0 &&
                            <>
                                <div className="single-payment-method show">
                                    <div className="payment-method-name">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="cashon"
                                                name="paymentmethod"
                                                defaultValue="cash"
                                                className="custom-control-input"
                                    checked={basket.paymentType=="cash"?true:false}
                                    onClick={()=>updatePaymentType("cash")}
                                            />
                                            <label className="custom-control-label" htmlFor="cashon">
                                                Cash On Delivery
                                            </label>
                                        </div>
                                    </div>
                                    <div className="payment-method-details" data-method="cash">
                                        <p>Pay with cash upon delivery.</p>
                                    </div>
                                </div>
                                <div className="single-payment-method show">
                                    <div className="payment-method-name">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="paymentgatewayon"
                                                name="paymentmethod"
                                                value="gateway"
                                                className="custom-control-input"
                                        checked={basket.paymentType=="gateway"?true:false}
                                        onClick={()=>updatePaymentType("gateway")}
                                            />
                                            <label className="custom-control-label" htmlFor="paymentgatewayon">
                                                Prepaid Order
                                            </label>
                                        </div>
                                    </div>
                                    <div className="payment-method-details" data-method="gateway">
                                        <p>Pay with cash upon delivery.</p>
                                    </div>
                                </div>
                            </>
                        }

                        <div className="summary-footer-area">
                            <div className="custom-control custom-checkbox mb-20">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="terms"
                                    required=""
                                    defaultChecked="checked"
                                />
                                <label className="custom-control-label" htmlFor="terms">
                                    I have read and agree to the website{" "}
                                    <Link href="/terms-and-conditions">
                                        <a target="_blank">terms and conditions.</a>
                                    </Link>
                                </label>
                            </div>
                            {
                                !isAuthenticated &&
                                <div className="alert alert-danger mt-2"><b>Please login / signup to place order</b></div>
                            }
                            {
                                showError && !basket.isShippable &&
                                <div className="alert alert-danger mt-2"><b>Please Enter a valid pincode to proceed</b></div>
                            }

                            {
                                // isAuthenticated && basket.isShippable &&
                                <button type="submit" className="btn btn-sqr">
                                    Place Order
                                </button>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <ApplyCoupon
                showCouponModal={showCouponModal}
                setShowCouponModal={setShowCouponModal}
            />
        </>

    );
};

export default Default;
