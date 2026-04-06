const router = require("express").Router();
const passport = require("passport");
var pdf = require("pdf-creator-node");
var qr = require('qr-image');
var fs = require("fs");
var path = require("path");
const inWords = require('inr-in-words');
let Orders = require("../models/orders.model");
let OrderShipment = require("../models/orderShipment.model");
const OrderStatus = require("../models/orderstatus.model");
const OrderReturn = require("../models/orderReturn.model");
const OrderProducts = require("../models/orderProducts.model");
const OrderPayment = require("../models/orderPayment.model");
const OrderRefund = require("../models/orderRefund.model");
const ReturnStatus = require("../models/orderReturnStatus.model");
const ProductReview = require("../models/productReview.model");
const ProductVariants = require("../models/productVariants.model");
const ProductInventory = require("../models/productInventory.model");
const Customer = require("../models/customer.model");
let Settings = require("../models/settings.model");
const IthinkLogistics = require("./iThinkLogistics");

const RazorpayController = require("./razorpay");
const PhonepeController = require("./phonepe");
let WalletTransactions = require("../models/walletTransactions.model");
let WalletTransactionType = require("../models/walletTransactionType.model");

const {sendEmail} = require("./email");
const {
  orderDispatchedWhatsappAPI,
  orderCancelledWhatsappAPI,
  orderDeliveredWhatsappAPI,
  orderReturnWhatsappAPI,
  orderRefundWhatsappAPI
} = require("./whatsappController");
const {
  dispatchOrderFcmNotification,
  cancelOrderFcmNotification,
  deliveredOrderFcmNotification,
  returnOrderFcmNotification,
  refundOrderFcmNotification
} = require("./fcmCloudMessaging");
const {
  orderDispatchedSmsAPI,
  orderDeliveredSmsAPI,
  returnRequestSmsApi,
  refundProcessedSmsApi
} = require("./phoneController");

const moment = require("moment");
const title = "Orders";
const roleTitle = "orders";

//trackOrderPublic
exports.trackOrderPublic = async (req,res) =>{
  try{
    const {
      orderId, billingPhoneNumber
    } = req.body
    var user = req.user;
    if(!orderId){
      return res.json({
        success: false,
        message:"Please provide order id"
      })
    }
    if(!user && !billingPhoneNumber){
      return res.json({
        success: false,
        message:"Please provide phone number"
      })
    }
    let checkUser = user;
    if(!user){
      //check user
      var isValidUser = await Customer.findOne({phone:billingPhoneNumber});
      if(!isValidUser){
        return res.json({
          success: false,
          message:"Please provide valid phone number"
        })
      }
      checkUser = isValidUser;
    }

    var orderDetails = await Orders.findOne({
      orderNumber: orderId,
      customer: checkUser
    });
    if(!orderDetails){
      return res.json({
        success: false,
        message:"Please provide valid order id"
      })
    }
    if(!orderDetails.waybill){
      return res.json({
        success: false,
        message:"Sorry, This order is not yet dispatched"
      })
    }
    return res.json({
      success: true,
      result: orderDetails.waybill
    })
  }
  catch(error){
    return res.json({
      success: false,
      message:"Sorry, there is some error."
    })
  }
}

// get all items
exports.getAllReturnOrders = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    OrderReturn.find().sort({createdAt:-1})
      .populate("returnStatus")
      .populate({
        path: "order",
        populate: ["payment"]
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    OrderReturn.find({
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
    .populate("returnStatus")
    .populate({
      path: "order",
      populate: ["payment"]
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else if (req.user._id) {
    OrderReturn.find({
      customer_id: `${req.user._id}`,
    }).sort({createdAt:-1})
    .populate("returnStatus")
    .populate({
      path: "order",
      populate: ["payment"]
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        variant: "error",
      },
    });
  }
}

// get all items
exports.getAllReturnOrdersPost = async (req, res) => {
  try{
    var query ={};
    var postData = req.body;
    if(postData?.status){
      query["returnStatus"]=postData.status;
    }
    if(postData?.date){
      var dateQuery = {};
      if(postData.date?.[0]){
        dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
      }
      if(postData.date?.[1]){
        dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
      }

      if(Object.keys(dateQuery).length>0)
        query["createdAt"]=dateQuery;
      
    }
    var orderList = await OrderReturn.find(query)
                                .sort({createdAt:-1})
                                .populate("returnStatus")
                                .populate("customer")
                                .populate({
                                  path: "order",
                                  populate: ["payment"]
                                })
    res.json(orderList)
  }
  catch(error){
    res.json({
      messagge: "Error: " + error,
      variant: "error",
    })
  }
}

// fetch data by id
exports.getReturnOrderById = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    OrderReturn.findById(req.params.id)
    .populate("returnStatus")
    .populate("products")
    .populate({
      path: "address",
      populate: ["state"]
    })
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    OrderReturn.findOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
    .populate("returnStatus")
    .populate("products")
    .populate({
      path: "address",
      populate: ["state"]
    })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              variant: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        variant: "error",
      },
    });
  }
}

// fetch data by id
exports.getByReturnStatus = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    OrderReturn.find({ returnStatus: req.params.id }).populate("returnStatus")
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    OrderReturn.find({
      returnStatus: req.params.id,
      "created_user.id": `${req.user._id}`,
    }).populate("returnStatus")
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else if (req.user._id) {
    OrderReturn.find({
      returnStatus: req.params.id,
      customer_id: `${req.user._id}`,
    }).populate("returnStatus")
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        variant: "error",
      },
    });
  }
}


// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Orders.find()
      .sort({createdAt:-1})
      .populate("orderStatus")
      .populate("customer")
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Orders.find({
        "created_user.id": `${req.user._id}`,
      }).sort({createdAt:-1}).populate("orderStatus")
      .populate("customer")
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (req.user._id) {
      Orders.find({
        customer_id: `${req.user._id}`,
      }).sort({createdAt:-1}).populate("orderStatus")
      .populate("customer")
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// get all items
exports.getAllPost = async (req, res) => {
  try{
    var query ={};
    var postData = req.body;
    if(postData?.status){
      query["orderStatus"]=postData.status;
    }
    if(postData?.paymentType){
      query["paymentType"]=postData.paymentType;
    }
    if(postData?.date){
      var dateQuery = {};
      if(postData.date?.[0]){
        dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
      }
      if(postData.date?.[1]){
        dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
      }

      if(Object.keys(dateQuery).length>0)
        query["createdAt"]=dateQuery;
      
    }
    /* if(postData?.limit>0){
      var orderList = await Orders.find(query)
                                .sort({createdAt:-1})
                                .limit(postData?.limit)
                                .populate("orderStatus")
                                .populate("customer")
                                .populate("payment")
    }
    else{
      var orderList = await Orders.find(query)
                                .sort({createdAt:-1})
                                .populate("orderStatus")
                                .populate("customer")
                                .populate("payment")
    } */
    var orderList = await Orders.find(query)
                                .sort({createdAt:-1})
                                .limit(postData?.limit)
                                .populate("orderStatus")
                                .populate("customer")
                                .populate("payment")
    res.json(orderList)
  }
  catch(error){
    res.json({
      messagge: "Error: " + error,
      variant: "error",
    })
  }
}

// post new items
exports.add = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new Orders(req.body)
        .save()

        .then(() =>
          res.json({
            messagge: title + " Added",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: " Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// fetch data by id
exports.counts = (req, res) => {
    Orders.countDocuments()
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  }

// fetch data by id
exports.getById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Orders.findById(req.params.id)

      .populate("orderStatus")
      .populate({
        path: "address",
        populate: ["state"]
      })
      .populate("payment")
      .populate({
        path: "products",
        populate: [{
            path: "product",
            populate: ["allImages"]
          },"variant",{
            path:"orderReturn",
            populate:["returnStatus"]
          }
        ]
      })
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Orders.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
      .populate("orderStatus")
      .populate("products")
      .populate({
        path: "address",
        populate: ["state"]
      })
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                variant: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// fetch shipment rates
exports.fetchShipmentRate = async (req, res) =>{
  try{
    var orderId = req.params.id;
    var {
      length,
      width,
      height,
      weight
    } = req.body;

    if(!length || !width || !height || !weight){
      //please enter valid details
      return res.json({
        messagge: "Error: Please Enter Valid Details",
        variant: "error",
      })
    }
    var orderDetails = await Orders.findOne({
                        _id: orderId
                      })
                      .populate({
                        path: "address",
                        populate: ["state"]
                      })
                      .populate("orderStatus")
    if(!orderDetails){
      //order not found
      return res.json({
        messagge: "Error: Order Details not found",
        variant: "error",
      })
    }
    var shippingAddress = orderDetails.address?.find((address)=>address.type=="shipping");
    if(!shippingAddress){
      //shipping address not found
      return res.json({
        messagge: "Error: Invalid Shipping Address",
        variant: "error",
      })
    }
    var getRatesData = {
      "to_pincode"  : shippingAddress.pinCode,
      "shipping_length_cms"  : length,
      "shipping_width_cms"  : width,
      "shipping_height_cms"  : height,
      "shipping_weight_kg" : weight,
      "order_type" : "forward",
      "payment_method" : orderDetails.paymentType=="cash"?"cod":"prepaid",
      "product_mrp" : orderDetails.finalPrice,
    }
    var orderShippingDetails = await IthinkLogistics.getOrderShipping(getRatesData);
    if(!orderShippingDetails){
      //shipping details not found
      return res.json({
        messagge: "Error: Shipping Details not found",
        variant: "error",
      })
    }
    if(orderShippingDetails.status=="success"){
      return res.json(orderShippingDetails);
    }
    else{
      return res.json({
        messagge: "Error: "+ orderShippingDetails.html_message,
        variant: "error",
      })
    }
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
}
// createShipmentOrder
exports.createShipmentOrder = async (req, res) =>{
  try{
    var orderId = req.params.id;
    var {
      length,
      width,
      height,
      weight,
      eway_bill,
      shipment,
      directShipment
    } = req.body;

    if((!length || !width || !height || !weight) && !directShipment){
      //please enter valid details
      return res.json({
        messagge: "Error: Please Enter Valid Details",
        variant: "error",
      })
    }
    var orderDetails = await Orders.findOne({
                        _id: orderId
                      })
                      .populate({
                        path: "address",
                        populate: ["state"]
                      })
                      .populate("payment")
                      .populate({
                        path: "products",
                        populate: ["product"]
                      })
                      .populate("orderStatus")
    if(!orderDetails){
      //order not found
      return res.json({
        messagge: "Error: Order Details not found",
        variant: "error",
      })
    }
    let orderShippingDetails;
    if(!directShipment){
      var shippingAddress = orderDetails.address?.find((address)=>address.type=="shipping");
      if(!shippingAddress){
        //shipping address not found
        return res.json({
          messagge: "Error: Invalid Shipping Address",
          variant: "error",
        })
      }
      var shipmentShippingAddress = {
        "name":`${shippingAddress.firstName} ${shippingAddress.lastName}`, 
        "add":shippingAddress.address,  
        "add2":"",
        "add3":"",
        "pin":shippingAddress.pinCode, 
        "city":shippingAddress.city, 
        "state":shippingAddress.state.name, 
        "country":shippingAddress.country, 
        "phone":shippingAddress.phoneNumber, 
        "alt_phone":"",
        "email":""
      }
      var shipmentBillingAddress = {};
      var billingAddress = orderDetails.address?.find((address)=>address.type=="billing");
      shipmentBillingAddress = {
        "billing_name":`${billingAddress.firstName} ${billingAddress.lastName}`,
        "billing_add":billingAddress.address,  
        "billing_add2":"",
        "billing_add3":"",
        "billing_pin" :billingAddress.pinCode, 
        "billing_city":billingAddress.city, 
        "billing_state":billingAddress.state.name, 
        "billing_country":billingAddress.country, 
        "billing_phone":billingAddress.phoneNumber,
        "billing_alt_phone":"", 
        "billing_email":""
      }
      
      var shipmentProducts = orderDetails.products?.map((product)=>{
        return{
          "product_name" : product.product.productName, 
          "product_quantity" : product.qty, 
          "product_price" : product.total, 
        }
      })
      var createShipmentOrderData =  {
          ... shipmentShippingAddress,
          ...shipmentBillingAddress,
          "order":orderDetails.orderNumber,
          "sub_order":"",
          "order_date":moment(orderDetails.createdAt).format("dd-mm-yyyy"), 
          "total_amount":orderDetails.payment.paymentAmount, 
          "is_billing_same_as_shipping":orderDetails.shipToDiffAddress?"yes":"no", 
          "products":shipmentProducts,
          "shipment_length" : length,   
          "shipment_width" : width,  
          "shipment_height" : height,    
          "weight" : weight,   
          "shipping_charges" : orderDetails.shippingCharge,
          "giftwrap_charges" : "0", 
          "transaction_charges" : "0",
          "total_discount" : "0",
          "first_attemp_discount" : "0",
          "cod_charges" : "0", 
          "advance_amount" : "0", 
          "cod_amount" : orderDetails.payment.paymentType=="cash"?orderDetails.payment.paymentAmount:"0", 
          "payment_mode" : orderDetails.payment.paymentType=="cash"?"cod":"prepaid", 
          "gst_number" : "", 
          "eway_bill_number" : "",   
          "reseller_name" : "", 
        } 
      if(eway_bill)
        createShipmentOrderData.waybill = eway_bill;
      orderShippingDetails = await IthinkLogistics.createOrder(createShipmentOrderData, shipment);
    }
    else{
      orderShippingDetails={
        status:"success"
      }
    }
    
    if(!orderShippingDetails){
      //shipping details not found
      return res.json({
        messagge: "Error: Shipping Details not found",
        variant: "error",
      })
    }
    if(orderShippingDetails.status=="success"){
      if(!directShipment){
        var shipmentDetails = Object.values(orderShippingDetails.data).find((ship)=>ship.refnum==orderDetails.orderNumber);
        await new OrderShipment({
          order: orderDetails._id,
          parcelLength: length,
          parcelWidth: width,
          parcelHeight: height,
          parcelWeight: weight,
          waybill: shipmentDetails.waybill,
          logistic_name: shipmentDetails.logistic_name,
          remark: shipmentDetails.remark
        }).save();
        orderDetails.waybill= shipmentDetails.waybill;
        orderDetails.logistic_name= shipmentDetails.logistic_name;
      }
      
      orderDetails.isShipped = true;
      orderDetails.packedOn = new Date();
      orderDetails.directShipment = directShipment;
      
      var packedOrderStatus = await OrderStatus.findOne({type:"packed"});
      orderDetails.orderStatus = packedOrderStatus;
      await orderDetails.save();
      var userDetails = await Customer.findOne({_id:orderDetails.customer});
      await dispacthOrderNotification(orderDetails,userDetails)
      return res.json(orderShippingDetails);
    }
    else{
      return res.json({
        messagge: "Error: "+ orderShippingDetails.html_message,
        variant: "error",
      })
    }
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
}
// updateHsn
exports.updateHsn = async (req, res) =>{
  try{
    var orderId = req.params.id;
    var orderDetails = await Orders.findOne({
                        _id: orderId
                      })
    if(!orderDetails){
      //order not found
      return res.json({
        messagge: "Error: Order Details not found",
        variant: "error",
      })
    }
    var postData = req.body;
    if(postData){
      for (const [key, value] of Object.entries(postData)) {
        await OrderProducts.updateOne({
          _id: key,
          order: orderId
        },{
          $set:{
            hsnCode: value
          }
        })
      }
    }
    return res.json({
      messagge: "HSN Updated Successfully",
      variant: "success",
    })
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
}

const dispacthOrderNotification = async (orderDetails, userDetails) => {
  //send sms
  await orderDispatchedSmsAPI(userDetails.countryCode, userDetails.phone, orderDetails.orderNumber)
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
    await sendEmail('orderDispatched', emailData);
  }

  //send whatsapp
  await orderDispatchedWhatsappAPI(userDetails.countryCode, userDetails.phone,userDetails.name, orderDetails.orderNumber);

  //send fcm
  if(userDetails.fcmToken){
    await dispatchOrderFcmNotification(userDetails.fcmToken, orderDetails.orderNumber);
  }
}

// markDelivered
exports.markDelivered = async (req, res) =>{
  var orderId = req.params.id;
  var markDeliveredResponse = await markDeliveredFunctionality(orderId);
  res.json(markDeliveredResponse)
}

const markDeliveredFunctionality = async (orderId)=>{
  try{
    var orderDetails = await Orders.findOne({
                        _id: orderId
                      })
                      .populate("orderStatus")
    if(!orderDetails){
      //order not found
      return {
        messagge: "Error: Order Details not found",
        variant: "error",
      }
    }
    var deliveredOrderStatus = await OrderStatus.findOne({type:"delivered"});
    orderDetails.orderStatus = deliveredOrderStatus;
    orderDetails.isDelivered = true;
    orderDetails.deliveredOn = new Date();
    await orderDetails.save();

    var paymentDetails = await OrderPayment.findOne({order: orderId});
    if(paymentDetails.paymentType=="cash"){
      paymentDetails.isPaymentAmountPaid = true;
      paymentDetails.paymentPaidOn = new Date();
      await paymentDetails.save();
    }

    await generateInvoice(orderDetails.orderNumber)

    var userDetails = await Customer.findOne({_id:orderDetails.customer});
    await deliverOrderNotification(orderDetails,userDetails)
    return{
      messagge: "Order updated successfully",
      variant: "success",
    };
  }
  catch(error){
    console.log(error)
    return {
      messagge: "Error: "+ error.message,
      variant: "error",
    }
  }
}

exports.getTrackableOrder = async () =>{
  var orderList = await Orders.aggregate([
      {$match:{ 
          isShipped: true, 
          isDelivered: false, 
          directShipment: false,
          $or:[
              {"lastCheckedLogisticStatus":{$exists: false}},    
              {"lastCheckedLogisticStatus":{$lte: moment().subtract(1,"hour").toDate()}},    
          ]
      }},
      {$lookup: {
        from: "orderstatus",
        localField: "orderStatus",
        foreignField: "_id",
        as: "orderStatus"
      }}, 
      {$unwind: {path:"$orderStatus"}},
      {$match:{"orderStatus.type":"packed"}},
      {$limit: 10},
      {$project:{waybill:1}}
      
  ]);
  return orderList;
}
exports.updateTrackableOrder = async (orderList, trackOrderResponse) =>{
  if(orderList?.length>0){
    for(const orderDetail of orderList){
      var orderId = orderDetail._id;
      var trackingResponse = trackOrderResponse?.[orderDetail.waybill];
      //var trackingResponse = trackOrderResponse?.["901234567109"];
      if(orderId && trackingResponse){
        var currentStatus = trackingResponse?.current_status;

        await Orders.updateOne(
          {
            _id:orderId
          },
          {
            $set:{
              current_logistics_status: trackingResponse?.current_status,
              lastCheckedLogisticStatus: new Date(),
            }
          }
        );
        await OrderShipment.updateOne(
          {
            order:orderId
          },{
            $set:{
              cancel_status: trackingResponse?.cancel_status,
              current_status: trackingResponse?.current_status,
              current_status_code: trackingResponse?.current_status_code,
              ofd_count: trackingResponse?.ofd_count,
              expected_delivery_date: trackingResponse?.expected_delivery_date,
              promise_delivery_date: trackingResponse?.promise_delivery_date,
              current_tracking_details: trackingResponse,
              lastCheckedLogisticStatus: new Date(),
            }
          }
        )

        if(currentStatus=="Delivered"){
          await markDeliveredFunctionality(orderId);
        }
      }
      else{
        await Orders.updateOne(
          {
            _id:orderId
          },
          {
            $set:{
              lastCheckedLogisticStatus: new Date(),
            }
          }
        );
      }
    }
  }
}

const deliverOrderNotification = async (orderDetails, userDetails) => {
  //send sms
  await orderDeliveredSmsAPI(userDetails.countryCode, userDetails.phone, orderDetails.orderNumber)

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
    await sendEmail('orderDelivered', emailData);
  }

  //send whatsapp
  await orderDeliveredWhatsappAPI(userDetails.countryCode, userDetails.phone,userDetails.name, orderDetails.orderNumber);

  //send fcm
  if(userDetails.fcmToken){
    await deliveredOrderFcmNotification(userDetails.fcmToken, orderDetails.orderNumber);
  }
}

//cancel order
const cancelOrder = async(orderId, cancelledBy, userId = null) =>{
  try{
    var query = {
      _id: orderId
    };
    if(cancelledBy=="user"){
      query.customer = userId
    }
    var orderDetails = await Orders.findOne(query)
                              .populate("orderStatus");
    if(!orderDetails){
      //order not found
      return {
        success: false,
        message: "Error: Order Details not found"
      }
    }
    if(cancelledBy=="user"){
      if(!["confirmed", "pending"].includes(orderDetails.orderStatus.type)){
        //not allowed
        return {
          message: "You are not allowed to cancel this order",
          success: false
        }
      }
    }
    else{
      if(["delivered", "cancelled", "returned"].includes(orderDetails.orderStatus.type)){
        //not allowed
        return {
          message: "You are not allowed to cancel this order",
          success: false
        }
      }
    }
    
    //cancel shipment
    if(orderDetails.isShipped==true && orderDetails.waybill){
      var cancelShipmentDetails = await IthinkLogistics.cancelOrder(orderDetails.waybill);
      if(!cancelShipmentDetails || cancelShipmentDetails.status_code!=200){
        //shipping not cancelled
        return {
          message: "Order not cancelled. Please try again",
          success: false
        }
      }
    }
    var canceledOrderStatus = await OrderStatus.findOne({type:"cancelled"});
    orderDetails.orderStatus = canceledOrderStatus;
    orderDetails.isCancelled = true;
    orderDetails.cancelledOn = new Date();
    orderDetails.cancelledBy = cancelledBy;
    //initiate refund
    const customerId = orderDetails.customer;
    //var isRefundProcessed = await refundOrderPayment(orderDetails._id,customerId,"full");

    var isRefundProcessed = await refundOrderPaymentNew(orderDetails._id,null,customerId,null,"wallet");
    if(isRefundProcessed.success==false){
      return{
        success: false,
        message: "Payment error, please try again after some time"
      }
    }
    await orderDetails.save();
    var userDetails = await Customer.findOne({_id:orderDetails.customer});
    await cancelOrderNotification(orderDetails,userDetails);
    return{
      success: true,
      message: "Order updated successfully"
    }
  }
  catch(error){
    return{
      success: false,
      message: error.message
    }
  }
}

const refundOrderPaymentNew = async (orderId, returnId=null, userId, refundAmount=null, refundTo = null ) =>{
  var paymentDetails = await OrderPayment.findOne({order: orderId});
  if(paymentDetails){
    var totalPayableAmount = paymentDetails.totalAmount;
    var totalPaidWalletAmount = paymentDetails?.walletAmount>0?paymentDetails.walletAmount:0;
    var totalPaidOtherAmount = (paymentDetails?.paymentAmount>0 && paymentDetails.isPaymentAmountPaid==true)?
                                paymentDetails.paymentAmount:
                                0;
    var totalPaidAmount = totalPaidWalletAmount+totalPaidOtherAmount;
    var paymentMode = paymentDetails.paymentType; 

    var previousRefundedTotalAmount = 0;
    var previousRefundedWalletAmount = 0;
    var previousRefundedOtherAmount = 0;

    var previousRefunds = await OrderRefund.find({order: orderId});
    if(previousRefunds && previousRefunds.length>0){
      for(const previousRefund of previousRefunds){
        previousRefundedTotalAmount+=previousRefund.totalRefundAmount;
        previousRefundedWalletAmount+=previousRefund.refundWalletAmount;
        previousRefundedOtherAmount+=previousRefund.refundAmount;
      }
    }

    var remainingTotalAmount = totalPaidAmount - previousRefundedTotalAmount;
    var remainingWalletAmount = totalPaidWalletAmount - previousRefundedWalletAmount;
    var remainingOtherAmount = totalPaidOtherAmount - previousRefundedOtherAmount;

    var refundableTotalAmount = 0;
    var refundableWalletAmount = 0;
    var refundableOtherAmount = 0;
    let refundType;
    if(refundAmount==null){
      //cancel order
      refundableTotalAmount = remainingTotalAmount;
      refundableWalletAmount = totalPaidWalletAmount - previousRefundedWalletAmount;
      if(paymentMode == "gateway"){
        refundableOtherAmount = totalPaidOtherAmount - previousRefundedOtherAmount;
        refundType = "gateway";
      }
      else{
        refundableWalletAmount += totalPaidOtherAmount - previousRefundedOtherAmount;
        refundType = "wallet";
      }
    }
    else{
      //return order
      if(refundAmount<=remainingTotalAmount){
        refundableTotalAmount = refundAmount;
        if(remainingWalletAmount>0){
          refundableWalletAmount = remainingWalletAmount>refundAmount?refundAmount:remainingWalletAmount;
        }
        refundableOtherAmount = refundableTotalAmount - refundableWalletAmount;
        if(paymentMode == "gateway"){
          refundType="gateway";
        }
        else{
          refundType = refundTo?refundTo:"wallet";
          if(refundType=="wallet"){
            refundableWalletAmount += refundableOtherAmount;
            refundableOtherAmount = 0; 
          }
        }
      }
    }
    
    var refundOrderDetails = await new OrderRefund({
      order: orderId,
      totalRefundAmount: refundableTotalAmount,
      refundWalletAmount: refundableWalletAmount,
      refundType: refundType,
      refundAmount: refundableOtherAmount,
    });
    if(returnId){
      refundOrderDetails.return = returnId;
    }

    if(refundableWalletAmount > 0){
      var transactionType = await WalletTransactionType.findOne({type:"ordercredit"});
      var walletTransaction = await WalletTransactions.creditAmount(userId, refundableWalletAmount, transactionType);
      if(walletTransaction){
        refundOrderDetails.refundWalletTransaction = walletTransaction
      }
    }
    await refundOrderDetails.save();
    if(refundType == "gateway"){
      /*var initialPaymentId = paymentDetails.gatewayTransactionId
      var razorpayRefund = await RazorpayController.refundPayment(initialPaymentId, refundableOtherAmount,paymentDetails.order._id);
      if(razorpayRefund){
        refundOrderDetails.paymentGatewayResponse = razorpayRefund;
        refundOrderDetails.refundGatewayTransactionId = razorpayRefund.id;
        refundOrderDetails.paymentGatewayStatus = razorpayRefund.status;
        refundOrderDetails.isRefundAmountPaid = true;
        refundOrderDetails.refundPaidOn = new Date();
      } */
      var origOrder = await Orders.findOne({_id:orderId});
      var phonepeRefund = await PhonepeController.refundPayment(refundOrderDetails._id, refundableOtherAmount,origOrder.orderNumber);
      if(phonepeRefund){
        refundOrderDetails.paymentGatewayResponse = phonepeRefund;
        refundOrderDetails.refundGatewayTransactionId = phonepeRefund?.data?.transactionId;
        refundOrderDetails.paymentGatewayStatus = phonepeRefund?.code=="PAYMENT_SUCCESS"?"success":phonepeRefund?.code;
        if(phonepeRefund?.code=="PAYMENT_SUCCESS"){
          refundOrderDetails.isRefundAmountPaid = true;
          refundOrderDetails.refundPaidOn = new Date();
        }
      }
    }
    else{
      refundOrderDetails.isRefundAmountPaid = true;
      refundOrderDetails.refundPaidOn = new Date();
    }
    await refundOrderDetails.save();
    return {
      success: true,
      message:"Success",
      result: refundOrderDetails
    }
  }
}

const cancelOrderNotification = async (orderDetails, userDetails) => {
  //send sms

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
    await sendEmail('orderCancelled', emailData);
  }

  //send whatsapp
  await orderCancelledWhatsappAPI(userDetails.countryCode, userDetails.phone,userDetails.name, orderDetails.orderNumber);

  //send fcm
  if(userDetails.fcmToken){
    await cancelOrderFcmNotification(userDetails.fcmToken, orderDetails.orderNumber);
  }
}

// cancelOrderAdmin
exports.cancelOrderAdmin = async (req, res) =>{
  var orderId = req.params.id;
  
  var cancelOrderResponse = await cancelOrder(orderId,"admin");
  return res.json({
    messagge: cancelOrderResponse.message,
    variant: cancelOrderResponse.success?"success":"error",
  })
}

// cancelOrderUser
exports.cancelOrderUser = async (req, res) =>{
  var orderId = req.params.id;
  var userId = req.user._id
  var cancelOrderResponse = await cancelOrder(orderId,"user",userId);
  return res.json({
    messagge: cancelOrderResponse.message,
    variant: cancelOrderResponse.success?"success":"error",
  })
}

// approveOrderAdmin
exports.approveOrderAdmin = async (req, res) =>{
  try{
    var orderId = req.params.id;
    
    var orderDetails = await Orders.findOne({
                        _id: orderId
                      })
                      .populate("orderStatus")
    if(!orderDetails){
      //order not found
      return res.json({
        messagge: "Error: Order Details not found",
        variant: "error",
      })
    }
    if(orderDetails.orderStatus.type!="pending"){
      //not allowed
      return res.json({
        messagge: "Error: You are not allowed to approve this order",
        variant: "error",
      })
    }
    var confirmedOrderStatus = await OrderStatus.findOne({type:"confirmed"});
    orderDetails.orderStatus = confirmedOrderStatus;
    await orderDetails.save();
    return res.json({
      messagge: " Order updated successfully",
      variant: "success",
    });
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
}
/* // approveOrderAdmin
exports.approveOrderAdmin = async (req, res) =>{
  try{
    var orderId = req.params.id;
    
    var orderDetails = await Orders.findOne({
                        _id: orderId
                      })
                      .populate("orderStatus")
    if(!orderDetails){
      //order not found
      return res.json({
        messagge: "Error: Order Details not found",
        variant: "error",
      })
    }
    if(orderDetails.orderStatus.type!="pending"){
      //not allowed
      return res.json({
        messagge: "Error: You are not allowed to approve this order",
        variant: "error",
      })
    }
    var confirmedOrderStatus = await OrderStatus.findOne({type:"confirmed"});
    orderDetails.orderStatus = confirmedOrderStatus;
    await orderDetails.save();
    return res.json({
      messagge: " Order updated successfully",
      variant: "success",
    });
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
} */
// convertToCodAdmin
exports.convertToCodAdmin = async (req, res) =>{
  try{
    var orderId = req.params.id;
    
    var orderDetails = await Orders.findOne({
                        _id: orderId
                      })
                      .populate("orderStatus")
    if(!orderDetails){
      //order not found
      return res.json({
        messagge: "Error: Order Details not found",
        variant: "error",
      })
    }
    if(orderDetails.orderStatus.type!="pending"){
      //not allowed
      return res.json({
        messagge: "Error: You are not allowed to approve this order",
        variant: "error",
      })
    }
    var confirmedOrderStatus = await OrderStatus.findOne({type:"confirmed"});
    orderDetails.orderStatus = confirmedOrderStatus;
    orderDetails.paymentType = "cash";
    await OrderPayment.updateOne({order: orderId},{$set:{paymentType:"cash"}});
    await orderDetails.save();
    return res.json({
      messagge: " Order updated successfully",
      variant: "success",
    });
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
}
// markPaymentReceivedAdmin
exports.markPaymentReceivedAdmin = async (req, res) =>{
  try{
    var orderId = req.params.id;
    
    var orderDetails = await Orders.findOne({
                        _id: orderId
                      })
                      .populate("orderStatus")
    if(!orderDetails){
      //order not found
      return res.json({
        messagge: "Error: Order Details not found",
        variant: "error",
      })
    }
    if(orderDetails.orderStatus.type!="pending"){
      //not allowed
      return res.json({
        messagge: "Error: You are not allowed to approve this order",
        variant: "error",
      })
    }
    var confirmedOrderStatus = await OrderStatus.findOne({type:"confirmed"});
    orderDetails.orderStatus = confirmedOrderStatus;
    await OrderPayment.updateOne({order: orderId},{$set:{isPaymentAmountPaid:true,paymentPaidOn:new Date()}});
    await orderDetails.save();
    return res.json({
      messagge: " Order updated successfully",
      variant: "success",
    });
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
}

// fetch data by id
exports.getStatus = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Orders.find({ orderStatus: req.params.id }).populate("orderStatus")
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Orders.find({
        orderStatus: req.params.id,
        "created_user.id": `${req.user._id}`,
      }).populate("orderStatus")
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (req.user._id) {
      Orders.find({
        orderStatus: req.params.id,
        customer_id: `${req.user._id}`,
      }).populate("orderStatus")
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      Orders.findByIdAndDelete(req.params.id)
        .then(() =>
          res.json({
            messagge: title + " Deleted",
            variant: "info",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Orders.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((resdata) => {
          if (resdata.deletedCount > 0) {
            res.json({
              messagge: title + " delete",
              variant: "success",
            });
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                variant: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// update data by id
exports.update = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Orders.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Orders.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        req.body
      )
        .then((resdata) => {
          if (resdata) {
            res.json({
              messagge: title + " Update",
              variant: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              variant: "error",
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

  exports.getUserOrders =async (req, res) => {
    try{
      var user = req.user;
      var myOrders = await Orders.find({customer: user })
                    .sort({createdAt:-1})
                    .populate("orderStatus")
                    .populate("payment")
                    .populate({
                      path: "products",
                      populate: [{
                        path: "product",
                        populate: ["allImages"]
                      },"variant",{
                        path:"orderReturn",
                        populate:["returnStatus"]
                      }]
                    });

      
      return res.json(myOrders)
    }
    catch(error){
      console.error(error);
      return res.status(400).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
  exports.getUserOrderDetails =async (req, res) => {
    try{
      var user = req.user;
      var myOrderDetails = await Orders.findOne({
                      customer: user,
                      orderNumber: req.params.id
                    })
                    .populate("orderStatus")
                    .populate({
                      path: "address",
                      populate: ["state"]
                    })
                    .populate("payment")
                    .populate({
                      path:"refunds",
                      populate:["return"]
                    })
                    .populate({
                      path: "products",
                      populate: [{
                        path: "product",
                        populate: ["allImages"]
                      },"variant",{
                        path:"orderReturn",
                        populate:["returnStatus"]
                      }
                    ]
                    });
      var orderDetails = JSON.parse(JSON.stringify(myOrderDetails));
      if(orderDetails){
        for(const [key, product] of Object.entries(orderDetails.products)){
          orderDetails.products[key].canReview = await ProductReview.canUserPostReview(product.product._id,user._id)
        }
      }
      return res.json(orderDetails)
    }
    catch(error){
      console.error(error);
      return res.status(400).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
  
  exports.createUserReturnRequest =async (req, res) => {
    try{
      var orderId = req.params.id;
      var returnProducts = req.body.products;
      var {
        reason,
        description,
        images
      } = req.body;
      var user = req.user;
      var orderDetails = await Orders.findOne({
                      customer: user,
                      _id:orderId
                    })
                    .populate("orderStatus")
                    .populate({
                      path: "products",
                      populate: ["orderReturn"]
                    });
      //check if a valid order
      if(!orderDetails){
        return res.json({
          messagge: "Invalid Request. Please try again",
          variant: "error",
        });
      }
      //check retrun period
      if(orderDetails.isDelivered!=true){
        return res.json({
          messagge: "Order not delivered yet.",
          variant: "error",
        });
      }
      if(orderDetails.isDelivered==true && moment().diff(moment(orderDetails.deliveredOn), 'days')>7){
        return res.json({
          messagge: "You are not allowed to return this product",
          variant: "error",
        });
      }
      //check if product already has return request
      var alreadyRaisedReturnRequest = orderDetails.products.filter((prod)=> prod.orderReturn!=null && returnProducts.includes(prod._id.toString()))
      if(alreadyRaisedReturnRequest.length>0){
        return res.json({
          messagge: "You have already raised the return request",
          variant: "error",
        });
      }
      //initiate return request
      var retrunProductList = orderDetails.products.filter((prod)=>returnProducts.includes(prod._id.toString()))
      var totalPrice = retrunProductList.reduce(function (acc, obj) { return acc + (obj.qty * obj.total) }, 0);
      var returnStatus = await ReturnStatus.findOne({type:"pending"})
      var returnRequest = await new OrderReturn({
        order: orderDetails,
        customer: user,
        reason: reason,
        description: description,
        userImages: images,
        total_price: totalPrice,
        returnStatus: returnStatus
      }).save();
      if(returnRequest){
        await OrderProducts.updateMany({
          _id:{$in:retrunProductList.map((list)=>list._id)}
        },{
          $set:{orderReturn:returnRequest._id}
        });
      }
      return res.json({
        messagge: "Return Request sent successfully",
        variant: "success",
      })
    }
    catch(error){
      console.error(error);
      return res.json({
        messagge: "You are not authorized, go away!",
        variant: "error",
      });
    }
  }

// cancelOrderAdmin
exports.cancelReturnAdmin = async (req, res) =>{
  var orderId = req.params.id;
  
  var cancelOrderResponse = await cancelReturn(orderId,"admin");
  return res.json({
    messagge: cancelOrderResponse.message,
    variant: cancelOrderResponse.success?"success":"error",
  })
}

// cancelOrderUser
exports.cancelReturnUser = async (req, res) =>{
  var orderId = req.params.id;
  var userId = req.user._id
  var cancelOrderResponse = await cancelReturn(orderId,"user",userId);
  return res.json({
    messagge: cancelOrderResponse.message,
    variant: cancelOrderResponse.success?"success":"error",
  })
}

//cancel order
const cancelReturn = async(orderId, cancelledBy, userId = null) =>{
  try{
    var query = {
      _id: orderId
    };
    if(cancelledBy=="user"){
      query.customer = userId
    }
    var orderDetails = await OrderReturn.findOne(query)
                              .populate("returnStatus");
    if(!orderDetails){
      //order not found
      return {
        success: false,
        message: "Error: Order Details not found"
      }
    }
    
    if(!["confirmed", "pending"].includes(orderDetails.returnStatus.type)){
      //not allowed
      return {
        message: "You are not allowed to cancel this order",
        success: false
      }
    }
    
    var canceledOrderStatus = await ReturnStatus.findOne({type:"cancelled"});
    orderDetails.returnStatus = canceledOrderStatus;
    orderDetails.isCancelled = true;
    orderDetails.cancelledOn = new Date();
    orderDetails.cancelledBy = "admin";
    await orderDetails.save();
    return{
      success: true,
      message: "Order updated successfully"
    }
  }
  catch(error){
    return{
      success: false,
      message: error.message
    }
  }
}



// cancelReturnAdmin
/* exports.cancelReturnAdmin = async (req, res) =>{
  try{
    var orderId = req.params.id;
    
    var orderDetails = await OrderReturn.findOne({
                        _id: orderId
                      })
                      .populate("returnStatus")
    if(!orderDetails){
      //order not found
      return res.json({
        messagge: "Error: Return Details not found",
        variant: "error",
      })
    }
    if(!["pending", "confirmed"].includes(orderDetails.returnStatus.type)){
      //not allowed
      return res.json({
        messagge: "Error: You are not allowed to cancel this request",
        variant: "error",
      })
    }
    //cancel shipment
    /* if(orderDetails.isShipped==true){
      var cancelShipmentDetails = await IthinkLogistics.cancelOrder(orderDetails.waybill);
      if(!cancelShipmentDetails || cancelShipmentDetails.status_code!=200){
        //shipping not cancelled
        return res.json({
          messagge: "Error: Order not cancelled. Please try again",
          variant: "error",
        })
      }
    } 
    var canceledOrderStatus = await ReturnStatus.findOne({type:"cancelled"});
    orderDetails.returnStatus = canceledOrderStatus;
    orderDetails.isCancelled = true;
    orderDetails.cancelledOn = new Date();
    orderDetails.cancelledBy = "admin";
    await orderDetails.save();
    
    return res.json({
      messagge: " Order updated successfully",
      variant: "success",
    });
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
} */

// approveOrderAdmin
exports.approveReturnAdmin = async (req, res) =>{
  try{
    var returnId = req.params.id;
    
    var returnDetails = await OrderReturn.findOne({
                        _id: returnId
                      })
                      .populate("returnStatus")
                      .populate("order")
                      .populate({
                        path: "address",
                        populate: ["state"]
                      })
                      .populate("shipment")
                      .populate({
                        path: "products",
                        populate: ["product"]
                      })
    if(!returnDetails){
      //order not found
      return res.json({
        messagge: "Error: Return Details not found",
        variant: "error",
      })
    }
    if(returnDetails.returnStatus.type!="pending"){
      //not allowed
      return res.json({
        messagge: "Error: You are not allowed to approve this order",
        variant: "error",
      })
    }

    var directShipment = returnDetails.order.directShipment;
    let orderShippingDetails;
    if(!directShipment){
      //create shipment order
      var shippingAddress = returnDetails.address?.find((address)=>address.type=="shipping");
      if(!shippingAddress){
        //shipping address not found
        return res.json({
          messagge: "Error: Invalid Shipping Address",
          variant: "error",
        })
      }
      var shipmentShippingAddress = {
        "name":`${shippingAddress.firstName} ${shippingAddress.lastName}`, 
        "add":shippingAddress.address,  
        "add2":"",
        "add3":"",
        "pin":shippingAddress.pinCode, 
        "city":shippingAddress.city, 
        "state":shippingAddress.state.name, 
        "country":shippingAddress.country, 
        "phone":shippingAddress.phoneNumber, 
        "alt_phone":"",
        "email":""
      }
      var shipmentBillingAddress = {};
      var billingAddress = returnDetails.address?.find((address)=>address.type=="billing");
      shipmentBillingAddress = {
        "billing_name":`${billingAddress.firstName} ${billingAddress.lastName}`,
        "billing_add":billingAddress.address,  
        "billing_add2":"",
        "billing_add3":"",
        "billing_pin" :billingAddress.pinCode, 
        "billing_city":billingAddress.city, 
        "billing_state":billingAddress.state.name, 
        "billing_country":billingAddress.country, 
        "billing_phone":billingAddress.phoneNumber,
        "billing_alt_phone":"", 
        "billing_email":""
      }
      
      var shipmentProducts = returnDetails.products?.map((product)=>{
        return{
          "product_name" : product.product.productName, 
          "product_quantity" : product.qty, 
          "product_price" : product.total, 
        }
      })
      var createShipmentOrderData =  {
          ... shipmentShippingAddress,
          ...shipmentBillingAddress,
          "order":returnDetails.returnNumber,
          "sub_order":"",
          "order_date":moment(returnDetails.createdAt).format("dd-mm-yyyy"), 
          "total_amount":returnDetails.total_price, 
          "is_billing_same_as_shipping":returnDetails.order.shipToDiffAddress?"yes":"no", 
          "products":shipmentProducts,
          "shipment_length" : returnDetails.shipment.parcelLength,   
          "shipment_width" : returnDetails.shipment.parcelWidth,  
          "shipment_height" : returnDetails.shipment.parcelHeight,    
          "weight" : returnDetails.shipment.parcelWeight,   
          "shipping_charges" : "0",
          "giftwrap_charges" : "0", 
          "transaction_charges" : "0",
          "total_discount" : "0",
          "first_attemp_discount" : "0",
          "cod_charges" : "0", 
          "advance_amount" : "0", 
          "cod_amount" : "0", 
          "payment_mode" : "prepaid", 
          "gst_number" : "", 
          "eway_bill_number" : "",   
          "reseller_name" : "", 
        } 
      orderShippingDetails = await IthinkLogistics.returnOrder(createShipmentOrderData, returnDetails.shipment.logistic_name);
      
    }
    else{
      orderShippingDetails = {
        status : "success"
      }
    }
    
    if(!orderShippingDetails){
      //shipping details not found
      return res.json({
        messagge: "Error: Shipping Details not found",
        variant: "error",
      })
    }
    if(orderShippingDetails.status=="success"){
      if(!directShipment){
        var shipmentDetails = Object.values(orderShippingDetails.data).find((ship)=>ship.refnum==returnDetails.returnNumber);
        returnDetails.waybill= shipmentDetails.waybill;
        returnDetails.logistic_name= shipmentDetails.logistic_name;
      }
      
      /* var confirmedReturnStatus = await ReturnStatus.findOne({type:"confirmed"});
      returnDetails.orderStatus = confirmedReturnStatus; */
      returnDetails.isShipped = true;
      returnDetails.packedOn = new Date();
      
      var packedOrderStatus = await ReturnStatus.findOne({type:"packed"});
      returnDetails.returnStatus = packedOrderStatus;
      await returnDetails.save();
      var userDetails = await Customer.findOne({_id:returnDetails.customer});
      await returnOrderNotification(returnDetails,userDetails)
      return res.json({
        messagge: "Order updated successfully",
        variant: "success",
      });
    }
    else{
      var shipmentDetails = Object.values(orderShippingDetails?.data)?.find((ship)=>ship.refnum==returnDetails.returnNumber);
      if(shipmentDetails?.status=="error"){
        return res.json({
          messagge: "Error: "+ shipmentDetails.remark,
          variant: "error",
        })
      }
      return res.json({
        messagge: "Error: "+ orderShippingDetails.html_message,
        variant: "error",
      })
    }
    
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
}

const returnOrderNotification = async (orderDetails, userDetails) => {
  //var orderId = orderDetails.order.orderNumber
  var orderId = orderDetails.returnNumber;
  //send sms
  await returnRequestSmsApi(userDetails.countryCode, userDetails.phone, orderId)

  //send email
  if(userDetails.emailVerified){
    const emailData = {
      name:userDetails.name,
      email:userDetails.email,
      orderId: orderId,
      orderOrgId:  orderDetails.order.orderNumber,
      orderDate: moment(orderDetails.createdAt).format("DD MMMM YYYY | hh:mm: A"),
      orderTotal: orderDetails.total_price,
      to: [userDetails.email]
    };
    await sendEmail('returnRequestApproved', emailData);
  }

  //send whatsapp
  await orderReturnWhatsappAPI(userDetails.countryCode, userDetails.phone,userDetails.name, orderId);

  //send fcm
  if(userDetails.fcmToken){
    await returnOrderFcmNotification(userDetails.fcmToken, orderId);
  }
}

// returnProductRecieved
exports.returnProductRecieved = async (req, res) =>{
  try{
    var orderId = req.params.id;
    
    var orderDetails = await OrderReturn.findOne({
                        _id: orderId
                      })
                      .populate("returnStatus")
    if(!orderDetails){
      //order not found
      return res.json({
        messagge: "Error: Order Details not found",
        variant: "error",
      })
    }
    var receivedOrderStatus = await ReturnStatus.findOne({type:"received"});
    orderDetails.returnStatus = receivedOrderStatus;
    orderDetails.isReceived = true;
    orderDetails.receivedOn = new Date();
    await orderDetails.save();
    //update inventory
    var orderProducts = await OrderProducts.find({orderReturn:orderId});
    if(orderProducts){
      for(const orderProduct of orderProducts) {
        await new ProductInventory({
          variant: orderProduct.variant,
          quantity: orderProduct.qty,
          date: new Date(),
          description: "Return - "+orderDetails.returnNumber,
          transactionType: 'cr',
          returnId: orderId,
          orderProduct: orderProduct._id
        }).save();
        await ProductVariants.updateOne(
          {_id: orderProduct.variant},{
            $inc: {quantity:parseInt(orderProduct.qty)}
          })
        }
    }
    return res.json({
      messagge: " Order updated successfully",
      variant: "success",
    });
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
}

// processRefund
exports.processRefund = async (req, res) =>{
  try{
    const { refundAmount, refundType} = req.body;
    
    var returnId = req.params.id;
    if(!refundAmount){
      return res.json({
        messagge: "Please Enter a valid return amount",
        variant: "error",
      })
    }
    var returnDetails = await OrderReturn.findOne({
                        _id: returnId
                      })
                      .populate("returnStatus")
                      .populate("order")
    if(!returnDetails){
      //order not found
      return res.json({
        messagge: "Error: Return Details not found",
        variant: "error",
      })
    }
    if(refundAmount>returnDetails.total_price){
      return res.json({
        messagge: `Amount can't be greater than ₹${returnDetails.total_price}`,
        variant: "error",
      })
    }
    if(["refunded", "cancelled"].includes(returnDetails.returnStatus.type)){
      //not allowed
      return res.json({
        messagge: "Error: You are not allowed to cancel this order",
        variant: "error",
      })
    }
       
    //initiate refund
    //var isRefundProcessed = await refundOrderPayment(returnDetails.order._id,returnDetails.order.customer,"partial", refundAmount);
    var isRefundProcessed = await refundOrderPaymentNew(returnDetails.order._id,returnId,returnDetails.customer,refundAmount,refundType);
    //return res.sendStatus(200); 
    if(isRefundProcessed.success==false){
      return{
        success: false,
        message: "Payment error, please try again after some time"
      }
    }
    else{
      var returnStatus = await ReturnStatus.findOne({type:"refunded"});
      returnDetails.returnStatus = returnStatus;
      returnDetails.isRefunded = true;
      returnDetails.refundInitiateOn = new Date();
      returnDetails.refundTransaction = isRefundProcessed.result;
      await returnDetails.save(); 
      await generateCreditNote(returnDetails.returnNumber);
      var userDetails = await Customer.findOne({_id:returnDetails.customer});
      await refundOrderNotification(returnDetails,userDetails, refundAmount)
      return res.json({
        messagge: "Refund Processed Successfully",
        variant: "success",
      });
    }
    
  }
  catch(error){
    return res.json({
      messagge: "Error: "+ error.message,
      variant: "error",
    })
  }
}

const refundOrderNotification = async (orderDetails, userDetails, amount) => {
  //var orderId = orderDetails.order.orderNumber
  var orderId = orderDetails.returnNumber;
  //send sms
  await refundProcessedSmsApi(userDetails.countryCode, userDetails.phone, amount)

  //send email
  if(userDetails.emailVerified){
    const emailData = {
      name:userDetails.name,
      email:userDetails.email,
      orderId: orderId,
      orderOrgId:  orderDetails.order.orderNumber,
      orderDate: moment(orderDetails.createdAt).format("DD MMMM YYYY | hh:mm: A"),
      orderTotal: orderDetails.total_price,
      amount: amount,
      to: [userDetails.email]
    };
    await sendEmail('refundProcessed', emailData);
  }

  //send whatsapp
  await orderRefundWhatsappAPI(userDetails.countryCode, userDetails.phone,userDetails.name, orderId, amount);

  //send fcm
  if(userDetails.fcmToken){
    await refundOrderFcmNotification(userDetails.fcmToken, orderId, amount);
  }
}

const generateInvoice = async(orderNumber)=>{
  var html = fs.readFileSync(path.join(__dirname, "../utils/invoice.html"), "utf8");
  var settingDetails = await Settings.findOne({}).populate("companyState");
  var options = {
    format: "A4",
    orientation: "landscape",
    border: "5mm",
  };
  //var orderNumber = "1682681079781";

  var orderDetails = await Orders.findOne({
                        orderNumber: orderNumber
                      })
                      .populate({
                        path: "address",
                        populate: ["state"]
                      })
                      .populate("payment")
                      .populate("customer")
                      .populate({
                        path: "products",
                        populate: [{
                          path:"product",
                          populate:[{
                            path:"productMetalComponents",
                            populate:["metalPurity"]
                          }]
                        },"variant"]
                      })
  var customerName = orderDetails.customer.name;
  var addresses = orderDetails.address?.map((address)=>{
    return{
      firstName: address.firstName,
      lastName: address.lastName,
      country: address.country,
      pinCode: address.pinCode,
      city: address.city,
      address: address.address,
      landmark: address.landmark,
      type: address.type,
      state:address.state.name,
      stateCode:address.state.code,
      mobile: `${address.countryCode}-${address.phoneNumber}`
    }
  })
  var billingAddress = addresses?.find((address)=>address.type=="billing");
  var shippingAddress = addresses?.find((address)=>address.type=="shipping");
  
  var allProducts = orderDetails.products.map((product, index)=>{
    return{
      sno:index+1,
      productName:product.product.productName,
      productCode:product.variant.productCode,
      hsnCode:product.hsnCode?product.hsnCode:"",
      purity:product?.product?.productMetalComponents?.[0]?.metalPurity?.name,
      qty:product.qty,
      netWeight:`${product.variant?.totalWeight} ${product.variant?.totalWeightUnit}`,
      preDiscountValue:`${settingDetails.price_icon} ${product.price}`,
      discount:`${settingDetails.price_icon} ${product.discount}`,
      finalPrice:`${settingDetails.price_icon} ${product.total}`,
    }
  })
  var paymentDetails = [];
  paymentDetails.push({
    name:"Products Total",
    amount:`${settingDetails.price_icon} ${orderDetails.price}`
  })
  paymentDetails.push({
    name:"Shipping Charges",
    amount:`${settingDetails.price_icon} ${orderDetails.shippingCharge}`
  })
  if(orderDetails?.couponDiscount>0){
    paymentDetails.push({
      name:"Coupon Discount (-)",
      amount:`${settingDetails.price_icon} ${orderDetails.couponDiscount}`
    })
  }
  paymentDetails.push({
    name:"Total Price",
    amount:`${settingDetails.price_icon} ${orderDetails.finalPrice}`
  })
  if(orderDetails.walletCredits>0){
    paymentDetails.push({
      name:"Wallet Amount Used (-)",
      amount:`${settingDetails.price_icon} ${orderDetails.walletCredits}`
    })
  }
  paymentDetails.push({
    name:"Payable Amount",
    amount:`${settingDetails.price_icon} ${orderDetails.payableAmount}`
  })

  var gstDetails = [];
  var gstRate = orderDetails.gstRate;
  if(orderDetails.igst>0){
    gstDetails.push({
      name:`IGST @ ${gstRate.toFixed(2)}%`,
      amount:`${settingDetails.price_icon} ${orderDetails.igst}`
    })
  }
  else{
    gstDetails.push({
      name:`IGST @ 0.00%`,
      amount:`${settingDetails.price_icon} ${orderDetails.igst}`
    })
  }
  if(orderDetails.sgst>0){
    gstDetails.push({
      name:`SGST @ ${(gstRate/2).toFixed(2)}%`,
      amount:`${settingDetails.price_icon} ${orderDetails.sgst}`
    })
  }
  else{
    gstDetails.push({
      name:`SGST @ 0.00%`,
      amount:`${settingDetails.price_icon} ${orderDetails.sgst}`
    })
  }
  if(orderDetails.cgst>0){
    gstDetails.push({
      name:`CGST @ ${(gstRate/2).toFixed(2)}%`,
      amount:`${settingDetails.price_icon} ${orderDetails.cgst}`
    })
  }
  else{
    gstDetails.push({
      name:`CGST @ 0.00%`,
      amount:`${settingDetails.price_icon} ${orderDetails.cgst}`
    })
  }
  

  var allPayments = orderDetails.payment;
  var payments = [];
  var paymentCounter=1;
  if(allPayments.walletAmount>0){
    payments.push({
      sno:paymentCounter++,
      mode:"Wallet",
      number:allPayments.walletTransaction,
      date:moment(allPayments.createdAt).format("DD-MMM-YYYY"),
      customerName:customerName,
      amount:`${settingDetails.price_icon} ${allPayments.walletAmount}`,
    })
  }
  if(allPayments && allPayments.paymentAmount>0){
    payments.push({
      sno:paymentCounter++,
      mode:allPayments.paymentType=="cash"?"CASH":"Online",
      number:allPayments._id,
      date:moment(allPayments.paymentPaidOn).format("DD-MMM-YYYY"),
      customerName:customerName,
      amount:`${settingDetails.price_icon} ${allPayments.paymentAmount}`,
    })
  }

  var qrLink = `${process.env.BASE_URL}orders/invoice/${orderNumber}`
  var qrCode= `data:image/png;base64, ${qr.imageSync(qrLink, { type: 'png' }).toString('base64')}`;

  //update invoice generated
  //var updatedPaymentDetails = await OrderPayment.findOneAndUpdate({order: orderDetails._id},{invoiceGenerated:true},{new:true});
  var updatedPaymentDetails = await OrderPayment.findOne({order: orderDetails._id});
  updatedPaymentDetails.invoiceGenerated=true;
  await updatedPaymentDetails.save();
  var invoiceNumber = updatedPaymentDetails.invoiceNumber;
  var invoiceNumberGeneratedOn = updatedPaymentDetails.invoiceNumberGeneratedOn;
  var document = {
    html: html,
    data:{
      orderNumber:orderDetails.orderNumber,
      invoiceNumber:invoiceNumber,
      qrCode:qrCode,
      orderDate:moment(orderDetails.createdAt).format("DD-MMM-YYYY"),
      invoiceDate:moment(invoiceNumberGeneratedOn).format("DD-MMM-YYYY"),
      invoiceCompanyName:settingDetails.invoiceCompanyName,
      invoiceCompanyAddress:settingDetails.invoiceCompanyAddress,
      companyGst:settingDetails.companyGst,
      companyPan:settingDetails.panNumber,
      companyState:settingDetails.companyState.name,
      companyStateCode:settingDetails.companyState.code,
      companyPo:settingDetails.companyPoNo,
      billingAddress: billingAddress,
      shippingAddress:shippingAddress,
      products:allProducts,
      payments:payments,
      gstDetails: gstDetails,
      paymentDetails:paymentDetails,
      invoiceCertifyText:settingDetails.invoiceCertifyText,
      gstPayable:inWords.convert(orderDetails.gst),
      invoiceAmount:inWords.convert(orderDetails.finalPrice),
      customerName:customerName,
      invoiceBottomText:settingDetails.invoiceBottomText,
    },
    path:  `../invoices/${orderNumber}.pdf`,
    type: "",
  };
  pdf
  .create(document, options)
  .then((res) => {
  })
  .catch((error) => {
    console.error(error);
  });
}

exports.downloadInvoice = async(req,res)=>{
  try{
    var orderNumber = req.params.id;
    var data =fs.readFileSync(`../invoices/${orderNumber}.pdf`,);
    res.contentType("application/pdf");
    res.send(data);
  }
  catch(err){
    res.sendStatus(404)
  }
  
}
exports.downloadCreditNote = async(req,res)=>{
  try{
    var orderNumber = req.params.id;
    var data =fs.readFileSync(`../creditNotes/${orderNumber}.pdf`,);
    res.contentType("application/pdf");
    res.send(data);
  }
  catch(err){
    res.sendStatus(404)
  }
  
}

const generateCreditNote = async(returnNumber)=>{
  var html = fs.readFileSync(path.join(__dirname, "../utils/creditNote.html"), "utf8");
  var settingDetails = await Settings.findOne({}).populate("companyState");
  var options = {
    format: "A4",
    orientation: "landscape",
    border: "5mm",
  };
  
   var returnDetails = await OrderReturn.findOne({
                        returnNumber: returnNumber
                      })
                      .populate({
                        path: "address",
                        populate: ["state"]
                      })
                      .populate("refund")
                      .populate("customer")
                      .populate({
                        path: "order",
                        populate: ["payment"]
                      })
                      .populate({
                        path: "products",
                        populate: [{
                          path:"product",
                          populate:[{
                            path:"productMetalComponents",
                            populate:["metalPurity"]
                          }]
                        },"variant"]
                      })
  
  var customerName = returnDetails.customer.name;
  var addresses = returnDetails.address?.map((address)=>{
    return{
      firstName: address.firstName,
      lastName: address.lastName,
      country: address.country,
      pinCode: address.pinCode,
      city: address.city,
      address: address.address,
      landmark: address.landmark,
      type: address.type,
      state:address.state.name,
      stateCode:address.state.code,
      mobile: `${address.countryCode}-${address.phoneNumber}`
    }
  })
  var billingAddress = addresses?.find((address)=>address.type=="billing");
  var shippingAddress = addresses?.find((address)=>address.type=="shipping");
  
  var allProducts = returnDetails.products.map((product, index)=>{
    return{
      sno:index+1,
      productName:product.product.productName,
      productCode:product.variant.productCode,
      hsnCode:product.hsnCode?product.hsnCode:"",
      purity:product?.product?.productMetalComponents?.[0]?.metalPurity?.name,
      qty:product.qty,
      netWeight:`${product.variant?.totalWeight} ${product.variant?.totalWeightUnit}`,
      finalPrice:`${settingDetails.price_icon} ${product.total}`,
    }
  })
  var paymentDetails = [];
  var allPayments = returnDetails.refund;
  var refundedAmount = allPayments.totalRefundAmount;
  var refundableAmount = returnDetails.total_price;
  var differenceAdjusted = refundableAmount - refundedAmount;
  paymentDetails.push({
    name:"Product Total",
    amount:`${settingDetails.price_icon} ${refundableAmount}`
  })
  if(differenceAdjusted>0){
    paymentDetails.push({
      name:"Deducted Amount",
      amount:`${settingDetails.price_icon} ${differenceAdjusted}`
    })
  }
  paymentDetails.push({
    name:"Refunded Amount",
    amount:`${settingDetails.price_icon} ${refundedAmount}`
  })

  var gstDetails = [];
  
  var settingDetails = await Settings.findOne({}).populate("companyState");
  var gstRate = settingDetails.gst;
  var companyStateCode = settingDetails.companyState.code;
  var gstAmount = (allPayments.totalRefundAmount*gstRate/100).toFixed(2);
  var priceWithoutGst = (allPayments.totalRefundAmount - gstAmount).toFixed(2);
  var shippingStateCode = shippingAddress.state.code;
  if(companyStateCode == shippingStateCode){
    var igst = gstAmount;
    var cgst = 0;
    var sgst = 0;
  }
  else{
    var igst = 0;
    var cgst = (gstAmount/2).toFixed(2);
    var sgst = (gstAmount/2).toFixed(2);
  }

  if(igst>0){
    gstDetails.push({
      name:`IGST @ ${gstRate.toFixed(2)}%`,
      amount:`${settingDetails.price_icon} ${igst}`
    })
  }
  else{
    gstDetails.push({
      name:`IGST @ 0.00%`,
      amount:`${settingDetails.price_icon} ${igst}`
    })
  }
  if(sgst>0){
    gstDetails.push({
      name:`SGST @ ${(gstRate/2).toFixed(2)}%`,
      amount:`${settingDetails.price_icon} ${sgst}`
    })
  }
  else{
    gstDetails.push({
      name:`SGST @ 0.00%`,
      amount:`${settingDetails.price_icon} ${sgst}`
    })
  }
  if(cgst>0){
    gstDetails.push({
      name:`CGST @ ${(gstRate/2).toFixed(2)}%`,
      amount:`${settingDetails.price_icon} ${cgst}`
    })
  }
  else{
    gstDetails.push({
      name:`CGST @ 0.00%`,
      amount:`${settingDetails.price_icon} ${cgst}`
    })
  }
  

  
  var payments = [];
  var paymentCounter=1;
  if(allPayments.refundWalletAmount>0){
    payments.push({
      sno:paymentCounter++,
      mode:"Wallet",
      number:allPayments.refundWalletTransaction,
      date:moment(allPayments.createdAt).format("DD-MMM-YYYY"),
      customerName:customerName,
      amount:`${settingDetails.price_icon} ${allPayments.refundWalletAmount}`,
    })
  }
  if(allPayments && allPayments.refundAmount>0){
    payments.push({
      sno:paymentCounter++,
      mode:allPayments.refundType=="bank"?"BANK":(allPayments.refundType=="gateway"?"Online":"Wallet"),
      number:allPayments._id,
      date:moment(allPayments.refundPaidOn).format("DD-MMM-YYYY"),
      customerName:customerName,
      amount:`${settingDetails.price_icon} ${allPayments.refundAmount}`,
    })
  }

  var qrLink = `${process.env.BASE_URL}orders/creditNote/${returnNumber}`
  var qrCode= `data:image/png;base64, ${qr.imageSync(qrLink, { type: 'png' }).toString('base64')}`;

  //update invoice generated
  //var updatedRefundDetails = await OrderRefund.findOneAndUpdate({return: returnDetails._id},{creditNoteGenerated:true},{new:true});
  var updatedRefundDetails = await OrderRefund.findOne({return: returnDetails._id});
  updatedRefundDetails.creditNoteGenerated=true;
  await updatedRefundDetails.save();
  var creditNoteNumber = updatedRefundDetails.creditNoteNumber;
  var creditNoteNumberGeneratedOn = updatedRefundDetails.creditNoteNumberGeneratedOn;
  var orderDetails = returnDetails.order;
  var invoiceNumber = orderDetails?.payment?.invoiceNumber;
  var invoiceNumberGeneratedOn = orderDetails?.payment?.invoiceNumberGeneratedOn;
  
  var document = {
    html: html,
    data:{
      orderNumber:orderDetails.orderNumber,
      returnNumber:returnDetails.returnNumber,
      creditNoteNumber:creditNoteNumber,
      invoiceNumber:invoiceNumber,
      invoiceDate:moment(invoiceNumberGeneratedOn).format("DD-MMM-YYYY"),
      qrCode:qrCode,
      orderDate:moment(orderDetails.createdAt).format("DD-MMM-YYYY"),
      returnDate:moment(returnDetails.createdAt).format("DD-MMM-YYYY"),
      creditNoteDate:moment(creditNoteNumberGeneratedOn).format("DD-MMM-YYYY"),
      invoiceCompanyName:settingDetails.invoiceCompanyName,
      invoiceCompanyAddress:settingDetails.invoiceCompanyAddress,
      companyGst:settingDetails.companyGst,
      companyPan:settingDetails.panNumber,
      companyState:settingDetails.companyState.name,
      companyStateCode:settingDetails.companyState.code,
      companyPo:settingDetails.companyPoNo,
      billingAddress: billingAddress,
      shippingAddress:shippingAddress,
      products:allProducts,
      payments:payments,
      gstDetails: gstDetails,
      paymentDetails:paymentDetails,
      invoiceCertifyText:settingDetails.invoiceCertifyText,
      gstPayable:inWords.convert(gstAmount),
      invoiceAmount:inWords.convert(refundedAmount),
      customerName:customerName,
      invoiceBottomText:settingDetails.invoiceBottomText,
    },
    path:  `../creditNotes/${returnNumber}.pdf`,
    type: "",
  };
  pdf
  .create(document, options)
  .then((res) => {
  })
  .catch((error) => {
    console.error(error);
  });
}