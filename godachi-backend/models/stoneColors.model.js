const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoneColorsSchema = new Schema(
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
    timestamps: true,
  }
);

const StoneColors = mongoose.model("StoneColors", StoneColorsSchema);

module.exports = StoneColors;
