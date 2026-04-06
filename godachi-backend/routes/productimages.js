const router = require("express").Router();
const passport = require("passport");
let Productimages = require("../models/productimages.model");
let ProductimagesController = require("../controllers/productimages");

const title = "Product Images";
const roleTitle = "productimages";

/**
 * @swagger
 * /productimages:
 *   get:
 *     summary: Get all product images
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductimagesController.getAll);


  /**
 * @swagger
 * /productimages/add:
 *   post:
 *     summary: Add product image
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductimagesController.add);


  /**
 * @swagger
 * /productimages/statistic:
 *   get:
 *     summary: Get product images statistics
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 */
//group name statistic
router
  .route("/statistic")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductimagesController.statistic);


  /**
 * @swagger
 * /productimages/{id}:
 *   get:
 *     summary: Get product image by ID
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductimagesController.getById);

  /**
 * @swagger
 * /productimages/{id}:
 *   delete:
 *     summary: Delete product image
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), ProductimagesController.deleteById);


  /**
 * @swagger
 * /productimages/{id}:
 *   post:
 *     summary: Update product image
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductimagesController.update);

module.exports = router;
