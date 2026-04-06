const router = require("express").Router();
const passport = require("passport");
let Brands = require("../models/brands.model");
let BrandsController = require("../controllers/brands");

const title = "Brands";
const roleTitle = "brands";


/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 */

// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }),BrandsController.getAll);


  /**
 * @swagger
 * /brands/active/{id}:
 *   post:
 *     summary: Update brand active status
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
// update active data by id
router
  .route("/active/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), BrandsController.updateActive);


  /**
 * @swagger
 * /brands/add:
 *   post:
 *     summary: Add new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), BrandsController.add);


  /**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get brand by ID
 *     tags: [Brands]
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
  .get(passport.authenticate("admin-jwt", { session: false }), BrandsController.getId);


  /**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete brand
 *     tags: [Brands]
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
  .delete(passport.authenticate("admin-jwt", { session: false }), BrandsController.deleteId);


  /**
 * @swagger
 * /brands/{id}:
 *   post:
 *     summary: Update brand
 *     tags: [Brands]
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
  .post(passport.authenticate("admin-jwt", { session: false }), BrandsController.update);

module.exports = router;
