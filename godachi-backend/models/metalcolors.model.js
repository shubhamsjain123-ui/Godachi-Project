const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetalColorsSchema = new Schema(
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
  },
  {
    collection: "metalcolors",
    timestamps: true,
  }
);

const MetalColors = mongoose.model("MetalColors", MetalColorsSchema);

module.exports = MetalColors;
