const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const UserController = require("../controllers/users");
const ProductController = require("../controllers/products");


/**
 * @swagger
 * /users/loginuser:
 *   post:
 *     summary: User login
 *     tags: [users]
 */

router.post(
  "/loginuser",
  passport.authenticate("user-local", { session: false }),
  UserController.loginuser
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Admin login
 *     tags: [users]
 */
router.post(
  "/login",
  passport.authenticate("admin-local", { session: false }),
  UserController.login
);

/**
 * @swagger
 * /users/updatePasswordViaEmail:
 *   put:
 *     summary: Update password via email link
 *     tags: [users]
 */
router.put("/updatePasswordViaEmail", UserController.updatePasswordViaEmail);


/**
 * @swagger
 * /users/googleLogin:
 *   post:
 *     summary: Login/Register using Google
 *     tags: [users]
 */
router.post("/googleLogin", UserController.googleLogin); 

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register new user
 *     tags: [users]
 */
router.post("/register", UserController.register);

/**
 * @swagger
 * /users/sendOtp:
 *   post:
 *     summary: Send OTP to user
 *     tags: [users]
 */
router.post("/sendOtp", UserController.sendOtp);
/**
 * @swagger
 * /users/verifyOtp:
 *   post:
 *     summary: Verify OTP
 *     tags: [users]
 */
router.post("/verifyOtp", UserController.verifyOtp);

/**
 * @swagger
 * /users/verifyEmail:
 *   post:
 *     summary: Verify email
 *     tags: [users]
 */
router.post("/verifyEmail", UserController.verifyEmail);

/**
 * @swagger
 * /users/reset:
 *   get:
 *     summary: Reset system (dev/testing)
 *     tags: [users]
 */

router.get("/reset", UserController.reset);

/**
 * @swagger
 * /users/forgotPassword:
 *   post:
 *     summary: Forgot password (admin/general)
 *     tags: [users]
 */

router.post("/forgotPassword", UserController.forgotPassword);

/**
 * @swagger
 * /users/forgotpasswordcustomer:
 *   post:
 *     summary: Forgot password (customer)
 *     tags: [users]
 */

router.post("/forgotpasswordcustomer", UserController.forgotpasswordcustomer);


/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Logout admin
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/logout",
  passport.authenticate("admin-jwt", { session: false }),
  UserController.logout
);


/**
 * @swagger
 * /users/logoutUser:
 *   get:
 *     summary: Logout user
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/logoutUser",
  passport.authenticate("user-jwt", { session: false }),
  UserController.logoutUser
);


/**
 * @swagger
 * /users/deleteUser:
 *   post:
 *     summary: Delete user account
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/deleteUser",
  passport.authenticate("user-jwt", { session: false }),
  UserController.deleteUserAccount
);


/**
 * @swagger
 * /users/admin:
 *   get:
 *     summary: Check admin authentication
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/admin",
  passport.authenticate("admin-jwt", { session: false }),
  UserController.admin
);

/**
 * @swagger
 * /users/authenticateduser:
 *   get:
 *     summary: Check user authentication
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/authenticateduser",
  passport.authenticate("user-jwt", { session: false }),
  UserController.authenticateduser
);

/**
 * @swagger
 * /users/authenticated:
 *   get:
 *     summary: Check admin authentication (generic)
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/authenticated",
  passport.authenticate("admin-jwt", { session: false }),
  UserController.authenticated
);


/**
 * @swagger
 * /users/admindashboard:
 *   post:
 *     summary: Get admin dashboard data
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/admindashboard",
  passport.authenticate("admin-jwt", { session: false }),
  ProductController.getAdminDashboardData
);

module.exports = router;
