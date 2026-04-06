const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const AnonymousStrategy = require('passport-anonymous').Strategy;
const Users = require("./models/users.model");
const Customer = require("./models/customer.model");
require("dotenv").config();
const jwt = require('jsonwebtoken')
console.log("key",process.env.PASPORTJS_KEY)

const webCookieExtractor = (req) => {
  let token = null;

  if (req.headers && req?.headers?.authorization) {
    token = req?.headers?.authorization
  } else
    if (req && req.cookies) {
      token = req.cookies["access_token_user"];
    }
  return token;
};

const adminCookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token_admin"];
  }
  return token;
};

// Admin JWT Authorization
passport.use(
  "admin-jwt",
  new JwtStrategy(
    {
      jwtFromRequest: adminCookieExtractor,
      secretOrKey: process.env.PASPORTJS_KEY,

    },
    (payload, done) => {
      Users.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

// User JWT Authorization
passport.use(
  "user-jwt",
  new JwtStrategy(
    {
      jwtFromRequest: webCookieExtractor,
      secretOrKey: process.env.PASPORTJS_KEY,
    },
    (payload, done) => {
      Customer.findById({ _id: payload.sub, isActive: true }, (err, user) => {
        if (err) {
          return done(err, false, { message: 'correct username or password.' });
        };

        if (user) {
          return done(null, user, { message: 'correct username or password.' });
        } else {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
      });
    }
  )
);

// Admin Authentication password local strategy using username and password
passport.use(
  "admin-local",
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      //something went wrong databese error
      if (err) return done(err);

      //if no user error exits
      if (!user) return done(null, false);
      user.comparePassword(password, done);
    });
  })
);

// User Authentication password local strategy using email and password
passport.use('user-local',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, (email, password, done) => {
    Customer.findOne({ $or: [{ email }, { origPhoneInput: email }], isActive: true }, (err, user) => {
      //something went wrong databese error
      if (err) return done(err);

      //if no user error exits
      if (!user) return done(null, false);
      user.comparePassword(password, done);
    });
  })
);

passport.use(new AnonymousStrategy());
