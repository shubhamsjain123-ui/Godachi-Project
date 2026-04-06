const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WebFaqsCategorySchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    name:{
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const WebFaqsCategory = mongoose.model("WebFaqsCategory", WebFaqsCategorySchema);

module.exports = WebFaqsCategory;
