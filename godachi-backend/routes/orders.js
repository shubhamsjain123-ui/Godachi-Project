const router = require("express").Router();
const passport = require("passport");
let Orders = require("../models/orders.model");
let OrdersController = require("../controllers/orders");

const title = "Orders";
const roleTitle = "orders";


/**
 * @swagger
 * /orders/invoice/{id}:
 *   get:
 *     summary: Download invoice by order ID
 *     tags: [Orders]
 */
router.get(
  "/invoice/:id",
  //passport.authenticate("user-jwt", { session: false }),
  OrdersController.downloadInvoice
);


/**
 * @swagger
 * /orders/creditNote/{id}:
 *   get:
 *     summary: Download credit note by order ID
 *     tags: [Orders]
 */
router.get(
  "/creditNote/:id",
  //passport.authenticate("user-jwt", { session: false }),
  OrdersController.downloadCreditNote
);


/**
 * @swagger
 * /orders/getMyOrders:
 *   post:
 *     summary: Get logged-in user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/getMyOrders")
  .post(passport.authenticate("user-jwt", { session: false }), OrdersController.getUserOrders);


  /**
 * @swagger
 * /orders/trackOrderPublic:
 *   post:
 *     summary: Track order (user or guest)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/trackOrderPublic")
  .post(passport.authenticate(["user-jwt", "anonymous"], { session: false }), OrdersController.trackOrderPublic);

  /**
 * @swagger
 * /orders/myOrder/{id}:
 *   post:
 *     summary: Get user order details by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/myOrder/:id")
  .post(passport.authenticate("user-jwt", { session: false }), OrdersController.getUserOrderDetails);


  /**
 * @swagger
 * /orders/returnRequest/{id}:
 *   post:
 *     summary: Create return request for an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/returnRequest/:id")
  .post(passport.authenticate("user-jwt", { session: false }), OrdersController.createUserReturnRequest);



/**
 * @swagger
 * /orders/return:
 *   get:
 *     summary: Get all return orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */

// get all items

router
  .route("/return/")
  .get(passport.authenticate("admin-jwt", { session: false }), OrdersController.getAllReturnOrders);


  /**
 * @swagger
 * /orders/return:
 *   post:
 *     summary: Get return orders with filters (POST)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// get all post items
router
  .route("/return/")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.getAllReturnOrdersPost);


  /**
 * @swagger
 * /orders/return/{id}:
 *   get:
 *     summary: Get return order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/return/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), OrdersController.getReturnOrderById);


  /**
 * @swagger
 * /orders/return/status/{id}:
 *   get:
 *     summary: Get return orders by status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/return/status/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), OrdersController.getByReturnStatus);


/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */

// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }), OrdersController.getAll);


  /**
 * @swagger
 * /orders:
 *   post:
 *     summary: Get all orders with filters (admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router
  .route("/")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.getAllPost);


  /**
 * @swagger
 * /orders/add:
 *   post:
 *     summary: Add new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.add);


  /**
 * @swagger
 * /orders/counts:
 *   get:
 *     summary: Get order counts/statistics
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/counts/")
  .get(passport.authenticate("admin-jwt", { session: false }), OrdersController.counts);



  /**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), OrdersController.getById);


  /**
 * @swagger
 * /orders/status/{id}:
 *   get:
 *     summary: Get order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/status/:id")
  .get(passport.authenticate("admin-jwt", { session: false }), OrdersController.getStatus);

  /**
 * @swagger
 * /orders/fetchShipmentRate/{id}:
 *   post:
 *     summary: Fetch shipment rate
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/fetchShipmentRate/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.fetchShipmentRate);

  /**
 * @swagger
 * /orders/createShipmentOrder/{id}:
 *   post:
 *     summary: Create shipment order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// create shipment order
router
  .route("/createShipmentOrder/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.createShipmentOrder);


  /**
 * @swagger
 * /orders/updateHsn/{id}:
 *   post:
 *     summary: Update HSN for order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// create shipment order
router
  .route("/updateHsn/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.updateHsn);

// Mark Order as delivered
/**
 * @swagger
 * /orders/markDelivered/{id}:
 *   post:
 *     summary: Mark order as delivered
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/markDelivered/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.markDelivered);


  /**
 * @swagger
 * /orders/cancelOrderAdmin/{id}:
 *   post:
 *     summary: Cancel order by admin
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// Cancel Order by admin
router
  .route("/cancelOrderAdmin/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.cancelOrderAdmin);


  /**
 * @swagger
 * /orders/cancelOrderUser/{id}:
 *   post:
 *     summary: Cancel order by user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// Cancel Order by user
router
  .route("/cancelOrderUser/:id")
  .post(passport.authenticate("user-jwt", { session: false }), OrdersController.cancelOrderUser);

  /**
 * @swagger
 * /orders/approveOrderAdmin/{id}:
 *   post:
 *     summary: Approve order (admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// Mark Order as delivered
router
  .route("/approveOrderAdmin/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.approveOrderAdmin);

/**
 * @swagger
 * /orders/convertToCodAdmin/{id}:
 *   post:
 *     summary: Convert order to COD (admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
  // Mark Order as delivered
router
  .route("/convertToCodAdmin/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.convertToCodAdmin);

/**
 * @swagger
 * /orders/markPaymentReceivedAdmin/{id}:
 *   post:
 *     summary: Mark payment received (admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
  // Mark Order as delivered
router
  .route("/markPaymentReceivedAdmin/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.markPaymentReceivedAdmin);


  /**
 * @swagger
 * /orders/cancelReturnAdmin/{id}:
 *   post:
 *     summary: Cancel return (admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// Cancel Return as admin
router
  .route("/cancelReturnAdmin/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.cancelReturnAdmin);


  /**
 * @swagger
 * /orders/cancelReturnUser/{id}:
 *   post:
 *     summary: Cancel return (user)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// Cancel Order by user
router
  .route("/cancelReturnUser/:id")
  .post(passport.authenticate("user-jwt", { session: false }), OrdersController.cancelReturnUser);
/**
 * @swagger
 * /orders/approveReturnAdmin/{id}:
 *   post:
 *     summary: Approve return (admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// approveReturnAdmin
router
  .route("/approveReturnAdmin/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.approveReturnAdmin);


  /**
 * @swagger
 * /orders/return/markReceived/{id}:
 *   post:
 *     summary: Mark return product as received
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// Mark Order as delivered
router
  .route("/return/markReceived/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.returnProductRecieved);

  /**
 * @swagger
 * /orders/processRefund/{id}:
 *   post:
 *     summary: Process refund
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// Process Refund
router
  .route("/processRefund/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.processRefund);


  /**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), OrdersController.deleteById);


  /**
 * @swagger
 * /orders/{id}:
 *   post:
 *     summary: Update order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), OrdersController.update);


module.exports = router;
