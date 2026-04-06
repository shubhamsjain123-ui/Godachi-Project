const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductOtherSpecsSchema = new Schema(
  {
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    heading: String,
    specs:[
        {
        name: String,
        value: String
        }
    ],
  },
  {
    timestamps: true,
  }
);

const ProductOtherSpecs = mongoose.model("ProductOtherSpecs", ProductOtherSpecsSchema);

module.exports = ProductOtherSpecs;
