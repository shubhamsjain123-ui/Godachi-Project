const router = require("express").Router();
const passport = require("passport");
let Orderstatus = require("../models/orderReturnStatus.model");
let OrderstatusController = require("../controllers/orderreturnstatus");

const title = "Order Status";
const roleTitle = "orderstatus";


/**
 * @swagger
 * /returnstatus:
 *   get:
 *     summary: Get all order return statuses
 *     tags: [Order Return Status]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.getAll);


  /**
 * @swagger
 * /returnstatus/add:
 *   post:
 *     summary: Add order return status
 *     tags: [Order Return Status]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.add);



  /**
 * @swagger
 * /returnstatus/{id}:
 *   get:
 *     summary: Get order return status by ID
 *     tags: [Order Return Status]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.getById);


  /**
 * @swagger
 * /returnstatus/{id}:
 *   delete:
 *     summary: Delete order return status
 *     tags: [Order Return Status]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.deleteById);


  /**
 * @swagger
 * /returnstatus/{id}:
 *   post:
 *     summary: Update order return status
 *     tags: [Order Return Status]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrderstatusController.update);

module.exports = router;
