const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductOffersSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    offerPeriod:[{
        type: Date,
        required: true,
        index: true
    }],
    display:{
      type:String,
      required:true
    },
    defaultDiscount:String,
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductOffersSchema.virtual('products', {
  ref: 'ProductOfferList', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'offer', // Field on the trade schema
});

ProductOffersSchema.set('toObject', { virtuals: true })
ProductOffersSchema.set('toJSON', { virtuals: true })

const ProductOffers = mongoose.model("ProductOffers", ProductOffersSchema);

module.exports = ProductOffers;
