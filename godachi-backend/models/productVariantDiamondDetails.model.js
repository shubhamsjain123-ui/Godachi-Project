const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductVariantDiamondDetailsSchema = new Schema(
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
      ref: "ProductDiamondComponents",
      required: true
    },
    weight: String,
    weightUnit: String,
    noOfStones: String,
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

const ProductVariantDiamondDetails = mongoose.model("ProductVariantDiamondDetails", ProductVariantDiamondDetailsSchema);

module.exports = ProductVariantDiamondDetails;
