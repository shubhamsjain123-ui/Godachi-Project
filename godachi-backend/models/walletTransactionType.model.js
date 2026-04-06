const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletTransactionTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      required: true
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const WalletTransactionType = mongoose.model("WalletTransactionType", WalletTransactionTypeSchema);

module.exports = WalletTransactionType;