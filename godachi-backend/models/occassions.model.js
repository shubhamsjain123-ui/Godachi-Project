const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OccassionsSchema = new Schema(
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
    image: String,
    showOnWeb: {
      type: Boolean,
      required: true,
      default: false,
    },
    showOnApp: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: "occassions",
    timestamps: true,
  }
);

const Occassions = mongoose.model("Occassions", OccassionsSchema);

module.exports = Occassions;
