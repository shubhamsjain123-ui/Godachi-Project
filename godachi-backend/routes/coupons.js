const router = require("express").Router();
const passport = require("passport");
let CouponsController = require("../controllers/coupons");



/**
 * @swagger
 * /coupons/getAvailableCodes:
 *   get:
 *     summary: Get available coupon codes for user
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */
//get user available code
router.route("/getAvailableCodes").get(passport.authenticate(["user-jwt", "anonymous"], { session: false }),CouponsController.getAvailableCodes);

/**
 * @swagger
 * /coupons/isCouponApplicable:
 *   post:
 *     summary: Check if coupon is applicable
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */
router.route("/isCouponApplicable").post(passport.authenticate(["user-jwt", "anonymous"], { session: false }),CouponsController.isCouponApplicable);



/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Get all coupons (admin)
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */

// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), CouponsController.getAll);


/**
 * @swagger
 * /coupons/add:
 *   post:
 *     summary: Add or edit coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), CouponsController.addEdit);


  /**
 * @swagger
 * /coupons/counts:
 *   get:
 *     summary: Get coupons count
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/counts/")
  .get(passport.authenticate("admin-jwt", { session: false }), CouponsController.counts);


  /**
 * @swagger
 * /coupons/checkCouponCodeAvailable:
 *   post:
 *     summary: Check if coupon code exists
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */
// checkCouponCodeAvailable
router
.route("/checkCouponCodeAvailable")
.post(passport.authenticate("admin-jwt", { session: false }), CouponsController.checkCouponCodeAvailable);


/**
 * @swagger
 * /coupons/status/{id}:
 *   get:
 *     summary: Get coupon status by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/status/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), CouponsController.getStatus);


  /**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Get coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), CouponsController.getById);


  /**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), CouponsController.deleteById);

  /**
 * @swagger
 * /coupons/{id}:
 *   post:
 *     summary: Update coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), CouponsController.update);


  module.exports = router;
