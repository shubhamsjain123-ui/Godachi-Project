const mongoose = require("mongoose");

let ProductInventory = require("../models/productInventory.model");
let ProductVariants = require("../models/productVariants.model");

const title = "Products";
const roleTitle = "products";

  /* // get all items
  exports.getAll = async (req, res) => {
    try{
        var inventoryList =await ProductInventory.aggregate([
            {$group: { 
                _id: "$variant",
                net:{
                    $sum:{$cond: [{$eq:["$transactionType","cr"]},"$quantity",{$multiply: ["$quantity", -1]}]}
                }
            }}, 
            {$lookup: {
                   from: "productvariants",
                   localField: "_id",
                   foreignField: "_id",
                   as: "variantDetails"
                 }
            },
            {
                $unwind: {path:"$variantDetails"}
            },
            {$lookup: {
                   from: "products",
                   localField: "variantDetails.product",
                   foreignField: "_id",
                   as: "productDetails"
                 }
            },
            {
                $unwind: {path:"$productDetails"}
            },
            {
                $project:{
                    productCode: "$variantDetails.productCode",
                    quantity: "$net",
                    productName: "$productDetails.productName",
                    product: "$productDetails._id",
                    variant: "$variantDetails._id"
                }
            }
        ]);
        res.json(inventoryList);
    }
    catch(error){
        res.json({
            messagge: "Error: " + error,
            variant: "error",
          })
    }
    
  } */

  // get all items
  exports.getAll = async (req, res) => {
    try{
        var inventoryList = await ProductVariants.find({})
                            .populate({path:"product", select:"productName isDeleted", populate:["allImages"]});
        res.json(inventoryList);
    }
    catch(error){
        res.json({
            messagge: "Error: " + error,
            variant: "error",
          })
    }
    
  }

  exports.markImportant = async (req, res) => {
    try{
      var productVariantId = req.params.id;
        var productVariant = await ProductVariants.findOne({_id:productVariantId});
        if(productVariant){
          var isImportant = productVariant.inventoryMarkAsImportant;
          await ProductVariants.updateOne(
            {_id:productVariantId},
            {
              $set:{
                inventoryMarkAsImportant: isImportant? false : true
              }
            }
          );
          return res.json({
            messagge: "Updated Successfully",
            variant: "success",
          }); 
        }
        return res.json({
          messagge: "Error: Sorry, no product found",
          variant: "error",
        })
    }
    catch(error){
        res.json({
            messagge: "Error: " + error,
            variant: "error",
          })
    }
    
  }

  exports.addNote = async (req, res) => {
    try{
      var productVariantId = req.params.id;
      var note = req.body.note;
        var productVariant = await ProductVariants.findOne({_id:productVariantId});
        if(productVariant){
          await ProductVariants.updateOne(
            {_id:productVariantId},
            {
              $set:{
                inventoryNote: note
              }
            }
          );
          return res.json({
            messagge: "Updated Successfully",
            variant: "success",
          }); 
        }
        return res.json({
          messagge: "Error: Sorry, no product found",
          variant: "error",
        })
    }
    catch(error){
        res.json({
            messagge: "Error: " + error,
            variant: "error",
          })
    }
    
  }
  // Get All Transactions
  exports.getAllTransactions = async (req, res) => {
    try{
        var inventoryList = await ProductInventory.find({variant: req.params.variant_id}).sort({createdAt:-1}).populate("vendor");
        res.json(inventoryList);
    }
    catch(error){
        res.json({
            messagge: "Error: " + error,
            variant: "error",
          })
    }
    
  }

  //add inventory
  exports.addInventory = async (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      try{
        await new ProductInventory({
            variant: req.params.variant_id,
            vendor: req.body.vendor,
            quantity: req.body.quantity,
            date: req.body.date,
            description: req.body.description,
            transactionType: 'cr'
        }).save();
        await ProductVariants.updateOne(
          {_id: req.params.variant_id},{
            $inc: {quantity: req.body.quantity}
          })
        res.json({
            messagge: title + " Added",
            variant: "success",
          })
      }
      catch(err){
        res.json({
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
    return
  }

  //remove inventory
  exports.removeInventory = async (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
        try{
          var productVariant = await await ProductVariants.findOne({_id: req.params.variant_id});
          if(productVariant && productVariant.quantity >= req.body.quantity){
            await new ProductInventory({
                variant: req.params.variant_id,
                quantity: req.body.quantity,
                date: req.body.date,
                description: req.body.description,
                transactionType: 'dr'
            }).save();
            await ProductVariants.updateOne(
              {_id: req.params.variant_id},{
                $inc: {quantity:parseInt(req.body.quantity)*(-1)}
              })
            res.json({
              messagge: title + " Added",
              variant: "success",
            })
          }
          else{
            res.json({
              messagge: ` Error: You can remove maximum of ${productVariant.quantity} quantity`,
              variant: "error",
            })
          }
        
        
        }
        catch(err){
        res.json({
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
    return
    }