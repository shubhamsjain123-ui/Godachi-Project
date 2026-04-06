const router = require("express").Router();
let Categories = require("../models/categories.model");
let CategoriesController = require("../controllers/categories");

// get all items

/**
 * @swagger
 * /categoriespublic/app:
 *   get:
 *     summary: Get app categories
 *     tags: [Public Categories]
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/app").get(CategoriesController.getAppCategories);

/**
 * @swagger
 * /categoriespublic/web:
 *   get:
 *     summary: Get web categories
 *     tags: [Public Categories]
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/web").get(CategoriesController.getWebCategories);

/**
 * @swagger
 * /categoriespublic/{id}:
 *   get:
 *     summary: Get category by ID (public)
 *     tags: [Public Categories]
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
router.route("/:id").get(CategoriesController.getPublic);

module.exports = router;
