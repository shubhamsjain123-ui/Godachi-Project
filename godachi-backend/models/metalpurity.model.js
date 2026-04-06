const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetalPuritySchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    metal:{
      type: Schema.Types.ObjectId,
      ref: 'Metals',
      required: true,
      index:true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    purityPercent:{
      type: Number,
      required:true
    },
    sellingPercent:{
      type: Number,
      required:true
    },
    price:Number
  },
  {
    timestamps: true,
  }
);

const MetalPurity = mongoose.model("MetalPurity", MetalPuritySchema);

module.exports = MetalPurity;
