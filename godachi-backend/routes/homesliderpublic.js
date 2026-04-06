const router = require("express").Router();
let Homeslider = require("../models/homeslider.model");
let HomesliderController = require("../controllers/homeslider");

// get all items

/**
 * @swagger
 * /homesliderpublic:
 *   get:
 *     summary: Get all public home slider data
 *     tags: [HomeSlider Public]
 */
router.route("/").get(HomesliderController.getAllPublic);

/**
 * @swagger
 * /homesliderpublic/app:
 *   get:
 *     summary: Get app home page sliders
 *     tags: [HomeSlider Public]
 */
router.route("/app").get(HomesliderController.getAppHomePage);

/**
 * @swagger
 * /homesliderpublic/web:
 *   get:
 *     summary: Get web home page sliders
 *     tags: [HomeSlider Public]
 */
router.route("/web").get(HomesliderController.getWebHomePage);

module.exports = router;
