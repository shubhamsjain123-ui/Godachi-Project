const router = require("express").Router();
const passport = require("passport");
let Products = require("../models/products.model");
let ProductsController = require("../controllers/products");

const title = "Products";
const roleTitle = "products";


/**
 * @swagger
 * /products/postReview/{productId}:
 *   post:
 *     summary: Post review for a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// post product review
router
.route("/postReview/:productId")
.post(passport.authenticate("user-jwt", { session: false }), ProductsController.postReview);



/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductsController.getAll);


/**
 * @swagger
 * /products/changeApproval/{id}/{state}:
 *   post:
 *     summary: Change product approval status
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// chang product approval
router
.route("/changeApproval/:id/:state")
.post(passport.authenticate("admin-jwt", { session: false }), ProductsController.changeProductApproval);


/**
 * @swagger
 * /products/changeActive/{id}/{state}:
 *   post:
 *     summary: Change product active status
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// chang product active
router
.route("/changeActive/:id/:state")
.post(passport.authenticate("admin-jwt", { session: false }), ProductsController.changeProductActive);


/**
 * @swagger
 * /products/offerSearch:
 *   post:
 *     summary: Search products for offers
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// checkProductCodeAvailable
router
.route("/offerSearch")
.post(passport.authenticate("admin-jwt", { session: false }), ProductsController.offerSearchProducts);


/**
 * @swagger
 * /products/checkProductCodeAvailable:
 *   post:
 *     summary: Check if product code is available
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// checkProductCodeAvailable
router
.route("/checkProductCodeAvailable")
.post(passport.authenticate("admin-jwt", { session: false }), ProductsController.checkProductCodeAvailable);


/**
 * @swagger
 * /products/checkProductSeoAvailable:
 *   post:
 *     summary: Check if product SEO slug is available
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// checkProductSeoAvailable
router
.route("/checkProductSeoAvailable")
.post(passport.authenticate("admin-jwt", { session: false }), ProductsController.checkProductSeoAvailable);


/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductsController.add);


  /**
 * @swagger
 * /products/counts:
 *   get:
 *     summary: Get products count
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/counts/")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductsController.counts);


  /**
 * @swagger
 * /products/statistic:
 *   get:
 *     summary: Get product statistics
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
//group name statistic
router
  .route("/statistic")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductsController.statistic);



  /**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductsController.getById);


  /**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), ProductsController.deleteById);


  /**
 * @swagger
 * /products/{id}:
 *   post:
 *     summary: Update product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductsController.update);



module.exports = router;
