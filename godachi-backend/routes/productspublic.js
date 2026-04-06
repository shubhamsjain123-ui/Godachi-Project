const router = require("express").Router();
const mongoose = require("mongoose");
let Products = require("../models/products.model");
let ProductsController = require("../controllers/products");
const passport = require("passport");

// get all items
/**
 * @swagger
 * /productspublic/all:
 *   get:
 *     summary: Get all products (public)
 *     tags: [Products]
 */
router.route("/all").get(ProductsController.getAllPublic);

/**
 * @swagger
 * /productspublic/getSearchResult:
 *   post:
 *     summary: Get product search results
 *     tags: [Products]
 */
router.route("/getSearchResult").post(ProductsController.getSearchResult);

/**
 * @swagger
 * /productspublic/getAllReviews/{productId}:
 *   get:
 *     summary: Get all reviews of a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router.route("/getAllReviews/:productId").get(passport.authenticate(["user-jwt", "anonymous"], { session: false }),ProductsController.getAllReviews);

/**
 * @swagger
 * /productspublic/{seo}:
 *   get:
 *     summary: Get product details by SEO slug
 *     tags: [Products]
 */
router.route("/:seo").get(ProductsController.getSeoPublic);

/**
 * @swagger
 * /productspublic/home:
 *   post:
 *     summary: Get home page products data
 *     tags: [Products]
 */
router.route("/home").post(ProductsController.homePublic);


/**
 * @swagger
 * /productspublic:
 *   post:
 *     summary: Get products with filters
 *     tags: [Products]
 */
router.route("/").post(ProductsController.getPublic);

module.exports = router;
