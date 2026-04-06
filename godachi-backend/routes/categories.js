const router = require("express").Router();
const passport = require("passport");
let Categories = require("../models/categories.model");
let CategoriesController = require("../controllers/categories");

const title = "Categories";
const roleTitle = "categories";



/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), CategoriesController.getAll);


  /**
 * @swagger
 * /categories/counts:
 *   get:
 *     summary: Get categories count
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/counts/")
  .get(passport.authenticate("admin-jwt", { session: false }),CategoriesController.counts);


  /**
 * @swagger
 * /categories/add:
 *   post:
 *     summary: Add new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), CategoriesController.add);


  /**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), CategoriesController.getById);


  /**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), CategoriesController.deleteById);


  /**
 * @swagger
 * /categories/{id}:
 *   post:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), CategoriesController.update);

module.exports = router;
