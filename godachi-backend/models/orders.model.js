const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
  {
    orderNumber: {
        type: String,
        index: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },
    orderStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orderstatus",
      required: true
    },
    listedPrice:{
      type: Number,
      required: true
    },
    price:{
      type: Number,
      required: true
    },
    couponDiscount:{
      type: Number,
      default: 0
    },
    couponCode:String,
    couponId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupons",
    },
    shippingCharge:{
      type: Number,
      required: true
    },
    priceWithoutGst:{
      type: Number,
      required: true
    },
    gst:{
      type: Number,
      required: true
    },
    gstRate:{
      type: Number,
      required: true
    },
    igst:{
      type: Number,
      required: true
    },
    cgst:{
      type: Number,
      required: true
    },
    sgst:{
      type: Number,
      required: true
    },
    walletCredits:{
      type: Number,
      required: true
    },
    finalPrice:{
      type: Number,
      required: true
    },
    payableAmount:{
      type: Number,
      required: true
    },
    note: {
      type: String,
    },
    walletTransaction:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "WalletTransaction",
      default: null,
    },
    paymentType: String,
    paymentGatewayOrderDetails: {},
    paymentGatewayStatus: String,
    paymentGatewayResponse: {},
    shipToDiffAddress: {
      type: Boolean,
      default: false
    },
    isShipped:{
      type:Boolean,
      default: false
    },
    packedOn:Date,
    waybill: String,
    logistic_name: String,
    current_logistics_status: String,
    lastCheckedLogisticStatus: Date,
    directShipment: Boolean,
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredOn: Date,
    isCancelled: {
      type: Boolean,
      default: false
    },
    cancelledOn: Date,
    cancelledBy:{
      type: String,
      enum:["user","admin"]
    }
  },
  {
    timestamps: true,
  }
);

OrdersSchema.pre("save", function (next) {
  if(!this.orderNumber){
    let number = moment().unix().toString() + moment().milliseconds().toString();
    if (number.length == 12) {
      number = number + "0";
    }
    if (number.length == 11) {
      number = number + "00";
    }
    this.orderNumber = number;
  }
  next();
});

OrdersSchema.virtual('products', {
  ref: 'OrderProducts', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'order', // Field on the trade schema
});
OrdersSchema.virtual('address', {
  ref: 'OrderAddress', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'order', // Field on the trade schema
});
OrdersSchema.virtual('payment', {
  ref: 'OrderPayment', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'order', // Field on the trade schema
  justOne: true
});
OrdersSchema.virtual('refunds', {
  ref: 'OrderRefund', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'order', // Field on the trade schema
});

OrdersSchema.set('toObject', { virtuals: true })
OrdersSchema.set('toJSON', { virtuals: true })

const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = Orders;
