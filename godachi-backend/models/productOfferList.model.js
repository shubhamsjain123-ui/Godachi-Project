const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductOfferListSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    offer:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductOffers",
      index: true
    },
    variant:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariants",
      index: true
    },
    offerPercent:{
        type: Number,
        required: true,
        index: true
    },
    offerValue:{
        type: Number,
        required: true,
        index: true
    }
  },
  {
    timestamps: true,
  }
);

const ProductOfferList = mongoose.model("ProductOfferList", ProductOfferListSchema);

module.exports = ProductOfferList;
