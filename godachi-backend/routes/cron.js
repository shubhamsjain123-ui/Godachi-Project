const router = require("express").Router();
let CronJobsController = require("../controllers/cronJobs");



/**
 * @swagger
 * /cron/updateProductPrice:
 *   get:
 *     summary: Update product prices (cron job)
 *     tags: [Cron]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/updateProductPrice",CronJobsController.updateProductPriceController);

/**
 * @swagger
 * /cron/updateTrackingStatus:
 *   get:
 *     summary: Update tracking status (cron job)
 *     tags: [Cron]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/updateTrackingStatus",CronJobsController.updateTrackingStatus);

module.exports = router;