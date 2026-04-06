const router = require("express").Router();
const passport = require("passport");
let ReportingController = require("../controllers/reporting");

/**
 * @swagger
 * /reporting/topSellingProducts:
 *   post:
 *     summary: Get top selling products
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */

router.post(
            "/topSellingProducts", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.topSellingProducts
        );
 
        
/**
 * @swagger
 * /reporting/topReturnedProducts:
 *   post:
 *     summary: Get top returned products
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/topReturnedProducts", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.topReturnedProducts
        );


        /**
 * @swagger
 * /reporting/categorywiseProducts:
 *   post:
 *     summary: Get products grouped by category
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/categorywiseProducts", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.categorywiseProducts
        );


/**
 * @swagger
 * /reporting/metalwiseProducts:
 *   post:
 *     summary: Get products grouped by metal
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/metalwiseProducts", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.metalwiseProducts
        );

/**
 * @swagger
 * /reporting/stonewiseProducts:
 *   post:
 *     summary: Get products grouped by stone
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/stonewiseProducts", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.stonewiseProducts
        );

        /**
 * @swagger
 * /reporting/averageOrderValue:
 *   post:
 *     summary: Get average order value
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/averageOrderValue", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.averageOrderValue
        );

        /**
 * @swagger
 * /reporting/productStats:
 *   post:
 *     summary: Get product statistics
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/productStats", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.productStats
        );

/**
 * @swagger
 * /reporting/orderStats:
 *   post:
 *     summary: Get order statistics
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/orderStats", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.orderStats
        );

/**
 * @swagger
 * /reporting/totalRevenue:
 *   post:
 *     summary: Get total revenue
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/totalRevenue", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.totalRevenue
        );
/**
 * @swagger
 * /reporting/monthlyTransactions:
 *   post:
 *     summary: Get monthly transactions
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/monthlyTransactions", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.monthlyTransactions
        );
  
/**
 * @swagger
 * /reporting/dailyTransactions:
 *   post:
 *     summary: Get daily transactions
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/dailyTransactions", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.dailyTransactions
        );
/**
 * @swagger
 * /reporting/customerStats:
 *   post:
 *     summary: Get customer statistics
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/customerStats", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.customerStats
        );
  
        /**
 * @swagger
 * /reporting/monthlyCustomerBase:
 *   post:
 *     summary: Get monthly customer base
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/monthlyCustomerBase", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.monthlyCustomerBase
        );

  /**
 * @swagger
 * /reporting/dailyCustomerBase:
 *   post:
 *     summary: Get daily customer base
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/dailyCustomerBase", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.dailyCustomerBase
        );
/**
 * @swagger
 * /reporting/topReferralCustomer:
 *   post:
 *     summary: Get top referral customers
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/topReferralCustomer", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.topReferralCustomer
        );
        /**
 * @swagger
 * /reporting/newlyAddedCustomer:
 *   post:
 *     summary: Get newly added customers
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/newlyAddedCustomer", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.newlyAddedCustomer
        );
/**
 * @swagger
 * /reporting/topPerformingCustomer:
 *   post:
 *     summary: Get top performing customers
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/topPerformingCustomer", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.topPerformingCustomer
        );

        /**
 * @swagger
 * /reporting/recentOrder:
 *   post:
 *     summary: Get recent orders
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/recentOrder", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.recentOrder
        );
        
        /**
 * @swagger
 * /reporting/recentReturn:
 *   post:
 *     summary: Get recent returns
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/recentReturn", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.recentReturn
        );

        /**
 * @swagger
 * /reporting/recentContactUs:
 *   post:
 *     summary: Get recent contact requests
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/recentContactUs", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.recentContactUs
        );
        /**
 * @swagger
 * /reporting/recentCustomize:
 *   post:
 *     summary: Get recent customize requests
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/recentCustomize", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.recentCustomize
        );
        /**
 * @swagger
 * /reporting/recentBulkOrder:
 *   post:
 *     summary: Get recent bulk orders
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/recentBulkOrder", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.recentBulkOrder
        );

        /**
 * @swagger
 * /reporting/categoryWiseInventory:
 *   post:
 *     summary: Get category wise inventory
 *     tags: [Reporting]
 *     security:
 *       - bearerAuth: []
 */
router.post(
            "/categoryWiseInventory", 
            passport.authenticate("admin-jwt", { session: false }), 
            ReportingController.categoryWiseInventory
        );
  

module.exports = router;
