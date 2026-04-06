const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiamondVariantsSchema = new Schema(
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
    priceDependant: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

DiamondVariantsSchema.virtual('variants', {
  ref: 'DiamondVariantList', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'diamondVariant', // Field on the trade schema
});

DiamondVariantsSchema.set('toObject', { virtuals: true })
DiamondVariantsSchema.set('toJSON', { virtuals: true })


const DiamondVariants = mongoose.model("DiamondVariants", DiamondVariantsSchema);

module.exports = DiamondVariants;
