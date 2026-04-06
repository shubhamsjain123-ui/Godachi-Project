import { Input, Form, Button } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import AddProductButton from "../Cart/AddProductButton";
import Price from "../Price";
const Default = (props) => {
    const {removeWishlist} = props;
    const removeFromWishlist = ()=>{
        removeWishlist(props.selectedVariant)
    }
   return (
    <tr>
        <td className="pro-thumbnail">
            <a href="#">
                <img
                className="img-fluid"
                src={props.image}
                alt="Product"
                />
            </a>
        </td>
        <td className="pro-title">
            <Link href={`/product/${props.seo}`}>
                <a>{props.title}</a>
            </Link>
        </td>
        <td className="pro-price">
            <span><Price data = {props.price} /></span>
        </td>
        <td className="pro-quantity">
            {
                props.inStock
                ?<span className="text-success">In Stock</span>
                :<span className="text-danger">Out of Stock</span>
            }
        </td>
        <td className="pro-subtotal">
            {
                props.inStock
                ?
                <AddProductButton 
                    state={props.product}
                    selectedVariant={props.variantDetails}
                    displayPage="wishlist"
                />
                :null
            }
            
        </td>
        <td className="pro-remove">
            <a onClick={removeFromWishlist}>
                <i className="fa fa-trash-o" />
            </a>
        </td>
    </tr>
   );
};

export default Default;
