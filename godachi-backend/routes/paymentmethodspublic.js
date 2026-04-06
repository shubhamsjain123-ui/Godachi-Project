const router = require("express").Router();
let Paymentmethods = require("../models/paymentmethods.model");
let PaymentmethodsController = require("../controllers/paymentmethods");



/**
 * @swagger
 * /paymentmethods:
 *   get:
 *     summary: Get all payment methods (public)
 *     tags: [Payment Methods]
 */
// get all items
router.route("/").get(PaymentmethodsController.getAllPublic);

/**
 * @swagger
 * /paymentmethods/{id}:
 *   get:
 *     summary: Get payment method by ID (public)
 *     tags: [Payment Methods]
 */
router.route("/:id").get(PaymentmethodsController.getByIdPublic);

module.exports = router;
