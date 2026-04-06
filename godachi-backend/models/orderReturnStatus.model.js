const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReturnstatusSchema = new Schema(
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
    timestamps: true,
  }
);

const Returnstatus = mongoose.model("Returnstatus", ReturnstatusSchema);

module.exports = Returnstatus;
