const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiamondVariantListSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    diamondVariant:{
      type: Schema.Types.ObjectId,
      ref: 'DiamondVariants',
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
    timestamps: true,
  }
);

const DiamondVariantList = mongoose.model("DiamondVariantList", DiamondVariantListSchema);

module.exports = DiamondVariantList;
