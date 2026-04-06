const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BasketSchema = new Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
      unique: true,
    },
    shipping_address: {
      type: Object,
    },
    isShippable:{
      type:Boolean,
      default: false
    },
    billing_address: {
      type: Object,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
    shipToDiffAddress:{
      type: Boolean,
      default: false
    },
    useWalletCredits:{
      type: Boolean,
      default: false
    },
    products: [
      {
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
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
        seo: {
          type: String,
          required: true,
        },
        img: String,
        title: String,
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Categories",
          required: true
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
      },
    ],
    paymentType: String,
    listedPrice:{
      type: Number,
      required: true
    },
    price:{
      type: Number,
      required: true
    },
    couponDiscount:{
      type: Number,
      default: 0
    },
    couponCode:String,
    couponId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupons",
    },
    shippingCharge:{
      type: Number,
      required: true
    },
    priceWithoutGst:{
      type: Number,
      required: true
    },
    gst:{
      type: Number,
      required: true
    },
    walletCredits:{
      type: Number,
      required: true
    },
    finalPrice:{
      type: Number,
      required: true
    },
    payableAmount:{
      type: Number,
      required: true
    },
  },

  {
    timestamps: true,
  }
);

const Basket = mongoose.model("Basket", BasketSchema);

Basket.emptyBasket = async (userId)=>{
  await Basket.deleteOne({customer_id:userId});
  return;
}

module.exports = Basket;


