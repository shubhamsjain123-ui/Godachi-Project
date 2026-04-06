const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariantOptionsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    variant:{
      type: Schema.Types.ObjectId,
      ref: 'Variants',
      required: true,
      index:true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    value:{
        type: String,
        required: true,
        trim: true,
    }
  },
  {
    collection: "variantOptions",
    timestamps: true,
  }
);

const VariantOptions = mongoose.model("VariantOptions", VariantOptionsSchema);

module.exports = VariantOptions;
