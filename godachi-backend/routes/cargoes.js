const router = require("express").Router();
const passport = require("passport");
let Cargoes = require("../models/cargoes.model");
let CargoesController = require("../controllers/cargoes");

const title = "Cargoes";
const roleTitle = "cargoes";

/**
 * @swagger
 * /cargoes:
 *   get:
 *     summary: Get all cargoes
 *     tags: [Cargoes]
 *     security:
 *       - bearerAuth: []
 */

// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), CargoesController.getAll);

  /**
 * @swagger
 * /cargoes/add:
 *   post:
 *     summary: Add new cargo
 *     tags: [Cargoes]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), CargoesController.add);

  /**
 * @swagger
 * /cargoes/{id}:
 *   get:
 *     summary: Get cargo by ID
 *     tags: [Cargoes]
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
  .get(passport.authenticate("admin-jwt", { session: false }), CargoesController.getById);


  /**
 * @swagger
 * /cargoes/{id}:
 *   delete:
 *     summary: Delete cargo
 *     tags: [Cargoes]
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
  .delete(passport.authenticate("admin-jwt", { session: false }), CargoesController.deleteById);


  /**
 * @swagger
 * /cargoes/{id}:
 *   post:
 *     summary: Update cargo
 *     tags: [Cargoes]
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
  .post(passport.authenticate("admin-jwt", { session: false }), CargoesController.update);

module.exports = router;
