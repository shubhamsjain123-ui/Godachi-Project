const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductInventorySchema = new Schema(
  {
    variant:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariants",
    },
    vendor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendors",
    },
    quantity: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        enum : ['cr','dr'],
    },
    orderId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
    returnId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderReturn",
    },
    orderProduct:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderProducts",
    },
    date: {
      type: Date,
      required: true
    },
    purchasePrice: Number,
    invoiceNumber: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const ProductInventory = mongoose.model("ProductInventory", ProductInventorySchema);

module.exports = ProductInventory;
