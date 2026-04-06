
let WebFaqs = require("../models/webFaq.model");
let WebFaqsCategory = require("../models/webFaqCategory.model");
let Awards = require("../models/awards.model");

const title = "Masters";
const roleTitle = "masters";

//-------------Awards Controllers----------------//
//getAwardsList
exports.getAwardsList = async (req, res) => {
  try{
    var list = await Awards.find().sort({createdAt:-1});
    return res.json({
      messagge: "Award Details fetched successfully",
      variant: "success",
      result: list
    })
  }
  catch(error){
    return res.json({
      messagge: "Error:( " + error.message,
      variant: "error",
    })
  }
}
// get all items
exports.getAllAwards = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Awards.find().sort({createdAt:-1})
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
    Awards.find({
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
exports.addAwards = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/add"]) {
    new Awards(req.body)
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
exports.getByIdAwards = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/list"]) {
    Awards.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          master: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Awards.findOne({
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
exports.deleteByIdAwards = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "delete"]) {
    Awards.findByIdAndDelete(req.params.id)
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
    Awards.deleteOne({
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
exports.updateAwards = (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/id"]) {
    Awards.findByIdAndUpdate(req.params.id, req.body)
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
    Awards.findOneAndUpdate(
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


//-------------Web Faq Category Controllers------------//
//get faq category
exports.getFaqsCategory = async (req, res) => {
    try{
        var allCategories = await WebFaqsCategory.find({});
        return res.json({
            success: true,
            message: "Success",
            result: allCategories
        });
    }
    catch(error){
        return res.json({
            success: false,
            message: error
        })
    }
}
//get by id
exports.getFaqsCategoryById = async (req, res) => {
    try{
        var id = req.params.id;
        var allCategories = await WebFaqsCategory.findOne({_id: id});
        return res.json({
            success: true,
            message: "Success",
            result: allCategories
        });
    }
    catch(error){
        return res.json({
            success: false,
            message: error
        })
    }
}
//add faq category
exports.addFaqsCategory = async (req, res) => {
    try{
        var id = req.params.id;
        var {name, created_user}= req.body;
        if(id){
            await WebFaqsCategory.updateOne({_id: id},{$set:{name: name, created_user: created_user}});
        }
        else{
            await new WebFaqsCategory({
                name: name,
                created_user: created_user
            }).save();
        }
        return res.json({
            success: true,
            message: "Success"
        });
    }
    catch(error){
        return res.json({
            success: false,
            message: error
        })
    }
}
//delete faq category
exports.deleteFaqsCategoryById = async (req, res) => {
    try{
        var id = req.params.id;
        await WebFaqsCategory.deleteOne({_id: id});
        return res.json({
            success: true,
            message: "Success"
        });
    }
    catch(error){
        return res.json({
            success: false,
            message: error
        })
    }
}

  //-------------Faqs Controllers----------------//
// get all items
exports.getAllFaqsByCategory = (req, res) => {
    const rolesControl = req.user.role;
    const category_id = req.params.category_id;
    if (rolesControl[roleTitle + "/list"]) {
      WebFaqs.find({typeId:category_id}).sort({createdAt:-1})
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
        WebFaqs.find({
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
            await WebFaqs.findByIdAndUpdate(faqId, faq);
          }
          else{
            var newFaq = await new WebFaqs(faq).save();
            faqId = newFaq._id;
          }
          allFaqIds.push(faqId);
        }
        if(allFaqIds.length>0){
          await WebFaqs.deleteMany({typeId:typeId , _id:{$nin:allFaqIds}});
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
      WebFaqs.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            master: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      WebFaqs.findOne({
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
      WebFaqs.findByIdAndDelete(req.params.id)
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
      WebFaqs.deleteOne({
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
      WebFaqs.findByIdAndUpdate(req.params.id, req.body)
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
      WebFaqs.findOneAndUpdate(
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
  exports.allFaqs = async (req, res) => {
    
    try{
      var allCategories = await WebFaqsCategory.aggregate([
        {$lookup: {
              from: "webfaqs",
              localField: "_id",
              foreignField: "typeId",
              as: "faqs"
            } 
        }
      ]);
      return res.json({
        success:true,
        result:allCategories
      });
    }
    catch(error){
      return res.json({
        messagge: "Error: " + err,
        master: "error",
        success: false
      })
    }
  }

