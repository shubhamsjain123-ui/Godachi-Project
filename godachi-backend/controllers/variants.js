const router = require("express").Router();
const passport = require("passport");
let Variants = require("../models/variants.model");
let VariantOptions = require("../models/variantOptions.model");

const title = "Variants";
const roleTitle = "variants";

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Variants.find().populate("variants")
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
      Variants.find({
        "created_user.id": `${req.user._id}`,
      }).populate("variants")
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
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      const {variants,...variantDetails} = req.body;
      try{
        var variantMasterId = await new Variants(variantDetails).save();
        for(const variant of variants){
          variant.variant = variantMasterId;
          variant.created_user = variantDetails.created_user
          await new VariantOptions(variant).save();
        }
        return  res.json({
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
  }

// fetch data by id
exports.getById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Variants.findById(req.params.id)
      .populate("variants")
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Variants.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
      .populate("variants")
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
exports.deleteById = async (req, res) => {
    const rolesControl = req.user.role;
    var variantMasterId = req.params.id
    if (rolesControl[roleTitle + "delete"]) {
      try{
        await Variants.findByIdAndDelete(variantMasterId);
        await VariantOptions.deleteMany({variant :variantMasterId})
        return res.json({
          messagge: title + " Deleted",
          variant: "info",
        })
      }
      catch(err){
        return res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      }
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      try{
        await Variants.deleteOne({
          _id: variantMasterId,
          "created_user.id": `${req.user._id}`,
        })
        await VariantOptions.deleteMany({variant :variantMasterId})
        return res.json({
          messagge: title + " Deleted",
          variant: "info",
        })
      }
      catch(err){
        return res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      }
     
    } else {
      return res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// update data by id
exports.update = async (req, res) => {
    const rolesControl = req.user.role;
    const {variants,...variantDetails} = req.body;
    var variantMasterId = req.params.id
    if (rolesControl[roleTitle + "/id"]) {
      try{
        var variantOptionIds=[];
        await Variants.findByIdAndUpdate(variantMasterId, variantDetails)
        for(const variant of variants){
          variant.variant = variantMasterId;
          variant.created_user = variantDetails.created_user
          if(variant._id){
            await VariantOptions.findByIdAndUpdate(variant._id, variant);
            var variantOptionId = variant._id
          }
          else{
            var variantOptionId = await new VariantOptions(variant).save();
          }
          variantOptionIds.push(variantOptionId);
        }
        if(variantOptionIds.length>0){
          await VariantOptions.deleteMany({variant:variantMasterId, _id:{$nin:variantOptionIds} })
        }
        return  res.json({
          messagge: title + " Update",
          variant: "success",
        })
      }
      catch(err){
        return res.json({
          messagge: " Error: " + err,
          variant: "error",
        })
      }
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      try{
        var variantOptionIds=[];
        await Variants.Variants.findOneAndUpdate(
          {
            _id: variantMasterId,
            "created_user.id": `${req.user._id}`,
          },
          variantDetails
        )
        for(const variant of variants){
          variant.variant = variantMasterId;
          variant.created_user = variantDetails.created_user
          if(variant._id){
            await VariantOptions.findByIdAndUpdate(variant._id, variant);
            var variantOptionId = variant._id
          }
          else{
            var variantOptionId = await new VariantOptions(variant).save();
          }
          variantOptionIds.push(variantOptionId);
        }
        if(variantOptionIds.length>0){
          await VariantOptions.deleteMany({variant:variantMasterId, _id:{$nin:variantOptionIds} })
        }
        return  res.json({
          messagge: title + " Update",
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
  }

