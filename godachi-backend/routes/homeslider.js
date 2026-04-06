const router = require("express").Router();
const passport = require("passport");
let Homeslider = require("../models/homeslider.model");
let HomesliderController = require("../controllers/homeslider");

const title = "Home Slider";
const roleTitle = "homeslider";


/**
 * @swagger
 * /homeslider/getBanner/{device}/{section}:
 *   get:
 *     summary: Get banners by device and section
 *     tags: [HomeSlider]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/getBanner/:device/:section")
  .get(passport.authenticate("admin-jwt", { session: false }), HomesliderController.getBanner);

/**
 * @swagger
 * /homeslider/addBanner/{device}/{section}:
 *   post:
 *     summary: Add banner by device and section
 *     tags: [HomeSlider]
 *     security:
 *       - bearerAuth: []
 */

// get all items
router
.route("/addBanner/:device/:section")
.post(passport.authenticate("admin-jwt", { session: false }), HomesliderController.addBanner);


/**
 * @swagger
 * /homeslider:
 *   get:
 *     summary: Get all home slider items
 *     tags: [HomeSlider]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), HomesliderController.getAll);


  /**
 * @swagger
 * /homeslider:
 *   get:
 *     summary: Get all home slider items
 *     tags: [HomeSlider]
 *     security:
 *       - bearerAuth: []
 */
// update active data by id
router
  .route("/active/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), HomesliderController.updateActive);



  /**
 * @swagger
 * /homeslider/add:
 *   post:
 *     summary: Add new home slider item
 *     tags: [HomeSlider]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), HomesliderController.add);


  /**
 * @swagger
 * /homeslider/{id}:
 *   get:
 *     summary: Get home slider item by ID
 *     tags: [HomeSlider]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), HomesliderController.getById);


  /**
 * @swagger
 * /homeslider/{id}:
 *   get:
 *     summary: Get home slider item by ID
 *     tags: [HomeSlider]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), HomesliderController.deleteById);


  /**
 * @swagger
 * /homeslider/{id}:
 *   post:
 *     summary: Update home slider item
 *     tags: [HomeSlider]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), HomesliderController.update);

module.exports = router;
