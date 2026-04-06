const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomizeJewellerySchema = new Schema(
  {
    
    name: String,
    email: String,
    countryCode: String,
    phone: String,
    productCode: String,
    images:[],
    comments:String,
    status:{
        type: String,
        enum:["pending", "confirmed"],
        default: "pending"
    }
  },
  {
    timestamps: true,
  }
);

const CustomizeJewellery = mongoose.model("CustomizeJewellery", CustomizeJewellerySchema);

module.exports = CustomizeJewellery;