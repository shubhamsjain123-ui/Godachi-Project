const router = require("express").Router();
const passport = require("passport");
let Variants = require("../models/variants.model");
let VariantsController = require("../controllers/variants");

const title = "Variants";
const roleTitle = "variants";


/**
 * @swagger
 * /variants:
 *   get:
 *     summary: Get all variants
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), VariantsController.getAll);


/**
 * @swagger
 * /variants/add:
 *   post:
 *     summary: Add variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), VariantsController.add);



  /**
 * @swagger
 * /variants/{id}:
 *   get:
 *     summary: Get variant by ID
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), VariantsController.getById);


  /**
 * @swagger
 * /variants/{id}:
 *   delete:
 *     summary: Delete variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), VariantsController.deleteById);


  /**
 * @swagger
 * /variants/{id}:
 *   post:
 *     summary: Update variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router    
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), VariantsController.update);

module.exports = router;
