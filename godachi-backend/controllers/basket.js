const router = require("express").Router();
const passport = require("passport");
let Basket = require("../models/basket.model");
let Customers = require("../models/customer.model");
const Coupons = require("../models/coupons.model");
let Products = require("../models/products.model");
let ProductVariants = require("../models/productVariants.model");
const IthinkLogistics = require("./iThinkLogistics");
const { getPriceDetails } = require("../utils/productPrice");
const title = "Basket";
const roleTitle = "basket";

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.isActive;
    if (rolesControl) {
      Basket.find()
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
      new Basket(req.body)
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

// all basket items
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
      Basket.findById(req.params.id)
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
      Basket.findOne({ customer_id: req.params.id })
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
        var oldBasket = await Basket.findOne({ customer_id: req.user });
        var newBasket = req.body;

        var updatedProducts = oldBasket?oldBasket.products:[];
        newBasket.products.forEach((newProduct)=>{
          var findIndex = updatedProducts.findIndex((product)=> product.selectedVariant == newProduct.selectedVariant )
          if(findIndex==-1)
            updatedProducts.push(newProduct);
            else{
              updatedProducts[findIndex].qty= updatedProducts[findIndex].qty+newProduct.qty;
            }
        })
        
        var updatedBasket = {
          ...oldBasket,
          products: updatedProducts,
          customer_id: req.user
        };
        await Basket.findOneAndUpdate(
          {
            customer_id: req.user
          },
          {$set:updatedBasket},
          {
            upsert:true,
            new: true
          }
        )
        return res.json({
          success: true,
          data: updatedBasket
        })
      }
      catch(error){
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

  exports.updateCustomerCart = async (req, res) => {
    const rolesControl = req.user.isActive;

    if (rolesControl) {
      try{
        await Basket.findOneAndUpdate(
          {
            customer_id: req.user
          },
          {$set:req.body},
          {
            upsert:true,
            new: true
          }
        )
        return res.json({
          success: true
        })
      }
      catch(error){
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
exports.deleteId = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      Basket.findByIdAndDelete(req.params.id)
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
      Basket.findByIdAndUpdate(req.params.id, req.body)
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

  const buildBasket = async (data, user=null) =>{
    try{
      var {
        products,
        shipping_address,
        billing_address,
        shipToDiffAddress,
        useWalletCredits,
        couponCode,
        paymentType
      } = data;
      const userId = user ? user._id : null
      var basket = {
        products: [],
        shipping_address: shipping_address? shipping_address:{},
        billing_address: billing_address?billing_address:{},
        shipToDiffAddress:shipToDiffAddress?shipToDiffAddress:false,
        useWalletCredits: useWalletCredits?useWalletCredits: false,
        listedPrice:0,
        price:0,
        couponDiscount:0,
        couponCode: couponCode,
        shippingCharge:0,
        priceWithoutGst:0,
        gst:0,
        walletCredits:0,
        finalPrice:0,
        payableAmount:0,
        paymentType: "gateway"
      }
      var isShippable = false;
      

      if(products.length>0){
        var productVariants = products.map((product)=>product.selectedVariant);
        var productList = await ProductVariants.find({_id:{$in:productVariants}}).populate("product").populate("productImages")
        if(productList.length>0){
          for(const [key, variant] of Object.entries(productList)){
            var {priceDetails, offerDetails} = await getPriceDetails(variant);
            const allImages = variant.productImages.filter((img)=>img.mimeType.includes("image"));
            const img = allImages.length>0 ? allImages[0].image : null;
            var productListedPrice = priceDetails.listedPrice;
            var productPrice = priceDetails.price;
            var productOfferPrice = Math.round(priceDetails.offerPrice);
            var inputProduct = products.find((product)=>product.selectedVariant==variant._id.toString());
            var quantity = inputProduct.qty;
            var availableQuantity = variant.quantity;
            var servableQuantity = quantity;
            var maxQuantity = null;
            if(availableQuantity<quantity){
              servableQuantity = availableQuantity;
              maxQuantity = availableQuantity;
            }
            var productDetail = {
              product_id: variant.product._id,
              selectedVariant: variant._id,
              qty: servableQuantity,
              maxQuantity: maxQuantity,
              img: img,
              title: variant.product.productName,
              seo: variant.product.seo,
              category: variant.product.categories_id,
              listedPrice: productListedPrice,
              price: productPrice,
              offerPrice: productOfferPrice,
              discount: 0,
              total: productOfferPrice,
              gst: priceDetails.gst,
            }
            basket.products.push(productDetail);
            basket.listedPrice+=productListedPrice*servableQuantity;
            basket.price+=productOfferPrice*servableQuantity;
            basket.finalPrice+=productOfferPrice*servableQuantity;
          }

          // check coupon
          if(couponCode){
            var applyCouponResponse = await Coupons.applyCoupon(basket, couponCode, userId, true);
            if(applyCouponResponse.success){
              basket = applyCouponResponse.basket;
            }
          }

          //update paymentType
          if(paymentType)
            basket.paymentType= paymentType;

          if(basket.shipping_address && basket.shipping_address?.pinCode && basket.finalPrice && basket.shipping_address?.pinCode?.length==6){
            var checkPincode = await IthinkLogistics.getRates(basket.shipping_address.pinCode,basket.finalPrice);
            if(checkPincode?.status=="success"){
              isShippable= true
            }
            var shouldShippingCharged = parseInt(basket.finalPrice)<1000?true:false;
            if(shouldShippingCharged){
              var allRates = checkPincode.data;
              var minRate = Math.min(...allRates.map(item => item.rate));
              basket.shippingCharge = minRate;
              basket.finalPrice += minRate;
            }
          }
          basket.payableAmount = basket.finalPrice;
          //check walletCredits
          if(useWalletCredits==true && userId){
            var walletBalance = await Customers.getWalletBalance(userId);
            var applicableCredits = walletBalance;
            if(applicableCredits > basket.finalPrice){
              applicableCredits = basket.finalPrice
            }
            basket.walletCredits = applicableCredits;
            basket.payableAmount = basket.finalPrice - applicableCredits;
          }
          


          

        }
        basket.isShippable = isShippable;
      }
      
      
      
      
      if(userId){
        await Basket.findOneAndUpdate(
          {
            customer_id: userId
          },
          {$set:basket},
          {
            upsert:true,
            new: true
          }
        )
      }
      return {
        success: true,
        basket: basket
      };
    }
    catch(err){
      return {
        success: false,
        error: err,
      }
    }
  }

  exports.buildBasket = async (req, res) => {
    const user = req.isAuthenticated()? req.user:null;
    var fetchBasketDetails = await buildBasket(req.body, user);
    if(fetchBasketDetails.success){
      return res.json({
        variant: "success",
        result: fetchBasketDetails.basket
      });
    }
    return res.json({
      messagge: "Error: " + fetchBasketDetails.error,
      variant: "error",
    })
  }

  exports.mergeBasket = async (req, res) => {
    var {
      products
    } = req.body;
    const user = req.isAuthenticated()? req.user:null;
    let fetchBasketDetails;
    //get user basket products
    var userBasket = await Basket.findOne({ customer_id: req.user._id });
    if(!userBasket){
      fetchBasketDetails = await buildBasket(req.body, user);
    }
    else{
      var mergedData = req.body;
      //merge products
      var mergedProducts = products.map((product)=>{
                                      return {
                                        product_id: product.product_id,
                                        selectedVariant: product.selectedVariant,
                                        qty: product.qty
                                      }
                                    });
      var userBasketProduct = userBasket.products;
      for(const product of userBasketProduct){
        var defaultProductIndex = mergedProducts.findIndex((defaultProduct)=>defaultProduct.selectedVariant==product.selectedVariant);
        if(defaultProductIndex!=-1){
          mergedProducts[defaultProductIndex].qty = Math.max(mergedProducts[defaultProductIndex].qty, product.qty);
        }
        else{
          mergedProducts.push({
            product_id: product.product_id,
            selectedVariant: product.selectedVariant,
            qty: product.qty
          })
        }
      }
      mergedData.products = mergedProducts
      //merge coupon code
      if(!mergedData.couponCode){
        if(userBasket.couponCode)
          mergedData.couponCode = userBasket.couponCode;
      }
      //merge shipping and billing address
      /* if(mergedData.shipToDiffAddress!=true){
        if(userBasket.couponCode)
          mergedData.couponCode = userBasket.couponCode;
      } */
      fetchBasketDetails = await buildBasket(mergedData, user);
    }
    if(fetchBasketDetails.success){
      return res.json({
        variant: "success",
        result: fetchBasketDetails.basket
      });
    }
    return res.json({
      messagge: "Error: " + fetchBasketDetails.error,
      variant: "error",
    })
  }
  exports.buildBasketOld = async (req, res) => {
    try{
      var totalListedPrice = 0;
      var totalPrice = 0;
      var inputProductVariants = req.body.products.map((product)=>product.selectedVariant);
      var result = await ProductVariants.find({_id:{$in:inputProductVariants}})
                                  .populate("product")
                                  .populate("productImages")
  
      var productDetails = JSON.parse(JSON.stringify(result));
      if(productDetails && productDetails.length>0){
        var variants = result;
        for(const [key, variant] of Object.entries(variants)){
          var {priceDetails, offerDetails} = await getPriceDetails(variant);
          productDetails[key].priceDetails = priceDetails;
          productDetails[key].offerDetails = offerDetails;
          totalListedPrice+=priceDetails.price;
          //basketDetails.listedPriceWithGst+=priceDetails.priceWithGst;
          totalPrice+=priceDetails.finalPrice;
          /* basketDetails.gst+=priceDetails.gstAmount;
          basketDetails.finalPrice+=priceDetails.grandTotal; */
        }
      }
      // check coupon
      var totalCouponDiscount = 0;
      var couponCode = "Flat2500";
      var couponDetails = await Coupons.findOne({couponCode:couponCode});
      if(couponDetail){
        var canCouponBeApplied = false;
        if(couponDetails.minCartValue ){

        }
      }
      var basketDetails = {
        products:productDetails.map((productVariant)=>{
                    return {
                      product_id: productVariant.product._id,
                      selectedVariant: productVariant._id,
                      
                    }
                  }),
        listedPrice:totalListedPrice,
        listedPriceWithGst:totalListedPrice*1.03,
        price:totalPrice,
        couponDiscount:0,
        shippingCharge:0,
        priceWithoutGst:0,
        gst:0,
        finalPrice:0
      }
      return res.json(basketDetails);
    }
    catch(err){
      return res.json({
        messagge: "Error: " + err,
        variant: "error",
      })
    }
    
      
  }

