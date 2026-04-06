const router = require("express").Router();
const passport = require("passport");
const WebhookController = require("../controllers/webhook");
const PhonePeController = require("../controllers/phonepe");

/**
 * @swagger
 * /webhook/phonepe:
 *   post:
 *     summary: Handle PhonePe webhook response
 *     tags: [Webhook]
 *     responses:
 *       200:
 *         description: Webhook received successfully
 */
// update data by id
router.route("/phonepe").post(WebhookController.addPhonepeResponse);

module.exports = router;
