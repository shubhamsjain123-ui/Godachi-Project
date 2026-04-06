import { Input, Form, Button } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price";
const Default = (props) => {
    const {
        ...cartProduct
    } = props;

   return (
    <tr>
        <td>
            <a href="product-details.html">
            <span className="text-truncate">{cartProduct.title} </span><strong> × {cartProduct.qty}</strong>
            </a>
        </td>
        <td><Price data = {cartProduct.total*cartProduct.qty} /></td>
    </tr>
    
   );
};

export default Default;
