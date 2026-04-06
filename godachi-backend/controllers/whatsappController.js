const axios = require('axios');

const sendWhatsappMessage = async (number, message)=>{
    try{
        var parsedNumber = number;
        while(parsedNumber.charAt(0) === '0')
        {
            parsedNumber = parsedNumber.substring(1);
        }
        parsedNumber = parsedNumber.replaceAll(/\s/g,'');
        const url = process.env.WHATSAPP_URL;
        const api_key=process.env.WHATSAPP_API_KEY;
        const apiParams = { apikey: api_key, mobile:parsedNumber, msg:message }
        const res = await axios.get(url, { params: apiParams });
        return(res?.data);
    }
    catch(error){
        console.log("sendSms error", error)
    }
}

exports.sendWelcomeWhatsappMessage = async (countryCode, phoneNumber, userName) => {
    var message=`*Hi ${userName},*\r\n\r\nWelcome and congrats on becoming the part of the Godachi family.\r\n\r\nYou have successfully registered on our platform.`;
    await sendWhatsappMessage(phoneNumber, message)
    return;
}

exports.sendWhatsappOtpApi = async (countryCode, phoneNumber, otp) => {
    var message=`${otp} is your OTP code to login into Godachi. This OTP is valid for 30 minutes. Do not share this OTP with anyone. Godachi Private LImited. metaIT`;
    await sendWhatsappMessage(phoneNumber, message)
    return;
}

exports.orderPlacedWhatsappAPI = async (countryCode, phoneNumber, userName, orderId) => {
    var message=`*Hi ${userName},*\r\n\r\nYour orderID *#${orderId}* is successfully placed. We will ship your order in 48 hours.`;
    await sendWhatsappMessage(phoneNumber, message)
    return;
}

exports.orderCancelledWhatsappAPI = async (countryCode, phoneNumber, userName, orderId) => {
    var message=`*Hi ${userName},*\r\n\r\nYour orderID *#${orderId}* has been cancelled. We're sorry this order didn't work for you. But we hope we'll sey you again.`;
    await sendWhatsappMessage(phoneNumber, message)
    return;
}
exports.orderDispatchedWhatsappAPI = async (countryCode, phoneNumber, userName, orderId) => {
    var message=`*Hi ${userName},*\r\n\r\nYour Godachi package with orderID *#${orderId}* has been dispatched successfully. Soon it will be delivered to your doorstep`;
    await sendWhatsappMessage(phoneNumber, message)
    return;
}
exports.orderDeliveredWhatsappAPI = async (countryCode, phoneNumber, userName, orderId) => {
    var message=`*Hi ${userName},*\r\n\r\nYour Godachi package with orderID *#${orderId}* has been delivered today.`;
    await sendWhatsappMessage(phoneNumber, message)
    return;
}

exports.orderReturnWhatsappAPI = async (countryCode, phoneNumber, userName, orderId) => {
    var message=`*Hi ${userName},*\r\n\r\nYour return request with returnID *#${orderId}* has been approved. We will pick up the tags intact originally delivered item within 72 hours.`;
    await sendWhatsappMessage(phoneNumber, message)
    return;
}

exports.orderRefundWhatsappAPI = async (countryCode, phoneNumber, userName, orderId, amount) => {
    var message=`*Hi ${userName},*\r\n\r\nYour refund of INR ${amount} for returnID *#${orderId}* has been processed. It will be credited in your original payment source account within 10 working days.`;
    await sendWhatsappMessage(phoneNumber, message)
    return;
}
