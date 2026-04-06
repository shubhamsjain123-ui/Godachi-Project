const router = require("express").Router();
const passport = require("passport");
let Coupons = require("../models/coupons.model");
const moment = require("moment");
const title = "Products";
const roleTitle = "products";


//get user available codes
exports.getAvailableCodes = async (req,res)=>{
  try{
    const userId = req.isAuthenticated()? req.user._id:null
    var query = {
      "couponValidity.0":{$lte:moment().toDate()},
      "couponValidity.1":{$gte:moment().toDate()},
      $or:[
        {couponType: {$ne:"user"}}
      ]
    }
    if(userId){
      query["$or"].push({
        applicableOnUsers:{$eq:userId}
      });
    }
    var couponList = await Coupons.find(query);
    return res.json({
      variant: "success",
      result: couponList
    })
  }
  catch(error){
    return res.json({
      messagge: "Error: " + error,
      variant: "error",
    })
  }
}

//check if CouponApplicable
exports.isCouponApplicable = async (req,res)=>{
  try{
    const {
      basket,
      couponCode
    } = req.body;
    const userId = req.isAuthenticated()? req.user._id:null
    var applyCouponResponse = await Coupons.applyCoupon(basket, couponCode, userId);
    if(applyCouponResponse.success){
      return res.json({
        variant: "success"
      })
    }
    else{
      return res.json({
        variant: "error",
        messagge: applyCouponResponse.message,
      })
    }
    
  }
  catch(error){
    return res.json({
      messagge: "Error: " + error,
      variant: "error",
    })
  }
}

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Coupons.find().sort({createdAt:-1})
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
      Coupons.find({
        "created_user.id": `${req.user._id}`,
      })
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
    } else if (req.user._id) {
      Coupons.find({
        customer_id: `${req.user._id}`,
      })
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

  exports.addEdit = async (req,res) =>{
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      var couponDetails = req.body;
      //const {products, ...couponDetail} = couponDetails;
      try{
        if(couponDetails._id){
          var dbCoupon = await Coupons.findByIdAndUpdate(couponDetails._id, couponDetails);
        }
        else{
          var dbCoupon = await new Coupons(couponDetails).save();
        }
        /* if(dbCoupon){
          var productIds=[];
          for(const productDetail of products){
            let productCouponId;
            productDetail.coupon = dbCoupon._id;
            productDetail.created_user = couponDetails.created_user;
            if(productDetail._id){
              productCouponId = productDetail._id;
              await CouponProduct.findByIdAndUpdate(productDetail._id, productDetail);
            }
            else{
              var newPurity = await new CouponProduct(productDetail).save();
              productCouponId = newPurity._id;
            }
            productIds.push(productCouponId);
          }
          if(productIds.length>0)
            await CouponProduct.deleteMany({coupon:dbCoupon, _id:{$nin:productIds}});
        } */
        return res.json({
          messagge: title + " Added",
          master: "success",
        })
      }
      catch(error){
        return res.json({
            messagge: " Error: " + error,
            master: "error",
          })
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// fetch data by id
exports.counts = (req, res) => {
    Coupons.countDocuments()
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  }

// fetch data by id
exports.getById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Coupons.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Coupons.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
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

// fetch data by id
exports.getStatus = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Coupons.find({ orderstatus_id: req.params.id })
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Coupons.find({
        orderstatus_id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (req.user._id) {
      Coupons.find({
        orderstatus_id: req.params.id,
        customer_id: `${req.user._id}`,
      })
        .then((data) => res.json(data))
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

  exports.deleteById = async (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      try{
        await Coupons.findByIdAndDelete(req.params.id);
        await CouponProduct.deleteMany({coupon:req.params.id});
        res.json({
          messagge: title + " Deleted",
          variant: "info",
        })
      }
      catch(err){
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      }
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      try{
        var resdata = await Coupons.deleteOne({
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        });
        if(resdata.deletedCount > 0){
          await CouponProduct.deleteMany({coupon:req.params.id});
          res.json({
            messagge: title + " Deleted",
            variant: "info",
          })
        }
        else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              variant: "error",
            },
          });
        }
      }
      catch(err){
        res.json({
          messagge: "Error: " + err,
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
  }

// update data by id
exports.update = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Coupons.findByIdAndUpdate(req.params.id, req.body)
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
      Coupons.findOneAndUpdate(
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

  exports.getUserOrderDetails =async (req, res) => {
    try{
      var user = req.user;
      var myCoupons = await Coupons.find({customer: user });
      return res.json(myCoupons)
    }
    catch(error){
      console.error(error);
      return res.status(400).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

  exports.checkCouponCodeAvailable = async (req, res) => {
    var couponCode = req.body.couponCode;
    var couponId = req.body.couponId;
    var query = {
      couponCode: couponCode
    }
    if(couponId)
      query._id= {$ne:couponId}
    var doesExists = await Coupons.findOne(query);
    if(doesExists)
      return res.json({success: false});
    return res.json({success: true});
  }

