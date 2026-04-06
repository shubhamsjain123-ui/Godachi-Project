const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const OrderRefundSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      default: null,
    },
    return: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderReturn",
      default: null,
    },
    totalRefundAmount: Number,
    refundWalletAmount: Number,
    refundWalletTransaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "WalletTransaction",
        default: null,
    },
    refundType: String,
    refundAmount: Number,
    isRefundAmountPaid: {
        type: Boolean,
        default: false
    },
    refundPaidOn:Date,
    refundGatewayTransactionId: String,
    paymentGatewayStatus: String,
    paymentGatewayResponse: {},
    creditNoteGenerated: {
      type: Boolean,
      default: false
    },
    creditNoteNumber:String,
    creditNoteNumberGeneratedOn:Date
  },
  {
    timestamps: true,
  }
);

OrderRefundSchema.pre("save", function (next) {
  if(!this.creditNoteNumber && this.creditNoteGenerated==true){
    let number = moment().unix().toString() + moment().milliseconds().toString();
    if (number.length == 12) {
      number = number + "0";
    }
    if (number.length == 11) {
      number = number + "00";
    }
    this.creditNoteNumber = number;
    this.creditNoteNumberGeneratedOn = new Date();
  }
  next();
});
const OrderRefund = mongoose.model("OrderRefund", OrderRefundSchema);

module.exports = OrderRefund;
