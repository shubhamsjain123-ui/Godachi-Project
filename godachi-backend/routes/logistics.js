const router = require("express").Router();
let LogisticsController = require("../controllers/logistics");



/**
 * @swagger
 * /logistics/checkPinCode:
 *   post:
 *     summary: Check delivery availability by pincode
 *     tags: [Logistics]
 */
router.post("/checkPinCode", LogisticsController.checkPinCode);

/**
 * @swagger
 * /logistics/checkPinCode:
 *   post:
 *     summary: Check delivery availability by pincode
 *     tags: [Logistics]
 */
router.get("/trackOrder/:wayBill", LogisticsController.trackOrder);

/**
 * @swagger
 * /logistics/trackOrder/{wayBill}:
 *   get:
 *     summary: Track order by waybill number
 *     tags: [Logistics]
 */
router.get("/printShipment/:wayBill", LogisticsController.printShipment);

/**
 * @swagger
 * /logistics/printShipment/{wayBill}:
 *   get:
 *     summary: Print shipment label
 *     tags: [Logistics]
 */
router.get("/printManifest/:wayBill", LogisticsController.printManifest);

module.exports = router;