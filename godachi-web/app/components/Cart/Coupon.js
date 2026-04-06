import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateBasketFromProduct } from "../../../redux/actions";
import ApplyCoupon from "./ApplyCoupon"
const Default = (props) => {
    const { basket } = useSelector((state) => state.basket);
    const dispatch = useDispatch();
    const [showCouponModal, setShowCouponModal] = useState(false);

    const onRemoveCoupon = async () => {
        await dispatch(updateBasketFromProduct({
            ...basket,
            couponCode: null
        }));
    }

    return (
        <>
            <div className="apply-coupon-wrapper">
                {
                    basket?.products.length > 0 &&
                    <div className="d-block d-md-flex justify-content-between" >
                        {
                            basket.couponCode &&
                            <>
                                <div className="appliedCouponCode">
                                    <i className="fa fa-tag pe-2"></i>
                                    {basket.couponCode}
                                    <i className="fa fa-times ps-3"
                                        onClick={() => onRemoveCoupon()}
                                    ></i>
                                </div>
                            </>

                        }

                        <button className="btn btn-sqr viewCouponButton" onClick={() => setShowCouponModal(true)}>Apply Coupon</button>
                    </div>
                }

            </div>
            <ApplyCoupon
                showCouponModal={showCouponModal}
                setShowCouponModal={setShowCouponModal}
            />
        </>

    );
};

export default Default;
