const router = require("express").Router();
const passport = require("passport");
let OffersController = require("../controllers/offers");


/**
 * @swagger
 * /offers/getActiveOffers:
 *   get:
 *     summary: Get all active offers (public)
 *     tags: [Offers]
 */
// get all items
router
  .route("/getActiveOffers")
  .get(OffersController.getActiveOffers);

  /**
 * @swagger
 * /offers:
 *   get:
 *     summary: Get all offers (admin)
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), OffersController.getAll);


  /**
 * @swagger
 * /offers/add:
 *   post:
 *     summary: Add or update offer
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), OffersController.addEdit);


  /**
 * @swagger
 * /offers/counts:
 *   get:
 *     summary: Get offers count/statistics
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/counts/")
  .get(passport.authenticate("admin-jwt", { session: false }), OffersController.counts);

  /**
 * @swagger
 * /offers/{id}:
 *   get:
 *     summary: Get offer by ID
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), OffersController.getById);


  /**
 * @swagger
 * /offers/status/{id}:
 *   get:
 *     summary: Get offer status
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/status/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), OffersController.getStatus);


  /**
 * @swagger
 * /offers/{id}:
 *   delete:
 *     summary: Delete offer
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), OffersController.deleteById);


  /**
 * @swagger
 * /offers/{id}:
 *   post:
 *     summary: Update offer
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OffersController.update);


  module.exports = router;
