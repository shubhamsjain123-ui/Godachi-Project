const router = require("express").Router();
const passport = require("passport");
let CmsController = require("../controllers/cms");

//-------------Awards Routes----------------//

/**
 * @swagger
 * /cms/awards:
 *   get:
 *     summary: Get all awards
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router.route("/awards/").get(passport.authenticate("admin-jwt", { session: false }), CmsController.getAllAwards);

/**
 * @swagger
 * /cms/awards/add:
 *   post:
 *     summary: Add award
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router.route("/awards/add").post(passport.authenticate("admin-jwt", { session: false }), CmsController.addAwards);

/**
 * @swagger
 * /cms/awards/{id}:
 *   get:
 *     summary: Get award by ID
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router.route("/awards/:id").get(passport.authenticate("admin-jwt", { session: false }), CmsController.getByIdAwards);

/**
 * @swagger
 * /cms/awards/{id}:
 *   delete:
 *     summary: Delete award
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/awards/:id").delete(passport.authenticate("admin-jwt", { session: false }), CmsController.deleteByIdAwards);

/**
 * @swagger
 * /cms/awards/{id}:
 *   post:
 *     summary: Update award
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/awards/:id").post(passport.authenticate("admin-jwt", { session: false }), CmsController.updateAwards);


/**
 * @swagger
 * /cms/awardsList:
 *   get:
 *     summary: Get public awards list
 *     tags: [CMS]
 */
router.route("/awardsList/").get(CmsController.getAwardsList);



// faq category routes
/**
 * @swagger
 * /cms/faqCategory:
 *   get:
 *     summary: Get FAQ categories
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
router.get("/faqCategory",passport.authenticate("admin-jwt", { session: false }), CmsController.getFaqsCategory);

/**
 * @swagger
 * /cms/faqCategory/{id}:
 *   get:
 *     summary: Get FAQ category by ID
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
router.get("/faqCategory/:id",passport.authenticate("admin-jwt", { session: false }), CmsController.getFaqsCategoryById);


/**
 * @swagger
 * /cms/faqCategory:
 *   post:
 *     summary: Add FAQ category
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
router.post("/faqCategory",passport.authenticate("admin-jwt", { session: false }), CmsController.addFaqsCategory);


/**
 * @swagger
 * /cms/faqCategory/{id}:
 *   post:
 *     summary: Update FAQ category
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
router.post("/faqCategory/:id",passport.authenticate("admin-jwt", { session: false }), CmsController.addFaqsCategory);

/**
 * @swagger
 * /cms/faqCategory/{id}:
 *   delete:
 *     summary: Delete FAQ category
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/faqCategory/:id",passport.authenticate("admin-jwt", { session: false }), CmsController.deleteFaqsCategoryById);

// faq routes
/* router.get("/faq",passport.authenticate("admin-jwt", { session: false }), CmsController.getFaqs);
router.get("/faq/:id",passport.authenticate("admin-jwt", { session: false }), CmsController.getFaqsById);
router.post("/faq",passport.authenticate("admin-jwt", { session: false }), CmsController.addFaqs);
router.put("/faq/:id",passport.authenticate("admin-jwt", { session: false }), CmsController.addFaqs);
router.delete("/faq/:id",passport.authenticate("admin-jwt", { session: false }), CmsController.deleteFaqsById); */

//-------------Faq Routes----------------//
// get all items
/**
 * @swagger
 * /cms/faqs:
 *   get:
 *     summary: Get FAQs by category
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
router.route("/faqs/:category_id?").get(passport.authenticate("admin-jwt", { session: false }), CmsController.getAllFaqsByCategory);

/**
 * @swagger
 * /cms/allFaqs:
 *   get:
 *     summary: Get all FAQs (public)
 *     tags: [CMS]
 */
router.route("/allFaqs").get(CmsController.allFaqs);

/**
 * @swagger
 * /cms/faqs/add:
 *   post:
 *     summary: Add FAQ
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router.route("/faqs/add").post(passport.authenticate("admin-jwt", { session: false }), CmsController.addFaqs);
// fetch data by id
//router.route("/faqs/:id").get(passport.authenticate("admin-jwt", { session: false }), CmsController.getByIdFaqs);

/**
 * @swagger
 * /cms/faqs/{id}:
 *   delete:
 *     summary: Delete FAQ
 *     tags: [CMS]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/faqs/:id").delete(passport.authenticate("admin-jwt", { session: false }), CmsController.deleteByIdFaqs);
// update data by id
//router.route("/faqs/:id").post(passport.authenticate("admin-jwt", { session: false }), CmsController.updateFaqs);


module.exports = router;
