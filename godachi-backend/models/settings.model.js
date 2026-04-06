const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema(
  {
    company: {
      required: true,
      type: String,
      trim: true,
    },
    taxnumber: {
      required: true,
      type: String,
      trim: true,
    },
    taxcenter: {
      required: true,
      type: String,
      trim: true,
    },
    gst:{
      required: true,
      type: Number,
    },
    price_icon: {
      required: true,
      type: String,
      trim: true,
    },
    price_type: {
      required: true,
      type: Boolean,
      trim: true,
    },
    address: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        value: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],
    title: {
      required: true,
      type: String,
      trim: true,
    },
    description: {
      required: true,
      type: String,
      trim: true,
    },
    keywords: {
      required: true,
      type: String,
      trim: true,
    },
    website: {
      required: true,
      type: String,
      trim: true,
    },
    company_user: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        mail: {
          type: String,
          required: true,
          default: true,
        },
        phone: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],
    email: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        value: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],
    phone: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        value: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],
    anydata: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        value: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],

    image: {
      type: String,
    },
    shipping_policy:String,
    return_policy:String,
    return_exchange_clause:String,

    companyGst:String,
    panNumber:String,
    companyState: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
    },
    companyPoNo:String,
    invoiceCompanyName: String,
    invoiceCompanyAddress: String,
    invoiceCertifyText:String,
    invoiceBottomText:String,

    referralAmount: Number,
    refereeAmount: Number,
    shippingCartValue: Number,

    topOfferText: String,
    belowBannerOfferText1: String,
    belowBannerOfferText2: String,
    footerOfferText1: String,
    footerOfferText2: String,
    topOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductOffers",
    },
    belowBannerOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductOffers",
    },
    footerOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductOffers",
    },

  },
  {
    collection: "settings",
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", SettingsSchema);

module.exports = Settings;
