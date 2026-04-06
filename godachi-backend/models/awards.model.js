const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AwardsSchema = new Schema(
  {
    
    date: Date,
    title: String,
    organization: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Awards = mongoose.model("Awards", AwardsSchema);

module.exports = Awards;