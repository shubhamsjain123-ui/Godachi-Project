import { useState } from "react";
import { useSelector } from "react-redux";
import Price from "../../Price";
import moment from "moment";
import { IMG_URL } from "../../../../config/config";
import Link from "next/link";
import TrackOrder from "./TrackOrder"
import ReturnOrder from "./ReturnOrder"
import CancelOrder from "./CancelOrder"
const Defaut = ({
  details,
  onRefresh
}) => {
   const { user } = useSelector((state) => state.login);
   const [showTrackOrder, setShowTrackOrder] = useState(false)
   const [showReturnOrder, setShowReturnOrder] = useState(false)
   const [showCancelOrder, setShowCancelOrder] = useState(false)
   return (
      <>
         <div className="myaccount-table table-responsive text-center">
          <div
            className="d-flex head clearfix"
            style={{ justifyContent: "space-around" }}
          >
            <div className="p-3 flex-fill">
              <h6>ORDER PLACED</h6>
              <span>{moment(details.createdAt).format("DD MMMM YYYY")}</span>
            </div>
            <div className="p-3 flex-fill">
              <h6>TOTAL</h6>
              <span>
                <Price data={details.finalPrice} />
              </span>
            </div>
            <div className="p-3 flex-fill">
              <h6>ORDER : #{details.orderNumber}</h6>
              <span>
                <Link href={`/profile/orders/${details.orderNumber}`}>
                  <a> Order Detail</a>
                </Link>
                
              </span>
            </div>
          </div>
          <div className="d-flex bodybox clearfix">
            <div className="p-2 col-md-9">
              <table className="table">
                <tbody>
                  {
                    details.products.map((product)=>{
                      const allImgData = product.product?.allImages?.filter((img)=>img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
                      const img = allImgData[0] ? IMG_URL + allImgData[0].image : "/images/nofoto.jpg";
                      return (
                        <tr>
                        <td>
                          <img src={img} />
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <Link href={`/product/${product.product.seo}`} target="_blank">
                            <a>
                              {product.product.productName}
                            </a>
                          </Link>
                          {" "}
                          ({product.qty})
                          <br />
                          <span>
                            <Price data={product?.total} /></span> 
                            {
                              details.payment.paymentType=="gateway" && details?.payment?.paymentGatewayStatus=="success" &&
                              <span>(Paid)</span> 
                            }
                            
                          <br />
                          {/* <span className="clrblk"> No Return</span>{" "}
                          <span className="clrblk"> | Exchange Processed</span> */}
                          {
                            details.isDelivered && moment().diff(moment(details.deliveredOn), 'days')<=7 && !product.orderReturn &&
                            <span className="clrblk"> Return untill {moment(details.deliveredOn).add("7","days").format("DD-MMM-YY")}</span>
                          }
                          {
                            details.isDelivered && moment().diff(moment(details.deliveredOn), 'days')>7 && !product.orderReturn &&
                            <span className="clrblk"> Return window expires on {moment(details.deliveredOn).add("7","days").format("DD-MMM-YY")}</span>
                          }
                        </td>
                        <td>
                          {product.orderReturn?
                            product.orderReturn.returnStatus.title:
                            details.orderStatus.title
                          }
                        </td>
                      </tr>
                      )
                    })
                  }
                 
                </tbody>
              </table>
            </div>
            <div className="p-3 col-md-3 d-flex flex-column">
              {
                details.waybill &&
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
                  details.isShipped!=true && details.isCancelled!=true &&
                  <a
                      className="btn btn-cart2"
                      onClick={()=>{
                        setShowCancelOrder(true);
                      }}
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
                details.isDelivered && moment().diff(moment(details.deliveredOn), 'days')<=7 &&
                <a
                  className="btn btn-cart2"
                  style={{ lineHeight: "35px", marginBottom: "10px", height: "35px", width: "170px",padding: "0 15px" }}
                  onClick={()=>{
                    setShowReturnOrder(true);
                  }}
                >
                  Return or replace items
                </a>
              }
              
              {/* <a
                className="btn btn-cart2"
                href="#product-details-variable.html#"
                style={{
                  backgroundColor: "gray",
                  marginBottom: "10px",
                    lineHeight: "35px",
                  height: "35px",
                  width: "170px",
                }}
              >
                Review / Feedback
              </a> */}
              {/* <a
                className="btn btn-cart2"
                href="#product-details-variable.html#"
                style={{
                  backgroundColor: "#457a78",
                    lineHeight: "35px",
                  height: "35px",
                  width: "170px",
                }}
              >
                <i className="fa fa-cloud-download" /> Invoice
              </a> */}
            </div>
          </div>
        </div>
        <TrackOrder 
            show = {showTrackOrder}
            setShow = {setShowTrackOrder}
            wayBill = {details.waybill}
        />
        <ReturnOrder 
            show = {showReturnOrder}
            setShow = {setShowReturnOrder}
            orderId={details._id}
            orderNumber={details.orderNumber}
            products={details.products}
            onRefresh={onRefresh}
        />
        <CancelOrder 
            show = {showCancelOrder}
            setShow = {setShowCancelOrder}
            orderId={details._id}
            orderNumber={details.orderNumber}
            onRefresh={onRefresh}
        />
      </>
   );
};

export default Defaut;
