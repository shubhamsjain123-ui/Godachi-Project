const router = require("express").Router();
let Brands = require("../models/brands.model");
let BrandsController = require("../controllers/brands");


/**
 * @swagger
 * /brandspublic:
 *   get:
 *     summary: Get all public brands
 *     tags: [Public Brands]
 *     responses:
 *       200:
 *         description: Success
 */
// get all items
router.route("/").get(BrandsController.getPublic);

module.exports = router;
