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
  const [form] = Form.useForm();

  const [shippingAddress, setShippingAddress] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)
  const [shipmentList, setShipmentList] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [parcelDetails, setParcelDetails] = useState(null)
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
  
  const getOrderDetails = async () =>{
    try{
        var axiosResponse = await axios.get(`${API_URL}/orders/${selectedOrderId}`)
        if(axiosResponse && axiosResponse.data){
            var response = axiosResponse.data;
            if(response?.variant=="error"){
                
            }
            else{
                var addresses = response.address;
                setShippingAddress(addresses.find((address)=>address.type=="shipping"))
                setOrderDetails(response)
            }
        }
    }
    catch(error){

    }
  }

  const onSubmit = (Data) => {
    Data["created_user"] = { name: user.name, id: user.id };
    setSelectedShipment(null);
    axios
      .post(`${API_URL}/orders/fetchShipmentRate/${selectedOrderId}`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Fetched Successfully");
          setParcelDetails(Data);
          setShipmentList(res.data.data.filter((logistic)=>logistic.rev_pickup == "Y"))
          //onSuccess();
          //form.resetFields();
        }
      })
      .catch((err) => console.log(err));
  };

  const onCreateShipmentOrder = () =>{
    if(!selectedShipment){
        message.error("Please Select one logistics");
        return 
    }
    if(!parcelDetails){
        message.error("Please enter valid parcel details");
        return 
    }
    axios
      .post(`${API_URL}/orders/createShipmentOrder/${selectedOrderId}`, {
        ...parcelDetails,
        shipment: selectedShipment,
        directShipment: false
      })
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Status Updated Successfully");
          
          onSuccess();
          form.resetFields();
          setOrderDetails(null);
          setShipmentList([]);
          setSelectedShipment(null);
          setParcelDetails(null);
        }
      })
      .catch((err) => console.log(err));
  }


  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(() => {
    if(selectedOrderId)
        getOrderDetails()
  }, [selectedOrderId]);
  useEffect(() => {
    console.log(shippingAddress)
  }, [shippingAddress]);

  return (
    <div>
        <OrderDetailsCommon selectedOrderId={selectedOrderId} />
       
        <h2>Parcel Size</h2>
       <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          scrollToFirstError
        >
          <Row gutter={12}>            
            <Col span={4}>
              <Form.Item
                name="length"
                label="Length (cm)"
                rules={[
                    {
                        required: true,
                        message: "Please enter a value",
                    }
                ]}
              >
                <InputNumber addonAfter="cm"/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="width"
                label="Width (cm)"
                rules={[
                    {
                        required: true,
                        message: "Please enter a value",
                    }
                ]}
              >
                <InputNumber addonAfter="cm"/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="height"
                label="Height (cm)"
                rules={[
                    {
                        required: true,
                        message: "Please enter a value",
                    }
                ]}
              >
                <InputNumber addonAfter="cm"/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="weight"
                label="Weight (kg)"
                rules={[
                    {
                        required: true,
                        message: "Please enter a value",
                    }
                ]}
              >
                <InputNumber addonAfter="kg"/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="eway_bill"
                label="EWay Bill"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label="Action">
                    <Button type="primary" htmlType="submit">
                    Fetch Shipment
                    </Button>
                </Form.Item>
            </Col>
          </Row>
          
        </Form>
        {
            shipmentList && shipmentList.length>0 &&
            <>
                <h2>Select Logistics</h2>
                <Radio.Group
                    options={shipmentList.map((shipment)=>{
                        return {
                            label: <>{shipment.logistic_name} ( <Price data={shipment.rate} /> )</>,
                            value: shipment.logistic_name
                        }
                    })}
                    onChange={({target:{value}})=>setSelectedShipment(value)}
                    optionType="button"
                    buttonStyle="solid"
                />
                <Button type="primary" onClick={onCreateShipmentOrder}>
                    Create Shipment Order
                </Button>
                <Row>
                    {
                        shipmentList.map((shipment)=>{
                            return (
                                <>
                                    {/* <Col span={6}>
                                        <p>{shipment.logistic_name}</p>
                                        <p><Price data={shipment.rate} /></p>
                                    </Col> */}
                                    
                                </>
                                
                            )
                        })
                    }
                    
                </Row>
            </>
            
            
        }
    </div>
  );
};

export default Default;
