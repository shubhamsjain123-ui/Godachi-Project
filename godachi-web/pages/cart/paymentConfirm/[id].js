import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../../config/config";
import { message } from "antd";
import { resetBasket, updateBasket_r } from "../../../redux/actions";
const Page = () => {
    const dispatch = useDispatch();
   const { isAuthenticated } = useSelector(({ login }) => login);
   const orderId = router.query.id;

   const checkPaymentStatus = async () =>{
        axios
        .post(`${API_URL}/payment/verifyPayment`, {
            orderId: orderId
        })
        .then(async (response) => {
            if(response.data.success){
                if(response.data.error){
                    message.error({ content: response.data.message, duration: 3 });
                }
                else{
                    message.success({ content: response.data.message, duration: 3 });
                }

                if(response.data.type=="order"){
                    await dispatch(resetBasket());
                    router.push(`/profile/orders/${response.data.orderNumber}`)
                }
                else if(response.data.type=="giftcard"){
                    router.push(`/profile/gift-card`)
                }
                
            }
            else if(response.data.message){
                message.error({ content: response.data.message, duration: 3 });
            }
            else{
                message.error({ content: "Some Error occurred. Please Try again later", duration: 3 });
            }
        })
        .catch((err) => {
            message.error({
                content: "Some Error, Please Try Again",
                duration: 3,
            });
            console.log(err);
        });        
   }

   useEffect(() => {
        checkPaymentStatus();
   }, []);

   return (
      <>
      
      </>
   );
};

export default Page;
