const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
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

const Vendors = mongoose.model("Vendors", VendorSchema);

module.exports = Vendors;
