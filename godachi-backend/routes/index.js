const express = require('express');
const router = express.Router();

//Private Root import
const turkeyRouter = require("./turkey");
const userRouter = require("./users");
const uploadRouter = require("./upload");
const staffRouter = require("./staff");
const customerRouter = require("./customers");
const countryRouter = require("./country");
const productsRouter = require("./products");
const productInventoryRouter = require("./productInventory");
const offersRouter = require("./offers");
const couponsRouter = require("./coupons");
const productimagesRouter = require("./productimages");
const variantsRouter = require("./variants");
const categoriesRouter = require("./categories");
const cargoesRouter = require("./cargoes");
const homeSliderRouter = require("./homeslider");
const ordersRouter = require("./orders");
const orderstatusRouter = require("./orderstatus");
const orderReturnStatusRouter = require("./returnStatus");
const brandsRouter = require("./brands");
const paymentmethodsRouter = require("./paymentmethods");
const topmenuRouter = require("./topmenu");
const settingsRouter = require("./settings");
const basketRouter = require("./basket");
const wishlistRouter = require("./wishlist");
const masterRouter = require("./masters");
const homeMenuRouter = require("./homemenu");
const logisticsRouter = require("./logistics");

//Public Root import
const settingsPublicRouter = require("./settingspublic");
const topmenuPublicRouter = require("./topmenupublic");
const categoriesPublicRouter = require("./categoriespublic");
const brandsPublicRouter = require("./brandspublic");
const homeSliderPublicRouter = require("./homesliderpublic");
const productsPublicRouter = require("./productspublic");
const cargoesPublicRouter = require("./cargoespublic");
const customerPublicRouter = require("./customerspublic");
const paymentPublicRouter = require("./payment");
const paymentMethodsPublicRouter = require("./paymentmethodspublic");
const filterMasterRouter = require("./filterMaster");
const cronRouter = require("./cron");
const cmsRouter = require("./cms");
const reportingRouter = require("./reporting");
const WebhookRouter = require("./webhook");

//Private Root
router.use("/cargoes", cargoesRouter);
router.use("/homeslider", homeSliderRouter);
router.use("/orders", ordersRouter);
router.use("/orderstatus", orderstatusRouter);
router.use("/returnStatus", orderReturnStatusRouter);
router.use("/paymentmethods", paymentmethodsRouter);
router.use("/topmenu", topmenuRouter);
router.use("/users", userRouter);
router.use("/staff", staffRouter);
router.use("/customers", customerRouter);
router.use("/country", countryRouter);
router.use("/products", productsRouter);
router.use("/productinventory", productInventoryRouter);
router.use("/offers", offersRouter);
router.use("/coupons", couponsRouter);
router.use("/productimages", productimagesRouter);
router.use("/variants", variantsRouter);
router.use("/categories", categoriesRouter);
router.use("/brands", brandsRouter);
router.use("/turkey", turkeyRouter);
router.use("/upload", uploadRouter);
router.use("/settings", settingsRouter);
router.use("/basket", basketRouter);
router.use("/wishlist", wishlistRouter);
router.use("/masters", masterRouter);
router.use("/homemenu", homeMenuRouter);
router.use("/logistics", logisticsRouter);

//public Root
router.use("/settingspublic", settingsPublicRouter);
router.use("/topmenupublic", topmenuPublicRouter);
router.use("/categoriespublic", categoriesPublicRouter);
router.use("/brandspublic", brandsPublicRouter);
router.use("/homesliderpublic", homeSliderPublicRouter);
router.use("/productspublic", productsPublicRouter);
router.use("/cargoespublic", cargoesPublicRouter);
router.use("/customerspublic", customerPublicRouter);
router.use("/payment", paymentPublicRouter);
router.use("/paymentmethodspublic", paymentMethodsPublicRouter);
router.use("/filterMaster", filterMasterRouter);
router.use("/cron", cronRouter);
router.use("/cms", cmsRouter);
router.use("/reporting", reportingRouter);
router.use("/webhook", WebhookRouter);

//instalition db import
/*const installDB = require("./routes/installdb.js");
app.use("/installdb", installDB);*/

module.exports = router;