const router = require("express").Router();
let Topmenu = require("../models/topmenu.model");
let TopmenuController = require("../controllers/topmenu");



/**
 * @swagger
 * /topmenupublic/{id}:
 *   get:
 *     summary: Get top menu by ID (public)
 *     tags: [Public Topmenu]
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
// get all items
router.route("/:id").get(TopmenuController.getPublic);

module.exports = router;
