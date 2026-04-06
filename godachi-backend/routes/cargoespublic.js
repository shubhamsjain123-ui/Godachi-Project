const router = require("express").Router();
let Cargoes = require("../models/cargoes.model");
let CargoesController = require("../controllers/cargoes");


/**
 * @swagger
 * /cargoespublic:
 *   get:
 *     summary: Get all public cargoes
 *     tags: [Public Cargoes]
 *     responses:
 *       200:
 *         description: Success
 */
// get all items
router.route("/").get(CargoesController.getPublic);

module.exports = router;
