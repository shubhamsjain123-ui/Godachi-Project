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
const Default = ({
    selectedOrderId,
    selectedPaymentMode,
    defaultRefundPrice,
    onSuccess
}) => {

  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  


  const onSubmit = (Data) => {
    Data["created_user"] = { name: user.name, id: user.id };
    axios
      .post(`${API_URL}/orders/processRefund/${selectedOrderId}`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success( res.data.messagge);
          onSuccess();
          form.resetFields();
        }
      })
      .catch((err) => console.log(err));
  };




  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(()=>{
    form.resetFields();
  },[selectedOrderId])

  useEffect(()=>{
    form.setFieldsValue({refundAmount:defaultRefundPrice});
  },[defaultRefundPrice])


  return (
    <div>
       
       <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          scrollToFirstError
        >
           <Form.Item
            name="refundAmount"
            label="Refund Amount"
            rules={[
                {
                    required: true,
                    message: "Please enter a value",
                }
            ]}
          >
            <InputNumber 
              addonBefore="₹" 
              //defaultValue  = {defaultRefundPrice} 
              style={{width:"100%"}}
            />
          </Form.Item>
          {
            selectedPaymentMode=="cash" &&
            <Form.Item
              name="refundType"
              label="Transfer Amount To"
              rules={[
                  {
                      required: true,
                      message: "Please Select an Option",
                  }
              ]}
            >
              <Radio.Group>
                <Radio value="wallet">Customer Wallet</Radio>
                <Radio value="bank">Manually Transfer To Customer Bank Account </Radio>
              </Radio.Group>
            </Form.Item>
          }
          
          <Form.Item>
              <Button type="primary" htmlType="submit">
              Initiate Refund
              </Button>
          </Form.Item>
        </Form>
        
    </div>
  );
};

export default Default;
