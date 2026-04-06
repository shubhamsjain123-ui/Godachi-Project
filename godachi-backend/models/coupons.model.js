const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const CouponSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    couponCode: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      trim: true,
    },
    couponValidity:[{
        type: Date,
        required: true,
    }],
    couponType:{
      type:String,
      required:true
    },
    applicableOnUsers:[{
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      index:true
    }],
    applicableOnCategories:[{
      type: Schema.Types.ObjectId,
      ref: 'Categories',
      index:true
    }],
    minCartValue: Number,
    maxDiscount: Number,
    offerType: String,
    offerValue: Number,
    couponName: String,
    tnc: String,
  },
  {
    timestamps: true,
  }
);

const Coupons = mongoose.model("Coupons", CouponSchema);

Coupons.applyCoupon = async (basket, couponCode, userId=null, updateBasket = false) => {
  var couponDetails = await Coupons.findOne({couponCode: { $regex : new RegExp(`^${couponCode}$`, "i") } });
  if(!couponDetails){
    return {
      success: false,
      message: `Invalid Coupon Code`,
    }
  }
  //check validity
  var validityStartDate = moment(couponDetails.couponValidity[0]).startOf("day");
  var validityEndDate = moment(couponDetails.couponValidity[1]).endOf("day");
  var currentDate = moment();
  if(currentDate<validityStartDate || currentDate>validityEndDate){
    return {
      success: false,
      message: `Invalid Coupon`,
    }
  }
  if(couponDetails.couponType=="user" && !couponDetails.applicableOnUsers.includes(userId)){
    //return error
    return {
      success: false,
      message: `Invalid Coupon`,
    }
  }
  var applicableCartValue = basket.finalPrice;
  if(couponDetails.couponType=="category"){
    applicableCartValue=  basket.products
                          .filter((product)=>couponDetails.applicableOnCategories.includes(product.category))
                          .reduce(function (acc, obj) { return acc + (obj.total * obj.qty); }, 0);
    
  }

  if(couponDetails.minCartValue && couponDetails.minCartValue>applicableCartValue){
    //return error
    return {
      success: false,
      message: `Add items of ₹${parseInt(couponDetails.minCartValue-applicableCartValue)} to the cart`,
    }
  }
  let discountAmount = 0;
  if(couponDetails.offerType=="fixed"){
    discountAmount = couponDetails.offerValue;
  }
  else if(couponDetails.offerType=="percent"){
    var percentDiscountAmount = applicableCartValue * couponDetails.offerValue /100;
    if(couponDetails.maxDiscount && couponDetails.maxDiscount<=percentDiscountAmount)
      discountAmount=couponDetails.maxDiscount;
    else
    discountAmount = percentDiscountAmount;
  }
  if(updateBasket){
    //update basket
    var perProductDiscountPercent = discountAmount * 100 / applicableCartValue;
    var productDiscountMultiplier = 1 - (perProductDiscountPercent/100);
    basket.couponCode= couponCode;
    basket.couponId= couponDetails._id;
    basket.couponDiscount = discountAmount;
    basket.finalPrice = basket.finalPrice - discountAmount;
    var updatedProducts = basket.products.map((product)=>{
      if(couponDetails.couponType=="category" && !couponDetails.applicableOnCategories.includes(product.category)){
        return product
      }
      else{
        return {
          ...product,
          discount: product.offerPrice * perProductDiscountPercent/100,
          total: product.offerPrice * productDiscountMultiplier,
        }
      }
    })
    basket.products = updatedProducts;
  }
  
  return {
    success: true,
    message: "Coupon Applied",
    basket: basket
  }
}

module.exports = Coupons;
