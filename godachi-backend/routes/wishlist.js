const router = require("express").Router();
const passport = require("passport");
let WishlistController = require("../controllers/wishlist");


/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get all wishlist items
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

// get all items
router
  .route("/")
  .get(passport.authenticate("user-jwt", { session: false }), WishlistController.getAll);


  /**
 * @swagger
 * /wishlist/add:
 *   post:
 *     summary: Add item to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Item added
 */

// post new items
router
  .route("/add")
  .post(passport.authenticate("user-jwt", { session: false }), WishlistController.add);



 /**
 * @swagger
 * /wishlist/allproducts:
 *   post:
 *     summary: Get all wishlist products
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         description: Success
 */ 

// all wishlist items
router.route("/allproducts").post(WishlistController.allproducts);

/**
* @swagger
 * /wishlist/{id}:
 *   get:
 *     summary: Get wishlist item by ID
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */

// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("user-jwt", { session: false }), WishlistController.getId);



  /**
 * @swagger
 * /wishlist/customer/{id}:
 *   get:
 *     summary: Get wishlist by customer ID
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
// fetch data by id
router
  .route("/customer/:id")
  .get(passport.authenticate("user-jwt", { session: false }), WishlistController.getCustomerId);


  /**
 * @swagger
 * /wishlist/customer:
 *   post:
 *     summary: Add wishlist by customer
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

// update data by customer id
router
  .route("/customer")
  .post(passport.authenticate("user-jwt", { session: false }), WishlistController.addCustomerId);



  /**
 * @swagger
 * /wishlist/{variantId}:
 *   delete:
 *     summary: Delete wishlist item
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */

// delete data by id
router
  .route("/:variantId")
  .delete(passport.authenticate("user-jwt", { session: false }), WishlistController.deleteVariantId);


 /**
 * @swagger
 * /wishlist/{id}:
 *   post:
 *     summary: Update wishlist item
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated
 */ 

// update data by id
router
  .route("/:id")
  .post(passport.authenticate("user-jwt", { session: false }), WishlistController.update);

module.exports = router;
