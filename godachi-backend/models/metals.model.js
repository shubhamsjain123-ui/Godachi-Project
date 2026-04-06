const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetalsSchema = new Schema(
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
    seoTitle:String,
    seoDescription: String,
    price: Number,
    materialFilter: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

MetalsSchema.virtual('purity', {
  ref: 'MetalPurity', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'metal', // Field on the trade schema
});

MetalsSchema.set('toObject', { virtuals: true })
MetalsSchema.set('toJSON', { virtuals: true })

const Metals = mongoose.model("Metals", MetalsSchema);

module.exports = Metals;
