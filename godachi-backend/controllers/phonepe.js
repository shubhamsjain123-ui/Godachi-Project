const axios = require('axios');
const sha256 = require('sha256');
const API_URL = process.env.PHONEPE_API_URL;
const merchantId = process.env.PHONEPE_MERCHANT_ID;
const callbackUrl = process.env.PHONEPE_CALLBACK_URL;
const PhonepeWebhook = require("../models/phonepeWebhook.model");

const createVerifyHeader = (base64Payload, endpoint) =>{
    const saltKey = process.env.PHONEPE_API_KEY;
    const saltKeyIndex = process.env.PHONEPE_API_KEY_INDEX;
    //let base64Payload = base64encode(payload);
    let shaString = sha256(base64Payload+endpoint+saltKey);
    return shaString+"###"+saltKeyIndex;
}

exports.createOrder = async(price, orderId, userId, redirectUrl) =>{
    try{
        var baseUrl = process.env.WEB_URL;
        var data = {
            merchantId: merchantId,
            merchantTransactionId: orderId,
            amount: Math.round(price*100),
            merchantUserId:userId,
            redirectUrl:`${baseUrl}${redirectUrl}`,
            redirectMode:"REDIRECT",
            callbackUrl: callbackUrl,
            paymentInstrument:{
                type: "PAY_PAGE"
            }
        }
        //let base64Payload = base64encode(data);
        let base64Payload = Buffer.from(JSON.stringify(data)).toString('base64');;

        var endpoint = "/pg/v1/pay";
        var axiosResponse = await axios.request({
            method: 'POST',
            url: `${API_URL}${endpoint}`,
            headers: {
                accept: 'application/json', 
                'Content-Type': 'application/json',
                'X-VERIFY': createVerifyHeader(base64Payload,endpoint)
            },
            data: { "request": base64Payload }
        })
        
        var responseData = axiosResponse.data;
        return responseData;
    }
    catch(error){
        return false
    }
}

exports.refundPayment = async(refundId, amount, orderId) =>{
    try{
        var data = {
            merchantId: merchantId,
            merchantTransactionId: refundId,
            originalTransactionId: orderId,
            amount: Math.round(amount*100),
            callbackUrl:callbackUrl,
        }
        let base64Payload = Buffer.from(JSON.stringify(data)).toString('base64');;

        var endpoint = "/pg/v1/refund";
        var axiosResponse = await axios.request({
            method: 'POST',
            url: `${API_URL}${endpoint}`,
            headers: {
                accept: 'application/json', 
                'Content-Type': 'application/json',
                'X-VERIFY': createVerifyHeader(base64Payload,endpoint)
            },
            data: { "request": base64Payload }
        })
        
        var responseData = axiosResponse.data;
        return responseData;
    }
    catch(error){
        return false
    }
}

exports.verifyPayment = async (orderDetails) =>{
    var webhookDetails = await PhonepeWebhook.findOne({merchantTransactionId: orderDetails.orderNumber});
    if(!webhookDetails)
        return {
            success: false
        };
    
    if(webhookDetails.code=="PAYMENT_SUCCESS"){
        return {
            success:  true,
            
        }
    }

}
