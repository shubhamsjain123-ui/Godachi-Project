const express = require("express");
const router = express.Router();
const passport = require("passport");
// const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Users = require("../models/users.model");
const Customer = require("../models/customer.model");
let Settings = require("../models/settings.model");
let WalletTransactions = require("../models/walletTransactions.model");
let WalletTransactionType = require("../models/walletTransactionType.model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
// const { WEBSITE_URL, maillerConfig } = require("../config");

const { generateOtp } = require("../utils");
const { sendOtpApi } = require("./phoneController");
const { sendWelcomeWhatsappMessage, sendWhatsappOtpApi } = require("./whatsappController");
const { sendEmail } = require("./email")
const { sendWelcomeFcmNotification } = require("./fcmCloudMessaging")
require("dotenv").config();

const BCRYPT_SALT_ROUNDS = 10;

const nodemailer = require("nodemailer");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: process.env.PASPORTJS_KEY,
      sub: userID,
    },
    process.env.PASPORTJS_KEY,
    { expiresIn: "30 days" }
  );

};

exports.loginuser = async (req, res) => {
  if (req.isAuthenticated) {
    const fcmToken = req.body.fcmToken;
    const {
      email,
      _id,
      name
    } = req.user;
    var user = req.user;
    var userDetails = await Customer.findOne({ _id });
    if (fcmToken) {
      userDetails.fcmToken = fcmToken;
      await userDetails.save();
    }
    const token = signToken(userDetails._id);
    res.cookie("access_token_user", token, {
      //httpOnly: true,
      sameSite: true,
    });
    res.status(200).json({
      isAuthenticated: true,
      user: {
        name: user.name,
        id: user._id,
        origPhoneInput: user.origPhoneInput,
        countryCode: user.countryCode,
        phone: user.phone,
        email: user.email,
        emailVerified: user.emailVerified,
        profilePic: user.profilePic,
        access_token: token,
        referralCode: user.referralCode
      },
    });
  }
}


exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    const {
      _id,
      username,
      role,
      name,
      surname,
      company,
      isCustomer,
      image,
      phone,
    } = req.user;
    const token = signToken(_id);
    res.cookie("access_token_admin", token, {
      //httpOnly: true,
      sameSite: true
    });
    res.status(200).json({
      isAuthenticated: true,
      user: {
        username,
        role,
        id: _id,
        name: name + " " + surname,
        company: company,
        isCustomer: isCustomer,
        image: image,
        phone: phone,
        access_token: token
      },
    });
  }
}


exports.updatePasswordViaEmail = (req, res) => {
  Users.findOne({
    username: req.body.username,
    resetPasswordToken: req.body.resetPasswordToken,
    resetPasswordExpires: { $gte: Date.now() },
  }).then((user) => {
    if (user == null) {
      //console.error({message:"password reset link is invalid or has expired"});
      res
        .status(200)
        .send({ message: "password reset link is invalid or has expired" });
    } else if (user != null) {
      bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then((hashedPassword) => {
          Users.findOneAndUpdate(
            {
              username: req.body.username,
            },
            {
              password: hashedPassword,
              resetPasswordToken: null,
              resetPasswordExpires: null,
            }
          )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        })
        .then(() => {
          console.log("password updated");
          res.status(200).send({ message: "password updated" });
        });
    } else {
      // console.error({message:"no user exists in db to update"});
      res.status(200).send({ message: "no user exists in db to update" });
    }
  });
}

exports.googleLogin = (req, res) => {
  const { credential } = req.body;

  console.log(JWT.decode(credential));
  res.status(200).send({ message: "no user exists in db to update" });
}

exports.sendOtp = async (req, res) => {
  try {
    const {
      phone,
      type
    } = req.body;
    if (phone) {
      var user = await Customer.findOne({ origPhoneInput: phone, isActive: true });
      // console.log(user);
      if (user) {
        if (type == "send") {
          //generate OTP
          var otp = generateOtp();
          user.otp = otp;
          await user.save();
        }
        //send OTP
        await sendOtpApi(user.countryCode, user.phone, user.otp);

        //send Whatsapp OTP
        await sendWhatsappOtpApi(user.countryCode, user.phone, user.otp);

        return res.status(200).json({
          messagge: "Otp Sent",
          error: false,
        });
      }
      return res.status(200).json({
        messagge: "Phone Number doesn't exists in our database. Please signup",
        error: true,
      });
    }
    return res.status(200).json({
      messagge: "Please Enter valid Phone Number",
      error: true,
    });
  }
  catch (err) {
    return res.status(200).json({
      messagge: "Error has occured " + err,
      error: true,
    });
  }
}

exports.verifyOtp = async (req, res) => {
  try {
    const {
      phone,
      otp,
      fcmToken
    } = req.body;
    console.log(req.body);
    if (phone && otp) {
      var user = await Customer.findOne({ origPhoneInput: phone, otp: otp });
      if (user) {
        //var user = checkPhoneOtp;
        if (user.phoneVerified == false) {
          //NEW USER
          user.phoneVerified = true;
          user.phoneVerifiedOn = new Date();
          user.isActive = true;

          if (user.referredBy) {
            var settingDetails = await Settings.findOne({});
            var refereeAmount = settingDetails?.refereeAmount;
            if (refereeAmount > 0) {
              var transactionType = await WalletTransactionType.findOne({ type: "refereecredit" });
              await WalletTransactions.creditAmount(user.referredBy, refereeAmount, transactionType);
            }
            var referralAmount = settingDetails?.referralAmount;
            if (referralAmount > 0) {
              var transactionType = await WalletTransactionType.findOne({ type: "referralcredit" });
              await WalletTransactions.creditAmount(user._id, referralAmount, transactionType);
            }
          }

          //send welcome whatsapp
          await sendWelcomeWhatsappMessage(user.countryCode, user.phone, user.name)

          //send fcm message
          if (fcmToken) {
            await sendWelcomeFcmNotification(fcmToken)
          }
        }
        if (fcmToken)
          user.fcmToken = fcmToken;
        await user.save();

        const token = signToken(user._id);
        res.cookie("access_token_user", token, {
          //httpOnly: true,
          sameSite: true,
        });
        return res.status(200).json({
          isAuthenticated: true,
          user: {
            name: user.name,
            id: user._id,
            origPhoneInput: user.origPhoneInput,
            countryCode: user.countryCode,
            phone: user.phone,
            email: user.email,
            emailVerified: user.emailVerified,
            profilePic: user.profilePic,
            access_token: token,
            referralCode: user.referralCode
          },
          error: false,
        });
      }
    }
    return res.status(200).json({
      messagge: "Please Enter valid OTP",
      error: true,
    });
  }
  catch (err) {
    return res.status(200).json({
      messagge: "Error has occured " + err,
      error: true,
    });
  }
}

exports.verifyEmail = async (req, res) => {
  try {
    const {
      token
    } = req.body;
    if (token) {
      var user = await Customer.findOne({ emailVerificationToken: token });
      if (user) {
        if (!user.email) {
          return res.status(200).json({
            messagge: "Sorry no email linked with this account",
            error: true,
          });
        }
        if (user.emailVerified == false) {
          user.emailVerified = true;
          user.emailVerifiedOn = new Date();
          await user.save();
        }
        return res.status(200).json({
          messagge: "Email verified successfully",
          error: false,
        });
      }
    }
    return res.status(200).json({
      messagge: "Invalid Token",
      error: true,
    });
  }
  catch (err) {
    return res.status(200).json({
      messagge: "Error has occured " + err,
      error: true,
    });
  }
}

exports.register = async (req, res) => {
  const {
    origPhoneInput,
    phone,
    country,
    countryCode,
    email,
    password,
    name } = req.body;

  try {
    //check phone exists in db
    var doesPhoneExists = await Customer.findOne({ phone: phone });
    if (!doesPhoneExists) {
      //check if email already exists
      if (email && email != "") {
        var doesEmailExists = await Customer.findOne({ email: email });
        if (doesEmailExists) {
          //email already taken by another user
          return res.status(201).json({
            messagge: "Email Address already registered. Please enter different email address",
            error: true,
          });
        }
      }
      //generate OTP
      var otp = generateOtp();

      //register user
      var userDetails = {
        origPhoneInput,
        phone,
        country,
        countryCode,
        password,
        name,
        otp
      }
      if (email && email != "")
        userDetails.email = email;
      console.log(req.cookies)
      var referralUserCode = req.cookies['referralUserCode'];
      if (referralUserCode) {
        var referredBy = await Customer.findOne({ referralCode: referralUserCode });
        if (referredBy) {
          userDetails.referredBy = referredBy;

        }

      }
      var user = await new Customer(userDetails).save();
      //send welcome email
      if (user.email) {
        const emailData = {
          name: user.name,
          email: user.email,
          emailToken: user.emailVerificationToken,
          to: [user.email]
        };
        await sendEmail('verifyEmail', emailData);
      }
      //send OTP
      await sendOtpApi(countryCode, phone, otp);
      return res.status(201).json({
        messagge: "Account successfully created. Please Verify your OTP",
        error: false,
      });
    }
    else {
      //phone exists, send error
      return res.status(201).json({
        messagge: "Phone Number already exists. Please Login",
        error: true,
      });
    }
  }
  catch (err) {
    return res.status(500).json({
      messagge: "Error has occured " + err,
      error: true,
    });
  }


  /* Customer.findOne({ email }).then((user) => {
    if (user)
      res.status(201).json({
        messagge: "E-mail is already taken",
        error: true,
      });
    else {
      new Customer({
        email,
        password,
        name,
      }).save((err) => {
        if (err)
          res.status(500).json({
            messagge: "Error has occured " + err,
            error: true,
          });
        else
          res.status(201).json({
            messagge: "Account successfully created",
            error: false,
          });
      });
    }
  }); */
}

exports.reset = (req, res) => {
  Users.findOne({
    resetPasswordToken: req.query.resetPasswordToken,
    resetPasswordExpires: { $gte: Date.now() },
  }).then((user) => {
    if (user == null) {
      console.error("password reset link is invalid or has expired");
      res.status(403).send("password reset link is invalid or has expired");
    } else {
      res.status(200).send({
        username: user.username,
        message: "password reset link a-ok",
      });
    }
  });
}

exports.forgotPassword = (req, res) => {
  if (req.body.username === "") {
    res.status(400).send("email required");
  }

  Users.findOne({ username: req.body.username }).then((user) => {
    if (user === null) {
      res.send("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      Users.updateOne(
        {
          username: req.body.username,
        },
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        }
      )
        .then((res) => console.log(res + " added"))
        .catch((err) => console.log(err));

      const transporter = nodemailer.createTransport(maillerConfig);

      const mailOptions = {
        to: `${req.body.username}`,
        from: `${maillerConfig.auth.user}`,
        subject: "Link To Reset Password",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `${process.env.ADMIN_SITE}/resetpassword/?token=${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      };

      console.log("sending mail password" + req.body.username);
      console.log("sending mail password" + req.body.username)

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", response);
          res.status(200).json("recovery email sent");
        }
      });
    }
  });
}

exports.forgotpasswordcustomer = (req, res) => {
  if (req.body.username === "") {
    res.status(400).send("email required");
  }

  Users.findOne({ username: req.body.username }).then((user) => {
    if (user === null) {
      res.send("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      Users.updateOne(
        {
          username: req.body.username,
        },
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        }
      )
        .then((res) => console.log(res + " added"))
        .catch((err) => console.log(err));

      const transporter = nodemailer.createTransport(maillerConfig);

      const mailOptions = {
        to: `${req.body.username}`,
        from: `${maillerConfig.auth.user}`,
        subject: "Link To Reset Password",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `${WEBSITE_URL}/resetpassword/?token=${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      };

      console.log("sending mail password" + req.body.username);

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", response);
          res.status(200).json("recovery email sent");
        }
      });
    }
  });
}

exports.logout = (req, res) => {
  res.clearCookie("access_token_admin");
  res.json({
    user: {
      username: "",
      role: "",
      id: "",
      name: "",
      company: "",
      isCustomer: "",
      phone: "",
    },
    success: true,
  });
}
exports.logoutUser = (req, res) => {
  res.clearCookie("access_token_user");
  // res.removeCookie("access_token_user");

  res.json({
    user: {
      username: "",
      role: "",
      id: "",
      name: "",
      company: "",
      isCustomer: "",
      phone: "",
    },
    success: true,
  });
}

exports.deleteUserAccount = async (req, res) => {
  const user = req.user;

  var userDetails = await Customer.findOne({ _id: user._id });
  if (userDetails) {
    userDetails.isActive = false;
    userDetails.isAccountDeleted = true;
    userDetails.accountDeletedOn = new Date();
    userDetails.email = userDetails.email + "-del";
    userDetails.origPhoneInput = userDetails.origPhoneInput + "-del";
    userDetails.phone = userDetails.phone + "-del";

    await userDetails.save();
  }


  res.json({
    success: true,
    message: "Account deleted successfully"
  });
}

exports.admin = (req, res) => {
  if (req.Users.role === "admin") {
    res.status(200).json({
      message: { msgBody: "You are an admin", msgError: false },
    });
  } else {
    res.status(403).json({
      message: {
        msgBody: "You're not an admin,go away",
        msgError: true,
      },
    });
  }
}


exports.authenticateduser = (req, res) => {
  const user = req.user;
  var response = {
    isAuthenticated: true,
    user: {
      name: user.name,
      id: user._id,
      origPhoneInput: user.origPhoneInput,
      countryCode: user.countryCode,
      phone: user.phone,
      email: user.email,
      emailVerified: user.emailVerified,
      profilePic: user.profilePic,
      referralCode: user.referralCode
    },
  }
  res.status(200).json(response);
}


exports.authenticated = (req, res) => {
  const {
    username,
    role,
    _id,
    name,
    surname,
    company,
    isCustomer,
    image,
    prefix,
    phone,
  } = req.user;
  res.status(200).json({
    isAuthenticated: true,
    user: {
      username,
      role,
      id: _id,
      name: name,
      surname,
      company: company,
      isCustomer: isCustomer,
      image: image,
      prefix: prefix,
      phone: phone,
    },
  });
}
