const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductVariantStoneDetailsSchema = new Schema(
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
      ref: "ProductStoneComponents",
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

const ProductVariantStoneDetails = mongoose.model("ProductVariantStoneDetails", ProductVariantStoneDetailsSchema);

module.exports = ProductVariantStoneDetails;
