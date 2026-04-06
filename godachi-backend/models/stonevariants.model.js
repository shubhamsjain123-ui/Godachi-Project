const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoneVariantsSchema = new Schema(
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
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priceDependant: {
      type: Boolean,
      default: false,
    }
  },
  {
    collection: "stonevariants",
    timestamps: true,
  }
);

StoneVariantsSchema.virtual('variants', {
  ref: 'StoneVariantList', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'stoneVariant', // Field on the trade schema
});

StoneVariantsSchema.set('toObject', { virtuals: true })
StoneVariantsSchema.set('toJSON', { virtuals: true })


const StoneVariants = mongoose.model("StoneVariants", StoneVariantsSchema);

module.exports = StoneVariants;
