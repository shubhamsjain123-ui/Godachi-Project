const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const OrderProductsSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: true
    },
    orderReturn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderReturn",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariants",
      required: true
    },
    qty: {
      type: Number,
      required: true,
      default: 1,
    },
    listedPrice:{
      type: Number,
      required: true
    },
    price:{
      type: Number,
      required: true
    },
    offerPrice:{
      type: Number,
      required: true
    },
    discount:{
      type: Number,
      default: 0
    },
    total:{
      type: Number,
      required: true
    },
    gst:{
      type: Number,
      required: true
    },
    offerDetails:{},
  },
  {
    timestamps: true,
  }
);


const OrderProducts = mongoose.model("OrderProducts", OrderProductsSchema);

module.exports = OrderProducts;
