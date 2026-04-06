const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductStoneComponentsSchema = new Schema(
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
    stoneType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stones",
      index: true
    },
    stoneColor:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoneColors",
      index: true
    },
    stoneVariants:{
      type:[{
        variantMaster: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "StoneVariants",
          index: true
        },
        variantValue: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "StoneVariantList",
          index: true
        },
      }],
      index: true
    }
  },
  {
    timestamps: true,
  }
);

const ProductStoneComponents = mongoose.model("ProductStoneComponents", ProductStoneComponentsSchema);

module.exports = ProductStoneComponents;
