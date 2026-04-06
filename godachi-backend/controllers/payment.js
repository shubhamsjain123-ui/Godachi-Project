const router = require("express").Router();
const Paymentmethods = require("../models/paymentmethods.model");
const Products = require("../models/products.model");
const Basket = require("../models/basket.model");
const Cargoes = require("../models/cargoes.model");
const Orders = require("../models/orders.model");
const OrderAddress = require("../models/orderAddress.model");
const OrderProducts = require("../models/orderProducts.model");
const OrderPayment = require("../models/orderPayment.model");
const RazorpayController = require("./razorpay");
const PhonePeController = require("./phonepe");
const ProductVariants = require("../models/productVariants.model");
const ProductInventory = require("../models/productInventory.model");
const OrderStatus = require("../models/orderstatus.model");
let WalletTransactions = require("../models/walletTransactions.model");
let WalletTransactionType = require("../models/walletTransactionType.model");
let Settings = require("../models/settings.model");
let GiftCard = require("../models/giftCard.model");
const { getPriceDetails } = require("../utils/productPrice");
const moment = require("moment");
const { orderPlacedSmsAPI } = require("./phoneController");
const { sendEmail } = require("./email");
const { orderPlacedWhatsappAPI } = require("./whatsappController");
const { sendOrderPlaceFcmNotification } = require("./fcmCloudMessaging");

const filter_array_in_obj = (arr, criteria) => {
  return arr.filter(function (obj) {
    return Object.keys(criteria).every(function (c) {
      return obj[c] == criteria[c];
    });
  });
};

const getSaveProductsBaskettoOrders = async (
  data = [],
  products = [],
  allBasket = []
) => {
  const BasketAllProducts = [];

  products.map(async (x) => {
    updateProductSaleqty(x.product_id, x.qty);

    const array = data.find((y) => y._id == x.product_id);

    if (array) {
      const resData = array;
      const errorArray = [];
      if (x.selectedVariants !== undefined) {
        const priceMath = filter_array_in_obj(
          resData.variant_products,
          x.selectedVariants
        );

        updateProductQtyVariant(x.product_id, x.selectedVariants, x.qty);

        BasketAllProducts.push({
          _id: resData._id,
          title: resData.title,
          selectedVariants: x.selectedVariants,
          qty: x.qty,
          price: priceMath[0].price,
          before_price: priceMath[0].before_price,
          total_price: x.qty * priceMath[0].price,
          total_discount: x.qty * priceMath[0].before_price,
          error: errorArray,
          seo: resData.seo,
        });
      } else {
        updateProductQtyNormal(x.product_id, x.qty);

        BasketAllProducts.push({
          _id: resData._id,
          title: resData.title,
          selectedVariants: x.selectedVariants,
          qty: x.qty,
          price: resData.price,
          before_price: resData.before_price,
          total_price: x.qty * resData.price,
          total_discount: x.qty * resData.before_price,
          error: errorArray,
          seo: resData.seo,
        });
      }
    }
  });
  allBasket[0].products = BasketAllProducts;
  allBasket[0].orderstatus_id = "6131278e07625b5635a8709f";
  allBasket[0].paymentmethods_id = "6132787ae4c2740b7aff7320";
  allBasket[0].shipping_address =
    allBasket[0].shipping_address.address +
    " " +
    allBasket[0].shipping_address.village_id +
    " " +
    allBasket[0].shipping_address.district_id +
    " " +
    allBasket[0].shipping_address.town_id +
    " " +
    allBasket[0].shipping_address.city_id;
  allBasket[0].billing_address =
    allBasket[0].billing_address.address +
    " " +
    allBasket[0].billing_address.village_id +
    " " +
    allBasket[0].billing_address.district_id +
    " " +
    allBasket[0].billing_address.town_id +
    " " +
    allBasket[0].billing_address.city_id;

  const dataRes = new Orders(allBasket[0]).save();
  return dataRes;
};

const getBasketProductsPrice = async (data = [], products = []) => {
  let basketTotalPrice = 0;

  products.map((x) => {
    const array = data.find((y) => y._id == x.product_id);
    if (array) {
      const resData = array;
      if (x.selectedVariants !== undefined) {
        const priceMath = filter_array_in_obj(
          resData.variant_products,
          x.selectedVariants
        );
        basketTotalPrice = basketTotalPrice + x.qty * priceMath[0].price;
      } else {
        basketTotalPrice = basketTotalPrice + x.qty * resData.price;
      }
    }
  });

  return basketTotalPrice;
};

const calculateOrderAmount = (ids, items) => {
  const price = Products.find({ _id: ids })
    .then(async (res) => await getBasketProductsPrice(res, items))
    .then((price) => price);
  return price;
};

const calculateCargoes = async (cargoes_id) => {
  if (cargoes_id) {
    const cargo_price = await Cargoes.find({ _id: cargoes_id });
    return cargo_price[0].price;
  } else {
    return 0;
  }
};

const updateProductSaleqty = (id, qty) => {
  Products.updateOne(
    { _id: id },
    {
      $inc: { saleqty: qty },
    }
  ).then((data) => data);
};

const updateProductQtyNormal = (id, qty) => {
  Products.updateOne(
    { _id: id },
    {
      $inc: { qty: -qty },
    }
  ).then((data) => data);
};

const updateProductQtyVariant = (id, variants, qty) => {
  Products.updateOne(
    {
      $and: [
        {
          _id: id,
        },
        {
          variant_products: {
            $elemMatch: variants,
          },
        },
      ],
    },
    {
      $inc: {
        "variant_products.$.saleqty": qty,
        "variant_products.$.qty": -qty,
      },
    }
  ).then((data) => console.log(data));
  return;
};

// router.route("/updateqty/:id/:qty").get((req, res) => {
//     const data = updateProductSaleqty(req.params.id, req.params.qty)
//     res.json((data))
// })

exports.stripe = async (req, res) => {
  Paymentmethods.findById("6132787ae4c2740b7aff7320").then(async (resPay) => {
    if (resPay.secret_key != "" && req.body.items.length > 0) {
      const stripe = require("stripe")(resPay.secret_key);
      const { items, ids, cargoes_id } = req.body;
      const price = await calculateOrderAmount(ids, items);
      const cargo_price = await calculateCargoes(cargoes_id);

      // Create a PaymentIntent with the order amount and currency
      const total_price = Math.round((price + cargo_price) * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: total_price,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
      });

      return await {
        basket: req.body.allBasket,
        items: items,
        ids: ids,
        clientSecret: paymentIntent.client_secret,
      };
    }
  });
}

exports.stripeokey = async (req, res) => {
  const { ids, items, basket } = req.body;

  Products.find({ _id: ids }).then(async (resData) => {
    const dataNewOrder = await getSaveProductsBaskettoOrders(
      resData,
      items,
      basket
    );
    res.json(dataNewOrder);
  });
}

exports.stripeokeyconfirm = async (req, res) => {
  Paymentmethods.findById("6132787ae4c2740b7aff7320").then(async (resPay) => {
    if (resPay.secret_key != "" && req.params.pi_key != "") {
      const stripe = require("stripe")(resPay.secret_key);

      const paymentIntent = await stripe.paymentIntents.retrieve(
        req.params.pi_key
      );

      return res.json(paymentIntent);
    }
  });
}
exports.stripeconfirm = (req, res) => {
  Orders.find(req.params)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        messagge: "Error: " + err,
        variant: "error",
      })
    );
}


exports.updatePaymentResponse = async (req, res) => {
  var user = req.user;
  try {
    var {
      orderId,
      type,
      result
    } = req.body;

    var orderDetails = await Orders.findOne({
      customer: user,
      _id: orderId
    });
    if (orderDetails) {
      var orderPaymentDetails = await OrderPayment.findOne({ order: orderId });
      //orderDetails.paymentGatewayStatus = type;
      //orderDetails.paymentGatewayResponse = result;
      orderPaymentDetails.paymentGatewayStatus = type;
      orderPaymentDetails.paymentGatewayResponse = result;
      if (type == "success") {
        var confirmedOrderStatus = await OrderStatus.findOne({ type: "confirmed" });
        orderDetails.orderStatus = confirmedOrderStatus;
        orderPaymentDetails.isPaymentAmountPaid = true;
        orderPaymentDetails.paymentPaidOn = new Date();
        orderPaymentDetails.gatewayTransactionId = result.razorpay_payment_id;

        //update inventory
        var orderProducts = await OrderProducts.find({ order: orderId });
        if (orderProducts) {
          for (const orderProduct of orderProducts) {
            await new ProductInventory({
              variant: orderProduct.variant,
              quantity: orderProduct.qty,
              date: new Date(),
              description: "Order - " + orderDetails.orderNumber,
              transactionType: 'dr',
              orderId: orderId,
              orderProduct: orderProduct._id
            }).save();
            await ProductVariants.updateOne(
              { _id: orderProduct.variant }, {
              $inc: { quantity: parseInt(orderProduct.qty) * (-1) }
            })
          }
        }
        await Basket.emptyBasket(user._id);
        await placeOrderNotification(orderDetails, user)
        res.json({
          success: true,
          result: orderDetails
        })
      }
      else {
        res.json({
          success: false,
          message: "Payment Failed"
        })
      }
      await orderDetails.save();
      await orderPaymentDetails.save();
      return;
    }
    else {
      return res.json({
        success: false,
        message: "Payment Failed"
      })
    }
  }
  catch (error) {
    return res.json({
      success: false,
      message: "Payment Failed"
    })
  }
}

const placeOrderNotification = async (orderDetails, userDetails) => {
  //send sms
  await orderPlacedSmsAPI(userDetails.countryCode, userDetails.phone, orderDetails.orderNumber);

  //send email
  if (userDetails.emailVerified) {
    const emailData = {
      name: userDetails.name,
      email: userDetails.email,
      orderId: orderDetails.orderNumber,
      orderDate: moment(orderDetails.createdAt).format("DD MMMM YYYY | hh:mm: A"),
      orderTotal: orderDetails.finalPrice,
      to: [userDetails.email]
    };
    await sendEmail('orderPlaced', emailData);
  }

  //send whatsapp
  await orderPlacedWhatsappAPI(userDetails.countryCode, userDetails.phone, userDetails.name, orderDetails.orderNumber);

  //send fcm
  if (userDetails.fcmToken) {
    await sendOrderPlaceFcmNotification(userDetails.fcmToken, orderDetails.orderNumber);
  }
}

exports.placeOrderOld = async (req, res) => {
  var user = req.user;
  try {
    var basketDetails = await Basket.findOne({ customer_id: user })
      .populate({
        path: "products",
        populate: ["selectedVariant"]
      })
    if (!basketDetails) {
      return res.status(400).json({
        success: false,
        message: "Please try again"
      })
    }
    let orderDetails;
    var pendingOrderStatus = await OrderStatus.findOne({ type: "pending" });
    if (basketDetails.order) {
      orderDetails = await Orders.findOne({ _id: basketDetails.order });
      orderDetails.total_price = basketDetails.total_price;
      orderDetails.paymentType = basketDetails.paymentType;
      orderDetails.shipToDiffAddress = basketDetails.shipToDiffAddress;
      await orderDetails.save();
    }
    else {
      orderDetails = await new Orders({
        customer: user,
        total_price: basketDetails.total_price,
        paymentType: basketDetails.paymentType,
        shipToDiffAddress: basketDetails.shipToDiffAddress,
        orderStatus: pendingOrderStatus
      }).save();
      await Basket.updateOne({
        customer_id: user
      }, {
        $set: {
          order: orderDetails
        },
      })
    }

    //add order addresses
    await OrderAddress.findOneAndUpdate(
      {
        order: orderDetails,
        type: "shipping"
      },
      { $set: basketDetails.shipping_address },
      {
        upsert: true,
        new: true
      }
    )
    /* await new OrderAddress({
      ...basketDetails.shipping_address,
      order: orderDetails,
      type:"shipping"
    }).save(); */
    await OrderAddress.findOneAndUpdate(
      {
        order: orderDetails,
        type: "billing"
      },
      { $set: basketDetails.billing_address },
      {
        upsert: true,
        new: true
      }
    )
    /* await new OrderAddress({
      ...basketDetails.billing_address,
      order: orderDetails,
      type:"billing"
    }).save(); */

    //add order product
    var basketProducts = basketDetails.products;
    await OrderProducts.deleteMany({
      order: orderDetails
    })
    for (const product of basketProducts) {
      var { priceDetails, offerDetails } = await getPriceDetails(product.selectedVariant);
      await new OrderProducts({
        product: product.product_id,
        variant: product.selectedVariant,
        qty: product.qty,
        order: orderDetails,
        priceDetails: priceDetails,
        offerDetails: offerDetails
      }).save()
    }

    if (basketDetails.paymentType == "cash") {
      var confirmedOrderStatus = await OrderStatus.findOne({ type: "confirmed" });
      orderDetails.orderStatus = confirmedOrderStatus;
      await orderDetails.save();
      /* await Basket.updateOne({
        customer_id: user
      },{
        $set: {
          products:[],
          total_price:0,
          
        },
        $unset:{
          order: 1,
          paymenyType: 1,
          billing_address: 1,
          shipping_address: 1
        }
      }) */
      await Basket.emptyBasket(user._id);
    }
    else if (basketDetails.paymentType == "gateway") {
      var razorpayOrder = await RazorpayController.createOrder(orderDetails.total_price, orderDetails._id);
      orderDetails.paymentGatewayOrderDetails = razorpayOrder;

      await orderDetails.save();
    }

    return res.json({
      success: true,
      result: orderDetails
    })
  }
  catch (error) {
    console.error(error)
    return res.status(400).json({
      success: false,
      message: "Please try again"
    })
  }

};
exports.placeOrder = async (req, res) => {
  var user = req.user;
  var userId = req.user._id;
  try {
    var basketDetails = await Basket.findOne({ customer_id: user })
      .populate({
        path: "products",
        populate: ["selectedVariant"]
      })
    if (!basketDetails) {

      return res.status(400).json({
        success: false,
        message: "Please try again"
      })
    }
    let orderDetails;
    var pendingOrderStatus = await OrderStatus.findOne({ type: "pending" });
    if (basketDetails.payableAmount == 0) {
      basketDetails.paymentType = null
    }
    /* if(basketDetails.order){
      orderDetails = await Orders.findOne({_id:basketDetails.order });
    }
    else{
      orderDetails =await new Orders({
        customer: user,
        total_price: basketDetails.total_price,
        orderStatus: pendingOrderStatus
      });
    } */

    orderDetails = await new Orders({
      customer: user,
      total_price: basketDetails.total_price,
      orderStatus: pendingOrderStatus
    });
    orderDetails.shipToDiffAddress = basketDetails.shipToDiffAddress;
    orderDetails.paymentType = basketDetails.paymentType;
    orderDetails.listedPrice = basketDetails.listedPrice;
    orderDetails.price = basketDetails.price;
    orderDetails.couponDiscount = basketDetails.couponDiscount;
    orderDetails.couponCode = basketDetails.couponCode;
    orderDetails.couponId = basketDetails.couponId;
    orderDetails.shippingCharge = basketDetails.shippingCharge;
    //orderDetails.priceWithoutGst = basketDetails.priceWithoutGst;
    //orderDetails.gst = basketDetails.gst;
    orderDetails.walletCredits = basketDetails.walletCredits;
    orderDetails.finalPrice = basketDetails.finalPrice;
    orderDetails.payableAmount = basketDetails.payableAmount;


    var settingDetails = await Settings.findOne({}).populate("companyState");

    var gstRate = settingDetails.gst;
    var companyStateCode = settingDetails?.companyState?.code;
    var gstAmount = (basketDetails.finalPrice * gstRate / 100).toFixed(2);
    var priceWithoutGst = (basketDetails.finalPrice - gstAmount).toFixed(2);
    var shippingStateCode = basketDetails?.shipping_address?.state?.code;
    orderDetails.priceWithoutGst = priceWithoutGst;
    orderDetails.gst = gstAmount;
    orderDetails.gstRate = gstRate;
    if (companyStateCode == shippingStateCode) {
      orderDetails.igst = gstAmount;
      orderDetails.cgst = 0;
      orderDetails.sgst = 0;
    }
    else {
      orderDetails.igst = 0;
      orderDetails.cgst = (gstAmount / 2).toFixed(2);
      orderDetails.sgst = (gstAmount / 2).toFixed(2);
    }
    await orderDetails.save();
    await Basket.updateOne({
      customer_id: user
    }, {
      $set: {
        order: orderDetails
      },
    })
    //orderPaymentDetails
    var orderPaymentDetails = new OrderPayment({
      order: orderDetails._id,
      totalAmount: orderDetails.finalPrice,
      walletAmount: orderDetails.walletCredits,
      paymentType: basketDetails.paymentType,
      paymentAmount: orderDetails.payableAmount,
    })
    //add order addresses
    delete basketDetails.shipping_address._id;
    delete basketDetails.billing_address._id;
    await OrderAddress.findOneAndUpdate(
      {
        order: orderDetails,
        type: "shipping"
      },
      { $set: basketDetails.shipping_address },
      {
        upsert: true,
        new: true
      }
    )

    await OrderAddress.findOneAndUpdate(
      {
        order: orderDetails,
        type: "billing"
      },
      { $set: basketDetails.billing_address },
      {
        upsert: true,
        new: true
      }
    )

    //add order product
    var basketProducts = basketDetails.products;
    await OrderProducts.deleteMany({
      order: orderDetails
    })
    for (const product of basketProducts) {
      var { priceDetails, offerDetails } = await getPriceDetails(product.selectedVariant);
      await new OrderProducts({
        product: product.product_id,
        variant: product.selectedVariant,
        qty: product.qty,
        order: orderDetails,
        listedPrice: product.listedPrice,
        price: product.price,
        offerPrice: product.offerPrice,
        discount: product.discount,
        total: product.total,
        gst: product.gst,
        offerDetails: offerDetails
      }).save()
    }
    if (basketDetails.walletCredits) {
      var transactionType = await WalletTransactionType.findOne({ type: "orderdebit" });
      var walletTransaction = await WalletTransactions.debitAmount(userId, basketDetails.walletCredits, transactionType);
      if (walletTransaction) {
        //orderDetails.walletTransaction = walletTransaction;
        orderPaymentDetails.walletTransaction = walletTransaction;
      }

    }
    var orderId = orderDetails._id;
    var orderNumber = orderDetails.orderNumber;
    if (basketDetails.paymentType == "cash" || basketDetails.payableAmount == 0) {
      var confirmedOrderStatus = await OrderStatus.findOne({ type: "confirmed" });
      orderDetails.orderStatus = confirmedOrderStatus;
      await orderDetails.save();
      await orderPaymentDetails.save();

      //update inventory

      var orderProducts = await OrderProducts.find({ order: orderId });
      if (orderProducts) {
        for (const orderProduct of orderProducts) {
          await new ProductInventory({
            variant: orderProduct.variant,
            quantity: orderProduct.qty,
            date: new Date(),
            description: "Order - " + orderDetails.orderNumber,
            transactionType: 'dr',
            orderId: orderId,
            orderProduct: orderProduct._id
          }).save();
          await ProductVariants.updateOne(
            { _id: orderProduct.variant }, {
            $inc: { quantity: parseInt(orderProduct.qty) * (-1) }
          })
        }
      }


      await Basket.emptyBasket(user._id);
      await placeOrderNotification(orderDetails, user)
    }
    else if (basketDetails.paymentType == "gateway") {
      //var razorpayOrder = await RazorpayController.createOrder(orderPaymentDetails.paymentAmount, orderPaymentDetails.order);
      ////orderDetails.paymentGatewayOrderDetails = razorpayOrder;
      //orderPaymentDetails.paymentGatewayOrderDetails = razorpayOrder;

      var phonepeOrder = await PhonePeController.createOrder(orderPaymentDetails.paymentAmount, orderNumber, user._id, `/cart/paymentConfirm/${orderNumber}`);
      orderPaymentDetails.paymentGatewayOrderDetails = phonepeOrder;

      await orderPaymentDetails.save();
      await orderDetails.save();
    }

    return res.json({
      success: true,
      result: orderPaymentDetails
    })
  }
  catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }

};

exports.verifyPayment = async (req, res) => {
  var orderId = req.body.orderId;
  if (!orderId) {
    return res.json({
      success: false,
      message: "Invalid Order Id"
    })
  }
  var orderDetails = await Orders.findOne({ orderNumber: orderId }).populate("payment");
  if (orderDetails) {
    var status = orderDetails?.payment?.paymentGatewayStatus;
    var message = "Your payment is in pending state. We will update you once its completed";
    if (status == "success")
      message = "Order Placed Successfully";
    else if (status == "failed") {
      message = "Sorry Payment Failed."
    }
    return res.json({
      success: true,
      type: "order",
      error: status == "success" ? false : true,
      message: message,
      orderNumber: orderDetails.orderNumber
    })
  }

  var giftCardDetails = await GiftCard.findOne({ _id: orderId });
  if (giftCardDetails) {
    var status = giftCardDetails.paymentGatewayStatus;
    var message = "Your payment is in pending state. We will update you once its completed";
    if (status == "success")
      message = "Gift Code Generated Successfully";
    else if (status == "failed") {
      message = "Sorry Payment Failed."
    }
    return res.json({
      success: true,
      type: "giftcard",
      error: status == "success" ? false : true,
      message: message
    })
  }


  return res.json({
    success: false,
    message: "Some Error occurred. please try again after some time"
  })
}

