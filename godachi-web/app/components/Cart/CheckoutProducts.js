import { Input, Form, Button } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price";
import { IMG_URL } from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
const Default = (props) => {
    const {
        ...cartProduct
    } = props;
    const { basket } = useSelector((state) => state.basket);
    return (
        <>
            <div className="row border m-2 p-2 checkoutProduct">
                <div className="col-md-2">
                    {/* <img
                        className="img-fluid"
                        src={cartProduct.img ? IMG_URL + cartProduct.img : "/images/nofoto.jpg"}
                        alt="Product"
                    /> */}
                    <Image
                        className="img-fluid"
                        src={cartProduct.img ? IMG_URL + cartProduct.img : "/images/nofoto.jpg"}
                        alt="Product"
                        width={60}
                        height={60}
                    />
                </div>
                <div className="col-md-7">
                    <Link href={`/product/${cartProduct.seo}`}>
                        <a>{cartProduct.title}</a>
                    </Link>
                    <div className="d-flex justify-content-between">
                        <div>
                            <b>QTY:</b> {cartProduct.qty}
                            <div>
                                <b><Price data={cartProduct.total} /></b>
                                {
                                    cartProduct.discount > 0 &&
                                    <span className="ps-2"><del><Price data={cartProduct.offerPrice} /></del></span>
                                }
                            </div>
                        </div>


                    </div>


                </div>
                <div className="col-md-3">
                    <div className="text-end"><b><Price data={cartProduct.total * cartProduct.qty} /></b></div>
                    <div className="d-flex justify-content-end">
                        {
                            cartProduct.discount > 0 &&
                            <div className="productCouponCode">
                                <i className="fa fa-tag pe-2"></i>
                                {basket.couponCode}
                            </div>
                        }
                    </div>

                </div>
            </div>
        </>

    );
};

export default Default;
