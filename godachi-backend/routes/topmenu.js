const router = require("express").Router();
const passport = require("passport");
let Topmenu = require("../models/topmenu.model");
let TopmenuController = require("../controllers/topmenu");

const title = "Top Menu";
const roleTitle = "topmenu";


/**
 * @swagger
 * /topmenu:
 *   get:
 *     summary: Get all top menu items
 *     tags: [Topmenu]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }),TopmenuController.getAll);


  /**
 * @swagger
 * /topmenu/add:
 *   post:
 *     summary: Add top menu item
 *     tags: [Topmenu]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), TopmenuController.add);


  /**
 * @swagger
 * /topmenu/active/{id}:
 *   post:
 *     summary: Update active status of top menu
 *     tags: [Topmenu]
 *     security:
 *       - bearerAuth: []
 */
// update active data by id
router
  .route("/active/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), TopmenuController.updateActive);


  /**
 * @swagger
 * /topmenu/{id}:
 *   get:
 *     summary: Get top menu item by ID
 *     tags: [Topmenu]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), TopmenuController.getById);



  /**
 * @swagger
 * /topmenu/{id}:
 *   delete:
 *     summary: Delete top menu item
 *     tags: [Topmenu]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), TopmenuController.deleteById);


/**
 * @swagger
 * /topmenu/{id}:
 *   post:
 *     summary: Update top menu item
 *     tags: [Topmenu]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), TopmenuController.update);

module.exports = router;
