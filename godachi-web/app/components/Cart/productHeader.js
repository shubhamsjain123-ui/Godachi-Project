import { Input, Form, Button } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";

const Default = (props) => {
   

   return (
    <thead>
        <tr>
            <th className="pro-thumbnail">Thumbnail</th>
            <th className="pro-title">Product</th>
            <th className="pro-price">Price</th>
            <th className="pro-quantity">Quantity</th>
            <th className="pro-subtotal">Total</th>
            <th className="pro-remove">Remove</th>
        </tr>
    </thead>
   );
};

export default Default;
