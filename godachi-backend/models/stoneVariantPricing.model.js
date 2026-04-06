const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoneVariantPricingSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    stone:{
        type: Schema.Types.ObjectId,
        ref: 'Stones',
        required: true,
        index:true
    },
    price:{
        type: Number,
    },
    variant_id:[
        {
            type: Schema.Types.ObjectId,
            ref: 'StoneVariantList',
            required: true,
            index:true
        },
    ],
  },
  {
    timestamps: true,
  }
);


const StoneVariantPricing = mongoose.model("StoneVariantPricing", StoneVariantPricingSchema);

module.exports = StoneVariantPricing;
