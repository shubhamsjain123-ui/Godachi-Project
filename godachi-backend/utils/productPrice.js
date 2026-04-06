
let OfferProduct = require("../models/productOfferList.model");
let ProductVariants = require("../models/productVariants.model");
const moment = require("moment");
let Settings = require("../models/settings.model");

const getPriceDetails = async (variant)=>{
    var settingDetails = await Settings.findOne({},{gst:1});
    var gst = settingDetails.gst;
    var gstMultiplier = gst/100;
    var productGstMultiplier = 1+(gst/100);
    var offer = await OfferProduct.aggregate([
                  {$match:{variant: variant._id}},
                  {
                    "$lookup": {
                      "from": "productoffers",
                      "let": {
                        "offerId": "$offer"
                      },
                      "pipeline": [
                        {$match:{
                            "$expr": {
                              "$eq": [
                                "$_id",
                                "$$offerId"
                              ]
                            },
                          "offerPeriod.0":{$lte:moment().toDate()},
                          "offerPeriod.1":{$gte:moment().toDate()},
                        }}   
                      ],
                      "as": "offerDetails"
                    }
                  },
                  {
                    "$unwind": {
                      "path": "$offerDetails"
                    }
                  },
                  {$project:{
                      name:"$offerDetails.name",
                      period:"$offerDetails.offerPeriod",
                      display:"$offerDetails.display",
                      percent:"$offerPercent",
                      value:"$offerValue",
                      image:"$offerDetails.image"
                  }}
                ])
    
    let offerDetails = offer.length>0? offer[0]: null;
    var mrp = variant.price;
    var finalPrice = variant.finalPrice;
    //var finalPrice = offerDetails? (variant.finalPrice * (1-(offerDetails.percent/100))) : variant.finalPrice;
    var offerPrice = offerDetails? (variant.finalPrice * (1-(offerDetails.percent/100))) : variant.finalPrice;
    //var discountedAmount = mrp - finalPrice;
    var listedPrice = mrp * productGstMultiplier;
    var sellingPrice = offerPrice * productGstMultiplier;
    var discountedAmount = parseInt(listedPrice) - parseInt(sellingPrice);
    var priceDetails = {
      mrp: mrp.toFixed(2),
      listedPrice: listedPrice.toFixed(2),
      price: (finalPrice * productGstMultiplier).toFixed(2),
      offerPrice: sellingPrice.toFixed(2),
      gst: (offerPrice*gstMultiplier).toFixed(2),
      //price: mrp,
      priceWithGst: (mrp * productGstMultiplier).toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      totalDiscountValue: discountedAmount.toFixed(2),
      totalDiscountPercent: ((discountedAmount/mrp)*100).toFixed(2),
      gstAmount: (finalPrice * gstMultiplier).toFixed(2),
      grandTotal: (finalPrice * productGstMultiplier).toFixed(2)
    }
    if(!offerDetails){
      let name = null;
      if(variant?.discount && variant?.discount>0)
        name = `${variant.discount}% off on selling price`;
      else if(variant?.making?.discount && variant?.making?.discount>0)
        name = `${variant.making.discount}% off on making price`;
      offerDetails={
        name: name
      }
    }
    return {
      priceDetails,
      offerDetails
    };
}


const updateProductPrice = async (products=[])=>{
  var bulkOps = [];
  var settingDetails = await Settings.findOne({},{gst:1});
  var gst = settingDetails.gst;
  var gstMultiplier = gst/100;
  var productGstMultiplier = 1+(gst/100);
  var matchProductQuery = {};
  if(products.atlength>0){
    matchProductQuery[_id]={$in:products}
  }
  var productPrices = await ProductVariants.aggregate([
                                                        {$match:matchProductQuery},
                                                        {$lookup: {
                                                          from: "productoffers",
                                                          "let": {
                                                              "variantId": "$_id"
                                                          },
                                                          "pipeline":[
                                                              {
                                                                  $match:{
                                                                      "offerPeriod.0":{$lte: moment().toDate()},
                                                                      "offerPeriod.1":{$gte: moment().toDate()}
                                                                  }
                                                              }, 
                                                              {
                                                                  $lookup: {
                                                                          from: "productofferlists",
                                                                          localField: "_id",
                                                                          foreignField: "offer",
                                                                          pipeline:[
                                                                              {"$match": { "$expr": {"$eq": ["$variant","$$variantId"]}}},
                                                                              {$limit: 1}
                                                                          ],
                                                                          as: "productsList"
                                                                      }
                                                              }, 
                                                              {$unwind: {path:"$productsList"}},
                                                              {$project:{
                                                                  name:"$name",
                                                                  period:"$offerPeriod",
                                                                  display:"$display",
                                                                  percent:"$productsList.offerPercent",
                                                                  value:"$productsList.offerValue",
                                                              }}
                                                          ],
                                                          as: "offer"
                                                      }
                                                    },
                                                    {$unwind: {path:"$offer", preserveNullAndEmptyArrays: true}},
                                                    {
                                                      $addFields: {
                                                          "priceDetails.price":"$price",
                                                          "priceDetails.priceWithGst":{$multiply: ["$price", productGstMultiplier]},
                                                          "priceDetails.finalPrice":{
                                                                                      $cond: { 
                                                                                          if: {$gt:["$offers.percent",0]}, 
                                                                                          then:{
                                                                                              $multiply: ["$finalPrice", {$subtract: [1,{$divide: ["$offers.percent",100 ]}]}]
                                                                                          } , 
                                                                                          else: "$finalPrice" 
                                                                                      }
                                                                                  },
                                                      }
                                                    },
                                                    {
                                                      $addFields: {
                                                          "priceDetails.totalDiscountValue":{$subtract: ["$priceDetails.price","$priceDetails.finalPrice"]},
                                                          "priceDetails.totalDiscountPercent":{$multiply: [{$divide: [{$subtract: ["$priceDetails.price","$priceDetails.finalPrice"]}, "$priceDetails.price"]}, 100]},
                                                          "priceDetails.grandTotal":{$multiply: ["$priceDetails.finalPrice", productGstMultiplier]},
                                                      }
                                                    },
                                                  ]);
  if(productPrices.length>0){
    for(const productPrice of productPrices){
      bulkOps.push({
        updateOne :{
          "filter": {
            "_id": productPrice._id
          },
          "update": {
            "$set": {
              priceDetails: productPrice.priceDetails
            }
          }
        }
      })
    }
    
  }
  if (bulkOps.length>0) {
    await ProductVariants.bulkWrite(bulkOps);
  }
}
module.exports = {
    getPriceDetails,
    updateProductPrice
}