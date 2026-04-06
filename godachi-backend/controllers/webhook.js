let PhonepeWebhook = require("../models/phonepeWebhook.model");
let Orders = require("../models/orders.model");
let OrderPayment = require("../models/orderPayment.model");
let OrderStatus = require("../models/orderstatus.model");
let OrderProducts = require("../models/orderProducts.model");
let ProductInventory = require("../models/productInventory.model");
let ProductVariants = require("../models/productVariants.model");
let Basket = require("../models/basket.model");
let OrderRefund = require("../models/orderRefund.model");
let GiftCard = require("../models/giftCard.model");
const moment = require("moment");
const {orderPlacedSmsAPI} = require ("./phoneController");
const {sendEmail} = require ("./email");
const {orderPlacedWhatsappAPI} = require ("./whatsappController");
const {sendOrderPlaceFcmNotification} = require ("./fcmCloudMessaging");

exports.addPhonepeResponse = async (req, res) => {
    var postData = req.body;
    const verifyHeader = req.get('X-VERIFY')
    var phonepayData = new PhonepeWebhook({
        verifyHeader: verifyHeader,
        response: postData
    });
    await phonepayData.save();
    if(postData?.response){
        phonepayData.responseString = postData.response;
        const decodedRequestBodyString = Buffer.from(postData.response, "base64");
        const responseJson = JSON.parse(decodedRequestBodyString.toString());
        phonepayData.responseJson = responseJson;
        phonepayData.success = responseJson?.success;
        phonepayData.message = responseJson?.message;
        phonepayData.code = responseJson?.code;
        phonepayData.data = responseJson?.data;
        phonepayData.merchantId = responseJson?.data?.merchantId;
        phonepayData.merchantTransactionId = responseJson?.data?.merchantTransactionId;
        phonepayData.transactionId = responseJson?.data?.transactionId;
        phonepayData.amount = responseJson?.data?.amount;
        phonepayData.state = responseJson?.data?.state;
        phonepayData.responseCode = responseJson?.data?.responseCode;
        phonepayData.paymentInstrument = responseJson?.data?.paymentInstrument;
    }

    await phonepayData.save();
    
    var orderId = phonepayData?.data?.merchantTransactionId;
    let orderDetails
    try{
        orderDetails = await Orders.findOne({
            orderNumber: orderId
        }).populate("customer");
    }
    catch(error){}
    //if order payment
    if(orderDetails){
        await updateOrderStatus(orderDetails, phonepayData);
    }
    else{
        let refundOrderDetails
        try{
            refundOrderDetails = await OrderRefund.findOne({
                _id: orderId
            });
        }
        catch(error){}
        
        if(refundOrderDetails){
            await updateRefundStatus(refundOrderDetails, phonepayData);
        }
        else{
            var giftCardDetails = await GiftCard.findOne({_id: orderId});
            if(giftCardDetails){
                await updateGiftCardStatus(giftCardDetails, phonepayData);
            }
        }
    }

    res.sendStatus(200);
}

const updateGiftCardStatus = async (giftCardDetails, phonepayData) =>{
    var type = phonepayData?.code=="PAYMENT_SUCCESS" ? "success" : "failed";
    giftCardDetails.paymentGatewayResponse = phonepayData?.responseJson;
    giftCardDetails.refundGatewayTransactionId = phonepayData?.data?.transactionId;
    giftCardDetails.paymentGatewayStatus = type;
    if(phonepayData?.code=="PAYMENT_SUCCESS"){
        let giftCode = await GiftCard.createUniqueCode();
        giftCardDetails.giftCode = giftCode;
        giftCardDetails.giftCodeGenerated = true;
        giftCardDetails.boughtOn = new Date();
    }
    await giftCardDetails.save();
}
const updateRefundStatus = async (refundOrderDetails, phonepeRefund) =>{
    refundOrderDetails.paymentGatewayResponse = phonepeRefund?.responseJson;
    refundOrderDetails.refundGatewayTransactionId = phonepeRefund?.data?.transactionId;
    refundOrderDetails.paymentGatewayStatus = phonepeRefund?.code=="PAYMENT_SUCCESS"?"success":phonepeRefund?.code;
    if(phonepeRefund?.code=="PAYMENT_SUCCESS"){
        refundOrderDetails.isRefundAmountPaid = true;
        refundOrderDetails.refundPaidOn = new Date();
    }
    await refundOrderDetails.save();
}
const updateOrderStatus = async (orderDetails, phonepayData) =>{
        const user = orderDetails.customer;
        const orderId = orderDetails._id;
        var type = phonepayData?.code=="PAYMENT_SUCCESS" ? "success" : "failed";
        //update orderPayment
        await OrderPayment.updatePaymentResponse(orderId, type, phonepayData?.responseJson, phonepayData?.data?.merchantTransactionId);
        if(type=="success"){
            //update order status
            var confirmedOrderStatus = await OrderStatus.findOne({type:"confirmed"});
            orderDetails.orderStatus = confirmedOrderStatus;
            await orderDetails.save();

            //update inventory
            var orderProducts = await OrderProducts.find({order:orderId});
            if(orderProducts){
                for(const orderProduct of orderProducts) {
                    await new ProductInventory({
                    variant: orderProduct.variant,
                    quantity: orderProduct.qty,
                    date: new Date(),
                    description: "Order - "+orderDetails.orderNumber,
                    transactionType: 'dr',
                    orderId: orderId,
                    orderProduct: orderProduct._id
                    }).save();
                    await ProductVariants.updateOne(
                        {_id: orderProduct.variant},{
                            $inc: {quantity:parseInt(orderProduct.qty)*(-1)}
                        })
                }
            }
            
            //send notifications
            await placeOrderNotification(orderDetails, user)
        }
        
        //empty basket
        await Basket.emptyBasket(user._id);
}
const placeOrderNotification = async (orderDetails, userDetails) => {
    //send sms
    await orderPlacedSmsAPI(userDetails.countryCode, userDetails.phone, orderDetails.orderNumber);
  
    //send email
    if(userDetails.emailVerified){
      const emailData = {
        name:userDetails.name,
        email:userDetails.email,
        orderId: orderDetails.orderNumber,
        orderDate: moment(orderDetails.createdAt).format("DD MMMM YYYY | hh:mm: A"),
        orderTotal: orderDetails.finalPrice,
        to: [userDetails.email]
      };
      await sendEmail('orderPlaced', emailData);
    }
  
    //send whatsapp
    await orderPlacedWhatsappAPI(userDetails.countryCode, userDetails.phone,userDetails.name, orderDetails.orderNumber);
  
    //send fcm
    if(userDetails.fcmToken){
      await sendOrderPlaceFcmNotification(userDetails.fcmToken, orderDetails.orderNumber);
    }
  }