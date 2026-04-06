const router = require("express").Router();
let Settings = require("../models/settings.model");
let SettingsController = require("../controllers/settings");


/**
 * @swagger
 * /settingspublic:
 *   get:
 *     summary: Get public settings
 *     tags: [Public Settings]
 *     responses:
 *       200:
 *         description: Success
 */
// get all items
router.route("/").get(SettingsController.getAllPublic);

module.exports = router;
