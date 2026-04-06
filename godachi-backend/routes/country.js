const router = require("express").Router();
let Country = require("../models/country.model");
let CountryController = require("../controllers/country");


/**
 * @swagger
 * /country:
 *   get:
 *     summary: Get all countries
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: Success
 */
// get all items
router.route("/").get(CountryController.getAll);


/**
 * @swagger
 * /country/{id}:
 *   get:
 *     summary: Get country by ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
// get item
router.route("/:id").get(CountryController.getById);

module.exports = router;
