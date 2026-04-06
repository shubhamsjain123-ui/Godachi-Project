const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const OrderShipmentSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: true
    },
    parcelLength: Number,
    parcelWidth: Number,
    parcelHeight: Number,
    parcelWeight: Number,
    waybill: String,
    logistic_name: String,
    cancel_status: String,
    current_status: String,
    current_status_code: String,
    ofd_count: String,
    expected_delivery_date: String,
    promise_delivery_date: String,
    current_tracking_details:{},
    lastCheckedLogisticStatus: Date,
    remark: String
  },
  {
    timestamps: true,
  }
);


const OrderShipment = mongoose.model("OrderShipment", OrderShipmentSchema);

module.exports = OrderShipment;
