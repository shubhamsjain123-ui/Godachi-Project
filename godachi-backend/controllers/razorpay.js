// const Razorpay = require('razorpay');

// var instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// exports.createOrder = async(price, orderId) =>{
//     try{
//         var razorpayOrder = await instance.orders.create({
//             amount: Math.round(price*100),
//             currency: "INR",
//             receipt: orderId
//         });
//         return razorpayOrder;
//     }
//     catch(error){
//         return false
//     }
// }

// exports.refundPayment = async(paymentId, amount, orderId) =>{
//     try{
//         var razorpayOrder = await instance.payments.refund(paymentId,{
//             amount: Math.round(amount*100),
//             speed: "normal",
//             receipt: orderId
//         });
//         return razorpayOrder;
//     }
//     catch(error){
//         return false
//     }
// }