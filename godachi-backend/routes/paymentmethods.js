const router = require("express").Router();
const passport = require("passport");
let Paymentmethods = require("../models/paymentmethods.model");
let PaymentmethodsController = require("../controllers/paymentmethods");

const title = "Payment Methods";
const roleTitle = "paymentmethods";

/**
 * @swagger
 * /paymentmethods:
 *   get:
 *     summary: Get all payment methods (admin)
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), PaymentmethodsController.getAll);


  /**
 * @swagger
 * /paymentmethods/add:
 *   post:
 *     summary: Add payment method
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), PaymentmethodsController.add);

  /**
 * @swagger
 * /paymentmethods/{id}:
 *   get:
 *     summary: Get payment method by ID (admin)
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), PaymentmethodsController.getById);

  /**
 * @swagger
 * /paymentmethods/{id}:
 *   delete:
 *     summary: Delete payment method
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), PaymentmethodsController.deleteById);

  /**
 * @swagger
 * /paymentmethods/active/{id}:
 *   post:
 *     summary: Update payment method active status
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 */
// update active data by id
router
  .route("/active/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), PaymentmethodsController.updateActive);


  /**
 * @swagger
 * /paymentmethods/active/{id}:
 *   post:
 *     summary: Update payment method active status
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), PaymentmethodsController.update);

module.exports = router;
