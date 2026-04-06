const router = require("express").Router();
const passport = require("passport");
let Products = require("../models/products.model");
let Categories = require("../models/categories.model");
let ProductMetalComponents = require("../models/productMetalComponents.model");
let ProductStoneComponents = require("../models/productStoneComponents.model");
let ProductDiamondComponents = require("../models/productDiamondComponents.model");
let ProductVariants = require("../models/productVariants.model");
let ProductVariantMetalDetails = require("../models/productVariantMetalDetails.model");
let ProductVariantStoneDetails = require("../models/productVariantStoneDetails.model");
let ProductVariantDiamondDetails = require("../models/productVariantDiamondDetails.model");
let ProductOtherSpecs = require("../models/productOtherSpecs.model");
let ProductInventory = require("../models/productInventory.model");
let Metals = require("../models/metals.model");
let DiamondVariants = require("../models/diamondVariants.model");
let ProductReview = require("../models/productReview.model");
let Settings = require("../models/settings.model");
let Offers = require("../models/productOffers.model");
let Stones = require("../models/stones.model");
let OfferProduct = require("../models/productOfferList.model");
const OrderProducts = require("../models/orderProducts.model");
const Orders = require("../models/orders.model");
const Customers = require("../models/customer.model");
const moment = require("moment");
const mongoose = require("mongoose");
const { getPriceDetails } = require("../utils/productPrice");

const title = "Products";
const roleTitle = "products";

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Products.find({isDeleted:{$ne:true}})
      .populate("variant_products")
      .populate("categories_id")
      .populate({
        path: "productMetalComponents",
        populate: ["metalType"]
      })
      .populate({
        path: "productStoneComponents",
        populate: ["stoneType"]
      })
      .populate("productDiamondComponents")
      .populate("allImages")
      .sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Products.find({
        "created_user.id": `${req.user._id}`,
        isDeleted:{$ne:true}
      })
      .populate("variant_products")
      .populate("categories_id")
      .populate({
        path: "productMetalComponents",
        populate: ["metalType"]
      })
      .populate({
        path: "productStoneComponents",
        populate: ["stoneType"]
      })
      .populate("productDiamondComponents")
      .populate("allImages")
      .sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// post new items
exports.add = async (req, res) => {
  const session = await mongoose.startSession();
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    try{
      session.startTransaction();  
      var {
        productMetalComponents,
        productDiamondComponents,
        productStoneComponents,
        variant_products,
        otherSpecs, 
        ...productDetails
      } = req.body;
      //var productDetails = req.body;
      if(productDetails._id){
        var product = await Products.findByIdAndUpdate(productDetails._id, productDetails);
      }
      else{
        var product = await new Products(req.body).save();
      }
      var dbProductMetalComponents =[];
      if(productMetalComponents){
        var componentIds=[];
        for(const component of productMetalComponents){
          let componentId;
          var componentDetails = {
            ...component,
            product: product,
            created_user: req.body.created_user,
          }
          if(componentDetails._id){
            componentId = componentDetails._id;
            await ProductMetalComponents.findByIdAndUpdate(componentDetails._id, componentDetails);
          }
          else{
            var newComponent = await new ProductMetalComponents(componentDetails).save();
            componentId = newComponent._id;
          }
          dbProductMetalComponents.push(componentId);
          componentIds.push(componentId);
        }
        if(componentIds.length>0){
          await ProductMetalComponents.deleteMany({product:product, _id:{$nin:componentIds}});
        }
        else{
          await ProductMetalComponents.deleteMany({product:product});
        }
      }
      
      var dbProductDiamondComponents =[];
      if(productDiamondComponents){
        var componentIds=[];
        for(const component of productDiamondComponents){
          let componentId;
          var componentDetails = {
            ...component,
            product: product,
            created_user: req.body.created_user,
          }
          if(componentDetails._id){
            componentId = componentDetails._id;
            await ProductDiamondComponents.findByIdAndUpdate(componentDetails._id, componentDetails);
          }
          else{
            var newComponent = await new ProductDiamondComponents(componentDetails).save();
            componentId = newComponent._id;
          }
          dbProductDiamondComponents.push(componentId);
          componentIds.push(componentId);
        }
        if(componentIds.length>0){
          await ProductDiamondComponents.deleteMany({product:product, _id:{$nin:componentIds}});
        }
        else{
          await ProductDiamondComponents.deleteMany({product:product});
        }
      }
      
      var dbProductStoneComponents =[];
      if(productStoneComponents){
        var componentIds=[];
        for(const component of productStoneComponents){
          let componentId;
          var componentDetails = {
            ...component,
            product: product,
            created_user: req.body.created_user,
          }
          if(componentDetails._id){
            componentId = componentDetails._id;
            await ProductStoneComponents.findByIdAndUpdate(componentDetails._id, componentDetails);
          }
          else{
            var newComponent = await new ProductStoneComponents(componentDetails).save();
            componentId = newComponent._id;
          }
          dbProductStoneComponents.push(componentId);
          componentIds.push(componentId);
        }
        if(componentIds.length>0){
          await ProductStoneComponents.deleteMany({product:product, _id:{$nin:componentIds}});
        }
        else{
          await ProductStoneComponents.deleteMany({product:product});
        }
      }
      

      if(variant_products){
        var variantIds=[];
        for(const variant of variant_products){
          let variantId;
          var {
            metalDetails, 
            stoneDetails,
            diamondDetails,
            vendor,
            initialQuantity,
            ...variantDetail
          } = variant;
          var variantDetails = {
            ...variantDetail,
            product: product,
            created_user: req.body.created_user,
          }
          if(variantDetails._id){
            variantId = variantDetails._id;
            await ProductVariants.findByIdAndUpdate(variantDetails._id, variantDetails);
          }
          else{
            variantDetails.quantity = initialQuantity?initialQuantity:0;
            var newComponent = await new ProductVariants(variantDetails).save();
            variantId = newComponent._id;
          }
          variantIds.push(variantId);

          if(metalDetails){
            var componentIds=[];
            var index=0;
            for(const component of metalDetails){
              let componentId;
              var componentDetails = {
                ...component,
                variant: variantId,
                component:dbProductMetalComponents[index],
                created_user: req.body.created_user,
              }
              if(componentDetails._id){
                componentId = componentDetails._id;
                await ProductVariantMetalDetails.findByIdAndUpdate(componentDetails._id, componentDetails);
              }
              else{
                var newComponent = await new ProductVariantMetalDetails(componentDetails).save();
                componentId = newComponent._id;
              }
              componentIds.push(componentId);
              index++;
            }
            if(componentIds.length>0){
              await ProductVariantMetalDetails.deleteMany({variant:variantId, _id:{$nin:componentIds}});
            }
          }
          if(stoneDetails){
            var componentIds=[];
            var index=0;
            for(const component of stoneDetails){
              let componentId;
              var componentDetails = {
                ...component,
                variant: variantId,
                component:dbProductStoneComponents[index],
                created_user: req.body.created_user,
              }
              if(componentDetails._id){
                componentId = componentDetails._id;
                await ProductVariantStoneDetails.findByIdAndUpdate(componentDetails._id, componentDetails);
              }
              else{
                var newComponent = await new ProductVariantStoneDetails(componentDetails).save();
                componentId = newComponent._id;
              }
              componentIds.push(componentId);
              index++;
            }
            if(componentIds.length>0){
              await ProductVariantStoneDetails.deleteMany({variant:variantId, _id:{$nin:componentIds}});
            }
          }
          if(diamondDetails){
            var componentIds=[];
            var index=0;
            for(const component of diamondDetails){
              let componentId;
              var componentDetails = {
                ...component,
                variant: variantId,
                component:dbProductDiamondComponents[index],
                created_user: req.body.created_user,
              }
              if(componentDetails._id){
                componentId = componentDetails._id;
                await ProductVariantDiamondDetails.findByIdAndUpdate(componentDetails._id, componentDetails);
              }
              else{
                var newComponent = await new ProductVariantDiamondDetails(componentDetails).save();
                componentId = newComponent._id;
              }
              componentIds.push(componentId);
              index++;
            }
            if(componentIds.length>0){
              await ProductVariantDiamondDetails.deleteMany({variant:variantId, _id:{$nin:componentIds}});
            }
          }
          if(vendor && initialQuantity){
            await new ProductInventory({
              product: product,
              variant: variantId,
              vendor: vendor,
              quantity: initialQuantity,
              date: new Date(),
              transactionType: 'cr'
            }).save();
          }
        }
        if(variantIds.length>0){
          await ProductVariants.deleteMany({product:product, _id:{$nin:variantIds}});
        }
        else{
          await ProductVariants.deleteMany({product:product});
        }
      }
      

      if(otherSpecs){
        var specIds=[];
        for(const specs of otherSpecs){
          let specId;
          var specDetails = {
            ...specs,
            product: product,
            created_user: req.body.created_user,
          }
          if(specDetails._id){
            specId = specDetails._id;
            await ProductOtherSpecs.findByIdAndUpdate(specDetails._id, specDetails);
          }
          else{
            var newSpecs = await new ProductOtherSpecs(specDetails).save();
            specId = newSpecs._id;
          }
          specIds.push(specId);
        }
        if(specIds.length>0){
          await ProductOtherSpecs.deleteMany({product:product, _id:{$nin:specIds}});
        }
        else{
          await ProductOtherSpecs.deleteMany({product:product});
        } 
      } 
      
      await session.commitTransaction();    
      res.json({
          messagge: title + " Added",
          variant: "success",
        })
    }
    catch(err){
      await session.abortTransaction();
      res.json({
          messagge: " Error: " + err,
          variant: "error",
        })
    }
    session.endSession();
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        variant: "error",
      },
    });
  }
  return
}
/* exports.add = async (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      try{
        var productDetails = req.body;
        if(productDetails._id){
          var product = await Products.findByIdAndUpdate(productDetails._id, productDetails);
        }
        else{
          var product = await new Products(req.body).save();
        }
       
        var components = req.body.components;
        var componentIds=[];
        for(const component of components){
          let componentId;
          var componentDetails = {
            ...component,
            product: product,
            created_user: req.body.created_user,
          }
          if(componentDetails._id){
            componentId = componentDetails._id;
            await ProductComponents.findByIdAndUpdate(componentDetails._id, componentDetails);
          }
          else{
            var newComponent = await new ProductComponents(componentDetails).save();
            componentId = newComponent._id;
          }
          componentIds.push(componentId);
        }
        if(componentIds.length>0){
          await ProductComponents.deleteMany({product:product, _id:{$nin:componentIds}});
        }
        
        return res.json({
            messagge: title + " Added",
            variant: "success",
          })
      }
      catch(err){
        return res.json({
            messagge: " Error: " + err,
            variant: "error",
          })
      }
      
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  } */

exports.counts = (req, res) => {
    Products.countDocuments({isDeleted:{$ne:true}})
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  }

//group name statistic
exports.statistic = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Products.aggregate([
        { $unwind: "$category_id" },
        {
          $group: {
            _id: "$category_id.label",
            count: { $sum: 1 },
          },
        },
      ]).then((data) => res.json(data));
    }
  }

// fetch data by id
exports.getById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Products.findById(req.params.id)
      .populate("productMetalComponents")
      .populate("productStoneComponents")
      .populate("productDiamondComponents")
      .populate("otherSpecs")
      .populate({
        path: "variant_products",
        populate: ["metalDetails","stoneDetails","diamondDetails"]
      })
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Products.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
      .populate("productMetalComponents")
      .populate("productStoneComponents")
      .populate("productDiamondComponents")
      .populate({
        path: "variant_products",
        populate: ["metalDetails","stoneDetails","diamondDetails"]
      })
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                variant: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      Products.updateOne({_id:req.params.id},{$set:{isDeleted:true}})
        .then(() =>
          res.json({
            messagge: title + " Deleted",
            variant: "info",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Products.updateOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      },{$set:{isDeleted:true}})
        .then((resdata) => {
          if (resdata.modifiedCount  > 0) {
            res.json({
              messagge: title + " delete",
              variant: "success",
            });
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                variant: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// update data by id
exports.update = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Products.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Products.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        req.body
      )
        .then((resdata) => {
          if (resdata) {
            res.json({
              messagge: title + " Update",
              variant: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              variant: "error",
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// get all items
exports.getAllPublic = (req, res) => {
  Products.find({ isActive: true,isDeleted:{$ne:true} })
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.json({
        messagge: "Error: " + err,
        variant: "error",
      })
    );
}

exports.getSeoPublic = async (req, res) => {
  try{
    var result = await Products.findOne({ seo: req.params.seo, isDeleted:{$ne:true} })
                                      //.populate("variant_products")
                                      .populate("categories_id")
                                      .populate("promises")
                                      .populate("purchaseIncludes")
                                      .populate("occassions")
                                      .populate("tags")
                                      .populate("certifications")
                                      .populate({
                                        path: "productMetalComponents",
                                        populate: ["metalType","metalPurity","metalColor"]
                                      })
                                      .populate({
                                        path: "productStoneComponents",
                                        populate: ["stoneType","stoneColor",{
                                          path:"stoneVariants",
                                          populate:["variantMaster","variantValue"]
                                        }]
                                      })
                                      .populate({
                                        path: "productDiamondComponents",
                                        populate: [{
                                          path:"diamondVariants",
                                          populate:["variantMaster","variantValue"]
                                        }]
                                      })
                                      .populate({
                                        path: "variant_products",
                                        populate: ["metalDetails","stoneDetails", "diamondDetails"]
                                      })
                                      .populate({
                                        path: "variants",
                                        populate: ["master","selectedValues"]
                                      })
                                      .populate("allImages")
                                      .populate("otherSpecs")
    var productDetails = JSON.parse(JSON.stringify(result));
    if(productDetails && productDetails.variant_products){
      var variants = result.variant_products;
      for(const [key, variant] of Object.entries(variants)){
      //for(const variant of variants){
        var {priceDetails, offerDetails} = await getPriceDetails(variant);
        productDetails.variant_products[key].priceDetails = priceDetails;
        productDetails.variant_products[key].offerDetails = offerDetails;
      }
    }
    return res.json(productDetails);
  }
  catch(error){
    return res.json({
      messagge: "Error: " + error,
      variant: "error",
    })
  }
}
exports.homePublic = (req, res) => {
  const mongoPost = [
    {
      $match: { isActive: true, isDeleted:{$ne:true} },
    },
    {
      $lookup: {
        from: "productimages",
        localField: "_id",
        foreignField: "product_id",
        as: "allImages",
      },
    },
    { $sort: req.body.sort },
    { $limit: req.body.limit },
  ];

  Products.aggregate(mongoPost)
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.json({
        messagge: "Error: " + err,
        variant: "error",
      })
    );
}


exports.getPublic = async (req, res) => {
  try{
    var mongoAggregate = [];
    var settingDetails = await Settings.findOne({},{gst:1});
    var gst = settingDetails.gst;
    var gstMultiplier = 1+(gst/100);
    var allMetals = await Metals.find({});
    var matchVariants = [];
    var matchQuery = {
      isActive: true, 
      isDeleted:{$ne:true}
    }
    //text filters
    if(req.body.text && req.body.text!= ""){
      mongoAggregate.push({
        $match:{$text:{$search:req.body.text}}
      })
    }
    //other offer filter
    var otherOfferFilters = req.body.godachiOffers && req.body.godachiOffers.length>0?
                        req.body.godachiOffers: null;
    if(otherOfferFilters){
      var offerProducts = await OfferProduct.find({offer:{$in:otherOfferFilters}})
                          .populate({
                            path:"variant",
                            select:{_id:1,product:1}
                          });

      if(offerProducts){
        matchQuery["_id"]={$in: [...new Set(offerProducts.map((productVariants)=>productVariants.variant.product))]};
      }
      matchVariants = offerProducts.map((productVariants)=>productVariants.variant._id)
    }


    mongoAggregate.push({
      $match:matchQuery
    })
    

    //features based filter -> trending filter, virtual try on filter
    const featuresFilters = [];
    if(req.body.trending && req.body.trending.length>0){
      featuresFilters.push(...req.body.trending);
    }
    if(req.body.virtualTry && req.body.virtualTry.length>0){
      featuresFilters.push("virtualTry");
    }
    if(featuresFilters.length>0){
      mongoAggregate.push({
        $match:{features:{$in:featuresFilters}}
      })
    }

    //rating filters
    const ratingsMongo = req.body.rating && req.body.rating.length>0
                            ?
                            {$match:{ratings:{$gte:Math.min(...req.body.rating)}}}
                            :null
    ratingsMongo?mongoAggregate.push(ratingsMongo):null;

    //occassion filter
    const occassionsMongo = req.body.occassions && req.body.occassions.length>0
                            ?
                            {$match:{occassions:{$in:req.body.occassions.map((option) => (mongoose.Types.ObjectId(option)))}}}
                            :null
    occassionsMongo?mongoAggregate.push(occassionsMongo):null;

    //shop for filter
    const shopForMongo = req.body.shopFor && req.body.shopFor.length>0
                            ?
                            {$match:{shopFor:{$in:req.body.shopFor}}}
                            :null
    shopForMongo?mongoAggregate.push(shopForMongo):null;

    //category filter
    const categoryMongo = req.body.categories && req.body.categories.length>0
                            ?true:null
    if(categoryMongo){
      var categoryIds = req.body.categories.map((option) => (mongoose.Types.ObjectId(option)))
      mongoAggregate.push({$lookup: {
                                  from: "categories",
                                  localField: "categories_id",
                                  foreignField: "_id",
                                  as: "categoryDetails"
                          }},
                          {$unwind: {path:"$categoryDetails"}},
                          {$match:{$or:[
                            {"categoryDetails._id":{$in:categoryIds}}, 
                            {"categoryDetails.categories_id":{$in:categoryIds}}, 
                          ]}},
                        )
    }
    //material filter
    var allStones = await Stones.find({materialFilter: true},{_id:1});
    var allStoneIds = allStones.map((stoneFilter)=>stoneFilter._id.toString());
    var materialMetalFilters = req.body.material && req.body.material.length>0 ? req.body.material: [];
    materialMetalFilters = materialMetalFilters.filter(item => !["diamond","stones"].includes(item) && !allStoneIds.includes(item));
    var isMaterialMetalSelected = materialMetalFilters.length>0?true:false;
    if(isMaterialMetalSelected){
      mongoAggregate.push({
        $lookup: {
          from: "productmetalcomponents",
          localField: "_id",
          foreignField: "product",
          as: "metalComponents",
        },
      })
  
      // metal material filter
      isMaterialMetalSelected?mongoAggregate.push({
        $match:{"metalComponents.metalType":{$in:materialMetalFilters.map((option) => (mongoose.Types.ObjectId(option)))}}
      }):null;
  
      //metal color filter
      const metalColorsMongo = req.body.metalColor && req.body.metalColor.length>0
                              ?
                              {$match:{"metalComponents.metalColor":{$in:req.body.metalColor.map((option) => (mongoose.Types.ObjectId(option)))}}}
                              :null
      metalColorsMongo?mongoAggregate.push(metalColorsMongo):null;
  
      //metal purity filters
      allMetals.forEach((metal)=>{
        var purityShortName = `${metal.name.toLowerCase()}Purity`;
        const metalPurityMongo = req.body[purityShortName] && req.body[purityShortName].length>0
                                ?
                                {$match:{"metalComponents.metalPurity":{$in:req.body[purityShortName].map((option) => (mongoose.Types.ObjectId(option)))}}}
                                :null
        metalPurityMongo?mongoAggregate.push(metalPurityMongo):null;
      })
    }
    
    //material diamond filter
    var isMaterialDiamondSelected = req.body.material && req.body.material.length>0 ?
                                  (req.body.material.includes("diamond")?true:false)
                                  : false;
    if(isMaterialDiamondSelected){
      mongoAggregate.push({
        $lookup: {
          from: "productdiamondcomponents",
          localField: "_id",
          foreignField: "product",
          as: "diamondComponents",
        },
      },{
        $addFields: {diamondComponentsCount: {$size: "$diamondComponents"}}
      })
      isMaterialDiamondSelected?mongoAggregate.push({
        $match: {diamondComponentsCount: {$gte: 1}}
      }):null;
      var allDiamondVariants = await DiamondVariants.find({}).populate("variants")
        allDiamondVariants.forEach((diamondVariant)=>{
          var diamondVariantShortName = `diamond${diamondVariant.name.toLowerCase()}`;
          const diamondVariantMongo = req.body[diamondVariantShortName] && req.body[diamondVariantShortName].length>0
                                      ?
                                      {$match:{"diamondComponents.diamondVariants.variantValue":{$in:req.body[diamondVariantShortName].map((option) => (mongoose.Types.ObjectId(option)))}}}
                                      :null
          diamondVariantMongo?mongoAggregate.push(diamondVariantMongo):null;
        })
    }
    //material stone filter
    
    var selectedStoneFilters = [];
    if(req.body.material && req.body.material.length>0 ){
      //selectedStoneFilters = [...new Set([...allStoneIds, ...req.body.material])]
      selectedStoneFilters = req.body.material.filter(x => allStoneIds.includes(x))
    }
    var isMaterialStoneSelected = req.body.material && req.body.material.length>0 ?
                                  (
                                    req.body.material.includes("stones")
                                    ?true:false
                                  )
                                  : false;
    if(req.body.stones && req.body.stones.length>0){
      selectedStoneFilters =  [...new Set([...selectedStoneFilters, ...req.body.stones])]
    }
    var isStoneFilterSelected = selectedStoneFilters.length>0?true:false;
    if(isMaterialStoneSelected||isStoneFilterSelected){
      mongoAggregate.push({
        $lookup: {
          from: "productstonecomponents",
          localField: "_id",
          foreignField: "product",
          as: "stoneComponents",
        },
      },{
        $addFields: {stoneComponentsCount: {$size: "$stoneComponents"}}
      })
    }

    isMaterialStoneSelected?mongoAggregate.push({
      $match: {stoneComponentsCount: {$gte: 1}}
    }):null;

    if(isStoneFilterSelected){
      //stone filter
      
      const stonesMongo = selectedStoneFilters.length>0
                              ?
                              {$match:{"stoneComponents.stoneType":{$in:selectedStoneFilters.map((option) => (mongoose.Types.ObjectId(option.toString())))}}}
                              :null
      stonesMongo?mongoAggregate.push(stonesMongo):null;
      //stone color filter
      const stoneColorsMongo = req.body.stoneColor && req.body.stoneColor.length>0
                              ?
                              {$match:{"stoneComponents.stoneColor":{$in:req.body.stoneColor.map((option) => (mongoose.Types.ObjectId(option)))}}}
                              :null
      stoneColorsMongo?mongoAggregate.push(stoneColorsMongo):null;
    }
    


    /* mongoAggregate.push({
      $lookup: {
        from: "productvariants",
        localField: "_id",
        foreignField: "product",
        as: "variantProduct",
      },
    }) */

    //price filter
    var priceFilters = req.body.price && req.body.price.length>0?
                        req.body.price: null;
    var priceMongoArray = [];
    if(priceFilters){
      priceFilters.forEach((priceFilter)=>{
        var priceArray = priceFilter.split("-");
        var minPrice = parseInt(priceArray[0]);
        var maxPrice = parseInt(priceArray[1]);
        var filterQuery = {
          $gte:minPrice,
        }
        if(maxPrice>0){
          filterQuery["$lte"]=maxPrice;
        }
        priceMongoArray.push({
          "priceDetails.grandTotal":filterQuery
        })
      })
      //priceMongoFilter.push({$match:{$or:priceMongoArray}});
    }

    //weight filter
    var weightFilters = req.body.weight && req.body.weight.length>0?
                        req.body.weight: null;
    var weightMongoArray = [];
    if(weightFilters){
      weightFilters.forEach((weightFilter)=>{
        var weightArray = weightFilter.split("-");
        var minWeight = parseInt(weightArray[0]);
        var maxWeight = parseInt(weightArray[1]);
        var filterQuery = {
          $gte:minWeight,
        }
        if(maxWeight>0){
          filterQuery["$lte"]=maxWeight;
        }
        weightMongoArray.push({
          "totalWeight":filterQuery
        })
      })
    }

    //offer filter
    var offerFilters = req.body.offers && req.body.offers.length>0?
                        req.body.offers: null;
    var offerMongoArray = [];
    if(offerFilters){
      offerFilters.forEach((offerFilter)=>{
        var filterQuery = {
          $gte:parseInt(offerFilter),
        }
        offerMongoArray.push({
          "priceDetails.totalDiscountPercent":filterQuery
        })
      })
    }

    var variantMatch = { 
      $expr: { $eq: ['$product', '$$variantId'] } 
    }
    if(matchVariants.length>0){
      variantMatch["_id"]={$in:matchVariants}
    }
    var variantAndCond = [];
    if(priceMongoArray.length>0)
      variantAndCond.push({$or:priceMongoArray})
    if(weightMongoArray.length>0)
      variantAndCond.push({$or:weightMongoArray})
    if(offerMongoArray.length>0)
      variantAndCond.push({$or:offerMongoArray})
    var variantAndMatch = {};
    if(variantAndCond.length>0){
      variantAndMatch["$and"]=variantAndCond;
    }

    mongoAggregate.push(
      {$project: {
          productName: 1,
          seo:1,
          ratings:1,
          reviews:1,
      }},
    )
    mongoAggregate.push({
      '$lookup': {
        'from': 'productvariants',
        'let': {
          'variantId': '$_id'
        },
        'pipeline': [{
            '$match': variantMatch
          },
          {
            '$match': variantAndMatch
          },  
          {$addFields: {"instock":{$cond: [ {$gt:["$quantity",0]}, 1 , 0 ]}}},
          {
            '$sort': {  "instock":-1,'grandTotal': 1 }
          }, {
            '$limit': 1
          },
        ],
        'as': 'variantProduct'
      }
    },{
      $unwind:{
        path:"$variantProduct"
      }
    })

    let sortMongo = { $sort: { "variantProduct.instock": -1,updatedAt: -1 } };
    if(req.body.sort){
      switch(req.body.sort){
        case "pricehigh":
          sortMongo = { $sort: { "variantProduct.instock": -1,"variantProduct.priceDetails.grandTotal": -1 } };
          break;
        case "pricelow":
            sortMongo = { $sort: { "variantProduct.instock": -1,"variantProduct.priceDetails.grandTotal": 1 } };
            break;
        case "new":
          sortMongo = { $sort: { "variantProduct.instock": -1, "createdAt": -1 } };
          break;
        case "best":
          sortMongo = { $sort: { "variantProduct.instock": -1,updatedAt: -1 } };
          break;
        case "discount":
          sortMongo = { $sort: { "variantProduct.instock": -1,"variantProduct.priceDetails.totalDiscountPercent": -1 } };
          break;
        case "rating":
          sortMongo = { $sort: { "variantProduct.instock": -1,rating: -1 } };
          break;
      }
    }
    
    mongoAggregate.push(sortMongo);
    //mongoAggregate.push({ $sort: { "variantProduct.instock": -1 } });


    var facetMongo = [];
    //skip query
    const skipMongo = req.body.skip && req.body.skip != 0
                    ? {$skip: req.body.skip}
                    : { $skip: 0 };
    facetMongo.push(skipMongo);
    
    //limit query
    const limitMongo = req.body.limit && req.body.limit != 0
                      ? {$limit: req.body.limit}
                      : { $limit: 16 };
    facetMongo.push(limitMongo);

    facetMongo.push({
      $lookup: {
        from: "productimages",
        localField: "_id",
        foreignField: "product_id",
        as: "allImages",
      },
    })

    mongoAggregate.push({ $facet: {
        count:  [{ $count: "count" }],
        data: facetMongo
    }})
    var productList = await Products.aggregate(mongoAggregate)
    
    return res.json(productList?.[0]);
  }
  catch(err){
    console.error(err)
    return res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
  
}

exports.checkProductCodeAvailable = async (req, res) => {
  var productCode = req.body.productCode;
  var productId = req.body.productId;
  var query = {
    productCode: productCode
  }
  if(productId)
    query.product= {$ne:productId}
  var doesExists = await ProductVariants.findOne(query);
  if(doesExists)
    return res.json({success: false});
  return res.json({success: true});
}

exports.checkProductSeoAvailable = async (req, res) => {
  var seoUrl = req.body.seoUrl;
  var productId = req.body.productId;
  var query = {
    seo: seoUrl
  }
  if(productId)
    query._id= {$ne:productId}
  var doesExists = await Products.findOne(query);
  if(doesExists)
    return res.json({success: false});
  return res.json({success: true});
}

exports.offerSearchProducts = async (req, res) => {
  try{
    const {
      offerId,
      //selected,
      selectedDate
    } = req.body
    if(!selectedDate)
      return res.json([]);
    var offerIdMatch = {};
    if(offerId){
      offerIdMatch["$ne"]=["$offer",mongoose.Types.ObjectId(offerId)];
    }
    var startDate = new Date(selectedDate[0]);
    var endDate = new Date(selectedDate[1]);
    /* var productList = await ProductVariants.find({_id:{$nin: selected}})
                      .populate({ 
                                  path:"product",
                                  populate:[
                                    "categories_id",
                                    {
                                      path: "productMetalComponents",
                                      populate: ["metalType"]
                                    },
                                    {
                                      path: "productStoneComponents",
                                      populate: ["stoneType"]
                                    },
                                    "productDiamondComponents"
                                  ]}); */
    var productList = await ProductVariants.aggregate([
      //{$match:{_id:{$nin: selected.map((sel)=>mongoose.Types.ObjectId(sel))}}},
      {$lookup: {
         from: "products",
         localField: "product",
         foreignField: "_id",
         as: "product"
      }},
      {$unwind: {path:"$product"}},
      {$lookup: {
         from: "categories",
         localField: "product.categories_id",
         foreignField: "_id",
         as: "product.categories_id"
      }},
      {$unwind: {path:"$product.categories_id"}},
      {$lookup: {
         from: "productmetalcomponents",
         localField: "product._id",
         foreignField: "product",
         as: "productMetalComponents"
      }},
      {$lookup: {
         from: "metals",
         localField: "productMetalComponents.metalType",
         foreignField: "_id",
         as: "metalType"
      }},
      {$lookup: {
         from: "productstonecomponents",
         localField: "product._id",
         foreignField: "product",
         as: "productStoneComponents"
      }},
      {$lookup: {
         from: "stones",
         localField: "productStoneComponents.stoneType",
         foreignField: "_id",
         as: "stoneType"
      }},
      {$lookup: {
         from: "productdiamondcomponents",
         localField: "product._id",
         foreignField: "product",
         as: "productDiamondComponents"
      }},
      {
        '$lookup': {
          'from': 'productofferlists',
          'let': {
            'variantId': '$_id'
          },
          'pipeline': [{
              '$match': { 
                  $expr:{$and:[
                    { $eq: ['$variant', '$$variantId'] },
                    offerIdMatch
                  ]} 
                 

              }
            },
            {$lookup: {
                 from: "productoffers",
                 localField: "offer",
                 foreignField: "_id",
                 as: "offer"
              }},
              {$unwind: {path:"$offer"}},
              {$match: {
                  $or:[
                      {"offer.offerPeriod.0":{$gte:startDate,$lte:endDate}},
                      {"offer.offerPeriod.1":{$gte:startDate,$lte:endDate},}
                  ]
              }},
              {$limit:1}
          ],
          'as': 'offers'
        }
      },
      {$unwind: {path:"$offers", preserveNullAndEmptyArrays: true}},
  ])
    res.json(productList);
  }
  catch(err){
    res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}

exports.changeProductApproval = async (req, res) => {
  try{
    const {
      id,
      state
    } = req.params
    var productList = await Products.updateOne({_id:id},{$set:{isApproved: state}});
    res.json(productList);
  }
  catch(err){
    res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}
exports.changeProductActive = async (req, res) => {
  try{
    const {
      id,
      state
    } = req.params
    var productList = await Products.updateOne({_id:id},{$set:{isActive: state}});
    res.json(productList);
  }
  catch(err){
    res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}

exports.getAllReviews = async (req, res) => {
  try{
    const {
      productId
    } = req.params
    var user = req.user;
    var reviewList = await ProductReview.find({product: productId, isActive: true}).populate("customer");
    var productDetails = await Products.findOne({_id: productId},{ratings:1,reviews:1})
    var totalReviews = productDetails.reviews?productDetails.reviews:0;
    var totalRatings = productDetails.ratings?productDetails.ratings:0;
    let canUserPostReview = false;
    if(user)
      canUserPostReview = await ProductReview.canUserPostReview(productId,user._id)

    res.json({
      canReview: canUserPostReview,
      totalReviews,
      totalRatings,
      list: reviewList
    });
  }
  catch(err){
    res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}
exports.postReview = async (req, res) => {
  try{
    var {
      productId
    } = req.params;
    const {
      rating,
      images,
      review
    } = req.body;
    var user = req.user;

    var canUserReviewProduct = await ProductReview.canUserPostReview(productId, user._id);
    if(!canUserReviewProduct){
      return res.json({
        messagge: "Sorry, You can't review this product",
        variant: "error",
      })
    }

    
    // add review to product review model
    var productReview = await new ProductReview({
      product: productId,
      customer: user._id,
      rating,
      images,
      review
    }).save();
    //update product total review
    if(!productReview){
      return res.json({
        messagge: "Some error occured. Please try again after some time",
        variant: "error",
      })
    }
    var getAverageUserReviews = await ProductReview.getAverageUserReviews(productId);
    if(getAverageUserReviews){
        await Products.updateOne({_id:productId},{$set:{
          reviews: getAverageUserReviews.totalReviews,
          ratings: getAverageUserReviews.rating
        }});
    }
    return res.json({
      messagge: "Product Review Added Successfully",
      variant: "success",
    })
  }
  catch(err){
    return res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}

exports.getSearchResult = async (req, res) => {
  try{
    var query = req.body.query;
    var categoriesList = await Categories.find({"title": { $regex: query, $options: 'i'}}).limit(3);
    var productlist = await Products.aggregate([
      {
        $match:{$text:{$search:query}, isActive: true, 
        isDeleted:{$ne:true}}
      },
      {
        $limit:5
      },
      {
        '$lookup': {
          'from': 'productvariants',
          'let': {
            'variantId': '$_id'
          },
          'pipeline': [{
              '$match': { 
                $expr: { $eq: ['$product', '$$variantId'] } 
              }
            },
            {$addFields: {"instock":{$cond: [ {$gt:["$quantity",0]}, 1 , 0 ]}}},
            {
              '$sort': {  "instock":-1,'grandTotal': 1 }
            }, {
              '$limit': 1
            },
          ],
          'as': 'variantProduct'
        }
      },{
        $unwind:{
          path:"$variantProduct"
        }
      },
      {
        $lookup: {
          from: "productimages",
          localField: "_id",
          foreignField: "product_id",
          as: "allImages",
        },
      },
      {
        $project:{
          productName:1,
          seo:1,
          price:"$variantProduct.grandTotal",
          allImages:1
        }
      }
    ])
    res.json({
      variant: "success",
      productlist: productlist,
      categoriesList: categoriesList
    })
  }
  catch(err){
    res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}

exports.getAdminDashboardData = async(req,res)=>{
  try{
    const {
        startDate,
        endDate
    } = req.body
    var matchQuery = {};
    if(startDate){
        matchQuery["createdAt"] = {$gte:moment(startDate).toDate()}
    }
    if(endDate){
        if(matchQuery.createdAt){
            matchQuery["createdAt"]["$lte"]=moment(endDate).toDate()
        }
        else
            matchQuery["createdAt"] = {$lte:moment(endDate).toDate()}
    }
    var productsCount = await Products.countDocuments({...matchQuery,isDeleted:{$ne:true}});
    var CategoryCount = await Categories.countDocuments(matchQuery);
    var ordersDetails = await Orders.aggregate([
      {$match:matchQuery},
      {
        $group: { _id: null, sales: { $sum: "$finalPrice" }, count:{$sum:1} }
      }
    ]);
    var customersCount = await Customers.countDocuments(matchQuery);
    var stats={
      products:productsCount,
      orders:ordersDetails?.[0]?.count?ordersDetails?.[0]?.count:0,
      customers:customersCount,
      sales:ordersDetails?.[0]?.sales?ordersDetails?.[0]?.sales:0,
      categories:CategoryCount
    };
    res.json({
      success:true,
      stats: stats
    })
  }
  catch(error){
    res.json({
      success:false,
      message:error.message
    })
  }
}

