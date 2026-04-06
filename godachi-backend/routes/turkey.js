const router = require("express").Router();
let Turkey = require("../models/turkey.model");
let TurkeyController = require("../controllers/turkey");


/**
 * @swagger
 * /turkey:
 *   get:
 *     summary: Get all turkey data
 *     tags: [Turkey]
 *     responses:
 *       200:
 *         description: Success
 */
// get all items
router.route("/").get(TurkeyController.getAll);


/**
 * @swagger
 * /turkey/{id}:
 *   get:
 *     summary: Get turkey by ID
 *     tags: [Turkey]
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
router.route("/:id").get(TurkeyController.getById);

module.exports = router;
