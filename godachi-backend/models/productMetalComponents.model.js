const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductMetalComponentsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      index: true
    },
    metalType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Metals",
      index: true
    },
    metalPurity:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "MetalPurity",
      index: true
    },
    metalColor:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "MetalColors",
      index: true
    }
  },
  {
    timestamps: true,
  }
);

const ProductMetalComponents = mongoose.model("ProductMetalComponents", ProductMetalComponentsSchema);

module.exports = ProductMetalComponents;
