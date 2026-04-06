const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoneVariantListSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    stoneVariant:{
      type: Schema.Types.ObjectId,
      ref: 'StoneVariants',
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
    collection: "stonevariantlist",
    timestamps: true,
  }
);

const StoneVariantList = mongoose.model("StoneVariantList", StoneVariantListSchema);

module.exports = StoneVariantList;
