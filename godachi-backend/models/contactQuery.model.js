const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactQuerySchema = new Schema(
  {
    
    name: String,
    email: String,
    countryCode: String,
    phone: String,
    type: String,
    comments:String
  },
  {
    timestamps: true,
  }
);

const ContactQuery = mongoose.model("ContactQuery", ContactQuerySchema);

module.exports = ContactQuery;