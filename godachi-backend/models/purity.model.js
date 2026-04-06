const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PuritySchema = new Schema(
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
    collection: "purity",
    timestamps: true,
  }
);

const Purity = mongoose.model("Purity", PuritySchema);

module.exports = Purity;
