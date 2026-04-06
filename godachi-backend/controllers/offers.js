const router = require("express").Router();
const passport = require("passport");
let Offers = require("../models/productOffers.model");
let OfferProduct = require("../models/productOfferList.model");
const moment = require("moment");

const title = "Products";
const roleTitle = "products";

exports.getActiveOffers = async (req, res) => {
  var availableOffers = await Offers.find({
      "offerPeriod.0":{$lte:moment().toDate()},
      "offerPeriod.1":{$gte:moment().toDate()},
  })
  var activeOfferList = availableOffers;
  return res.json(activeOfferList);
}

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Offers.find().populate("products").sort({createdAt:-1})
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
      Offers.find({
        "created_user.id": `${req.user._id}`,
      })
      .populate("products")
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
      Offers.find({
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
      var offerDetails = req.body;
      const {products, ...offerDetail} = offerDetails;
      try{
        if(offerDetail._id){
          var dbOffer = await Offers.findByIdAndUpdate(offerDetail._id, offerDetail);
        }
        else{
          var dbOffer = await new Offers(offerDetail).save();
        }
        if(dbOffer){
          var productIds=[];
          for(const productDetail of products){
            let productOfferId;
            productDetail.offer = dbOffer._id;
            productDetail.created_user = offerDetail.created_user;
            if(productDetail._id){
              productOfferId = productDetail._id;
              await OfferProduct.findByIdAndUpdate(productDetail._id, productDetail);
            }
            else{
              var newPurity = await new OfferProduct(productDetail).save();
              productOfferId = newPurity._id;
            }
            productIds.push(productOfferId);
          }
          if(productIds.length>0)
            await OfferProduct.deleteMany({offer:dbOffer, _id:{$nin:productIds}});
        }
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
    Offers.countDocuments()
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
      Offers.findById(req.params.id)
      .populate({
        path: "products",
        populate: [{
          path: "variant",
          populate: ["product"]
        }]
      })
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Offers.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      }).populate({
        path: "products",
        populate: [{
          path: "variant",
          populate: ["product"]
        }]
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
      Offers.find({ orderstatus_id: req.params.id })
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Offers.find({
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
      Offers.find({
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
        await Offers.findByIdAndDelete(req.params.id);
        await OfferProduct.deleteMany({offer:req.params.id});
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
        var resdata = await Offers.deleteOne({
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        });
        if(resdata.deletedCount > 0){
          await OfferProduct.deleteMany({offer:req.params.id});
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
      Offers.findByIdAndUpdate(req.params.id, req.body)
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
      Offers.findOneAndUpdate(
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
      var myOffers = await Offers.find({customer: user })
                    .populate({
                      path: "products",
                      populate: [{
                        path: "product",
                        populate: ["allImages"]
                      },"variant"]
                    });
      return res.json(myOffers)
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

