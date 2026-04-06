import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config/config";
import {
  Button,
  message,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Radio
} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price";
import OrderDetailsCommon from "./orderDetailsCommon";
const Default = ({
    selectedOrderId,
    onSuccess
}) => {

  const { user } = useSelector(({ login }) => login);

  const onCreateShipmentOrder = () =>{
   
    axios
      .post(`${API_URL}/orders/createShipmentOrder/${selectedOrderId}`, {
        directShipment:true
      })
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Status Updated Successfully");
          onSuccess();
        }
      })
      .catch((err) => console.log(err));
  }




  return (
    <div>       
        <p>
            Note: By clicking "Ship Order" button, you are shipping order manually and our system will not track any delivery status automatically. You need to update delivered status manually once product is delivered.    
        </p>   
        <Button type="primary" onClick={onCreateShipmentOrder}>
            Ship Order
        </Button>
    </div>
  );
};

export default Default;
