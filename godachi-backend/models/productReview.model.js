const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Products = require("./products.model");
const OrderProducts = require("./orderProducts.model");

const ProductReviewSchema = new Schema(
  {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    images: [],
    review:String,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);

ProductReview.getAverageUserReviews = async (productId) =>{
  var ratingDetails = await ProductReview.aggregate([
                        {$match: {product:mongoose.Types.ObjectId(productId), isActive: true}},
                        {$group: { 
                            _id: "$product",
                            rating:{$avg: "$rating"},
                            totalReviews:{$sum:1}
                        }}
                    ]);
  if(ratingDetails.length==1){
    return {
      rating: ratingDetails[0].rating,
      totalReviews: ratingDetails[0].totalReviews,
    }
  }  
  return null
}

ProductReview.canUserPostReview = async (productId, userId) =>{
  var canReview = false;

  //check if product exists
  var productDetails = await Products.findOne({_id: productId})
  if(productDetails){
    productId = productDetails._id;
    //check if user can review the product
    var hasPurchased = await OrderProducts.aggregate([
      {$match: { product:productId}}, 
      {$lookup: {
        from: "orders",
        localField: "order",
        foreignField: "_id",
        as: "orderDetails"
      }},
      {$unwind: {path:"$orderDetails"}},
      {$match: {"orderDetails.customer":userId, "orderDetails.isDelivered": true}}
    ]);
    if(hasPurchased.length>0){
      var hasReviewed = await ProductReview.findOne({
        product:productId,
        customer: userId
      })
      if(!hasReviewed)
        canReview= true;
    }
  }
  return canReview;
}

module.exports = ProductReview;
