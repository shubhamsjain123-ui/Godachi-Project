import { Input, Form, Button } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price";
import { IMG_URL } from "../../../config/config";
import Image from "next/image";
const Default = (props) => {
    const {
        deleteProduct,
        plusProduct,
        notPlusProduct,
        ...cartProduct
    } = props;

    return (
        <tr>
            <td className="pro-thumbnail">
                <a href="#">
                    {/* <img
                        className="img-fluid"
                        src={cartProduct.img ? IMG_URL + cartProduct.img : "/images/nofoto.jpg"}
                        alt="Product"
                    /> */}
                    <Image
                        className="img-fluid"
                        src={cartProduct.img ? IMG_URL + cartProduct.img : "/images/nofoto.jpg"}
                        alt="cart-product"
                        width={100}
                        height={100}
                    />
                </a>
            </td>
            <td className="pro-title">
                <Link href={`/product/${cartProduct.seo}`}>
                    <a>{cartProduct.title}</a>
                </Link>
                {
                    cartProduct?.maxQuantity &&
                    <div class="text-danger">Only {cartProduct?.maxQuantity} products available in stock</div>
                }
            </td>
            <td className="pro-price">
                {
                    cartProduct.discount > 0 &&
                    <div><del className="text-secondary"><Price data={cartProduct.offerPrice} /></del></div>
                }
                <div><Price data={cartProduct.total} /></div>

            </td>
            {/* <td className="pro-quantity">
            <div className="pro-qty">
                <input type="text" defaultValue={props.qty} />
            </div>
        </td> */}
            <td className="pro-quantity">
                <div className="pro-qty">
                    <span className="dec qtybtn" onClick={() => notPlusProduct(cartProduct)}>-</span>
                    <input type="text" value={cartProduct.qty} />
                    <span className="inc qtybtn" onClick={() => plusProduct(cartProduct)}>+</span>
                </div>

            </td>
            <td className="pro-subtotal">
                <span><Price data={cartProduct.total * cartProduct.qty} /></span>
            </td>
            <td className="pro-remove">
                <a onClick={() => deleteProduct(cartProduct)}>
                    <i className="fa fa-trash-o" />
                </a>
            </td>
        </tr>
    );
};

export default Default;
