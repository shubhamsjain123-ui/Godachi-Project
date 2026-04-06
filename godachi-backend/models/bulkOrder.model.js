const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BulkOrderSchema = new Schema(
  {
    
    name: String,
    businessName: String,
    email: String,
    countryCode: String,
    phone: String,
    productCode: String,
    quantity: String,
    city: String,
    comments:String
  },
  {
    timestamps: true,
  }
);

const BulkOrder = mongoose.model("BulkOrder", BulkOrderSchema);

module.exports = BulkOrder;