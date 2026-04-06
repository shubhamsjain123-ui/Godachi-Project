import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL, IMG_URL } from "../../../../config/config";
import { useSelector } from "react-redux";
import Link from "next/link";
import OrderRow from "./OrderRow";
import Price from "../../Price"
import moment from "moment";
import TrackOrder from "./TrackOrder"
import ReturnOrder from "./ReturnOrder"
import CancelOrder from "./CancelOrder"
import CancelReturn from "./CancelReturn"
import WriteReview from "../../ProductDetail/WriteReview"
import ReturnStepperStep from "./returnStepperStep"
const Defaut = ({
    orderId
}) => {
    const { user } = useSelector((state) => state.login);
    const [orderDetails, setOrderDetails] = useState([]);
    const [showTrackOrder, setShowTrackOrder] = useState(false)
    const [showReturnOrder, setShowReturnOrder] = useState(false)
    const [showWriteReview, setShowWriteReview] = useState(false)
    const [showCancelOrder, setShowCancelOrder] = useState(false)
    const [showCancelReturn, setShowCancelReturn] = useState(false)
    const [cancelReturnId, setCancelReturnId] = useState(false)
    const [cancelReturnNumber, setCancelReturnNumber] = useState(false)
    const [selectedReviewProduct, setSelectedReviewProduct] = useState(null)

  const getOrders = async () => {
    await axios
    .post(`${API_URL}/orders/myOrder/${orderId}`, { })
    .then((res) => {
      console.log(res.data)
      setOrderDetails(res.data);
    })
    .catch((error)=>{

    })
  };

  useEffect(()=>{
    getOrders();
  },[])

  if(!orderDetails)
    return (<></>)
  else
   return (
      <>
     {/*   <div className="tab-pane fade show active" id="orders" role="tabpanel">
      <div className="myaccount-content">
        <h5>Order Details</h5>
        <div className="ordercontainer">
            <div className="order_details_container clearfix">
                <div className="ord_no  float-start">
                    <ul>
                        <li className="ord_no_li">
                            <span className="ord_no_heading onum comWidth">Order Number</span>
                            <span className="cntr-colon">:</span>
                            <span className="ord_no_value">{orderDetails.orderNumber}</span>
                        </li>
                        <li className="ord_no_li">
                            <span className="ord_no_heading onum comWidth">Order Placed</span>
                            <span className="cntr-colon">:</span>
                            <span className="ord_no_value">{moment(orderDetails.createdAt).format("ddd, do MMM YY, hh:mm A")}</span>
                        </li>
                        <li className="ord_no_li">
                            <span className="ord_no_heading onum comWidth">Order Status</span>
                            <span className="cntr-colon">:</span>
                            <span className="ord_no_value">Delivered</span>
                        </li>
                        <li className="ord_no_li">
                            <span className="ord_no_heading onum comWidth">Order Total </span>
                            <span className="cntr-colon">:</span>
                            <span className="ord_no_value"><Price data={orderDetails.total_price} /></span>
                        </li>
                    </ul>
                </div>
                <div className="float-end">hi</div>
            </div>
            <div className="d-flex border clearfix mt-3">
                <div className="p-2 col-md-9">
                <table className="table">
                    <tbody>
                    {
                        orderDetails?.products?.map((product)=>{
                        const allImgData = product.product?.allImages?.filter((img)=>img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
                        const img = allImgData[0] ? IMG_URL + allImgData[0].image : "/images/nofoto.jpg";
                        return (
                            <tr>
                                <td>
                                    <img src={img} />
                                </td>
                                <td style={{ textAlign: "left" }}>
                                    <a href="#">
                                        {product.product.productName}
                                    </a>{" "}
                                    ({product.qty})
                                    <br />
                                    <span><Price data={product.variant.grandTotal} /></span> <span>(Paid)</span> <br />
                                    <span className="clrblk"> No Return</span>{" "}
                                    <span className="clrblk"> | Exchange Processed</span>
                                </td>
                                <td>
                                <a
                                    className="btn btn-cart2"
                                    href="#product-details-variable.html#"
                                    style={{
                                    backgroundColor: "#ff6f52", marginBottom: "10px",
                                        lineHeight: "35px",
                                    height: "35px",
                                    width: "170px",
                                }}
                                >
                                    Track Package
                                </a>
                                </td>
                        </tr>
                        )
                        })
                    }
                    
                    </tbody>
                </table>
                </div>
            </div>
            <div className="pmt-head-content mt-3">
                <div className="pmt_head ">Payment Information</div>
                <div className="pay_dtl devParentContainer">
                    <div className="addr_dtl">
                        <div className="shipping_addr">Shipping Address</div>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    </div> */}
    
        {/* Single Tab Content Start */}
        <div className="tab-pane fade show active" id="orders" role="tabpanel">
            <div className="myaccount-content" style={{ background: "#fdfdfd" }}>
            <h5>
                Order Details{" "}
                <Link href="/profile/orders">
                    <a
                        style={{ float: "right", fontWeight: "normal", fontSize: 14 }}
                    >
                    &lt;-Back to Orders
                    </a>
                </Link>
                
            </h5>
            <div className="myaccount-table table-responsive text-center">
                <div
                className="d-flex head clearfix"
                style={{ justifyContent: "space-around" }}
                ></div>
                <div
                className="d-flex bodybox clearfix"
                style={{ background: "#f9f9f9" }}
                >
                <div className="p-2 col-md-9">
                    <table className="table">
                    <tbody>
                        <tr>
                        <td>Order Number</td>
                        <td style={{ textAlign: "left" }}>#{orderDetails.orderNumber}</td>
                        </tr>
                        <tr>
                        <td>Order Placed</td>
                        <td style={{ textAlign: "left" }}>
                            {moment(orderDetails.createdAt).format("DD MMMM YYYY | hh:mm: A")}
                        </td>
                        </tr>
                        <tr>
                        <td>Order Status</td>
                        <td style={{ textAlign: "left" }}>{orderDetails?.orderStatus?.title}</td>
                        </tr>
                        <tr>
                        <td>Order Total</td>
                        <td style={{ textAlign: "left" }}>
                            <Price data={orderDetails.finalPrice} />
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className="p-3 col-md-3 d-flex flex-column">
                    {
                        orderDetails.waybill &&
                        <a
                        className="btn btn-cart2"
                        onClick={()=>{
                            setShowTrackOrder(true);
                        }}
                        style={{
                            backgroundColor: "#ff6f52", marginBottom: "10px",
                            lineHeight: "35px",
                            height: "35px",
                            width: "170px",
                        }}
                        >
                        Track Package
                        </a>
                    }
                    {
                        orderDetails.isDelivered && 
                        moment().diff(moment(orderDetails.deliveredOn), 'days')<=7 &&
                        <a
                        className="btn btn-cart2"
                        style={{ lineHeight: "35px", marginBottom: "10px", height: "35px", width: "170px",padding: "0 15px" }}
                        onClick={()=>{
                            setShowReturnOrder(true);
                        }}
                        >
                        Return items
                        </a>
                    }
                    {
                        orderDetails.isShipped!=true && orderDetails.isCancelled!=true &&
                        <a
                            className="btn btn-cart2"
                            onClick={()=>setShowCancelOrder(true)}
                            style={{
                                marginBottom: 10,
                                height: 35,
                                width: 170
                            }}
                        >
                            Cancel Order
                        </a>
                    }
                    {
                        orderDetails.isDelivered==true &&
                        <a
                            className="btn btn-cart2"
                            href={`${API_URL}/orders/invoice/${orderId}`}
                            target={"_blank"}
                            style={{
                                backgroundColor: "#457a78",
                                height: 35,
                                width: 170,
                                marginBottom: 10,
                            }}
                        >
                            <i className="fa fa-cloud-download" /> Invoice
                        </a>
                    }
                    {
                        orderDetails?.refunds?.length>0 &&
                        orderDetails.refunds.map((refund, index)=>{
                            if(refund.creditNoteGenerated==true){
                                return(
                                    <a
                                            className="btn btn-cart2 creditNoteButton"
                                            href={`${API_URL}/orders/creditNote/${refund.return.returnNumber}`}
                                            target={"_blank"}
                                            style={{
                                                backgroundColor: "#ff6f52",
                                                height: 35,
                                                width: 170,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <i className="fa fa-cloud-download" /> Credit Note-{index+1}
                                        </a>
                                )
                            }
                            return <></>
                        })
                    }
                </div>
                </div>
            </div>
            
                {
                    orderDetails?.products && orderDetails.products.map((product)=>{
                        const allImgData = product.product?.allImages?.filter((img)=>img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
                        const img = allImgData[0] ? IMG_URL + allImgData[0].image : "/images/nofoto.jpg";
                            
                        return(
                            <div className="myaccount-table table-responsive text-center">
                                <div
                                className="d-flex head clearfix"
                                style={{ justifyContent: "space-around" }}
                                >
                                {
                                    orderDetails.isDelivered && moment().diff(moment(orderDetails.deliveredOn), 'days')<=7 && 
                                    !product.orderReturn &&
                                    
                                    <div className="winbox">
                                        <i className="fa fa-pencil-square-o pe-2" />  
                                        Return untill {moment(orderDetails.deliveredOn).add("7","days").format("DD-MMM-YY")}
                                        <Link href="/return-exchange-policy">
                                            <a className="ps-2">Return Policy</a>
                                        </Link>
                                       
                                    </div>
                                }
                                {
                                    orderDetails.isDelivered && moment().diff(moment(orderDetails.deliveredOn), 'days')>7 &&
                                    <div className="winbox">
                                        <i className="fa fa-pencil-square-o  pe-2" />  
                                        Return window expires on {moment(orderDetails.deliveredOn).add("7","days").format("DD-MMM-YY")}
                                        <Link href="/return-exchange-policy">
                                            <a className="ps-2">Return Policy</a>
                                        </Link>
                                    </div>
                                }
                                
                                </div>
                                <div className="d-flex bodybox clearfix">
                                <div className="p-2 col-md-9">
                                    <table className="table">
                                    <tbody>
                                        <tr>
                                        <td>
                                            <img src={img} />
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                            <Link href={`/product/${product.product.seo}`} target="_blank">
                                                <a>
                                                    {`${product.variant.productCode} - ${product.product.productName} `}
                                                </a> 
                                            </Link>
                                            (Quantity : {product.qty})
                                            
                                            <br />
                                            {/* <b>Material : </b> Gold / Silver / Diamond */}
                                            <br />
                                            <b>Price : </b>
                                            <span><Price data={product.total} /></span> <br />
                                            {/* <b>Size : </b>
                                            <span>SL</span> <br />
                                            <span className="clrblk"> No Return</span>{" "}
                                            <span className="clrblk"> | Exchange Processed</span> */}
                                        </td>
                                        <td style={{ color: "green", fontWeight: "bold" }}>
                                            {
                                                product.orderReturn?
                                                product.orderReturn.returnStatus.title:
                                                orderDetails.orderStatus.title
                                            }
                                        </td>
                                        </tr>
                                    </tbody>
                                    {
                                        product.orderReturn &&
                                        <tbody style={{borderTop: "1px solid rgb(204, 204, 204)"}}>
                                            <tr>
                                            <td colSpan={2}>
                                                <h6 style={{ textAlign: "left", marginTop: 15 }}>
                                                Return Details
                                                </h6>{" "}

                                                {
                                                    product.orderReturn.isShipped!=true && product.orderReturn.isCancelled!=true &&
                                                    <a
                                                        className="btn btn-cart2"
                                                        onClick={()=>{
                                                            setShowCancelReturn(true)
                                                            setCancelReturnId(product.orderReturn._id)
                                                            setCancelReturnNumber(product.orderReturn.returnNumber)
                                                        }}
                                                        style={{
                                                            border: "gray 1px solid",
                                                            background: "none",
                                                            float: "right",
                                                            marginTop: "-24px",
                                                            height: 35,
                                                            width: 170,
                                                            color: "gray"
                                                        }}
                                                    >
                                                        Cancel this Request
                                                    </a>
                                                }

                                                
                                            </td>
                                            </tr>
                                            <tr style={{ textAlign: "left" }}>
                                            <td colSpan={2}>
                                                <b>Request ID : #{product.orderReturn.returnNumber}</b>
                                            </td>
                                            </tr>
                                            <tr>
                                            {
                                                 product.orderReturn.returnStatus.type !="cancelled" &&
                                                 <td colSpan={2}>
                                                    <div className="stepper-wrapper">
                                                        <ReturnStepperStep
                                                            stepperText="Concern Submitted" 
                                                            active={product.orderReturn.returnStatus.order>=1?true:false}
                                                        />
                                                        <ReturnStepperStep
                                                            stepperText="Return Approved" 
                                                            active={product.orderReturn.returnStatus.order>=2?true:false}
                                                        />
                                                        <ReturnStepperStep
                                                            stepperText="Pickup Initiated" 
                                                            active={product.orderReturn.returnStatus.order>=3?true:false}
                                                        />
                                                        <ReturnStepperStep
                                                            stepperText="Product received" 
                                                            active={product.orderReturn.returnStatus.order>=4?true:false}
                                                        />
                                                        <ReturnStepperStep
                                                            stepperText="Refund Processed" 
                                                            active={product.orderReturn.returnStatus.order>=5?true:false}
                                                        />
                                                    </div>
                                                </td>
                                            }
                                            
                                            </tr>
                                            {/* <tr>
                                            <td colSpan={2}>
                                                <div style={{ background: "#FFFFE7", textAlign: "center" }}>
                                                <i className="fa fa fa-exclamation-circle" /> Your return
                                                request has been initiated.
                                                </div>
                                            </td>
                                            </tr> */}
                                        </tbody>
                                    }
                                    </table>
                                </div>
                                <div className="p-3 col-md-3 d-flex flex-column">
                                {
                                    orderDetails.isDelivered && 
                                    moment().diff(moment(orderDetails.deliveredOn), 'days')<=7 &&
                                    !product.orderReturn &&
                                    <a
                                    className="btn btn-cart2"
                                    style={{ lineHeight: "35px", marginBottom: "10px", height: "35px", width: "170px",padding: "0 15px" }}
                                    onClick={()=>{
                                        setShowReturnOrder(true);
                                    }}
                                    >
                                    Return item
                                    </a>
                                }
                                {
                                    product.canReview &&
                                    <>
                                        <a
                                            className="btn btn-cart2"
                                            style={{
                                                backgroundColor: "gray",
                                                marginBottom: 10,
                                                height: 35,
                                                width: 170
                                            }}
                                            onClick={()=>{
                                                setSelectedReviewProduct(product.product)
                                                setShowWriteReview(true)
                                            }}
                                        >
                                            Review / Feedback
                                        </a>
                                       
                                    </>
                                    
                                }
                                </div>
                                </div>
                            </div>
                        )
                    })
                }



            {/* <div className="myaccount-table table-responsive text-center">
                <div
                className="d-flex head clearfix"
                style={{ justifyContent: "space-around" }}
                >
                <div className="winbox">
                    <i className="fa fa-pencil-square-o" /> Return window expires in 7
                    Days ! View <a href="#">Return Policy</a>
                </div>
                </div>
                <div className="d-flex bodybox clearfix">
                <div className="p-2 col-md-9">
                    <table className="table">
                    <tbody>
                        <tr>
                        <td>
                            <img src="assets/img/product/product-1.jpg" />
                        </td>
                        <td style={{ textAlign: "left" }}>
                            <a href="#">SK/KB32 - Nandi Digine Kada </a> (Quantity : 1)
                            <br />
                            <b>Material : </b> Gold / Silver / Diamond
                            <br />
                            <b>Price : </b>
                            <span>₹5,380</span> <br />
                            <b>Size : </b>
                            <span>SL</span> <br />
                            <span className="clrblk"> No Return</span>{" "}
                            <span className="clrblk"> | Exchange Processed</span>
                        </td>
                        <td style={{ color: "green", fontWeight: "bold" }}>
                            Delivered
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className="p-3 col-md-3 d-flex flex-column">
                    <a
                    className="btn btn-cart2"
                    href="#product-details-variable.html#"
                    style={{
                        backgroundColor: "#ff6f52",
                        height: 35,
                        marginBottom: 10,
                        width: 170
                    }}
                    >
                    Track Package
                    </a>
                    <a
                    className="btn btn-cart2"
                    href="#product-details-variable.html#"
                    style={{
                        marginBottom: 10,
                        height: 35,
                        width: 170
                    }}
                    >
                    Cancel Item
                    </a>
                    <a
                    className="btn btn-cart2"
                    href="#product-details-variable.html#"
                    style={{
                        backgroundColor: "gray",
                        marginBottom: 10,
                        height: 35,
                        width: 170
                    }}
                    >
                    Review / Feedback
                    </a>
                </div>
                </div>
            </div>
            <div className="myaccount-table table-responsive text-center">
                <div
                className="d-flex head clearfix"
                style={{ justifyContent: "space-around" }}
                ></div>
                <div className="d-flex bodybox clearfix">
                <div className="p-2 col-md-9">
                    <table className="table">
                    <tbody style={{ borderBottom: "1px #ccc solid" }}>
                        <tr>
                        <td>
                            <img src="assets/img/product/product-1.jpg" />
                        </td>
                        <td style={{ textAlign: "left" }}>
                            <a href="#">SK/KB32 - Nandi Digine Kada </a> (Quantity : 1)
                            <br />
                            <b>Material : </b> Gold / Silver / Diamond
                            <br />
                            <b>Price : </b>
                            <span>₹5,380</span> <br />
                            <b>Size : </b>
                            <span>SL</span> <br />
                            <span className="norfnd"> Non Refundable</span>{" "}
                            <span className="clrblk"> No Exchange</span>
                        </td>
                        <td style={{ color: "orange", fontWeight: "bold" }}>
                            Cancelled
                        </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td colSpan={2}>
                            <h6 style={{ textAlign: "left", marginTop: 15 }}>
                            Request Details
                            </h6>{" "}
                            <a
                            className="btn btn-cart2"
                            href="#product-details-variable.html#"
                            style={{
                                border: "gray 1px solid",
                                background: "none",
                                float: "right",
                                marginTop: "-24px",
                                height: 35,
                                width: 170,
                                color: "gray"
                            }}
                            >
                            Cancel this Request
                            </a>{" "}
                        </td>
                        </tr>
                        <tr style={{ textAlign: "left" }}>
                        <td colSpan={2}>
                            <b>Request ID : #32457hg6</b>
                        </td>
                        </tr>
                        <tr>
                        <td colSpan={2}>
                            <div className="stepper-wrapper">
                            <div className="stepper-item completed">
                                <div className="step-counter">
                                <i className="fa fa-check" />
                                </div>
                                <div className="step-name">First</div>
                            </div>
                            <div className="stepper-item completed">
                                <div className="step-counter">
                                <i className="fa fa-check" />
                                </div>
                                <div className="step-name">Second</div>
                            </div>
                            <div className="stepper-item active">
                                <div className="step-counter">
                                <i
                                    style={{ color: "gray" }}
                                    className="fa fa-circle"
                                />
                                </div>
                                <div className="step-name">Third</div>
                            </div>
                            <div className="stepper-item">
                                <div className="step-counter">
                                <i
                                    style={{ color: "gray" }}
                                    className="fa fa-circle"
                                />
                                </div>
                                <div className="step-name">Forth</div>
                            </div>
                            </div>
                        </td>
                        </tr>
                        <tr>
                        <td colSpan={2}>
                            <div style={{ background: "#FFFFE7", textAlign: "center" }}>
                            <i className="fa fa fa-exclamation-circle" /> Your refund
                            request has been initiated.
                            </div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className="p-3 col-md-3 d-flex flex-column">
                    <a
                    className="btn btn-cart2"
                    href="#product-details-variable.html#"
                    style={{
                        backgroundColor: "#ff6f52",
                        height: 35,
                        marginBottom: 10,
                        width: 170
                    }}
                    >
                    Track Package
                    </a>
                    <a
                    className="btn btn-cart2"
                    href="#product-details-variable.html#"
                    style={{
                        backgroundColor: "gray",
                        marginBottom: 10,
                        height: 35,
                        width: 170
                    }}
                    >
                    Review / Feedback
                    </a>
                </div>
                </div>
            </div> */}
            <div className="myaccount-table table-responsive text-center">
                <div
                className="d-flex head clearfix"
                style={{ justifyContent: "space-around" }}
                >
                <div className="p-3 flex-fill">
                    <h6 style={{ fontSize: 18 }}>Payment Information</h6>
                </div>
                <div className="p-3 flex-fill"></div>
                <div className="p-3 flex-fill">
                    <span>
                    {/* <a href="#"> Check Refund Status</a> */}
                    </span>
                    <a href="#"></a>
                </div>
                <a href="#"></a>
                </div>
                <a href="#">
                <div className="d-flex bodybox clearfix">
                    <div className="p-2 col-md-5">
                        {
                            orderDetails?.address && orderDetails.address.map((address)=>{
                                return(
                                    <div className=" " style={{ marginTop: 42 }}>
                                        <div className="shpbox">
                                            <h6 className=" shpngadd text-capitalize">
                                                {address.type} Address {/* <span>Click Here To Change</span> */}
                                            </h6>
                                            <div style={{ padding: 10 }}>
                                            <div style={{ textAlign: "left", color: "#555" }}>
                                                <p>
                                                    <b>{`${address.title} ${address.firstName} ${address.lastName}`}</b>
                                                    <br />
                                                    {`${address.address}`}
                                                        <br />
                                                        {`${address.city}, ${address?.state?.name}`}
                                                        <br />
                                                    {`${address.country}, ${address.pinCode}`}
                                                </p>
                                                {
                                                    address.landmark &&
                                                    <p> Landmark: {address.landmark}</p>
                                                }
                                                <p>Mobile: ({address.countryCode}) {address.phoneNumber}</p>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="p-3 col-md-7 d-flex flex-column">
                    <div className="order-summary-content">
                        {/* Order Summary Table */}
                        <div className="order-summary-table table-responsive text-center">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>
                                <b>Products</b>
                                </th>
                                <th>
                                <b>Total</b>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    orderDetails.products && orderDetails.products.map((product)=>{
                                        var price = product.qty * product.total
                                        return(
                                            <tr>
                                                <td>
                                                <a href="product-details.html">
                                                    {product.product.productName} <strong> × {product.qty}</strong>
                                                </a>
                                                </td>
                                                <td><Price data = {price}/></td>
                                            </tr>
                                        )
                                    })
                                }
                            
                            
                            </tbody>
                            <tfoot>
                            <tr>
                                <td>Sub Total</td>
                                <td>
                                    <strong><Price data={orderDetails.price} /></strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td className="d-flex justify-content-center">
                                <ul className="shipping-type">
                                    <li>
                                    <label
                                        className="custom-control-label"
                                        htmlFor="flatrate"
                                    >
                                        <Price data={orderDetails.shippingCharge} />
                                    </label>
                                    </li>
                                </ul>
                                </td>
                            </tr>
                            {
                                orderDetails.couponDiscount >0 &&
                                <tr>
                                    <td>Sub Total</td>
                                    <td>
                                        <strong><Price data={orderDetails.price} /></strong>
                                    </td>
                                </tr>
                            }
                            {
                                orderDetails.couponDiscount>0 &&
                                <tr>
                                    <td className="text-success">Discount(-)</td>
                                    <td className="cartPriceData text-success">
                                        <strong><Price data = {orderDetails.couponDiscount}  /></strong>
                                    </td>
                                </tr>
                            }
                            {
                                orderDetails.walletCredits>0 &&
                                <tr>
                                    <td className="text-success">Wallet Credits(-)</td>
                                    <td className="cartPriceData text-success">
                                        <strong><Price data = {orderDetails.walletCredits}  /></strong>
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td>Total Amount</td>
                                <td>
                                <strong><Price data={orderDetails.payableAmount} /></strong>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                        </div>
                        {/* Order Payment Method */}
                        {
                            orderDetails?.payment?.paymentAmount>0 &&
                            <div
                            className="order-payment-method"
                            style={{ background: "#eef9fb" }}
                            >
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td>Payment Mode</td>
                                    <td>{orderDetails.payment.paymentType=="cash"?"COD":"Prepaid"}</td>
                                </tr>
                                <tr>
                                    <td>Payment Status</td>
                                    {
                                        orderDetails.payment?.paymentGatewayStatus=="success" &&
                                        <td style={{ color: "green" }}>Confirmed</td>
                                    }
                                    {
                                        orderDetails.payment?.paymentGatewayStatus=="failed" &&
                                        <td style={{ color: "red" }}>Failed</td>
                                    }
                                    {
                                        !orderDetails.payment?.paymentGatewayStatus &&
                                        <td style={{ color: "orange" }}>Pending</td>
                                    }
                                </tr>
                                {/* <tr>
                                    <td>Taxes Used</td>
                                    <td>200</td>
                                </tr> */}
                                {
                                    orderDetails.couponCode &&
                                    <tr>
                                        <td>Discount Coupone Used</td>
                                        <td style={{ color: "orange" }}>{orderDetails.couponCode}</td>
                                    </tr>
                                }
                                
                                </tbody>
                               {/*  <tfoot>
                                <tr>
                                    <td>Total Saving</td>
                                    <td>
                                    <strong>$400</strong>
                                    </td>
                                </tr>
                                </tfoot> */}
                            </table>
                            <div className="single-payment-method">
                                <div className="summary-footer-area">
                                {/* <button type="submit" className="btn btn-sqr">
                                    Get Invoice
                                </button> */}
                                </div>
                            </div>
                            </div>
                        }
                        
                    </div>
                    </div>
                </div>
                </a>
            </div>
            <a href="#"></a>
            </div>
            <a href="#">{/* Single Tab Content End */}</a>
        </div>
        
        <TrackOrder 
            show = {showTrackOrder}
            setShow = {setShowTrackOrder}
            wayBill = {orderDetails.waybill}
        />
        <ReturnOrder 
            show = {showReturnOrder}
            setShow = {setShowReturnOrder}
            orderId={orderDetails._id}
            orderNumber={orderDetails.orderNumber}
            products={orderDetails.products}
            onRefresh={getOrders}
        />
        <WriteReview
            showModal={showWriteReview}
            setShowModal={setShowWriteReview}
            productName={selectedReviewProduct?.productName}
            productId={selectedReviewProduct?._id}
            onSuccess = {getOrders}
        />
        <CancelOrder 
            show = {showCancelOrder}
            setShow = {setShowCancelOrder}
            orderId={orderDetails._id}
            orderNumber={orderDetails.orderNumber}
            onRefresh={getOrders}
        />
        <CancelReturn 
            show = {showCancelReturn}
            setShow = {setShowCancelReturn}
            orderId={cancelReturnId}
            orderNumber={cancelReturnNumber}
            onRefresh={getOrders}
        />
      </>
   );
};

export default Defaut;
