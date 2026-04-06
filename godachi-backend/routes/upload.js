const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const passport = require("passport");
let UploadController = require("../controllers/upload");



const uploadImage = async (req, res, next) => {
  try {
    if (req.body[0]) {
      // to declare some path to store your converted image
      const path =
        "./public/images/uploads/staff/" + Date.now() + ".png";

      const imgdata = req.body[0].thumbUrl;
      if (!imgdata) {
        return res.send("./public");
      }

      // to convert base64 format into random filename
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

      fs.writeFileSync(path, base64Data, { encoding: "base64" });

      return res.send(path);
    } else {
      return res.send("./public");
    }
  } catch (e) {
    next(e);
  }
};

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Upload APIs
 */

/**
 * @swagger
 * /uploadstaffavatar:
 *   post:
 *     summary: Upload staff avatar (base64)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uploaded successfully
 */

router.post(
  "/uploadstaffavatar",
  passport.authenticate("admin-jwt", { session: false }),
  uploadImage,
  UploadController.uploadstaffavatar
);

/**
 * @swagger
 * /deletestaffavatar:
 *   post:
 *     summary: Delete staff avatar
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.post(
  "/deletestaffavatar",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletestaffavatar
);

const uploadImageCustomer = async (req, res, next) => {
  try {
    if (req.body[0]) {
      // to declare some path to store your converted image
      const path =
        "./public/images/uploads/customers/" + Date.now() + ".png";

      const imgdata = req.body[0].thumbUrl;
      if (!imgdata) {
        return res.send("./public");
      }

      // to convert base64 format into random filename
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

      fs.writeFileSync(path, base64Data, { encoding: "base64" });

      return res.send(path);
    } else {
      return res.send("./public");
    }
  } catch (e) {
    next(e);
  }
};

/**
 * @swagger
 * /uploadcustomersavatar:
 *   post:
 *     summary: Upload customer avatar
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uploaded
 */


router.post(
  "/uploadcustomersavatar",
  passport.authenticate("admin-jwt", { session: false }),
  uploadImageCustomer,
  UploadController.uploadcustomersavatar
);

/**
 * @swagger
 * /deletecustomersavatar:
 *   post:
 *     summary: Delete customer avatar
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted
 */
router.post(
  "/deletecustomersavatar",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletecustomersavatar
);

//certificate image manage

const storagecertificate = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/certificate");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFiltercertificate = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagecertificate = multer({
  storage: storagecertificate,
  fileFilter: fileFiltercertificate,
});

/**
 * @swagger
 * /uploadcertificateimage:
 *   post:
 *     summary: Upload certificate image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded
 */

router.post(
  "/uploadcertificateimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimagecertificate.single("image"),
  UploadController.uploadcertificateimage
);

/**
 * @swagger
 * /deletecertificateimage:
 *   post:
 *     summary: Delete certificate image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted
 */
router.post(
  "/deletecertificateimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletecertificateimage
);

//Menu image manage

const storageMenu = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/menu");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterMenu = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimageMenu = multer({
  storage: storageMenu,
  fileFilter: fileFilterMenu,
});

/**
 * @swagger
 * /uploadmenuimage:
 *   post:
 *     summary: Upload menu image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post(
  "/uploadmenuimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimageMenu.single("image"),
  UploadController.uploadmenuimage
);

/**
 * @swagger
 * /deletemenuimage:
 *   post:
 *     summary: Delete menu image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted
 */

router.post(
  "/deletemenuimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletemenuimage
);

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterProduct = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype) || file.mimetype.includes("video")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadproductimage = multer({
  storage: storageProduct,
  fileFilter: fileFilterProduct,
});

/**
 * @swagger
 * /uploadproductimage:
 *   post:
 *     summary: Upload product image/video
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post(
  "/uploadproductimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadproductimage.single("image"),
  UploadController.uploadproductimage
);

/**
 * @swagger
 * /deleteproductimage:
 *   post:
 *     summary: Delete product image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted
 */
router.post(
  "/deleteproductimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deleteproductimage
);

//cargo image manage

const storageCargo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/cargoes");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterCargo = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagecargo = multer({
  storage: storageCargo,
  fileFilter: fileFilterCargo,
});




/**
 * @swagger
 * /uploadcargoimage:
 *   post:
 *     summary: Upload cargo image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cargo image uploaded successfully
 */
router.post(
  "/uploadcargoimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimagecargo.single("image"),
  UploadController.uploadcargoimage
);


/**
 * @swagger
 * /deletecargoimage:
 *   post:
 *     summary: Delete cargo image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cargo image deleted successfully
 */
router.post(
  "/deletecargoimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletecargoimage
);

//orderstatus image manage

const storageOrderstatus = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/orderstatus");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterOrderstatus = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
    "image/svg+xml",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimageorderstatus = multer({
  storage: storageOrderstatus,
  fileFilter: fileFilterOrderstatus,
});

/**
 * @swagger
 * /uploadorderstatusimage:
 *   post:
 *     summary: Upload order status image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Order status image uploaded successfully
 */
router.post(
  "/uploadorderstatusimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimageorderstatus.single("image"),
  UploadController.uploadorderstatusimage
);

/**
 * @swagger
 * /deleteorderstatusimage:
 *   post:
 *     summary: Delete order status image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order status image deleted successfully
 */
router.post(
  "/deleteorderstatusimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deleteorderstatusimage
);

//payment methods image manage

const storagePaymentmethods = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/paymentmethods");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterPaymentmethods = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
    "image/svg+xml",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagepaymentmethods = multer({
  storage: storagePaymentmethods,
  fileFilter: fileFilterPaymentmethods,
});

/**
 * @swagger
 * /uploadpaymentmethodsimage:
 *   post:
 *     summary: Upload payment method image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post(
  "/uploadpaymentmethodsimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimagepaymentmethods.single("image"),
  UploadController.uploadpaymentmethodsimage
);

/**
 * @swagger
 * /deletepaymentmethodsimage:
 *   post:
 *     summary: Delete payment method image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted
 */
router.post(
  "/deletepaymentmethodsimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletepaymentmethodsimage
);

//brands image manage

const storageBrands = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/brands");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterBrands = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
    "image/svg+xml",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimageBrands = multer({
  storage: storageBrands,
  fileFilter: fileFilterBrands,
});


/**
 * @swagger
 * /uploadbrandsimage:
 *   post:
 *     summary: Upload brands image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brands image uploaded successfully
 */
router.post(
  "/uploadbrandsimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimageBrands.single("image"),
  UploadController.uploadbrandsimage
);

/**
 * @swagger
 * /deletebrandsimage:
 *   post:
 *     summary: Delete brands image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Brands image deleted successfully
 */

router.post(
  "/deletebrandsimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletebrandsimage
);

//homeslider image manage

const storagehomeslider = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/homeslider");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterhomeslider = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagehomeslider = multer({
  storage: storagehomeslider,
  fileFilter: fileFilterhomeslider,
});

/**
 * @swagger
 * /uploadhomesliderimage:
 *   post:
 *     summary: Upload home slider image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Home slider image uploaded successfully
 */


router.post(
  "/uploadhomesliderimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimagehomeslider.single("image"),
  UploadController.uploadhomesliderimage
);

/**
 * @swagger
 * /deletehomesliderimage:
 *   post:
 *     summary: Delete home slider image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Home slider image deleted successfully
 */
router.post(
  "/deletehomesliderimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletehomesliderimage
);



//Logo image manage

const storageLogo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/logo");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterLogo = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagelogo = multer({
  storage: storageLogo,
  fileFilter: fileFilterLogo,
});

/**
 * @swagger
 * /uploadlogoimage:
 *   post:
 *     summary: Upload logo image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded
 */

router.post(
  "/uploadlogoimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimagelogo.single("image"),
  UploadController.uploadlogoimage
);

/**
 * @swagger
 * /deletelogoimage:
 *   post:
 *     summary: Delete logo image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted
 */
router.post(
  "/deletelogoimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletelogoimage
);

//certification image manage

const storagecertification = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/certification");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFiltercertification = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagecertification = multer({
  storage: storagecertification,
  fileFilter: fileFiltercertification,
});


/**
 * @swagger
 * /uploadcertificateimage:
 *   post:
 *     summary: Upload certificate image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post(
  "/uploadcertificationimage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimagecertification.single("image"),
  UploadController.uploadcertificationimage
);

/**
 * @swagger
 * /deletecertificateimage:
 *   post:
 *     summary: Delete certificate image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted
 */
router.post(
  "/deletecertificationimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletecertificationimage
);

/**
 * @swagger
 * /uploadcommonimage:
 *   post:
 *     summary: Upload common image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Common image uploaded successfully
 */
router.post(
  "/uploadcommonimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.uploadcommonimage
);

/**
 * @swagger
 * /deletecommonimage:
 *   post:
 *     summary: Delete common image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Common image deleted successfully
 */
router.post(
  "/deletecommonimage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletecommonimage
);


//category image manage
const storageCategory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/master");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterCategory = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimageCategory = multer({
  storage: storageCategory,
  fileFilter: fileFilterCategory,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
});

/**
 * @swagger
 * /uploadCategoryImage:
 *   post:
 *     summary: Upload category image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category image uploaded successfully
 */
router.post(
  "/uploadCategoryImage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimageCategory.single("image"),
  UploadController.uploadCategoryImage
);


/**
 * @swagger
 * /deleteCategoryImage:
 *   post:
 *     summary: Delete category image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category image deleted successfully
 */

router.post(
  "/deleteCategoryImage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deleteCategoryImage
);

//category image manage
const storageCategoryBanner = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/master");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterCategoryBanner = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadbannerCategory = multer({
  storage: storageCategoryBanner,
  fileFilter: fileFilterCategoryBanner,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
});

/**
 * @swagger
 * /uploadCategoryBanner:
 *   post:
 *     summary: Upload category banner
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               banner:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category banner uploaded successfully
 */

/**
 * @swagger
 * /deleteCategoryBanner:
 *   post:
 *     summary: Delete category banner
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category banner deleted successfully
 */
router.post(
  "/uploadCategoryBanner",
  passport.authenticate("admin-jwt", { session: false }),
  uploadbannerCategory.single("banner"),
  UploadController.uploadCategoryBanner
);

router.post(
  "/deleteCategoryBanner",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deleteCategoryBanner
);

//Promise image manage
const storagePromise = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/master");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterPromise = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagePromise = multer({
  storage: storagePromise,
  fileFilter: fileFilterPromise,
});


/**
 * @swagger
 * /uploadPromiseImage:
 *   post:
 *     summary: Upload promise image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Promise image uploaded successfully
 */

router.post(
  "/uploadPromiseImage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimagePromise.single("image"),
  UploadController.uploadPromiseImage
);

/**
 * @swagger
 * /deletePromiseImage:
 *   post:
 *     summary: Delete promise image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Promise image deleted successfully
 */

router.post(
  "/deletePromiseImage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deletePromiseImage
);

//Occassion image manage
const storageOccassion = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/master");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterOccassion = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimageOccassion = multer({
  storage: storageOccassion,
  fileFilter: fileFilterOccassion,
});

/**
 * @swagger
 * /uploadOccassionImage:
 *   post:
 *     summary: Upload occasion image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Occasion image uploaded successfully
 */
router.post(
  "/uploadOccassionImage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimageOccassion.single("image"),
  UploadController.uploadOccassionImage
);

/**
 * @swagger
 * /deleteOccassionImage:
 *   post:
 *     summary: Delete occasion image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Occasion image deleted successfully
 */
router.post(
  "/deleteOccassionImage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deleteOccassionImage
);

//Banner image manage
const storageBanner = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/banners");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

let uploadimageBanner = multer({
  storage: storageBanner
});

/**
 * @swagger
 * /uploadBannerImage:
 *   post:
 *     summary: Upload banner image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Banner image uploaded successfully
 */
router.post(
  "/uploadBannerImage",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimageBanner.single("image"),
  UploadController.uploadBannerImage
);

/**
 * @swagger
 * /deleteBannerImage:
 *   post:
 *     summary: Delete banner image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Banner image deleted successfully
 */

router.post(
  "/deleteBannerImage",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deleteBannerImage
);


//Variant pdf manage
const storageVariantPdf = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/master");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterVariantPdf = (req, file, cb) => {
  const allowedFileTypes = ["application/pdf"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimageVariantPdf = multer({
  storage: storageVariantPdf,
  fileFilter: fileFilterVariantPdf,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
});

/**
 * @swagger
 * /uploadVariantPdf:
 *   post:
 *     summary: Upload variant PDF
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post(
  "/uploadVariantPdf",
  passport.authenticate("admin-jwt", { session: false }),
  uploadimageVariantPdf.single("image"),
  UploadController.uploadVariantPdf
);

/**
 * @swagger
 * /deleteVariantPdf:
 *   post:
 *     summary: Delete variant PDF
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted
 */
router.post(
  "/deleteVariantPdf",
  passport.authenticate("admin-jwt", { session: false }),
  UploadController.deleteVariantPdf
);

//User Return Image
const storageReturnImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/return");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterReturnImage = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadReturnImage = multer({
  storage: storageReturnImage,
  fileFilter: fileFilterReturnImage,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
});

/**
 * @swagger
 * /uploadReturnImage:
 *   post:
 *     summary: Upload return images
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post(
  "/uploadReturnImage",
  passport.authenticate("user-jwt", { session: false }),
  uploadReturnImage.array("image"),
  UploadController.uploadReturnImage
);

//User Review Image
const storageReviewImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/review");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterReviewImage = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadReviewImage = multer({
  storage: storageReviewImage,
  fileFilter: fileFilterReviewImage,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
});

/**
 * @swagger
 * /uploadReviewImage:
 *   post:
 *     summary: Upload review images
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post(
  "/uploadReviewImage",
  passport.authenticate("user-jwt", { session: false }),
  uploadReviewImage.array("image"),
  UploadController.uploadReviewImage
);

//User Profile Image
const storageProfileImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/profile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterProfileImage = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadProfileImage = multer({
  storage: storageProfileImage,
  fileFilter: fileFilterProfileImage,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
});

/**
 * @swagger
 * /uploadProfileImage:
 *   post:
 *     summary: Upload profile image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post(
  "/uploadProfileImage",
  passport.authenticate("user-jwt", { session: false }),
  uploadProfileImage.single("image"),
  UploadController.uploadProfileImage
);

/**
 * @swagger
 * /getGodachiCss:
 *   get:
 *     summary: Get Godachi CSS
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: CSS fetched successfully
 */
router.get("/getGodachiCss",UploadController.getGodachiCss)
/**
 * @swagger
 * /updateGodachiCss:
 *   post:
 *     summary: Update Godachi CSS
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: CSS updated successfully
 */
router.post("/updateGodachiCss",UploadController.updateGodachiCss)
/**
 * @swagger
 * /getGodachiAdminCss:
 *   get:
 *     summary: Get Godachi Admin CSS
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Admin CSS fetched successfully
 */

router.get("/getGodachiAdminCss",UploadController.getGodachiAdminCss)

/**
 * @swagger
 * /updateGodachiAdminCss:
 *   post:
 *     summary: Update Godachi Admin CSS
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Admin CSS updated successfully
 */
router.post("/updateGodachiAdminCss",UploadController.updateGodachiAdminCss)


module.exports = router;
