const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const OrderReturnSchema = new Schema(
  {
    returnNumber: {
        type: String,
        index: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
        default: null,
    },
    reason: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userImages: [{
        type: String
    }],
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paymentmethods",
      default: null,
    },
    returnStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Returnstatus",
      required: true
    },
    total_price: {
      type: Number,
      default: 0,
      required: true,
    },
    note: {
      type: String,
    },
    paymentType: String,
    paymentGatewayOrderDetails: {},
    paymentGatewayStatus: String,
    paymentGatewayResponse: {},
    isShipped:{
      type:Boolean,
      default: false
    },
    packedOn:Date,
    waybill: String,
    logistic_name: String,
    isCancelled: {
      type: Boolean,
      default: false
    },
    cancelledOn: Date,
    cancelledBy:{
      type: String,
      enum:["user","admin"]
    },
    isReceived: {
      type: Boolean,
      default: false
    },
    receivedOn: Date,
    isRefunded: {
      type: Boolean,
      default: false
    },
    refundInitiateOn: Date,
    refundTransaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderRefund"
    },
  },
  {
    timestamps: true,
  }
);

OrderReturnSchema.pre("save", function (next) {
  if(!this.returnNumber){
    let number = moment().unix().toString() + moment().milliseconds().toString();
    if (number.length == 12) {
      number = number + "0";
    }
    if (number.length == 11) {
      number = number + "00";
    }
    this.returnNumber = number;
  }
  next();
});

OrderReturnSchema.virtual('products', {
  ref: 'OrderProducts', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'orderReturn', // Field on the trade schema
});
OrderReturnSchema.virtual('address', {
    ref: 'OrderAddress', // What model to link
    localField: 'order', // field on the offer schema
    foreignField: 'order', // Field on the trade schema
  });
  OrderReturnSchema.virtual('refund', {
    ref: 'OrderRefund', // What model to link
    localField: '_id', // field on the offer schema
    foreignField: 'return', // Field on the trade schema
    justOne: true
  });
  OrderReturnSchema.virtual('shipment', {
    ref: 'OrderShipment', // What model to link
    localField: 'order', // field on the offer schema
    foreignField: 'order', // Field on the trade schema
    justOne: true
  });

OrderReturnSchema.set('toObject', { virtuals: true })
OrderReturnSchema.set('toJSON', { virtuals: true })

const OrderReturn = mongoose.model("OrderReturn", OrderReturnSchema);

module.exports = OrderReturn;
