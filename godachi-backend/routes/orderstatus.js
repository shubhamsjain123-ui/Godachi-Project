const router = require("express").Router();
const passport = require("passport");
let Orderstatus = require("../models/orderstatus.model");
let OrderstatusController = require("../controllers/orderstatus");

const title = "Order Status";
const roleTitle = "orderstatus";

/**
 * @swagger
 * /orderstatus/return:
 *   get:
 *     summary: Get all return order statuses
 *     tags: [Order Status]
 *     security:
 *       - bearerAuth: []
 */
// return status
router
  .route("/return")
  .get(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.getAllReturnStatus);
 

  /**
 * @swagger
 * /orderstatus:
 *   get:
 *     summary: Get all order statuses
 *     tags: [Order Status]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.getAll);


  /**
 * @swagger
 * /orderstatus/add:
 *   post:
 *     summary: Add order status
 *     tags: [Order Status]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.add);


  /**
 * @swagger
 * /orderstatus/{id}:
 *   get:
 *     summary: Get order status by ID
 *     tags: [Order Status]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.getById);

  /**
 * @swagger
 * /orderstatus/{id}:
 *   delete:
 *     summary: Delete order status
 *     tags: [Order Status]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.deleteById);


  /**
 * @swagger
 * /orderstatus/{id}:
 *   post:
 *     summary: Update order status
 *     tags: [Order Status]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.update);

module.exports = router;
