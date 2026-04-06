const router = require("express").Router();
const passport = require("passport");
let HomeMenuController = require("../controllers/homemenu");



/**
 * @swagger
 * /homemenu/public:
 *   post:
 *     summary: Get public home menu
 *     tags: [HomeMenu]
 */
// update data by id
router
  .route("/public")
  .post(HomeMenuController.getPublicMenu);


  /**
 * @swagger
 * /homemenu:
 *   get:
 *     summary: Get all home menu items (admin)
 *     tags: [HomeMenu]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), HomeMenuController.getAll);


  /**
 * @swagger
 * /homemenu/counts:
 *   get:
 *     summary: Get home menu count
 *     tags: [HomeMenu]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/counts/")
  .get(passport.authenticate("admin-jwt", { session: false }),HomeMenuController.counts);


  /**
 * @swagger
 * /homemenu/add:
 *   post:
 *     summary: Add or update home menu item
 *     tags: [HomeMenu]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), HomeMenuController.addEdit);


  /**
 * @swagger
 * /homemenu/{id}:
 *   get:
 *     summary: Get home menu item by ID
 *     tags: [HomeMenu]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), HomeMenuController.getById);


 /**
 * @swagger
 * /homemenu/{id}:
 *   delete:
 *     summary: Delete home menu item
 *     tags: [HomeMenu]
 *     security:
 *       - bearerAuth: []
 */ 
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), HomeMenuController.deleteById);


  /**
 * @swagger
 * /homemenu/{id}:
 *   post:
 *     summary: Update home menu item
 *     tags: [HomeMenu]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), HomeMenuController.addEdit);

module.exports = router;
