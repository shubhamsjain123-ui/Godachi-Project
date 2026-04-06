const express = require("express");
const router = express.Router();
const Users = require("../models/users.model");
const StaffController = require("../controllers/staff");
const passport = require("passport");

const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 10;

const title = "Staff";


/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Get all staff members
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), StaffController.getAll);


  /**
 * @swagger
 * /staff/add:
 *   post:
 *     summary: Add new staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), StaffController.add);


  /**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get staff by ID
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), StaffController.getById);


  /**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Delete staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), StaffController.deleteById);



  /**
 * @swagger
 * /staff/updatePasswordSuperadmin:
 *   post:
 *     summary: Update password for superadmin
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/updatePasswordSuperadmin",
  passport.authenticate("admin-jwt", { session: false }),
  StaffController.updatePasswordSuperadmin
);


/**
 * @swagger
 * /staff/updatePasswordCustomer:
 *   post:
 *     summary: Update password for customer
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 */
/// Update password customer
router.post(
  "/updatePasswordCustomer",
  passport.authenticate("user-jwt", { session: false }),
  StaffController.updatePasswordCustomer
);


/**
 * @swagger
 * /staff/{id}:
 *   post:
 *     summary: Update staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), StaffController.update);


  /**
 * @swagger
 * /staff/add/register1231223123123:
 *   post:
 *     summary: Register staff (public/test endpoint)
 *     tags: [Staff]
 */
// post new items
router.route("/add/register1231223123123").post(StaffController.register);

module.exports = router;
