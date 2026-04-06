const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeMenuItemSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    menu:{
        type: Schema.Types.ObjectId,
        ref: 'HomeMenu',
        required: true,
        index:true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    order: {
        type: Number,
        required: true,
    },
    column: {
        type: Number,
        required: true,
    },
    filter: {
        type: String,
        required: true,
        trim: true,
    },
    filterOptions:[]
  },
  {
    timestamps: true,
  }
);

const HomeMenuItem = mongoose.model("HomeMenuItem", HomeMenuItemSchema);

module.exports = HomeMenuItem;
