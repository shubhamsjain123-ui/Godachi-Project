const router = require("express").Router();
const passport = require("passport");
/**
 * @swagger
 * tags:
 *   name: Masters
 *   description: Masters APIs (Tags, Metals, Stones, Vendors etc.)
 */

let MastersController = require("../controllers/masters");


/**
 * @swagger
 * /masters/getStates:
 *   get:
 *     summary: Get states list
 *     tags: [Masters]
 */
router.get("/getStates", MastersController.getStates);

//-------------Purchase Include Routes----------------//
/**
 * @swagger
 * /masters/purchaseIncludes:
 *   get:
 *     summary: Get all purchase includes
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router.route("/purchaseIncludes/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllPurchaseInclude);

/**
 * @swagger
 * /masters/purchaseIncludes/add:
 *   post:
 *     summary: Add purchase include
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router.route("/purchaseIncludes/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addPurchaseInclude);
// fetch data by id

/**
 * @swagger
 * /masters/purchaseIncludes/{id}:
 *   get:
 *     summary: Get purchase include by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/purchaseIncludes/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdPurchaseInclude);

/**
 * @swagger
 * /masters/purchaseIncludes/{id}:
 *   delete:
 *     summary: Delete purchase include
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/purchaseIncludes/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdPurchaseInclude);

/**
 * @swagger
 * /masters/promises/{id}:
 *   get:
 *     summary: Get promise by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/purchaseIncludes/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updatePurchaseInclude);


//-------------Promise Routes----------------//


/**
 * @swagger
 * /masters/promises:
 *   get:
 *     summary: Get all promises
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router.route("/promises/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllPromise);
// post new items

/**
 * @swagger
 * /masters/promises/add:
 *   post:
 *     summary: Add promise
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/promises/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addPromise);
// fetch data by id

/**
 * @swagger
 * /masters/promises/{id}:
 *   get:
 *     summary: Get promise by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */


router.route("/promises/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdPromise);

/**
 * @swagger
 * /masters/promises/{id}:
 *   delete:
 *     summary: Delete promise
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// delete data by id
router.route("/promises/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdPromise);

/**
 * @swagger
 * /masters/promises/{id}:
 *   post:
 *     summary: update promise
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// update data by id
router.route("/promises/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updatePromise);


//-------------Occassion Routes----------------//

/**
 * @swagger
 * /masters/occassions:
 *   get:
 *     summary: Get all occassions
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router.route("/occassions/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllOccassion);
// post new items

/**
 * @swagger
 * /masters/occassions/add:
 *   post:
 *     summary: Add occassion
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/occassions/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addOccassion);

/**
 * @swagger
 * /masters/occassions/{id}:
 *   get:
 *     summary: Get occassion by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// fetch data by id
router.route("/occassions/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdOccassion);

/**
 * @swagger
 * /masters/occassions/{id}:
 *   delete:
 *     summary: Delete occassion by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// delete data by id
router.route("/occassions/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdOccassion);

/**
 * @swagger
 * /masters/occassions/{id}:
 *   post:
 *     summary: Update occassion
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// update data by id
router.route("/occassions/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateOccassion);

//-------------Tags Routes----------------//
// get all items
/**
 * @swagger
 * /masters/tags/:
 *   get:
 *     summary: get all tags
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/tags/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllTags);
// post new items

/**
 * @swagger
 * /masters/tags/add:
 *   post:
 *     summary: Add tag
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/tags/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addTags);

/**
 * @swagger
 * /masters/tags/{id}:
 *   get:
 *     summary: Get tag by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router.route("/tags/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdTags);

/**
 * @swagger
 * /masters/tags/{id}:
 *   delete:
 *     summary: delete tag by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/tags/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdTags);

/**
 * @swagger
 * /masters/tags/{id}:
 *   update:
 *     summary: update tag
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/tags/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateTags);

//-------------Certification Routes----------------//
/**
 * @swagger
 * /masters/certifications:
 *   get:
 *     summary: Get all certifications
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router.route("/certifications/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllCertification);

/**
 * @swagger
 * /masters/certifications/add:
 *   post:
 *     summary: Add certification
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router.route("/certifications/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addCertification);


/**
 * @swagger
 * /masters/certifications/{id}:
 *   get:
 *     summary: Get certification by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router.route("/certifications/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdCertification);


/**
 * @swagger
 * /masters/certifications/{id}:
 *   delete:
 *     summary: Delete certification
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/certifications/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdCertification);

/**
 * @swagger
 * /masters/certifications/{id}:
 *   post:
 *     summary: Update certification
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/certifications/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateCertification);


//-------------Metals Routes----------------//


/**
 * @swagger
 * /masters/metalsWithVariants:
 *   get:
 *     summary: Get metals with variants
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router.route("/metalsWithVariants/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllMetalsWithVariants);

/**
 * @swagger
 * /masters/metals:
 *   get:
 *     summary: Get all metals
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/metals/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllMetals);
// post new items

/**
 * @swagger
 * /masters/metals/add:
 *   post:
 *     summary: Add metal
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/metals/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addEditMetals);
// fetch data by id

/**
 * @swagger
 * /masters/metals/{id}:
 *   get:
 *     summary: Get metal by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/metals/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdMetals);

/**
 * @swagger
 * /masters/metals/{id}:
 *   delete:
 *     summary: Delete metal
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/metals/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdMetals);

/**
 * @swagger
 * /masters/metals/{id}:
 *   post:
 *     summary: update metal
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/metals/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateMetals);



//-------------Metal Colors Routes----------------//

/**
 * @swagger
 * /masters/metalcolors:
 *   get:
 *     summary: Get all metal colors
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router.route("/metalcolors/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllMetalColors);


/**
 * @swagger
 * /masters/metalcolors/add:
 *   post:
 *     summary: Add metal color
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router.route("/metalcolors/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addMetalColors);

/**
 * @swagger
 * /masters/metalcolors/{id}:
 *   get:
 *     summary: Get metal color by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router.route("/metalcolors/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdMetalColors);

/**
 * @swagger
 * /masters/metalcolors/{id}:
 *   get:
 *     summary: Get metal color by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/metalcolors/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdMetalColors);

/**
 * @swagger
 * /masters/metalcolors/{id}:
 *   post:
 *     summary: Update metal color
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/metalcolors/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateMetalColors);


//-------------Stones Routes----------------//
// get all items

/**
 * @swagger
 * /masters/stonesWithVariants:
 *   get:
 *     summary: Get stones with variants
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/stonesWithVariants/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllStonesWithVariants);

/**
 * @swagger
 * /masters/stonesWithVariantsPricing:
 *   get:
 *     summary: Get stones with variants pricing
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/stonesWithVariantsPricing/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllStonesWithVariantsPricing);


/**
 * @swagger
 * /masters/stones:
 *   get:
 *     summary: Get all stones
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

router.route("/stones/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllStones);

/**
 * @swagger
 * /masters/stones/add:
 *   post:
 *     summary: Add stone
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router.route("/stones/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addStones);

/**
 * @swagger
 * /masters/stones/{id}:
 *   get:
 *     summary: Get stone by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// fetch data by id
router.route("/stones/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdStones);


/**
 * @swagger
 * /masters/stones/{id}:
 *   delete:
 *     summary: Delete stone
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/stones/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdStones);

/**
 * @swagger
 * /masters/stones/{id}:
 *   post:
 *     summary: Update stone
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/stones/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateStones);

//-------------Stones Variant Routes----------------//


/**
 * @swagger
 * /masters/stoneVariants/{stoneId}:
 *   get:
 *     summary: Get stone variants by stone ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router.route("/stoneVariants/:stoneId/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllStoneVariants);


/**
 * @swagger
 * /masters/stoneVariants/{stoneId}/add:
 *   post:
 *     summary: Add stone variant
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// post new items
router.route("/stoneVariants/:stoneId/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addStoneVariants);

/**
 * @swagger
 * /masters/stoneVariants/{stoneId}/{id}:
 *   get:
 *     summary: Get stone variant by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router.route("/stoneVariants/:stoneId/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdStoneVariants);


/**
 * @swagger
 * /masters/stoneVariants/{stoneId}/{id}:
 *   get:
 *     summary: Get stone variant by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/stoneVariants/:stoneId/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdStoneVariants);


/**
 * @swagger
 * /masters/stoneVariants/{stoneId}/{id}:
 *   delete:
 *     summary: Delete stone variant
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// update data by id
router.route("/stoneVariants/:stoneId/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateStoneVariants);

//-------------Stone Colors Routes----------------//


/**
 * @swagger
 * /masters/stonecolors:
 *   get:
 *     summary: Get all stone colors
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// get all items
router.route("/stonecolors/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllStoneColors);

/**
 * @swagger
 * /masters/stonecolors/add:
 *   post:
 *     summary: Add stone color
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router.route("/stonecolors/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addStoneColors);

/**
 * @swagger
 * /masters/stonecolors/{id}:
 *   get:
 *     summary: Get stone color by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router.route("/stonecolors/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdStoneColors);


/**
 * @swagger
 * /masters/stonecolors/{id}:
 *   delete:
 *     summary: Delete stone color
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/stonecolors/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdStoneColors);


/**
 * @swagger
 * /masters/stonecolors/{id}:
 *   post:
 *     summary: Update stone color
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/stonecolors/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateStoneColors);


//-------------Diamond Variant Routes----------------//

/**
 * @swagger
 * /masters/diamondVariants:
 *   get:
 *     summary: Get all diamond variants
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// get all items
router.route("/diamondVariants/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllDiamondVariants);


/**
 * @swagger
 * /masters/diamondVariants/add:
 *   post:
 *     summary: Add diamond variant
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// post new items
router.route("/diamondVariants/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addDiamondVariants);

/**
 * @swagger
 * /masters/diamondVariants/{id}:
 *   get:
 *     summary: Get diamond variant by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// fetch data by id
router.route("/diamondVariants/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdDiamondVariants);

/**
 * @swagger
 * /masters/diamondVariants/{id}:
 *   delete:
 *     summary: Delete diamond variant
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/diamondVariants/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdDiamondVariants);

/**
 * @swagger
 * /masters/diamondVariants/{id}:
 *   post:
 *     summary: Update diamond variant
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/diamondVariants/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateDiamondVariants);

//-------------Purity Routes----------------//


/**
 * @swagger
 * /masters/purity:
 *   get:
 *     summary: Get all purity data
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// get all items
router.route("/purity/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllPurity);


/**
 * @swagger
 * /masters/purity/add:
 *   post:
 *     summary: Add purity
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// post new items
router.route("/purity/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addPurity);

/**
 * @swagger
 * /masters/purity/{id}:
 *   get:
 *     summary: Get purity by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// fetch data by id
router.route("/purity/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdPurity);

/**
 * @swagger
 * /masters/purity/{id}:
 *   delete:
 *     summary: Delete purity
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/purity/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdPurity);

/**
 * @swagger
 * /masters/purity/{id}:
 *   post:
 *     summary: Update purity
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/purity/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updatePurity);

//-------------Faq Routes----------------//
// get all items



/**
 * @swagger
 * /masters/faqs:
 *   get:
 *     summary: Get FAQs (optionally filtered by category)
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Category ID to filter FAQs
 */
router.route("/faqs/:category_id?").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllFaqsByCategory);

/**
 * @swagger
 * /masters/faqsByCategory/{category_id}:
 *   get:
 *     summary: Get public FAQs by category
 *     tags: [Masters]
 */
router.route("/faqsByCategory/:category_id").get(MastersController.getPubFaqsByCategory);

/**
 * @swagger
 * /masters/faqs/add:
 *   post:
 *     summary: Add FAQ
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// post new items
router.route("/faqs/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addFaqs);
// fetch data by id
//router.route("/faqs/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdFaqs);

/**
 * @swagger
 * /masters/faqs/{id}:
 *   delete:
 *     summary: Delete FAQ
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/faqs/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdFaqs);
// update data by id
//router.route("/faqs/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateFaqs);


//-------------Pricing Routes----------------//
// Metal Pricing

/**
 * @swagger
 * /masters/pricing/metal:
 *   post:
 *     summary: Update metal pricing
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/pricing/metal").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateMetalPricing);

/**
 * @swagger
 * /masters/pricing/stone:
 *   post:
 *     summary: Update stone pricing
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/pricing/stone").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateStonePricing);

/**
 * @swagger
 * /masters/pricing/stone:
 *   get:
 *     summary: Get stone pricing
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/pricing/stone").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getStonePricing);

/**
 * @swagger
 * /masters/pricing/diamond:
 *   post:
 *     summary: Update diamond pricing
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

router.route("/pricing/diamond").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateDiamondPricing);
/**
 * @swagger
 * /masters/pricing/diamond:
 *   get:
 *     summary: Get diamond pricing
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/pricing/diamond").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getDiamondPricing);


/**
 * @swagger
 * /masters/diamondWithVariantsPricing:
 *   get:
 *     summary: Get diamond variants pricing
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/diamondWithVariantsPricing/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllDiamondWithVariantsPricing);

//-------------Vendors Routes----------------//

/**
 * @swagger
 * /masters/vendors:
 *   get:
 *     summary: Get all vendors
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// get all items
router.route("/vendors/").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getAllVendors);

/**
 * @swagger
 * /masters/vendors/add:
 *   post:
 *     summary: Add vendor
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */

// post new items
router.route("/vendors/add").post(passport.authenticate("admin-jwt", { session: false }), MastersController.addVendors);
// fetch data by id

/**
 * @swagger
 * /masters/vendors/{id}:
 *   get:
 *     summary: Get vendor by ID
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
router.route("/vendors/:id").get(passport.authenticate("admin-jwt", { session: false }), MastersController.getByIdVendors);

/**
 * @swagger
 * /masters/vendors/{id}:
 *   delete:
 *     summary: Delete vendor
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// delete data by id
router.route("/vendors/:id").delete(passport.authenticate("admin-jwt", { session: false }), MastersController.deleteByIdVendors);

/**
 * @swagger
 * /masters/vendors/{id}:
 *   post:
 *     summary: Update vendor
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 */
// update data by id
router.route("/vendors/:id").post(passport.authenticate("admin-jwt", { session: false }), MastersController.updateVendors);



module.exports = router;
