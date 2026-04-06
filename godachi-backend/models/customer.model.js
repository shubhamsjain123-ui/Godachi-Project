const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var randtoken = require('rand-token');

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    origPhoneInput:{
      type: String,
      required: true,
      unique: true
    },
    phone:{
      type: String,
      required: true
    },
    country:{
      type: String,
      required: true
    },
    countryCode:{
      type: String,
      required: true
    },
    phoneVerified:{
      type: Boolean,
      required: true,
      default: false
    },
    phoneVerifiedOn:Date,
    otp: Number,
    email: {
      type: String,
      //unique: true,
      //sparse : true
      index: { unique: true, sparse: true }
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic:{
      type:String,
    },
    emailVerified:{
      type: Boolean,
      required: true,
      default: false
    },
    emailVerificationToken:String,
    emailVerifiedOn: Date,
    isActive:{
      type: Boolean,
      required: true,
      default: false
    },
    walletBalance:{
      type: Number,
      default: 0
    },
    referralCode:{
      type: String,
      required: true,
      index:true
    },
    referredBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      index: true
    },
    fcmToken: String,
    isAccountDeleted: {
      type: Boolean,
      required: true,
      default: false
    },
    accountDeletedOn: Date
  },
  {
    timestamps: true,
  }
);

CustomerSchema.pre("validate",async function (next) {
  if(!this.referralCode){
    this.referralCode = await Customer.generateUniqueReferralLink();
  }
  if(this.email && (!this.emailVerificationToken || this.isModified("email"))){
    this.emailVerificationToken = await Customer.generateUniqueEmailVerificationToken();
    this.emailVerified = false;
    this.emailVerifiedOn = null;
  }
  
  return next();
})

CustomerSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

CustomerSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

const Customer = mongoose.model("Customer", CustomerSchema);

Customer.getWalletBalance = async (userId)=>{
  var customerDetails = await Customer.findOne({_id:userId});
  return customerDetails.walletBalance? customerDetails.walletBalance: 0;
}

Customer.generateUniqueReferralLink = async () =>{
  var isUniqueToken = false;
  let token;
  while(!isUniqueToken){
    token = randtoken.generate(8);
    var existingToken = await Customer.findOne({referralCode: token});
    if(!existingToken){
      isUniqueToken = true;
    }
  }
  return token;
}

Customer.generateUniqueEmailVerificationToken = async () =>{
  var isUniqueToken = false;
  let token;
  while(!isUniqueToken){
    token = randtoken.generate(16);
    var existingToken = await Customer.findOne({emailVerificationToken: token});
    if(!existingToken){
      isUniqueToken = true;
    }
  }
  return token;
}

module.exports = Customer;
