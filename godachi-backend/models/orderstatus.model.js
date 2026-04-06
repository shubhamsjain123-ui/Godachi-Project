const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderstatusSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    title: {
      required: true,
      type: String,
      unique: true,
      trim: true,
    },
    type:{
      type: String,
      required: true
    },
    colorCode:String,
    className:String,
    image: {
      type: String,
    },
  },
  {
    collection: "orderstatus",
    timestamps: true,
  }
);

const Orderstatus = mongoose.model("Orderstatus", OrderstatusSchema);

module.exports = Orderstatus;
