const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StonesSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price:Number,
    priceType:{
      type: String,
    },
    weightUnit:{
      type: String,
    },
    materialFilter: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: "stones",
    timestamps: true,
  }
);

StonesSchema.virtual('variants', {
  ref: 'StoneVariants', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'stone', // Field on the trade schema
});

StonesSchema.virtual('variant_price', {
  ref: 'StoneVariantPricing', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'stone', // Field on the trade schema
});

StonesSchema.set('toObject', { virtuals: true })
StonesSchema.set('toJSON', { virtuals: true })

const Stones = mongoose.model("Stones", StonesSchema);

module.exports = Stones;
