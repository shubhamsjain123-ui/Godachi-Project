const router = require("express").Router();
const passport = require("passport");
let Users = require("../models/users.model");
let CustomerController = require("../controllers/customers");

const title = "User";
const roleTitle = "customers";
const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 10;



/**
 * @swagger
 * /customerspublic/updatePasswordCustomer:
 *   post:
 *     summary: Update customer password (user)
 *     tags: [Customers Public]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/updatePasswordCustomer",
  passport.authenticate("user-jwt", { session: false }),
  CustomerController.updatePasswordCustomerPublic
);


/**
 * @swagger
 * /customerspublic/address:
 *   post:
 *     summary: Add address (public user)
 *     tags: [Customers Public]
 *     security:
 *       - bearerAuth: []
 */
// add address
router
  .route("/address")
  .post(passport.authenticate("user-jwt", { session: false }),CustomerController.addAddressPublic );

module.exports = router;
