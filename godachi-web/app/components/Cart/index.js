import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Form, Button, message } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import ProductHeader from "./productHeader";
import ProductRow from "./productRow";
import CartPrice from "./CartPrice";
import Price from "../Price";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import func from "../../../util/helpers/func";
import { getBasket_r, updateBasket_r, updateBasketFromProduct } from "../../../redux/actions";
import Coupon from "./Coupon"
import CustomizeJewellery from "../Forms/CustomizeJewellery"
import Image from "next/image";

const Default = (props) => {

    const { basket } = useSelector((state) => state.basket);
    const { isAuthenticated, user } = useSelector(({ login }) => login);
    const [state, seTstate] = useState([]);
    const [isLoaded, seTisLoaded] = useState(false);
    const [totalCartProductPrice, setTotalCartProductPrice] = useState(0);
    const [showCustomizeJewellery, setShowCustomizeJewellery] = useState(false);
    const dispatch = useDispatch();

    const basketProductUpdate = (post, messageStr = "Product Update!") => {
        message.success({ content: messageStr, duration: 3 });
        dispatch(updateBasketFromProduct(post));
    };

    const deleteProduct = (dataRecord) => {
        seTisLoaded(true);
        const productsDataArray = basket.products;
        productsDataArray = productsDataArray.filter((product) => product.selectedVariant != dataRecord.selectedVariant)

        const post = {
            ...basket,
            products: productsDataArray
        };

        basketProductUpdate(post, "Product Removed from Cart!");
    };

    const plusProduct = (dataRecord) => {
        seTisLoaded(true);
        const productsDataArray = basket.products;
        var selectedProductIndex = productsDataArray.findIndex((cartProduct) => cartProduct.selectedVariant === dataRecord.selectedVariant)
        if (selectedProductIndex != -1) {
            var oldQuantity = productsDataArray[selectedProductIndex].qty;
            productsDataArray[selectedProductIndex].qty = parseInt(oldQuantity) + 1;
        }

        const post = {
            ...basket,
            products: productsDataArray
        };

        basketProductUpdate(post);
    };

    const notPlusProduct = (dataRecord) => {
        seTisLoaded(true);
        const productsDataArray = basket.products;
        var selectedProductIndex = productsDataArray.findIndex((cartProduct) => cartProduct.selectedVariant === dataRecord.selectedVariant)
        if (selectedProductIndex != -1) {
            var oldQuantity = productsDataArray[selectedProductIndex].qty;
            if (oldQuantity > 1) {
                productsDataArray[selectedProductIndex].qty = parseInt(oldQuantity) - 1;
            }
            else {
                productsDataArray = productsDataArray.filter((product) => product.selectedVariant != dataRecord.selectedVariant)
            }
        }

        const post = {
            ...basket,
            products: productsDataArray
        };
        basketProductUpdate(post);
    };

    if (basket?.products.length == 0) {
        return (
            <>
                <section className="policy-section section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <div className="policy-list">
                                    <h3 className="policy-title">Sorry! No item found. </h3>
                                    <p>
                                        If you want any customize jewellery :
                                        <a href="javascript:void(0)"
                                            onClick={() => setShowCustomizeJewellery(true)}
                                        >
                                            Click Here.
                                        </a>
                                    </p>
                                </div>
                                <div className="policy-list">
                                    <h3 className="policy-title">OR</h3>
                                    <p>
                                        Write us your requirement at <a href="mailto:contact@godachi.com">contact@godachi.com</a>.
                                    </p>
                                </div>
                                {/* policy list end */}
                            </div>
                            <div className="col-6">
                                {/* <img src="assets/img/no-item.png" /> */}
                                <Image src="/assets/img/no-item.png" width={300} height={200} />

                            </div>
                        </div>
                    </div>
                </section>
                <CustomizeJewellery
                    show={showCustomizeJewellery}
                    setShow={setShowCustomizeJewellery}
                />
            </>
        )
    }
    else {
        return (
            <div className="cart-main-wrapper section-padding">
                <div className="container">
                    <div className="section-bg-color">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* Cart Table Area */}
                                <div className="cart-table table-responsive">
                                    <table className="table table-bordered">
                                        <ProductHeader />
                                        <tbody>
                                            {
                                                basket?.products?.length > 0 &&
                                                basket.products.map((cartProductList) => {
                                                    return (
                                                        <ProductRow
                                                            {...cartProductList}
                                                            deleteProduct={deleteProduct}
                                                            plusProduct={plusProduct}
                                                            notPlusProduct={notPlusProduct}
                                                        />
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* Cart Update Option */}
                                <div className="cart-update-option d-block d-md-flex justify-content-between">
                                    <Coupon />
                                    {/* <div className="cart-update">
                                <a href="#" className="btn btn-sqr">
                                Update Cart
                                </a>
                            </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-5 ml-auto">
                                <CartPrice />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default Default;
