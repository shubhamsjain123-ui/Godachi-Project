const router = require("express").Router();
const passport = require("passport");
let Basket = require("../models/basket.model");
let BasketController = require("../controllers/basket");
let Products = require("../models/products.model");

const title = "Basket";
const roleTitle = "basket";


/**
 * @swagger
 * /basket:
 *   get:
 *     summary: Get all basket items
 *     tags: [Basket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("user-jwt", { session: false }), BasketController.getAll);


/**
 * @swagger
 * /basket/add:
 *   post:
 *     summary: Add item to basket
 *     tags: [Basket]
 *     security:
 *       - bearerAuth: []
 */


// post new items
router
  .route("/add")
  .post(passport.authenticate("user-jwt", { session: false }), BasketController.add);


  /**
 * @swagger
 * /basket/allproducts:
 *   post:
 *     summary: Get all basket products
 *     tags: [Basket]
 */

// all basket items
router.route("/allproducts").post(BasketController.allproducts);


/**
 * @swagger
 * /basket/buildBasket:
 *   post:
 *     summary: Build basket
 *     tags: [Basket]
 *     security:
 *       - bearerAuth: []
 */

// build basket
router.route("/buildBasket").post(passport.authenticate(["user-jwt", "anonymous"], { session: false }), BasketController.buildBasket);


/**
 * @swagger
 * /basket/mergeBasket:
 *   post:
 *     summary: Merge basket
 *     tags: [Basket]
 *     security:
 *       - bearerAuth: []
 */
//merge basket
router.route("/mergeBasket").post(passport.authenticate("user-jwt", { session: false }), BasketController.mergeBasket);

/**
 * @swagger
 * /basket/{id}:
 *   get:
 *     summary: Get basket item by ID
 *     tags: [Basket]
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
  .get(passport.authenticate("user-jwt", { session: false }), BasketController.getId);


  /**
 * @swagger
 * /basket/customer/{id}:
 *   get:
 *     summary: Get basket by customer ID
 *     tags: [Basket]
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
  .route("/customer/:id")
  .get(passport.authenticate("user-jwt", { session: false }), BasketController.getCustomerId);


 


  /**
 * @swagger
 * /basket/customer:
 *   post:
 *     summary: Add basket by customer
 *     tags: [Basket]
 *     security:
 *       - bearerAuth: []
 */
// update data by customer id
router
  .route("/customer")
  .post(passport.authenticate("user-jwt", { session: false }), BasketController.addCustomerId);


  /**
 * @swagger
 * /basket/customerUpdate:
 *   post:
 *     summary: Update customer basket
 *     tags: [Basket]
 *     security:
 *       - bearerAuth: []
 */
// update data by customer id
router
  .route("/customerUpdate")
  .post(passport.authenticate("user-jwt", { session: false }), BasketController.updateCustomerCart);

  /**
 * @swagger
 * /basket/{id}:
 *   delete:
 *     summary: Delete basket item
 *     tags: [Basket]
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
  .delete(passport.authenticate("user-jwt", { session: false }), BasketController.deleteId);

  /**
 * @swagger
 * /basket/{id}:
 *   post:
 *     summary: Update basket item
 *     tags: [Basket]
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
  .post(passport.authenticate("user-jwt", { session: false }), BasketController.update);

module.exports = router;
