const router = require("express").Router();
const passport = require("passport");
let Settings = require("../models/settings.model");
let SettingsController = require("../controllers/settings");

const title = "Settings";


/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get all settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), SettingsController.getAll);


  /**
 * @swagger
 * /settings/{id}:
 *   get:
 *     summary: Get setting by ID
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), SettingsController.getById);


  /**
 * @swagger
 * /settings/{id}:
 *   post:
 *     summary: Update setting
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), SettingsController.update);

module.exports = router;
