const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductVariantMetalDetailsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    variant:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariants",
    },
    component:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductMetalComponents",
      required: true
    },
    weight: Number,
    weightUnit: String,
    price:{
        type:Number,
    },
    discount:{
        type:Number,
        default: 0
    },
    discountType:String,
    priceType:String,
    finalPrice:{
        type:Number,
    }
  },
  {
    timestamps: true,
  }
);

const ProductVariantMetalDetails = mongoose.model("ProductVariantMetalDetails", ProductVariantMetalDetailsSchema);

module.exports = ProductVariantMetalDetails;
