const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {generateGiftCode} = require("../utils")
const GiftCardSchema = new Schema(
  {
    
    amount: Number,
    boughtBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        required: true
    },
    requestedOn: Date,
    boughtOn: Date,
    receiverName:String,
    receiverEmail:String,
    receiverPhoneNumber: String,
    receiverCountryCode: String,
    receiverMessage: String,
    paymentGatewayOrderDetails: {},
    paymentGatewayStatus: String,
    paymentGatewayResponse: {},
    giftCode:{
        type: String,
        trim: true,
        unique: true,
        sparse: true
    },
    giftCodeGenerated:{
      type:Boolean,
      default: false
    },
    isClaimed: {
        type: Boolean,
        default: false
    },
    claimedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        default: null,
    },
    claimedTransaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "WalletTransaction",
        default: null,
    },
    claimedOn: Date,
  },
  {
    timestamps: true,
  }
);

const GiftCard = mongoose.model("GiftCard", GiftCardSchema);
GiftCard.createUniqueCode = async ()=>{
  var isUniqueCode = false;
  let giftCode;
  while(!isUniqueCode){
    giftCode = generateGiftCode(12);
    var isAlreadyTaken = await GiftCard.findOne({giftCode:{ $regex : new RegExp(`^${giftCode}$`, "i") }});
    if(!isAlreadyTaken)
      isUniqueCode= true;
  }
  return giftCode;
}
module.exports = GiftCard;