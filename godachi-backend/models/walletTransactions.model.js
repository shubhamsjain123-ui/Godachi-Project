const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Customers = require("../models/customer.model");

const WalletTransactionSchema = new Schema(
  {
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        default: null,
    },
    amount: Number,
    type:{
        type: String,
        enum:["dr","cr"],
        required: true
    },
    transactionType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "WalletTransactionType",
        default: null,
    }
  },
  {
    timestamps: true,
  }
);

const WalletTransaction = mongoose.model("WalletTransaction", WalletTransactionSchema);

WalletTransaction.creditAmount = async (userId, amount, transactionType)=>{
  var walletTransaction = await new WalletTransaction({
    customer: userId,
    amount: amount,
    type:"cr",
    transactionType: transactionType
  }).save();
  if(walletTransaction){
    //update user balance
    await Customers.updateOne({_id: userId},{
      $inc: {
        walletBalance: amount
      }
    })
    return walletTransaction
  } 
  return false
}

WalletTransaction.debitAmount = async (userId, amount, transactionType)=>{
  var walletTransaction = await new WalletTransaction({
    customer: userId,
    amount: amount,
    type:"dr",
    transactionType: transactionType
  }).save();
  if(walletTransaction){
    //update user balance
    await Customers.updateOne({_id: userId},{
      $inc: {
        walletBalance: (-1)*amount
      }
    })
    return walletTransaction
  } 
  return false
}

module.exports = WalletTransaction;

