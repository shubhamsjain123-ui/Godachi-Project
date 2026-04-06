import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Price from "../../Price";
import moment from "moment";
import axios from "axios";
import { API_URL, IMG_URL } from "../../../../config/config";
import Link from "next/link";
import { message } from "antd";
import SweetAlert from 'react-bootstrap-sweetalert';
const Defaut = ({
    show,
    setShow,
    orderId,
    orderNumber,
    onRefresh
}) => {

   const onCancelOrder = async () =>{
       try{
           var axiosResponse = await axios.post(`${API_URL}/orders/cancelReturnUser/${orderId}`)
           if(axiosResponse && axiosResponse.data){
               var response = axiosResponse.data;
               console.log(response)
               setShow(false)
               if(response.variant=="error"){
                   message.error(response.messagge)
               }
               else{
                message.success(response.messagge)
                onRefresh()
               }
           }
       }
       catch(error){
        console.log(error)
       }
   }

   return (
    <SweetAlert 
        danger
        show = {show}
        title="Cancel Return Request" 
        onConfirm={()=>onCancelOrder()} 
        confirmBtnText="Yes, cancel it!"
        confirmBtnBsStyle="danger"
        showCancel
        cancelBtnText="No, don't cancel"
        cancelBtnBsStyle="light"
        onCancel={()=>setShow(false)} 
    >
        Are you sure that you want to cancel this return?
    </SweetAlert>
   );
};

export default Defaut;
