const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WishlistSchema = new Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true
    },
    selectedVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariants",
      required: true
    },
    seo: {
      type: String,
      required: true,
    }
  },

  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
