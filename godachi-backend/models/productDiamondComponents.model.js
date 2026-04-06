const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductDiamondComponentsSchema = new Schema(
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
    diamondVariants:{
      type:[{
        variantMaster: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DiamondVariants",
          index: true
        },
        variantValue: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DiamondVariantList",
          index: true
        },
      }],
      index: true
    },
  },
  {
    timestamps: true,
  }
);

const ProductDiamondComponents = mongoose.model("ProductDiamondComponents", ProductDiamondComponentsSchema);

module.exports = ProductDiamondComponents;
