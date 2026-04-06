const router = require("express").Router();
const passport = require("passport");
let ProductInventoryController = require("../controllers/productInventory");


/**
 * @swagger
 * /product-inventory:
 *   get:
 *     summary: Get all product inventory
 *     tags: [Product Inventory]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.getAll);


  /**
 * @swagger
 * /product-inventory/markImportant/{id}:
 *   post:
 *     summary: Mark inventory as important
 *     tags: [Product Inventory]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/markImportant/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.markImportant);

  /**
 * @swagger
 * /product-inventory/addNote/{id}:
 *   post:
 *     summary: Add note to inventory
 *     tags: [Product Inventory]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/addNote/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.addNote);

/**
 * @swagger
 * /product-inventory/add/{variant_id}:
 *   post:
 *     summary: Add inventory for a product variant
 *     tags: [Product Inventory]
 *     security:
 *       - bearerAuth: []
 */
  //add product inventory
router
  .route("/add/:variant_id")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.addInventory);


  /**
 * @swagger
 * /product-inventory/remove/{variant_id}:
 *   post:
 *     summary: Remove inventory for a product variant
 *     tags: [Product Inventory]
 *     security:
 *       - bearerAuth: []
 */
//remove product inventory
router
  .route("/remove/:variant_id")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.removeInventory);

  /**
 * @swagger
 * /product-inventory/{variant_id}:
 *   get:
 *     summary: Get all inventory transactions for a variant
 *     tags: [Product Inventory]
 *     security:
 *       - bearerAuth: []
 */
//get all transactions
router
.route("/:variant_id")
.get(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.getAllTransactions);

  
/* // post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.add);

router
  .route("/counts/")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.counts);

//group name statistic
router
  .route("/statistic")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.statistic);

// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.getById);

// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.deleteById);

// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), ProductInventoryController.update);


 */
module.exports = router;
