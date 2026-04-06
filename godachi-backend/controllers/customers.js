const router = require("express").Router();
const passport = require("passport");
let Customers = require("../models/customer.model");
let Users = require("../models/users.model");
let Address = require("../models/address.model");
let GiftCard = require("../models/giftCard.model");
let WalletTransactions = require("../models/walletTransactions.model");
let WalletTransactionType = require("../models/walletTransactionType.model");
let CustomizeJewellery = require("../models/customizeJewellery.model");
let BulkOrder = require("../models/bulkOrder.model");
let ContactQuery = require("../models/contactQuery.model");
const RazorpayController = require("./razorpay");
const PhonePeController = require("./phonepe");
const { v4: uuidv4 } = require('uuid');
const {sendEmail} = require("./email")
const title = "User";
const roleTitle = "customers";
const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 10;

exports.sendVerificationEmail = async (req, res) => {
  const loginUser = req.user;
  const updateEmail = req.body.email;
  var checkEmailExists = await Customers.findOne({email: updateEmail, _id:{$ne:loginUser._id}});
  if(checkEmailExists){
    //email already taken by another user
    return res.send({
      success: false,
      message:"Email already linked with another user"
    })
  }
  var userDetails = await Customers.findOne({_id:loginUser._id});
  userDetails.email= updateEmail;
  await userDetails.save();
  const emailData = {
    name:userDetails.name,
    email:userDetails.email,
    emailToken:userDetails.emailVerificationToken,
    to: [userDetails.email]
  };
  await sendEmail('verifyEmail', emailData);
  return res.send({
    success: true,
    message:"Email successfully updated"
  })
}
exports.updateCustomerName = async (req, res) => {
  const loginUser = req.user;
  const updateName = req.body.name;

  var userDetails = await Customers.findOne({_id:loginUser._id});
  userDetails.name= updateName;
  await userDetails.save();
  return res.send({
    success: true,
    message:"Name updated Successfully"
  })
}
exports.updateProfilePic = async (req, res) => {
  const loginUser = req.user;
  const image = req.body.image;

  var userDetails = await Customers.findOne({_id:loginUser._id});
  userDetails.profilePic= image;
  await userDetails.save();
  return res.send({
    success: true,
    message:"Image updated Successfully"
  })
}
exports.getMyDetails = async (req, res) => {
  const loginUser = req.user;

  var userDetails = await Customers.findOne({_id:loginUser._id},"name email emailVerified origPhoneInput phoneVerified profilePic");
  
  return res.send({
    success: true,
    result:userDetails
  })
}

exports.updatePasswordCustomer = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["customers/id"] || req.body._id == req.user._id) {
      Users.findOne({
        $and: [{ _id: req.body._id }, { isCustomer: true }],
      }).then((users) => {
        if (users != null) {
          console.log("user exists in db");
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
              Users.findOneAndUpdate(
                {
                  _id: req.body._id,
                },
                {
                  password: hashedPassword,
                }
              )
                .then(() => {
                  res.json({
                    messagge: title + " Password Update",
                    variant: "success",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    messagge: "Error: " + err,
                    variant: "error",
                  });
                });
            });
        } else {
          console.error("no user exists in db to update");
          res.status(401).json("no user exists in db to update");
        }
      });
    } else {
      res.json({
        messagge: " You are not authorized, go away!",
        variant: "error",
      });
    }
  }

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Users.find(
        { isCustomer: true },
        {
          isActive: 1,
          name: 1,
          surname: 1,
          username: 1,
          _id: 1,
          isCustomer: 1,
          address: 1,
          phone: 1,
          prefix: 1,
        }
      )
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
      Users.find({
        $and: [{ isCustomer: true }, { "created_user.id": `${req.user._id}` }],
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

// fetch data by id
exports.counts = (req, res) => {
    Users.findOne({
      $and: [{ isCustomer: true }],
    })
      .countDocuments()
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  }

// post new items
exports.add = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new Users(req.body)
        .save()
        .then((data) =>
          res.json({
            messagge: title + " Added",
            variant: "success",
            data: data,
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
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// update active data by id
exports.updateActive = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Users.findByIdAndUpdate(req.params.id, req.body)
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
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// fetch data by id
exports.getById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"] || req.user._id == req.params.id) {
      Users.findOne({
        $and: [
          { _id: req.params.id },
          // { 'isCustomer': true },
        ],
      })
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Users.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
        isCustomer: true,
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
      Users.deleteOne({
        $and: [{ _id: req.params.id }, { isCustomer: true }],
      })
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
      Users.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
        isCustomer: true,
      })
        .then((resdata) => {
          if (resdata.deletedCount > 0) {
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
    if (rolesControl[roleTitle + "/id"] || req.user._id == req.params.id) {
      Users.findByIdAndUpdate(req.params.id, req.body)
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
      Users.findOneAndUpdate(
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

exports.updatePasswordCustomerPublic = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"] || req.body._id == req.user._id) {
      Users.findOne({
        $and: [{ _id: req.body._id }, { isCustomer: true }],
      }).then((users) => {
        if (users != null) {
          console.log("user exists in db");
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
              Users.findOneAndUpdate(
                {
                  _id: req.body._id,
                },
                {
                  password: hashedPassword,
                }
              )
                .then(() => {
                  res.json({
                    messagge: title + " Password Update",
                    variant: "success",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    messagge: "Error: " + err,
                    variant: "error",
                  });
                });
            });
        } else {
          console.error("no user exists in db to update");
          res.status(401).json("no user exists in db to update");
        }
      });
    } else {
      res.json({
        messagge: " You are not authorized, go away!",
        variant: "error",
      });
    }
  }

exports.addAddressPublic = (req, res) => {
    Users.findOneAndUpdate(
      { username: req.user.username },
      { $set: { address: req.body } }
    )
      .then((data) => {
        res.json(data.address);
      })
      .catch((err) =>
        res.json({
          messagge: "Error:( " + err,
          variant: "error",
        })
      );
  }

//manage address controller
exports.getdefaultAddress = async (req, res) => {
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      var defaultAddress = await Address.findOne({customer: userId, defaultAddress: true});
      return res.json({
        messagge: "Success",
        variant: "success",
        result: defaultAddress
      });

    }
    catch(error){
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}

exports.getAllAddress = async (req, res) => {
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      var addresses = await Address.find({customer: userId}).populate("state");
      return res.json({
        messagge: "Success",
        variant: "success",
        result: addresses
      });

    }
    catch(error){
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}
exports.getAddressDetails = async (req, res) => {
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      var addressId = req.params.id;
      var addresses = await Address.findOne({customer: userId, _id: addressId});
      return res.json({
        messagge: "Success",
        variant: "success",
        result: addresses
      });

    }
    catch(error){
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}

exports.manageAddress = async (req, res) => {
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      var addressId = req?.params?.id;
      var addressDetails = req.body;
      addressDetails.customer = userId;
      if(addressId){
        await Address.updateOne({
          customer: userId,
          _id: addressId
        },{
          $set: addressDetails
        });
      }
      else{
        var newAddress = await new Address(addressDetails).save();
        addressId = newAddress._id;
      }
      if(addressDetails.defaultAddress){
        await Address.updateMany({customer: userId,_id:{$ne: addressId}},{$set:{defaultAddress: false}});
      }
      return res.json({
        messagge: addressId?"Address updated successfully": "Address created successfuly",
        variant: "success"
      });

    }
    catch(error){
      console.log(error)
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}

exports.searchCustomer = async (req, res)=>{
  var searchText = req.body.search;
  try{
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(searchText);
    var customerList = await Customers.find({
      $or: [
        { name: { $regex: searchRgx, $options: "i" } },
        { email: { $regex: searchRgx, $options: "i" } },
        { phone: { $regex: searchRgx, $options: "i" } },
      ]
    }).limit(10);
    res.json(customerList)
  }
  catch(error){
    return res.json({
      messagge: "Error:( " + error.message,
      variant: "error",
    })
  }
  

}


//Gift card controls
exports.createGiftCardOrder = async (req, res) => {
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      const {
        amount,
        receiverName,
        receiverEmail,
        receiverPhoneNumber,
        receiverCountryCode,
        receiverMessage,
      } = req.body;

      //create new gift card order
      var giftCardDetails = await new GiftCard({
        amount,
        receiverName,
        receiverEmail,
        receiverPhoneNumber,
        receiverCountryCode,
        receiverMessage,
        boughtBy: userId,
        requestedOn: new Date()
      }).save();
      if(!giftCardDetails){
        return res.json({
          messagge: "Error: There is some error please try again after some time",
          variant: "error",
        })
      }
      /* var razorpayOrder = await RazorpayController.createOrder(amount, giftCardDetails._id);
      giftCardDetails.paymentGatewayOrderDetails = razorpayOrder; */
      
      var phonepeOrder = await PhonePeController.createOrder(amount,giftCardDetails._id, userId, `/cart/paymentConfirm/${giftCardDetails._id}`);
      giftCardDetails.paymentGatewayOrderDetails = phonepeOrder;
      
      await giftCardDetails.save();

      return res.json({
        messagge: "Giftcard Order Created Successfully",
        variant: "success",
        result: giftCardDetails
      });

    }
    catch(error){
      console.log(error)
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}

exports.onPlaceGiftCardOrder = async (req, res) => {
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      var {
        gifCardId,
        type,
        result
      } = req.body;

      //check gift card exists
      var giftCardDetails = await GiftCard.findOne({_id: gifCardId});
      
      if(!giftCardDetails){
        return res.json({
          messagge: "Error: There is some error please try again after some time",
          variant: "error",
        })
      }

      giftCardDetails.paymentGatewayStatus = type;
      giftCardDetails.paymentGatewayResponse = result;
      
      if(type=="success"){
        //generate gift card number
        //let giftCode = uuidv4();
        let giftCode = await GiftCard.createUniqueCode();
        giftCardDetails.giftCode = giftCode;
        giftCardDetails.giftCodeGenerated = true;
        giftCardDetails.boughtOn = new Date();
        //send gift card to receiver email or sms
        res.json({
          success: true,
          message: "Gift Code Generated Successfully"
        })
      }
      else{
        res.json({
          success: false,
          message: "Payment Failed"
        })
      }
      await giftCardDetails.save();
      return;

    }
    catch(error){
      console.log(error)
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}
exports.redeemGiftCard = async (req, res) => {
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      var {
        giftCode
      } = req.body;

      //check gift card exists
      var giftCardDetails = await GiftCard.findOne({giftCode: { $regex : new RegExp(`^${giftCode}$`, "i") }});
      if(!giftCardDetails){
        return res.json({
          messagge: "Error: Please Enter a valid Gift Code",
          variant: "error",
        })
      }
      if(giftCardDetails.isClaimed){
        return res.json({
          messagge: "Error: Sorry this gift card is already claimed",
          variant: "error",
        })
      }
      
      //add credits to user wallet
      var transactionType = await WalletTransactionType.findOne({type:"giftcard"});
      var walletTransaction = await WalletTransactions.creditAmount(userId, giftCardDetails.amount, transactionType);
      if(walletTransaction){
        giftCardDetails.isClaimed= true;
        giftCardDetails.claimedBy= userId;
        giftCardDetails.claimedTransaction= walletTransaction;
        giftCardDetails.claimedOn= new Date();

        await giftCardDetails.save();
        return res.json({
          messagge: "Gift Card calimed successfully",
          variant: "success",
          result: giftCardDetails
        })
      }
      else{
        return res.json({
          messagge: "Error: Sorry some error occurred. PLease try again after some time",
          variant: "error",
        })
      }
    }
    catch(error){
      console.log(error)
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}

exports.myGiftCardBuyHistory = async(req,res) =>{
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      
      var giftCardDetails = await GiftCard.find(
                                                {boughtBy: userId, giftCodeGenerated: true},
                                                {
                                                  amount: 1,
                                                  receiverName:1,
                                                  receiverEmail:1,
                                                  receiverPhoneNumber:1,
                                                  receiverCountryCode:1,
                                                  receiverMessage:1,
                                                  boughtOn: 1,
                                                  giftCode: 1
                                                }
                                              );
      
      return res.json({
        messagge: "Gift Card fetched successfully",
        variant: "success",
        result: giftCardDetails
      })
    }
    catch(error){
      console.log(error)
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}
exports.myWalletDetails = async(req,res) =>{
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      var customerDetails = await Customers.findOne({_id:userId});

      var walletHistory = await WalletTransactions.find({customer: userId})
                                                  .populate("transactionType")
                                                  .sort({createdAt:-1});
      
      return res.json({
        messagge: "Wallet Details fetched successfully",
        variant: "success",
        result: {
          balance: customerDetails.walletBalance,
          walletHistory: walletHistory
        }
      })
    }
    catch(error){
      console.log(error)
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}

exports.getMyWalletBalance = async(req,res) =>{
  if(req.isAuthenticated()){
    try{
      var userId = req.user._id;
      var customerDetails = await Customers.findOne({_id:userId});
      
      return res.json({
        messagge: "Wallet Balance fetched successfully",
        variant: "success",
        result: customerDetails.walletBalance? customerDetails.walletBalance: 0
      })
    }
    catch(error){
      console.log(error)
      return res.json({
        messagge: "Error:( " + error.message,
        variant: "error",
      })
    }
  }
  return res.status(401).json("no user exists in db");
}

//forms control
exports.customizeJewelleryRequest = async (req, res) => {
  try{
    var data = req.body;
    var request = await new CustomizeJewellery(data).save();
    return res.json({
      success: true,
    })
  }
  catch(error){
    return res.json({
      success: false,
      error: error
    })
  }
}

exports.getCustomizeJewelleryRequest = async (req, res) => {
  try{
    var data = req.body;
    var request = await CustomizeJewellery.find({}).sort({createdAt:-1});
    return res.json({
      success: true,
      result: request
    })
  }
  catch(error){
    return res.json({
      success: false,
      error: error
    })
  }
}

exports.bulkOrderRequest = async (req, res) => {
  try{
    var data = req.body;
    var request = await new BulkOrder(data).save();
    return res.json({
      success: true,
    })
  }
  catch(error){
    return res.json({
      success: false,
      error: error
    })
  }
}

exports.getBulkOrderRequest = async (req, res) => {
  try{
    var data = req.body;
    var request = await BulkOrder.find({}).sort({createdAt:-1});
    return res.json({
      success: true,
      result: request
    })
  }
  catch(error){
    return res.json({
      success: false,
      error: error
    })
  }
}

exports.contactRequest = async (req, res) => {
  try{
    var data = req.body;
    var request = await new ContactQuery(data).save();
    return res.json({
      success: true,
    })
  }
  catch(error){
    return res.json({
      success: false,
      error: error
    })
  }
}

exports.getContactRequest = async (req, res) => {
  try{
    var data = req.body;
    var request = await ContactQuery.find({}).sort({createdAt:-1});
    return res.json({
      success: true,
      result: request
    })
  }
  catch(error){
    console.log(error)
    return res.json({
      success: false,
      error: error
    })
  }
}