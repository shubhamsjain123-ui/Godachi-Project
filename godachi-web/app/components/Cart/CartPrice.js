import { Input, Form, Button } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price";

const Default = (props) => {
    const { basket } = useSelector((state) => state.basket);
   return (
    <div className="cart-calculator-wrapper">
        <div className="cart-calculate-items">
            <h6>Cart Totals</h6>
            <div className="table-responsive">
            <table className="table">
                <tbody>
                <tr>
                    <td>Sub Total</td>
                    <td><Price data = {basket.price} /></td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td><Price data = {basket.shippingCharge} /></td>
                </tr>
                {
                    basket.couponDiscount>0 &&
                    <tr className="total">
                        <td>Discount</td>
                        <td><Price data = { basket.couponDiscount } /></td>
                    </tr>
                }
                <tr className="total">
                    <td>Total</td>
                    <td className="total-amount"><Price data = { basket.finalPrice } /></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        <Link href="/cart/checkout">
            <a className="btn btn-sqr d-block">
                Proceed Checkout
            </a>
        </Link>
        
    </div>
   );
};

export default Default;
