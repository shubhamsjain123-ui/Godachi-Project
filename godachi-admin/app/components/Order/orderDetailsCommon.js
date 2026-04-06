import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, WEBSITE_URL, IMG_URL } from "../../../config/config";
import Link from "next/link";
import moment from "moment";
import {
  Button,
  message,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Radio,
  Drawer,
  Image
} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price"
const Default = ({
    openDrawer,
    setOpenDrawer,
    selectedOrderId
}) => {

  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const [shippingAddress, setShippingAddress] = useState(null)
  const [billingAddress, setBillingAddress] = useState(null)
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
                setBillingAddress(addresses.find((address)=>address.type=="billing"))
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

  if(!orderDetails)
    return(<></>)
  return (
    <Drawer 
        title="Order Details" 
        placement="right" 
        onClose={()=>setOpenDrawer(false)} 
        open={openDrawer}
        size="large"
    >
            <div>
                <Row gutter={12}>
                    <Col span={12}>
                        <h2>Order Details</h2>
                        <Row gutter={12}>
                            <Col span={8}>Order Number</Col>
                            <Col span={16}>#{orderDetails.orderNumber}</Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={8}>Order Placed</Col>
                            <Col span={16}>{moment(orderDetails.createdAt).format("DD MMMM YYYY | hh:mm: A")}</Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={8}>Order Status</Col>
                            <Col span={16}>{orderDetails?.orderStatus?.title}</Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={8}>Order Total</Col>
                            <Col span={16}><Price data={orderDetails.finalPrice} /></Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={8}>Payment Mode</Col>
                            <Col span={16}>{orderDetails.payment.paymentType=="cash"?"COD":"Prepaid"}</Col>
                        </Row>
                        {
                            orderDetails.couponCode &&
                            <Row gutter={12}>
                                <Col span={8}>Discount Coupone Used</Col>
                                <Col span={16}>{orderDetails.couponCode}</Col>
                            </Row>
                        }
                    </Col>
                    <Col span={12}>
                        <h2>Payment Details</h2>
                        {
                            orderDetails.products && orderDetails.products.map((product)=>{
                                var price = product.qty * product.total
                                return(
                                    <Row gutter={12}>
                                        <Col span={16}>
                                            {product.product.productName} <strong> × {product.qty}</strong>
                                        </Col>
                                        <Col span={8}><Price data = {price}/></Col>
                                    </Row>
                                )
                            })
                        }
                        <Row gutter={12}>
                            <Col span={16}>Products Total</Col>
                            <Col span={8}><strong><Price data={orderDetails.price} /></strong></Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={16}>Shipping</Col>
                            <Col span={8}><Price data={orderDetails.shippingCharge} /></Col>
                        </Row>
                        {
                            orderDetails.couponDiscount>0 &&
                            <Row gutter={12}>
                                <Col span={16}>Discount(-)</Col>
                                <Col span={8}><Price data = {orderDetails.couponDiscount}  /></Col>
                            </Row>
                        }
                        {
                            orderDetails.walletCredits>0 &&
                            <Row gutter={12}>
                                <Col span={16}>Wallet Credits(-)</Col>
                                <Col span={8}><Price data = {orderDetails.walletCredits}  /></Col>
                            </Row>
                        }
                        <Row gutter={12}>
                            <Col span={16}>Total Amount</Col>
                            <Col span={8}><Price data={orderDetails.payableAmount} /></Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24}>
                        <h2>Products ({orderDetails?.products?.length})</h2>
                        {
                            orderDetails?.products.map((product)=>{
                                const allImgData = product.product?.allImages?.filter((img)=>img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
                                const img = allImgData[0] ? IMG_URL + allImgData[0].image : IMG_URL+"/images/nofoto.jpg";
                          
                                return (
                                    <>
                                        <Row gutter={12}>
                                            <Col span={4}>
                                                <Image src={img} width="100%" />
                                            </Col>
                                            <Col span={20}>
                                                <div className="border">
                                                    <p>
                                                        <Link href={WEBSITE_URL +"/product/"+ product.product.seo}>
                                                            <a target="_blank">{`${product.variant.productCode} - ${product.product.productName} `}</a>
                                                        </Link> (qty: {product.qty})</p>
                                                    <p><Price data={product.total}/> </p>
                                                    {
                                                        product.orderReturn &&
                                                        <>
                                                            <h4>Return Details</h4>
                                                            <p><b>Request ID : #{product.orderReturn.returnNumber}</b></p>
                                                            <p>
                                                                {product.orderReturn.returnStatus.title}
                                                            </p>
                                                        </>
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        
                                    </>
                                    
                                )
                            })
                        }
                    </Col>
                </Row>
                <Row gutter={12}>
                {
                        shippingAddress &&
                        <Col span={12}>
                            <h2>Shipping Address</h2>
                            <h4>{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</h4>
                            <p> {`${shippingAddress.address}`}
                                <br />
                                {`${shippingAddress.city}, ${shippingAddress?.state?.name}`}
                                <br />
                                {`${shippingAddress.country}, ${shippingAddress.pinCode}`}
                            </p>
                            {
                                shippingAddress.landmark &&
                                <p> Landmark: {shippingAddress.landmark}</p>
                            }
                            <p>Mobile: ({shippingAddress.countryCode}) {shippingAddress.phoneNumber}</p>
                        </Col>
                    }
                    {
                        billingAddress &&
                        <Col span={12}>
                            <h2>Billing Address</h2>
                            <h4>{`${billingAddress?.firstName} ${billingAddress?.lastName}`}</h4>
                            <p> {`${billingAddress.address}`}
                                <br />
                                {`${billingAddress.city}, ${billingAddress?.state?.name}`}
                                <br />
                                {`${billingAddress.country}, ${billingAddress.pinCode}`}
                            </p>
                            {
                                billingAddress.landmark &&
                                <p> Landmark: {billingAddress.landmark}</p>
                            }
                            <p>Mobile: ({billingAddress.countryCode}) {billingAddress.phoneNumber}</p>
                        </Col>
                    }
                </Row>
        </div>
    </Drawer>
    
  );
};

export default Default;
