const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariantsSchema = new Schema(
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
    image: String
  },
  {
    collection: "variants",
    timestamps: true,
  }
);

VariantsSchema.virtual('variants', {
  ref: 'VariantOptions', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'variant', // Field on the trade schema
});

VariantsSchema.set('toObject', { virtuals: true })
VariantsSchema.set('toJSON', { virtuals: true })

const Variants = mongoose.model("Variants", VariantsSchema);

module.exports = Variants;
