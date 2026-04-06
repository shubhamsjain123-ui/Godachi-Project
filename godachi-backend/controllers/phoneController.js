const axios = require('axios');

const sendSMS = async (number, message, templateId)=>{
    try{
        var parsedNumber = number;
        while(parsedNumber.charAt(0) === '0')
        {
            parsedNumber = parsedNumber.substring(1);
        }
        parsedNumber = parsedNumber.replaceAll(/\s/g,'');
        const url = process.env.SMS_URL;
        const api_key=process.env.SMS_API_KEY;
        const sender_id=process.env.SMS_SENDER_ID;
        const apiParams = { apikey: api_key, senderid: sender_id, number:parsedNumber, message, templateid:templateId }
        const res = await axios.get(url, { params: apiParams });
        return(res?.data);
    }
    catch(error){
    }
}

exports.sendOtpApi = async (countryCode, phoneNumber, otp) => {
    //var message=`${otp} is your OTP code to login into Godachi. This OTP is valid for 30 minutes. Do not share this OTP with anyone. Godachi Private LImited. metaIT`;
    //var message=`Dear Customer, ${otp} is your OTP code to login into Godachi.Do not disclose it to anyone - Godachi metaIT`;
    var smsHash = process.env.SMS_HASH;
    var message=`Dear Customer ${otp} is your OTP code to login into Godachi. This OTP is valid for 30 minutes. Do not share this OTP with anyone. Godachi Private LImited. ${smsHash} metaIT`;
    var templateId="1707168076147934009";
    var sendSmsResponse = await sendSMS(phoneNumber, message, templateId)
    return;
}

exports.refundProcessedSmsApi = async (countryCode, phoneNumber, amount) => {
    var message=`Refund processed of INR ${amount} will be credited in your original payment source account within 10 working days. metaIT`;
    var templateId="1707167928819816272";
    var sendSmsResponse = await sendSMS(phoneNumber, message, templateId)
    return;
}

exports.returnRequestSmsApi = async (countryCode, phoneNumber, orderId) => {
    var message=`Your return request for orderID ${orderId} has been received, will pick up the tags intact originally delivered item within 72 hours. metaIT`;
    var templateId="1707167928813549443";
    var sendSmsResponse = await sendSMS(phoneNumber, message, templateId)
    return;
}

exports.orderDeliveredSmsAPI = async (countryCode, phoneNumber, orderId) => {
    var message=`Your orderID ${orderId} has been delivered today. metaIT`;
    var templateId="1707167928807747039";
    var sendSmsResponse = await sendSMS(phoneNumber, message, templateId)
    return;
}

exports.orderDispatchedSmsAPI = async (countryCode, phoneNumber, orderId) => {
    var message=`Dispatched: Your orderID ${orderId} has been shipped and is estimated to be delivered in 5 days. Track your order metaIT`;
    var templateId="1707167928801921933";
    var sendSmsResponse = await sendSMS(phoneNumber, message, templateId)
    return;
}

exports.orderPlacedSmsAPI = async (countryCode, phoneNumber, orderId) => {
    var message=`Your orderID ${orderId} is successfully placed. We will ship your order in 48 hours. Track your order. metaIT`;
    var templateId="1707167928769654379";
    var sendSmsResponse = await sendSMS(phoneNumber, message, templateId)
    return;
}