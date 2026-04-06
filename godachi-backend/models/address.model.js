const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
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
    nickName: String,
    defaultAddress:{
        type: Boolean,
        required: true,
        default: false
    }
  },{
    timestamps: true,
  }
);

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
