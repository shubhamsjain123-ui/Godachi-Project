const router = require("express").Router();
let FilterMasterController = require("../controllers/filterMaster");

// get all items

/**
 * @swagger
 * /filterMaster/web:
 *   post:
 *     summary: Get web filter master data
 *     tags: [FilterMaster]
 */
router.route("/web").post(FilterMasterController.getWebMaster);

/**
 * @swagger
 * /filterMaster/app:
 *   post:
 *     summary: Get app filter master data
 *     tags: [FilterMaster]
 */
router.route("/app").post(FilterMasterController.getAppMaster);

/**
 * @swagger
 * /filterMaster/adminFilterList:
 *   post:
 *     summary: Get admin filter list
 *     tags: [FilterMaster]
 */
router.route("/adminFilterList").post(FilterMasterController.adminFilterList);

/**
 * @swagger
 * /filterMaster/adminProductFilters:
 *   post:
 *     summary: Get admin product filters
 *     tags: [FilterMaster]
 */
router.route("/adminProductFilters").post(FilterMasterController.adminProductFilters);

module.exports = router;
