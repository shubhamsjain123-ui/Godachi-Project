import dynamic from "next/dynamic";
import { useState } from "react";
import { message } from "antd";
const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));

import axios from "axios";
import { API_URL } from "../config/config";
import { useSelector } from "react-redux";
import TrackOrder from "../app/components/MyAccount/Orders/TrackOrder"
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber  } from 'react-phone-number-input'
const Page = () => {  
  
  const { isAuthenticated } = useSelector((state) => state.login);
  
  const [orderId, setOrderId] = useState(null)
    const [billingPhoneNumber, setBillingPhoneNumber] = useState(null)
    const [wayBill, setWayBill] = useState(null)
    const [showTrackOrder, setShowTrackOrder] = useState(false)
    const onTrackOrder = async()=>{
      if(!orderId){
        message.error("Please enter order id")
        return
      }
      if(!billingPhoneNumber && !isAuthenticated){
        message.error("Please enter Billing Phone Number")
        return
      }
      console.log(billingPhoneNumber)
      if(!isValidPhoneNumber(billingPhoneNumber)){
        message.error("Please enter valid Phone Number")
        return
      }
      var phoneNumber = formatPhoneNumber(billingPhoneNumber);
      axios
         .post(`${API_URL}/orders/trackOrderPublic`, {
            orderId, billingPhoneNumber: phoneNumber
         })
         .then((res) => {
            if (!res.data.success) {
               message.error(res.data.message);
            } else {
              setWayBill(res.data.result);
              setShowTrackOrder(true)
            }
         })
         .catch((err) => console.log("err", err));
    }
   return (
      <>
         <BreadCrumb />
          <>
            {/* privacy policy content start */}
            <section className="policy-section section-padding">
              <div className="container">
                <div className="row">
                  <div className="col-md-3" />
                  <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className="section-title section-title-3">
                      <h2>Track your order</h2>
                      <p>
                      Track shipments to get delivery status of your package by entering order number in space provided.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-1" />
                  <div className="col-md-10 col-sm-12 col-lg-10 col-lg-offset-1 col-xs-12 col-md-offset-1">
                    <div className="order-track-inner">
                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-lg-6 col-xs-12">
                            <label htmlFor="mail_1">Order Id</label>
                            <input
                              type="text"
                              name="mail_1"
                              id="mail_1"
                              placeholder="Found your order confirmation email"
                              value={orderId}
                              onChange={({target:{value}})=>setOrderId(value)}
                            />
                          </div>
                          {
                            !isAuthenticated &&
                            <div className="col-md-6 col-sm-6 col-lg-6 col-xs-12">
                              <label htmlFor="mail_2">Billing Phone Number</label>
                              <PhoneInput
                                    country="IN"
                                    placeholder="Found your order confirmation Phone Number"
                                    value={billingPhoneNumber}
                                    onChange={setBillingPhoneNumber}/>
                              
                            </div>
                          }
                          
                          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 text-center">
                            <button className="subscribe-btn" onClick={onTrackOrder}>
                              Track
                            </button>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
          <TrackOrder 
            show = {showTrackOrder}
            setShow = {setShowTrackOrder}
            wayBill = {wayBill}
          />

      </>
   );
};

export default Page;
