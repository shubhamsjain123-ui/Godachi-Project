const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const OrderAddressSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      default: null,
    },
    type:String,
    title: String,
    firstName: String,
    lastName: String,
    country: String,
    countryCode: String,
    phoneNumber: String,
    pinCode: String,
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
    },
    city: String,
    address: String,
    landmark: String,
  },
  {
    timestamps: true,
  }
);


const OrderAddress = mongoose.model("OrderAddress", OrderAddressSchema);

module.exports = OrderAddress;
