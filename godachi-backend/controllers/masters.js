const router = require("express").Router();
const passport = require("passport");
let PurchaseIncludes = require("../models/purchaseincludes.model");
let Promises = require("../models/promises.model");
let Certifications = require("../models/certifications.model");
let Occassions = require("../models/occassions.model");
let Tags = require("../models/tags.model");
let Metals = require("../models/metals.model");
let MetalPurity = require("../models/metalpurity.model");
let MetalColors = require("../models/metalcolors.model");
let StoneColors = require("../models/stoneColors.model");
let Stones = require("../models/stones.model");
let StoneVariants = require("../models/stonevariants.model");
let StoneVariantList = require("../models/stoneVariantList.model");
let StoneVariantPricing = require("../models/stoneVariantPricing.model");
let DiamondVariants = require("../models/diamondVariants.model");
let DiamondVariantList = require("../models/diamondVariantList.model");
let DiamondVariantPricing = require("../models/diamondVariantPricing.model");
let Purity = require("../models/purity.model");
let Faqs = require("../models/faqs.model");
let Categories = require("../models/categories.model");
let Vendors = require("../models/vendors.model");
let States = require("../models/state.model");

const title = "Masters";
const roleTitle = "masters";

exports.getStates = async(req,res)=>{
  try{
    var allStates = await States.find().sort({name:1});
    res.json({
      success: true,
      result: allStates
    })
  }
  catch(error){
    res.json({
      success: false,
      error: error.message
    })
  }
}

//-------------PurchaseInclude Controllers----------------//
// get all items
exports.getAllPurchaseInclude = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    PurchaseIncludes.find().sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    PurchaseIncludes.find({
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// post new items
exports.addPurchaseInclude = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    new PurchaseIncludes(req.body)
      .save()

      .then(() =>
        res.json({
          messagge: title + " Added",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: " Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// fetch data by id
exports.getByIdPurchaseInclude = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    PurchaseIncludes.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    PurchaseIncludes.findOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// delete data by id
exports.deleteByIdPurchaseInclude = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "delete"]) {
    PurchaseIncludes.findByIdAndDelete(req.params.id)
      .then(() =>
        res.json({
          messagge: title + " Deleted",
          master: "info",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    PurchaseIncludes.deleteOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((resdata) => {
        if (resdata.deletedCount > 0) {
          res.json({
            messagge: title + " delete",
            master: "success",
          });
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// update data by id
exports.updatePurchaseInclude = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/id"]) {
    PurchaseIncludes.findByIdAndUpdate(req.params.id, req.body)
      .then(() =>
        res.json({
          messagge: title + " Update",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    PurchaseIncludes.findOneAndUpdate(
      {
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      },
      req.body
    )
      .then((resdata) => {
        if (resdata) {
          res.json({
            messagge: title + " Update",
            master: "success",
          });
        } else {
          res.json({
            messagge: " You are not authorized, go away!",
            master: "error",
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

//-------------Promise Controllers----------------//
// get all items
exports.getAllPromise = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Promises.find().sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Promises.find({
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// post new items
exports.addPromise = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    new Promises(req.body)
      .save()

      .then(() =>
        res.json({
          messagge: title + " Added",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: " Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// fetch data by id
exports.getByIdPromise = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Promises.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Promises.findOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// delete data by id
exports.deleteByIdPromise = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "delete"]) {
    Promises.findByIdAndDelete(req.params.id)
      .then(() =>
        res.json({
          messagge: title + " Deleted",
          master: "info",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Promises.deleteOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((resdata) => {
        if (resdata.deletedCount > 0) {
          res.json({
            messagge: title + " delete",
            master: "success",
          });
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// update data by id
exports.updatePromise = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/id"]) {
    Promises.findByIdAndUpdate(req.params.id, req.body)
      .then(() =>
        res.json({
          messagge: title + " Update",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Promises.findOneAndUpdate(
      {
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      },
      req.body
    )
      .then((resdata) => {
        if (resdata) {
          res.json({
            messagge: title + " Update",
            master: "success",
          });
        } else {
          res.json({
            messagge: " You are not authorized, go away!",
            master: "error",
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

//-------------Occassion Controllers----------------//
// get all items
exports.getAllOccassion = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Occassions.find().sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Occassions.find({
        "created_user.id": `${req.user._id}`,
      }).sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// post new items
exports.addOccassion = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new Occassions(req.body)
        .save()

        .then(() =>
          res.json({
            messagge: title + " Added",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: " Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// fetch data by id
exports.getByIdOccassion = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Occassions.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Occassions.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteByIdOccassion = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      Occassions.findByIdAndDelete(req.params.id)
        .then(() =>
          res.json({
            messagge: title + " Deleted",
            master: "info",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Occassions.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((resdata) => {
          if (resdata.deletedCount > 0) {
            res.json({
              messagge: title + " delete",
              master: "success",
            });
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// update data by id
exports.updateOccassion = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Occassions.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Occassions.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        req.body
      )
        .then((resdata) => {
          if (resdata) {
            res.json({
              messagge: title + " Update",
              master: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              master: "error",
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

//-------------Tag Controllers----------------//
// get all items
exports.getAllTags = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Tags.find().sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Tags.find({
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// post new items
exports.addTags = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    new Tags(req.body)
      .save()

      .then(() =>
        res.json({
          messagge: title + " Added",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: " Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// fetch data by id
exports.getByIdTags = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Tags.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Tags.findOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// delete data by id
exports.deleteByIdTags = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "delete"]) {
    Tags.findByIdAndDelete(req.params.id)
      .then(() =>
        res.json({
          messagge: title + " Deleted",
          master: "info",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Tags.deleteOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((resdata) => {
        if (resdata.deletedCount > 0) {
          res.json({
            messagge: title + " delete",
            master: "success",
          });
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// update data by id
exports.updateTags = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/id"]) {
    Tags.findByIdAndUpdate(req.params.id, req.body)
      .then(() =>
        res.json({
          messagge: title + " Update",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Tags.findOneAndUpdate(
      {
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      },
      req.body
    )
      .then((resdata) => {
        if (resdata) {
          res.json({
            messagge: title + " Update",
            master: "success",
          });
        } else {
          res.json({
            messagge: " You are not authorized, go away!",
            master: "error",
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

//-------------Certification Controllers----------------//
// get all items
exports.getAllCertification = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Certifications.find().sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Certifications.find({
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// post new items
exports.addCertification = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    new Certifications(req.body)
      .save()

      .then(() =>
        res.json({
          messagge: title + " Added",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: " Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// fetch data by id
exports.getByIdCertification = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Certifications.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Certifications.findOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// delete data by id
exports.deleteByIdCertification = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "delete"]) {
    Certifications.findByIdAndDelete(req.params.id)
      .then(() =>
        res.json({
          messagge: title + " Deleted",
          master: "info",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Certifications.deleteOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((resdata) => {
        if (resdata.deletedCount > 0) {
          res.json({
            messagge: title + " delete",
            master: "success",
          });
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// update data by id
exports.updateCertification = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/id"]) {
    Certifications.findByIdAndUpdate(req.params.id, req.body)
      .then(() =>
        res.json({
          messagge: title + " Update",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Certifications.findOneAndUpdate(
      {
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      },
      req.body
    )
      .then((resdata) => {
        if (resdata) {
          res.json({
            messagge: title + " Update",
            master: "success",
          });
        } else {
          res.json({
            messagge: " You are not authorized, go away!",
            master: "error",
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

//-------------Metals Controllers----------------//
// get all items
exports.getAllMetalsWithVariants = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Metals.find().populate("purity").sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Metals.find({
        "created_user.id": `${req.user._id}`,
      }).sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }
// get all items
exports.getAllMetals = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Metals.find().sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Metals.find({
        "created_user.id": `${req.user._id}`,
      }).sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// post new items
exports.addMetals = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new Metals(req.body)
        .save()

        .then(() =>
          res.json({
            messagge: title + " Added",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: " Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// fetch data by id
exports.getByIdMetals = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Metals.findById(req.params.id).populate("purity")
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Metals.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      }).populate("purity")
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteByIdMetals = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      Metals.findByIdAndDelete(req.params.id)
        .then(() =>
          res.json({
            messagge: title + " Deleted",
            master: "info",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Metals.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((resdata) => {
          if (resdata.deletedCount > 0) {
            res.json({
              messagge: title + " delete",
              master: "success",
            });
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// update data by id
exports.updateMetals = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Metals.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Metals.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        req.body
      )
        .then((resdata) => {
          if (resdata) {
            res.json({
              messagge: title + " Update",
              master: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              master: "error",
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

exports.addEditMetals = async (req,res) =>{
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    var metalDetails = req.body;
    const {purity, ...metalDetail} = metalDetails;
    try{
      if(metalDetails._id){
        var dbMetal = await Metals.findByIdAndUpdate(metalDetails._id, metalDetail);
      }
      else{
        var dbMetal = await new Metals(metalDetail).save();
      }
      if(dbMetal){
        var purityIds=[];
        for(const purityDetail of purity){
          let purityId;
          purityDetail.metal = dbMetal._id;
          purityDetail.created_user = metalDetails.created_user;
          if(purityDetail._id){
            purityId = purityDetail._id;
            await MetalPurity.findByIdAndUpdate(purityDetail._id, purityDetail);
          }
          else{
            var newPurity = await new MetalPurity(purityDetail).save();
            purityId = newPurity._id;
          }
          purityIds.push(purityId);
        }
        if(purityIds.length>0)
          await MetalPurity.deleteMany({metal:dbMetal, _id:{$nin:purityIds}});
      }
      return res.json({
        messagge: title + " Added",
        master: "success",
      })
    }
    catch(error){
      return res.json({
          messagge: " Error: " + error,
          master: "error",
        })
    }
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

//-------------Metal Colors Controllers----------------//
// get all items
exports.getAllMetalColors = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      MetalColors.find().sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      MetalColors.find({
        "created_user.id": `${req.user._id}`,
      }).sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// post new items
exports.addMetalColors = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new MetalColors(req.body)
        .save()

        .then(() =>
          res.json({
            messagge: title + " Added",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: " Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// fetch data by id
exports.getByIdMetalColors = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      MetalColors.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      MetalColors.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteByIdMetalColors = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      MetalColors.findByIdAndDelete(req.params.id)
        .then(() =>
          res.json({
            messagge: title + " Deleted",
            master: "info",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      MetalColors.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((resdata) => {
          if (resdata.deletedCount > 0) {
            res.json({
              messagge: title + " delete",
              master: "success",
            });
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// update data by id
exports.updateMetalColors = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      MetalColors.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      MetalColors.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        req.body
      )
        .then((resdata) => {
          if (resdata) {
            res.json({
              messagge: title + " Update",
              master: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              master: "error",
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

//-------------Stones Controllers----------------//
// get all items
exports.getAllStonesWithVariants = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Stones.find().sort({createdAt:-1})
      .populate({
        path: "variants",
        populate: ["variants"]
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Stones.find({
        "created_user.id": `${req.user._id}`,
      }).populate({
        path: "variants",
        populate: ["variants"]
      }).sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }
// get all items
exports.getAllStones = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Stones.find().sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Stones.find({
        "created_user.id": `${req.user._id}`,
      }).sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// post new items
exports.addStones = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new Stones(req.body)
        .save()

        .then(() =>
          res.json({
            messagge: title + " Added",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: " Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// fetch data by id
exports.getByIdStones = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Stones.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Stones.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteByIdStones = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      Stones.findByIdAndDelete(req.params.id)
        .then(() =>
          res.json({
            messagge: title + " Deleted",
            master: "info",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Stones.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((resdata) => {
          if (resdata.deletedCount > 0) {
            res.json({
              messagge: title + " delete",
              master: "success",
            });
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// update data by id
exports.updateStones = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Stones.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Stones.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        req.body
      )
        .then((resdata) => {
          if (resdata) {
            res.json({
              messagge: title + " Update",
              master: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              master: "error",
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

//-------------StoneVariants Controllers----------------//
// get all items
exports.getAllStoneVariants = (req, res) => {
    const rolesControl = req.user.role;
    var stoneId = req.params.stoneId;
    if (rolesControl[roleTitle + "/list"]) {
      StoneVariants.find({stone:stoneId}).populate("variants").sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      StoneVariants.find({
        "created_user.id": `${req.user._id}`,
      }).populate("variants").sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// post new items
exports.addStoneVariants = async (req, res) => {
    const rolesControl = req.user.role;
    var stoneId = req.params.stoneId;
    if (rolesControl[roleTitle + "/add"]) {
      try{
        req.body.stone = stoneId;
        const variantDetails = req.body;
        const {variants, ...variantDetail} = variantDetails;
        var dbStoneVariant = await new StoneVariants(variantDetail).save();
        for(const variant of variants){
          variant.stoneVariant = dbStoneVariant._id;
          variant.created_user = dbStoneVariant.created_user;
          await new StoneVariantList(variant).save();
        }
        return res.json({
          messagge: title + " Added",
          master: "success",
        })
      }
      catch(err){
        return res.json({
          messagge: " Error: " + err,
          master: "error",
        })
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// fetch data by id
exports.getByIdStoneVariants = (req, res) => {
    const rolesControl = req.user.role;
    var stoneId = req.params.stoneId;
    if (rolesControl[roleTitle + "/list"]) {
      StoneVariants.findById(req.params.id).populate("variants")
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      StoneVariants.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      }).populate("variants")
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteByIdStoneVariants = async (req, res) => {
    const rolesControl = req.user.role;
    var stoneId = req.params.id;
    if (rolesControl[roleTitle + "delete"]) {
      try{
        await StoneVariantList.deleteMany({stoneVariant:stoneId});
        await StoneVariants.findByIdAndDelete(stoneId);
        return res.json({
          messagge: title + " Deleted",
          master: "info",
        })
      }
      catch(err){
        return  res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      }
    } else if (rolesControl[roleTitle + "onlyyou"]) {

      try{
        var deletedData = await StoneVariants.deleteOne({
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        })
        if (deletedData.deletedCount > 0) {
          await StoneVariantList.deleteMany({stoneVariant:stoneId});
          return res.json({
            messagge: title + " delete",
            master: "success",
          });
        } else {
          return res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      }
      catch(err){
        return  res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      }

      
    } else {
      return res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// update data by id
exports.updateStoneVariants = async (req, res) => {
    const rolesControl = req.user.role;
    var stoneId = req.params.id;
    var variantDetails = req.body;
    const {variants, ...variantDetail} = variantDetails;
    if (rolesControl[roleTitle + "/id"]) {
      try{
        var dbStoneVariant =  await StoneVariants.findByIdAndUpdate(stoneId,variantDetail)
        var allVaraintsIds = [];
        for(const variant of variants){
          if(variant._id){
            var variantListId = await StoneVariantList.findByIdAndUpdate(variant._id, variant)
          }else{
            variant.stoneVariant = dbStoneVariant._id;
            variant.created_user = dbStoneVariant.created_user;
            var variantListId = await new StoneVariantList(variant).save();
          }
          if(variantListId){
            allVaraintsIds.push(variantListId._id);
          }
        }
        if(allVaraintsIds.length>0){
          await StoneVariantList.deleteMany({stoneVariant:dbStoneVariant._id, _id:{$nin:allVaraintsIds}});
        }
        return res.json({
          messagge: title + " Update",
          master: "success",
        })
      }
      catch(err){
        return res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      }
    } else if (rolesControl[roleTitle + "onlyyou"]) {

      try{
        var dbStoneVariant =  await StoneVariants.findOneAndUpdate(
          {
            _id: req.params.id,
            "created_user.id": `${req.user._id}`,
          },
          variantDetail
        )
        if (dbStoneVariant) {
          var allVaraintsIds = [];
          for(const variant of variants){
            if(variant._id){
              var variantListId = await StoneVariantList.findByIdAndUpdate(variant._id, variant)
            }else{
              variant.stoneVariant = dbStoneVariant._id;
              variant.created_user = dbStoneVariant.created_user;
              var variantListId = await new StoneVariantList(variant).save();
            }
            if(variantListId){
              allVaraintsIds.push(variantListId._id);
            }
          }
          if(allVaraintsIds.length>0){
            await StoneVariantList.deleteMany({stoneVariant:dbStoneVariant._id, _id:{$nin:allVaraintsIds}});
          }
          res.json({
            messagge: title + " Update",
            master: "success",
          });
        } else {
          res.json({
            messagge: " You are not authorized, go away!",
            master: "error",
          });
        }
      }
      catch(err){
        return res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }


//-------------Stone Colors Controllers----------------//
// get all items
exports.getAllStoneColors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    StoneColors.find().sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    StoneColors.find({
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// post new items
exports.addStoneColors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    new StoneColors(req.body)
      .save()

      .then(() =>
        res.json({
          messagge: title + " Added",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: " Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// fetch data by id
exports.getByIdStoneColors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    StoneColors.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    StoneColors.findOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// delete data by id
exports.deleteByIdStoneColors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "delete"]) {
    StoneColors.findByIdAndDelete(req.params.id)
      .then(() =>
        res.json({
          messagge: title + " Deleted",
          master: "info",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    StoneColors.deleteOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((resdata) => {
        if (resdata.deletedCount > 0) {
          res.json({
            messagge: title + " delete",
            master: "success",
          });
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// update data by id
exports.updateStoneColors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/id"]) {
    StoneColors.findByIdAndUpdate(req.params.id, req.body)
      .then(() =>
        res.json({
          messagge: title + " Update",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    StoneColors.findOneAndUpdate(
      {
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      },
      req.body
    )
      .then((resdata) => {
        if (resdata) {
          res.json({
            messagge: title + " Update",
            master: "success",
          });
        } else {
          res.json({
            messagge: " You are not authorized, go away!",
            master: "error",
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}


//-------------DiamondVariants Controllers----------------//
// get all items
exports.getAllDiamondVariants = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    DiamondVariants.find({}).populate("variants").sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    DiamondVariants.find({
      "created_user.id": `${req.user._id}`,
    }).populate("variants").sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// post new items
exports.addDiamondVariants = async (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    try{
      const variantDetails = req.body;
      const {variants, ...variantDetail} = variantDetails;
      var dbDiamondVariant = await new DiamondVariants(variantDetail).save();
      for(const variant of variants){
        variant.diamondVariant = dbDiamondVariant._id;
        variant.created_user = dbDiamondVariant.created_user;
        await new DiamondVariantList(variant).save();
      }
      return res.json({
        messagge: title + " Added",
        master: "success",
      })
    }
    catch(err){
      return res.json({
        messagge: " Error: " + err,
        master: "error",
      })
    }
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// fetch data by id
exports.getByIdDiamondVariants = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    DiamondVariants.findById(req.params.id).populate("variants")
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    DiamondVariants.findOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    }).populate("variants")
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// delete data by id
exports.deleteByIdDiamondVariants = async (req, res) => {
  const rolesControl = req.user.role;
  var diamondVariantId = req.params.id;
  if (rolesControl[roleTitle + "delete"]) {
    try{
      await DiamondVariantList.deleteMany({diamondVariant:diamondVariantId});
      await DiamondVariants.findByIdAndDelete(diamondVariantId);
      return res.json({
        messagge: title + " Deleted",
        master: "info",
      })
    }
    catch(err){
      return  res.json({
        messagge: "Error: " + err,
        master: "error",
      })
    }
  } else if (rolesControl[roleTitle + "onlyyou"]) {

    try{
      var deletedData = await DiamondVariants.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
      if (deletedData.deletedCount > 0) {
        await DiamondVariantList.deleteMany({diamondVariant:diamondVariantId});
        return res.json({
          messagge: title + " delete",
          master: "success",
        });
      } else {
        return res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            master: "error",
          },
        });
      }
    }
    catch(err){
      return  res.json({
        messagge: "Error: " + err,
        master: "error",
      })
    }

    
  } else {
    return res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// update data by id
exports.updateDiamondVariants = async (req, res) => {
  const rolesControl = req.user.role;
  var diamondVariantId = req.params.id;
  var variantDetails = req.body;
  const {variants, ...variantDetail} = variantDetails;
  if (rolesControl[roleTitle + "/id"]) {
    try{
      var dbDiamondVariant =  await DiamondVariants.findByIdAndUpdate(diamondVariantId,variantDetail)
      var allVaraintsIds = [];
      for(const variant of variants){
        if(variant._id){
          var variantListId = await DiamondVariantList.findByIdAndUpdate(variant._id, variant)
        }else{
          variant.diamondVariant = dbDiamondVariant._id;
          variant.created_user = dbDiamondVariant.created_user;
          var variantListId = await new DiamondVariantList(variant).save();
        }
        if(variantListId){
          allVaraintsIds.push(variantListId._id);
        }
      }
      if(allVaraintsIds.length>0){
        await DiamondVariantList.deleteMany({diamondVariant:dbDiamondVariant._id, _id:{$nin:allVaraintsIds}});
      }
      return res.json({
        messagge: title + " Update",
        master: "success",
      })
    }
    catch(err){
      return res.json({
        messagge: "Error: " + err,
        master: "error",
      })
    }
  } else if (rolesControl[roleTitle + "onlyyou"]) {

    try{
      var dbDiamondVariant =  await DiamondVariants.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        variantDetail
      )
      if (dbDiamondVariant) {
        var allVaraintsIds = [];
        for(const variant of variants){
          if(variant._id){
            var variantListId = await DiamondVariantList.findByIdAndUpdate(variant._id, variant)
          }else{
            variant.diamondVariant = dbDiamondVariant._id;
            variant.created_user = dbDiamondVariant.created_user;
            var variantListId = await new DiamondVariantList(variant).save();
          }
          if(variantListId){
            allVaraintsIds.push(variantListId._id);
          }
        }
        if(allVaraintsIds.length>0){
          await DiamondVariantList.deleteMany({diamondVariant:dbDiamondVariant._id, _id:{$nin:allVaraintsIds}});
        }
        res.json({
          messagge: title + " Update",
          master: "success",
        });
      } else {
        res.json({
          messagge: " You are not authorized, go away!",
          master: "error",
        });
      }
    }
    catch(err){
      return res.json({
        messagge: "Error: " + err,
        master: "error",
      })
    }
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

//-------------Purity Controllers----------------//
// get all items
exports.getAllPurity = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Purity.find().sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Purity.find({
        "created_user.id": `${req.user._id}`,
      }).sort({createdAt:-1})
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// post new items
exports.addPurity = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new Purity(req.body)
        .save()

        .then(() =>
          res.json({
            messagge: title + " Added",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: " Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// fetch data by id
exports.getByIdPurity = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Purity.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Purity.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteByIdPurity = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      Purity.findByIdAndDelete(req.params.id)
        .then(() =>
          res.json({
            messagge: title + " Deleted",
            master: "info",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Purity.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((resdata) => {
          if (resdata.deletedCount > 0) {
            res.json({
              messagge: title + " delete",
              master: "success",
            });
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                master: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// update data by id
exports.updatePurity = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Purity.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            master: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Purity.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        req.body
      )
        .then((resdata) => {
          if (resdata) {
            res.json({
              messagge: title + " Update",
              master: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              master: "error",
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }


  //-------------Faqs Controllers----------------//
// get all items
exports.getAllFaqsByCategory = (req, res) => {
  const rolesControl = req.user.role;
  const category_id = req.params.category_id;
  if (rolesControl[roleTitle + "/list"]) {
    Faqs.find({typeId:category_id}).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Faqs.find({
      typeId:category_id,
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// post new items
exports.addFaqs = async (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    try{
      var typeId = (req.body.typeId != "")?req.body.typeId:null;
      var allFaqs = req.body.faqs;
      var allFaqIds = [];
      for(const faq of allFaqs){
        let faqId;
        if(typeId)
          faq.typeId = typeId;
        faq.created_user = req.body.created_user;
        if(faq._id){
          faqId = faq._id;
          await Faqs.findByIdAndUpdate(faqId, faq);
        }
        else{
          var newFaq = await new Faqs(faq).save();
          faqId = newFaq._id;
        }
        allFaqIds.push(faqId);
      }
      if(allFaqIds.length>0){
        await Faqs.deleteMany({typeId:typeId , _id:{$nin:allFaqIds}});
      }
      return res.json({
        messagge: title + " Added",
        master: "success",
      })
    }
    catch(error){
      return res.json({
        messagge: " Error: " + error,
        master: "error",
      })
    }
  } else {
    return res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// fetch data by id
exports.getByIdFaqs = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Faqs.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Faqs.findOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// delete data by id
exports.deleteByIdFaqs = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "delete"]) {
    Faqs.findByIdAndDelete(req.params.id)
      .then(() =>
        res.json({
          messagge: title + " Deleted",
          master: "info",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Faqs.deleteOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((resdata) => {
        if (resdata.deletedCount > 0) {
          res.json({
            messagge: title + " delete",
            master: "success",
          });
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// update data by id
exports.updateFaqs = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/id"]) {
    Faqs.findByIdAndUpdate(req.params.id, req.body)
      .then(() =>
        res.json({
          messagge: title + " Update",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Faqs.findOneAndUpdate(
      {
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      },
      req.body
    )
      .then((resdata) => {
        if (resdata) {
          res.json({
            messagge: title + " Update",
            master: "success",
          });
        } else {
          res.json({
            messagge: " You are not authorized, go away!",
            master: "error",
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// get all items
exports.getPubFaqsByCategory = async (req, res) => {
  const category_id = req.params.category_id;
  var allCategories = await Categories.getParentIds(category_id);
  try{
    var faqList = await Faqs.find({$or:[
      {typeId:{$in:allCategories}},
      {typeId:{$exists:false}},
    ]}).sort({createdAt:-1})
    return res.json(faqList);
  }
  catch(error){
    return res.json({
      messagge: "Error: " + err,
      master: "error",
    })
  }
}

/* exports.addEditFaqs = async (req,res) =>{
const rolesControl = req.user.role;
if (rolesControl[roleTitle + "/add"]) {
  var faqDetails = req.body;
  try{
    if(faqDetails._id){
      await Faqs.findByIdAndUpdate(faqDetails._id, faqDetails);
    }
    else{
      faqDetails.type="common";
      await new Faqs(faqDetails).save();
    }
    return res.json({
      messagge: title + " Added",
      master: "success",
    })
  }
  catch(error){
    return res.json({
        messagge: " Error: " + error,
        master: "error",
      })
  }
} else {
  res.status(403).json({
    message: {
      messagge: "You are not authorized, go away!",
      master: "error",
    },
  });
}
}
 */

exports.updateMetalPricing = async (req,res) =>{
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    var pricingDetails = req.body;
    try{
      for (const [key, value] of Object.entries(pricingDetails)) {
        var metalId = key;
        var metalDetails = value;
        if(metalDetails.price){
          await Metals.findByIdAndUpdate(metalId, {price: metalDetails.price});
        }
        if(metalDetails.variant_price){
          var variantPrices = metalDetails.variant_price;
          for (const [variantId, variantPrice] of Object.entries(variantPrices)) {
            if(variantId && variantPrice){
              await MetalPurity.findByIdAndUpdate(variantId, {price: variantPrice});
            }
          }
        }
      }
      return res.json({
        messagge: title + " Added",
        master: "success",
      })
    }
    catch(error){
      return res.json({
          messagge: " Error: " + error,
          master: "error",
        })
    }
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

exports.updateStonePricing = async (req,res) =>{
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    var pricingDetails = req.body;
    try{
      for (const [key, value] of Object.entries(pricingDetails)) {
        var stoneId = key;
        var {variant_price,...stoneDetails} = value;
        var insertedIds = [];
        var stoneData =  {
          priceType: stoneDetails.priceType,
          weightUnit: stoneDetails.weightUnit
        }
        var unsetData ={};
        if(stoneDetails.price)
          stoneData.price = stoneDetails.price;
        else
          unsetData.price = 1;
        await Stones.findOneAndUpdate({_id:stoneId}, {$set:stoneData,$unset:unsetData});
        if(!stoneDetails.price){
          for (const variantPrice of variant_price) {
            if(variantPrice.price){
              var data ={
                stone: stoneId,
                variant_id:variantPrice.variant_id,
                price: variantPrice.price
              }
              var pricingId = await StoneVariantPricing.findOneAndUpdate(
                {
                  stone: stoneId,
                  variant_id:variantPrice.variant_id
                },
                {$set:data},
                {
                  upsert:true,
                  new: true
                }
              )
              insertedIds.push(pricingId._id);
            }
          }
        }
       
        if(insertedIds.length > 0){
          await StoneVariantPricing.deleteMany({stone:stoneId, _id:{$nin:insertedIds}})
        }
      }
      return res.json({
        messagge: title + " Added",
        master: "success",
      })
    }
    catch(error){
      return res.json({
          messagge: " Error: " + error,
          master: "error",
        })
    }
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

exports.getStonePricing = (req, res) => {
  const rolesControl = req.user.role;
  const category_id = req.params.category_id;
  if (rolesControl[roleTitle + "/list"]) {
    StoneVariantPricing.find({}).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    StoneVariantPricing.find({
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

exports.getAllStonesWithVariantsPricing = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Stones.find().sort({createdAt:-1})
    .populate({
      path: "variants",
      populate: ["variants"]
    })
    .populate("variant_price")
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Stones.find({
      "created_user.id": `${req.user._id}`,
    }).populate({
      path: "variants",
      populate: ["variants"]
    })
    .populate("variant_price")
    .sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

exports.updateDiamondPricing = async (req,res) =>{
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    var pricingDetails = req.body;
    try{
      var insertedIds = [];
      for (const variantPrice of pricingDetails.variant_price) {
        if(variantPrice.price){
          var data ={
            variant_id:variantPrice.variant_id,
            price: variantPrice.price
          }
          var pricingId = await DiamondVariantPricing.findOneAndUpdate(
            {
              variant_id:variantPrice.variant_id
            },
            {$set:data},
            {
              upsert:true,
              new: true
            }
          )
          insertedIds.push(pricingId._id);
        }
      }
      if(insertedIds.length > 0){
        await DiamondVariantPricing.deleteMany({_id:{$nin:insertedIds}})
      }

      return res.json({
        messagge: title + " Added",
        master: "success",
      })
    }
    catch(error){
      return res.json({
          messagge: " Error: " + error,
          master: "error",
        })
    }
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

exports.getDiamondPricing = (req, res) => {
  const rolesControl = req.user.role;
  const category_id = req.params.category_id;
  if (rolesControl[roleTitle + "/list"]) {
    DiamondVariantPricing.find({}).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    DiamondVariantPricing.find({
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

exports.getAllDiamondWithVariantsPricing = async (req, res) => {
  try{
    var diamondVariants = await DiamondVariants.find({}).populate("variants").sort({createdAt:-1});
    var diamondVariantPricing = await DiamondVariantPricing.find({}).sort({createdAt:-1});
    res.json({
      diamondVariants,
      diamondVariantPricing
    });
  }
  catch(error){
    res.json({
      messagge: "Error: " + error,
      master: "error",
    })
  }
}

//-------------Vendors Controllers----------------//
// get all items
exports.getAllVendors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Vendors.find().sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Vendors.find({
      "created_user.id": `${req.user._id}`,
    }).sort({createdAt:-1})
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// post new items
exports.addVendors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    new Vendors(req.body)
      .save()

      .then(() =>
        res.json({
          messagge: title + " Added",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: " Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// fetch data by id
exports.getByIdVendors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Vendors.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Vendors.findOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// delete data by id
exports.deleteByIdVendors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "delete"]) {
    Vendors.findByIdAndDelete(req.params.id)
      .then(() =>
        res.json({
          messagge: title + " Deleted",
          master: "info",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Vendors.deleteOne({
      _id: req.params.id,
      "created_user.id": `${req.user._id}`,
    })
      .then((resdata) => {
        if (resdata.deletedCount > 0) {
          res.json({
            messagge: title + " delete",
            master: "success",
          });
        } else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              master: "error",
            },
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}

// update data by id
exports.updateVendors = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/id"]) {
    Vendors.findByIdAndUpdate(req.params.id, req.body)
      .then(() =>
        res.json({
          messagge: title + " Update",
          master: "success",
        })
      )
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Vendors.findOneAndUpdate(
      {
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      },
      req.body
    )
      .then((resdata) => {
        if (resdata) {
          res.json({
            messagge: title + " Update",
            master: "success",
          });
        } else {
          res.json({
            messagge: " You are not authorized, go away!",
            master: "error",
          });
        }
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        messagge: "You are not authorized, go away!",
        master: "error",
      },
    });
  }
}