const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const passport = require("passport");


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

exports.uploadstaffavatar = (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["staff/add"]) {
      if (req.file) return res.json({ msg: "image successfully uploaded" });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deletestaffavatar = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["staff/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

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

exports.uploadcustomersavatar = (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["customers/add"]) {
      if (req.file) return res.json({ msg: "image successfully uploaded" });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deletecustomersavatar = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["customers/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

  //certificate image manage

const storagecertificate = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.normalize ("./public/images/uploads/certificate"));
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

exports.uploadcertificateimage = (req, res) => {
    const rolesControl = req.user.role;
    //uploadimagecertificate.single("image")
    
    if (rolesControl["productimages/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deletecertificateimage = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["productimages/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

  exports.uploadmenuimage = (req, res) => {
    const rolesControl = req.user.role;
    //uploadimagecertificate.single("image")
    
    if (rolesControl["productimages/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deletemenuimage = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["productimages/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }


exports.uploadproductimage = (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["productimages/add"]) {
      if (req.file)
        var pathName = path.normalize(req.file.path);
        
        return res.json({
          msg: "image successfully uploaded",
          path: pathName,
          mimeType: req.file.mimetype
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deleteproductimage = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["productimages/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

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

exports.uploadcargoimage = (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["cargoes/add"]) {
      console.log(req.file);
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deletecargoimage = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["cargoes/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

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

exports.uploadorderstatusimage = (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["orderstatus/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deleteorderstatusimage = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["orderstatus/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

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

exports.uploadpaymentmethodsimage = (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["paymentmethods/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deletepaymentmethodsimage = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["paymentmethods/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

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

exports.uploadbrandsimage = (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["brands/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deletebrandsimage = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["brands/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

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

exports.uploadhomesliderimage = (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["homeslider/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deletehomesliderimage = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["homeslider/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }





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

exports.uploadlogoimage = (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["superadmin"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.deletelogoimage = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["superadmin"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

  //certification image manage

exports.uploadcertificationimage = (req, res) => {
    if (req.file)
      return res.json({
        msg: "image successfully uploaded",
        path: req.file.path,
      });
    res.send("Image upload failed");
  }

exports.deletecertificationimage = (req, res) => {
    try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
  }


//upload common image
exports.uploadcommonimage = (req, res) => {
  if (req.file)
    return res.json({
      msg: "image successfully uploaded",
      path: req.file.path,
    });
  res.send("Image upload failed");
}

exports.deletecommonimage = (req, res) => {
  try {
      fs.unlinkSync("./public" + req.body.path);
    } catch (e) {
      console.log("not image");
    }
}



//category image manage
exports.uploadCategoryImage = (req, res) => {
  if (req.file)
    return res.json({
      msg: "image successfully uploaded",
      path: req.file.path,
    });
  res.send("Image upload failed");
}

exports.deleteCategoryImage = (req, res) => {
  try {
      fs.unlinkSync("./public" + req.body.path);
    } catch (e) {
      console.log("not image");
    }
}

//category banner manage
exports.uploadCategoryBanner = (req, res) => {
  if (req.file)
    return res.json({
      msg: "image successfully uploaded",
      path: req.file.path,
    });
  res.send("Image upload failed");
}

exports.deleteCategoryBanner = (req, res) => {
  try {
      fs.unlinkSync("./public" + req.body.path);
    } catch (e) {
      console.log("not image");
    }
}
//Promise image manage
exports.uploadPromiseImage = (req, res) => {
  if (req.file)
    return res.json({
      msg: "image successfully uploaded",
      path: req.file.path,
    });
  res.send("Image upload failed");
}

exports.deletePromiseImage = (req, res) => {
  try {
      fs.unlinkSync("./public" + req.body.path);
    } catch (e) {
      console.log("not image");
    }
}

//Occassion image manage
exports.uploadOccassionImage = (req, res) => {
  if (req.file)
    return res.json({
      msg: "image successfully uploaded",
      path: req.file.path,
    });
  res.send("Image upload failed");
}

exports.deleteOccassionImage = (req, res) => {
  try {
      fs.unlinkSync("./public" + req.body.path);
    } catch (e) {
      console.log("not image");
    }
}

//Banner image manage
exports.uploadBannerImage = (req, res) => {
  if (req.file)
    return res.json({
      msg: "image successfully uploaded",
      path: req.file.path,
    });
  res.send("Image upload failed");
}

exports.deleteBannerImage = (req, res) => {
  try {
      fs.unlinkSync("./public" + req.body.path);
    } catch (e) {
      console.log("not image");
    }
}

//variant pdf manage
exports.uploadVariantPdf = (req, res) => {
  if (req.file)
    return res.json({
      msg: "pdf successfully uploaded",
      path: req.file.path,
    });
  res.send("Pdf upload failed");
}

exports.deleteVariantPdf = (req, res) => {
  try {
      fs.unlinkSync("./public" + req.body.path);
    } catch (e) {
      console.log("not image");
    }
}

//upload return images
exports.uploadReturnImage = (req, res) => {
  if (req.files)
    return res.json({
      msg: "images successfully uploaded",
      path: req.files.map((file)=>file.path),
    });
  res.send("images upload failed");
}

//upload review images
exports.uploadReviewImage = (req, res) => {
  if (req.files)
    return res.json({
      msg: "images successfully uploaded",
      path: req.files.map((file)=>file.path),
    });
  res.send("Pdf upload failed");
}
//upload profile images
exports.uploadProfileImage = (req, res) => {
  if (req.file)
    return res.json({
      msg: "image successfully uploaded",
      path: req.file.path,
    });
  res.send("Image upload failed");
}

//upload review images
exports.getGodachiCss = (req, res) => {
  const buffer = fs.readFileSync("./public/godachi.css");
  const fileContent = buffer.toString();
  res.json(fileContent)
}

exports.updateGodachiCss = async (req, res) => {
  await fs.writeFileSync("./public/godachi.css", req.body.content);
  
  res.json({
    success: true
  })
}
exports.getGodachiAdminCss = (req, res) => {
  const buffer = fs.readFileSync("./public/godachiAdmin.css");
  const fileContent = buffer.toString();
  res.json(fileContent)
}

exports.updateGodachiAdminCss = async (req, res) => {
  await fs.writeFileSync("./public/godachiAdmin.css", req.body.content);
  
  res.json({
    success: true
  })
}
