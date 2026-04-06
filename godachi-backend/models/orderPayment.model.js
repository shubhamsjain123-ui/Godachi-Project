const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const OrderPaymentSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      default: null,
    },
    totalAmount: Number,
    walletAmount: Number,
    walletTransaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "WalletTransaction",
        default: null,
    },
    paymentType: String,
    paymentAmount: Number,
    isPaymentAmountPaid: {
        type: Boolean,
        default: false
    },
    paymentPaidOn:Date,
    paymentGatewayOrderDetails: {},
    paymentGatewayStatus: String,
    paymentGatewayResponse: {},
    gatewayTransactionId: String,
    hsnCode:String,
    invoiceGenerated: {
      type: Boolean,
      default: false
    },
    invoiceNumber:String,
    invoiceNumberGeneratedOn:Date,
  },
  {
    timestamps: true,
  }
);

OrderPaymentSchema.pre("save", function (next) {
  if(!this.invoiceNumber && this.invoiceGenerated==true){
    let number = moment().unix().toString() + moment().milliseconds().toString();
    if (number.length == 12) {
      number = number + "0";
    }
    if (number.length == 11) {
      number = number + "00";
    }
    this.invoiceNumber = number;
    this.invoiceNumberGeneratedOn = new Date();
  }
  next();
});

const OrderPayment = mongoose.model("OrderPayment", OrderPaymentSchema);

OrderPayment.updatePaymentResponse = async (orderId, type, gatewayResponse, gatewayTransactionId)=>{
  var orderPaymentDetails = await OrderPayment.findOne({order:orderId});

  orderPaymentDetails.paymentGatewayStatus = type;
  orderPaymentDetails.paymentGatewayResponse = gatewayResponse;

  if(type=="success"){
    orderPaymentDetails.isPaymentAmountPaid = true;
    orderPaymentDetails.paymentPaidOn = new Date();
    orderPaymentDetails.gatewayTransactionId = gatewayTransactionId;
  }
  await orderPaymentDetails.save();
  return
}

module.exports = OrderPayment;
