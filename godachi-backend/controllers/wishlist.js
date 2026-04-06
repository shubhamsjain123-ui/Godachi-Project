const router = require("express").Router();
const passport = require("passport");
let Wishlist = require("../models/wishlist.model");
let Products = require("../models/products.model");
let ProductVariants = require("../models/productVariants.model");
const { getPriceDetails } = require("../utils/productPrice");

const title = "Wishlist";
const roleTitle = "wishlist";

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.isActive;
    if (rolesControl) {
      Wishlist.find()
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
          messagge: "Your account not active!",
          variant: "error",
        },
      });
    }
  }

// post new items
exports.add = (req, res) => {
    const rolesControl = req.user.isActive;
    if (rolesControl) {
      var wishlistData = req.body;
      var user = req.user;
      new Wishlist({
        customer_id: user,
        ...wishlistData
      })
        .save()
        .then(() =>
          res.json({
            messagge: title + " Added",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: " Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "Your account not active!",
          variant: "error",
        },
      });
    }
  }

// all wishlist items
/* exports.allproducts = (req, res) => {
  Products.find(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.json({
        messagge: "Error: " + err,
        variant: "error",
      })
    );
} */
exports.allproducts = async (req, res) => {
  try{
    var result = await ProductVariants.find({_id:{$in:req.body.variantIds}})
                                .populate("product")
                                .populate("productImages")

    var productDetails = JSON.parse(JSON.stringify(result));
    if(productDetails && productDetails.length>0){
      var variants = result;
      for(const [key, variant] of Object.entries(variants)){
        var {priceDetails, offerDetails} = await getPriceDetails(variant);
        productDetails[key].priceDetails = priceDetails;
        productDetails[key].offerDetails = offerDetails;
      }
    }

    return res.json(productDetails);
  }
  catch(err){
    return res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}
// fetch data by id
exports.getId = (req, res) => {
    const rolesControl = req.user.isActive;
    if (rolesControl) {
      Wishlist.findById(req.params.id)
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
          messagge: "Your account not active!",
          variant: "error",
        },
      });
    }
  }

// fetch data by id
exports.getCustomerId = (req, res) => {
    const rolesControl = req.user.isActive;

    if (rolesControl) {
      Wishlist.find({ customer_id: req.params.id })
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
          messagge: "Your account not active!",
          variant: "error",
        },
      });
    }
  }

  // update data by customer id
exports.addCustomerId = async (req, res) => {
  const rolesControl = req.user.isActive;
  if (rolesControl) {
    try{
      var oldWishlist = await Wishlist.find({ customer_id: req.user });
      var newWishlist = req.body;

      for(const newProduct of newWishlist){
        var productExists = oldWishlist.find((product)=>product.selectedVariant == newProduct.selectedVariant)
        if(!productExists){
          var addedWishlist = await new Wishlist({
            customer_id: req.user,
            ...newProduct
          }).save();
        }
      }
      var finalWishlist = await Wishlist.find({ customer_id: req.user });
      return res.json({
        success: true,
        data: finalWishlist
      })
    }
    catch(error){
      console.error(error)
      return res.status(200).json({
        success: false,
        message: "Please try again after some time"
      });
    }
  } else {
    res.status(403).json({
      message: {
        messagge: "Your account not active!",
        variant: "error",
      },
    });
  }
}

// delete data by id
exports.deleteVariantId = (req, res) => {
    if (req.isAuthenticated()) {
      Wishlist.deleteOne({customer_id: req.user._id,selectedVariant:req.params.variantId})
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
    } else {
      res.status(403).json({
        message: {
          messagge: "Your account not active!",
          variant: "error",
        },
      });
    }
  }

// update data by id
exports.update = (req, res) => {
    const rolesControl = req.user.isActive;

    if (rolesControl) {
      Wishlist.findByIdAndUpdate(req.params.id, req.body)
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
    } else {
      res.status(403).json({
        message: {
          messagge: "Your account not active!",
          variant: "error",
        },
      });
    }
  }

