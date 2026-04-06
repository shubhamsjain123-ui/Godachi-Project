const router = require("express").Router();
const passport = require("passport");
let Users = require("../models/users.model");
let CustomerController = require("../controllers/customers");

const title = "User";
const roleTitle = "customers";
const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 10;


/**
 * @swagger
 * /customers/updatePasswordCustomer:
 *   post:
 *     summary: Update customer password (admin)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/updatePasswordCustomer",
  passport.authenticate("admin-jwt", { session: false }),
  CustomerController.updatePasswordCustomer
);

//forms route

/**
 * @swagger
 * /customers/customizeJewelleryRequest:
 *   post:
 *     summary: Submit customize jewellery request
 *     tags: [Customers]
 */
router.post("/customizeJewelleryRequest", CustomerController.customizeJewelleryRequest);

/**
 * @swagger
 * /customers/bulkOrderRequest:
 *   post:
 *     summary: Submit bulk order request
 *     tags: [Customers]
 */
router.post("/bulkOrderRequest", CustomerController.bulkOrderRequest);

/**
 * @swagger
 * /customers/contactRequest:
 *   post:
 *     summary: Submit contact request
 *     tags: [Customers]
 */
router.post("/contactRequest", CustomerController.contactRequest);

/**
 * @swagger
 * /customers/getCustomizeJewelleryRequest:
 *   get:
 *     summary: Get customize jewellery requests
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */

router.get("/getCustomizeJewelleryRequest",passport.authenticate("admin-jwt", { session: false }), CustomerController.getCustomizeJewelleryRequest);


/**
 * @swagger
 * /customers/getBulkOrderRequest:
 *   get:
 *     summary: Get bulk order requests
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.get("/getBulkOrderRequest",passport.authenticate("admin-jwt", { session: false }), CustomerController.getBulkOrderRequest);

/**
 * @swagger
 * /customers/getContactRequest:
 *   get:
 *     summary: Get contact requests
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.get("/getContactRequest",passport.authenticate("admin-jwt", { session: false }), CustomerController.getContactRequest);




//address routes
/**
 * @swagger
 * /customers/getMyDetails:
 *   get:
 *     summary: Get my details
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.get("/getMyDetails",passport.authenticate("user-jwt", { session: false }), CustomerController.getMyDetails);



/**
 * @swagger
 * /customers/sendVerificationEmail:
 *   post:
 *     summary: Send verification email
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.post("/sendVerificationEmail",passport.authenticate("user-jwt", { session: false }), CustomerController.sendVerificationEmail);

/**
 * @swagger
 * /customers/updateCustomerName:
 *   post:
 *     summary: Update customer name
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.post("/updateCustomerName",passport.authenticate("user-jwt", { session: false }), CustomerController.updateCustomerName);

/**
 * @swagger
 * /customers/updateProfilePic:
 *   post:
 *     summary: Update profile picture
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.post("/updateProfilePic",passport.authenticate("user-jwt", { session: false }), CustomerController.updateProfilePic);

/**
 * @swagger
 * /customers/defaultAddress:
 *   get:
 *     summary: Get default address
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.get("/defaultAddress",passport.authenticate("user-jwt", { session: false }), CustomerController.getdefaultAddress);

/**
 * @swagger
 * /customers/address:
 *   get:
 *     summary: Get all addresses
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */

router.get("/address",passport.authenticate("user-jwt", { session: false }), CustomerController.getAllAddress);

/**
 * @swagger
 * /customers/address/{id}:
 *   get:
 *     summary: Get address by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.get("/address/:id",passport.authenticate("user-jwt", { session: false }), CustomerController.getAddressDetails);

/**
 * @swagger
 * /customers/address/manage:
 *   post:
 *     summary: Add or update address
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.post("/address/manage",passport.authenticate("user-jwt", { session: false }), CustomerController.manageAddress);


/**
 * @swagger
 * /customers/address/manage/{id}:
 *   post:
 *     summary: Update address by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.post("/address/manage/:id",passport.authenticate("user-jwt", { session: false }), CustomerController.manageAddress);


//gift Card routes

/**
 * @swagger
 * /customers/createGiftCardOrder:
 *   post:
 *     summary: Create gift card order
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.post("/createGiftCardOrder",passport.authenticate("user-jwt", { session: false }), CustomerController.createGiftCardOrder);


/**
 * @swagger
 * /customers/onPlaceGiftCardOrder:
 *   post:
 *     summary: Place gift card order
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.post("/onPlaceGiftCardOrder",passport.authenticate("user-jwt", { session: false }), CustomerController.onPlaceGiftCardOrder);


/**
 * @swagger
 * /customers/redeemGiftCard:
 *   post:
 *     summary: Redeem gift card
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.post("/redeemGiftCard",passport.authenticate("user-jwt", { session: false }), CustomerController.redeemGiftCard);

/**
 * @swagger
 * /customers/myGiftCardBuyHistory:
 *   get:
 *     summary: Get gift card purchase history
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
router.get("/myGiftCardBuyHistory",passport.authenticate("user-jwt", { session: false }), CustomerController.myGiftCardBuyHistory);

/**
 * @swagger
 * /customers/myWalletDetails:
 *   get:
 *     summary: Get wallet details
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */

router.get("/myWalletDetails",passport.authenticate("user-jwt", { session: false }), CustomerController.myWalletDetails);


/**
 * @swagger
 * /customers/getMyWalletBalance:
 *   get:
 *     summary: Get wallet balance
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */

router.get("/getMyWalletBalance",passport.authenticate("user-jwt", { session: false }), CustomerController.getMyWalletBalance);

/**
 * @swagger
 * /customers/search:
 *   post:
 *     summary: Search customers
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
// Search Customer
router
  .route("/search")
  .post(passport.authenticate("admin-jwt", { session: false }), CustomerController.searchCustomer);


/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */

// get all items
router
  .route("/")
  .get(passport.authenticate("admin-jwt", { session: false }),CustomerController.getAll);


  /**
 * @swagger
 * /customers/counts:
 *   get:
 *     summary: Get customers count
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/counts/")
  .get(passport.authenticate("admin-jwt", { session: false }), CustomerController.counts);


  /**
 * @swagger
 * /customers/add:
 *   post:
 *     summary: Add customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: "Indore, MP"
 *     responses:
 *       200:
 *         description: Customer added successfully
 */
// post new items
router
  .route("/add")
  .post(passport.authenticate("admin-jwt", { session: false }), CustomerController.add);


/**
 * @swagger
 * /customers/active/{id}:
 *   post:
 *     summary: Update active status
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
// update active data by id
router
  .route("/active/:id")
  .post(passport.authenticate("admin-jwt", { session: false }), CustomerController.updateActive);


  /**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("user-jwt", { session: false }), CustomerController.getById);


  /**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("admin-jwt", { session: false }), CustomerController.deleteById);


  /**
 * @swagger
 * /customers/{id}:
 *   post:
 *     summary: Update customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router
  .route("/:id")
  .post(passport.authenticate("user-jwt", { session: false }), CustomerController.update);

module.exports = router;
