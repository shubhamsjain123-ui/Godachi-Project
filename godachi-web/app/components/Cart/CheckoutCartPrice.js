import { Input, Form, Button } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price";
import { useDispatch, useSelector } from "react-redux";

const Default = () => {
    const { basket } = useSelector((state) => state.basket);
   return (
        <>
            <div className="p-3">
                <h5 className="m-2 pb-2 border-bottom"> Payment Information</h5>
                <table className="table table-bordered">
                    <tfoot>
                        <tr>
                            <td>Value of Product(s)</td>
                            <td className="cartPriceData">
                                <strong><Price data = {basket.price}  /></strong>
                            </td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td className="cartPriceData">
                                <strong><Price data = {basket.shippingCharge}  /></strong>
                            </td>
                        </tr>
                        {
                            basket.couponDiscount>0 &&
                            <tr>
                                <td className="text-success">Discount(-)</td>
                                <td className="cartPriceData text-success">
                                    <strong><Price data = {basket.couponDiscount}  /></strong>
                                </td>
                            </tr>
                        }
                        {
                            basket.walletCredits>0 &&
                            <tr>
                                <td className="text-success">Wallet Credits(-)</td>
                                <td className="cartPriceData text-success">
                                    <strong><Price data = {basket.walletCredits}  /></strong>
                                </td>
                            </tr>
                        }
                        <tr>
                        <td>Total Amount</td>
                        <td className="cartPriceData">
                            <strong><Price data = {basket.payableAmount}  /></strong>
                        </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
        </>
        
    
   );
};

export default Default;
