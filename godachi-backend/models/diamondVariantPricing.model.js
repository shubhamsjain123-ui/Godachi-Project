const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiamondVariantPricingSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    price:{
        type: Number,
    },
    variant_id:[
        {
            type: Schema.Types.ObjectId,
            ref: 'DiamondVariantList',
            required: true,
            index:true
        },
    ],
  },
  {
    timestamps: true,
  }
);


const DiamondVariantPricing = mongoose.model("DiamondVariantPricing", DiamondVariantPricingSchema);

module.exports = DiamondVariantPricing;
