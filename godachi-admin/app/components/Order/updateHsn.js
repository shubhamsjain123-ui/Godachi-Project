import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import {
  Button,
  message,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Image,
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
  const [form] = Form.useForm();
  const [orderDetails, setOrderDetails] = useState(null)
  const getOrderDetails = async () =>{
    try{
        var axiosResponse = await axios.get(`${API_URL}/orders/${selectedOrderId}`)
        if(axiosResponse && axiosResponse.data){
            var response = axiosResponse.data;
            if(response?.variant=="error"){
                
            }
            else{
                setOrderDetails(response)
            }
        }
    }
    catch(error){

    }
  }

  useEffect(() => {
    if(selectedOrderId)
        getOrderDetails()
  }, [selectedOrderId]);
  const onSubmit = (data) =>{
    axios
      .post(`${API_URL}/orders/updateHsn/${selectedOrderId}`, data)
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

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };


  return (
    <div>       
        <Row gutter={12}>
            <Col span={24}>
                <h2>Products ({orderDetails?.products?.length})</h2>
                <Form
                    layout="vertical"
                    form={form}
                    name="add"
                    onFinishFailed={onFinishFailed}
                    onFinish={onSubmit}
                    scrollToFirstError
                >
                    {
                        orderDetails?.products.map((product)=>{
                            const allImgData = product.product?.allImages?.filter((img)=>img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
                            const img = allImgData[0] ? IMG_URL + allImgData[0].image : IMG_URL+"/images/nofoto.jpg";
                        
                            return (
                                <>
                                    <Row gutter={12}>
                                        <Col span={2}>
                                            <Image src={img} width="100%" />
                                        </Col>
                                        <Col span={16}>
                                            <div className="border">
                                                <p>
                                                    {`${product.variant.productCode} - ${product.product.productName} `}
                                                </p>
                                                <p><Price data={product.total}/> </p>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name={product._id}
                                                label="HSN Code"
                                                initialValue={product.hsnCode?product.hsnCode:"7113"}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    
                                    
                                </>
                                
                            )
                        })
                    }  
                    <Form.Item label="Action">
                        <Button type="primary" htmlType="submit">
                        Save HSN Codes
                        </Button>
                    </Form.Item>  
                </Form>
                
            </Col>
        </Row>
    </div>
  );
};

export default Default;
