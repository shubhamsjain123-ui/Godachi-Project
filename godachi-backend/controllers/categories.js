const router = require("express").Router();
const passport = require("passport");
let Categories = require("../models/categories.model");

const title = "Categories";
const roleTitle = "categories";

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Categories.find()
        .sort({ order: 1 })
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Categories.find({
        "created_user.id": `${req.user._id}`,
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.counts = (req, res) => {
    Categories.countDocuments()
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  }

// post new items
exports.add = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new Categories(req.body)
        .save()

        .then(() =>
          res.json({
            messagge: title + " Added",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: " Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// fetch data by id
exports.getById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Categories.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Categories.findOne({
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
                variant: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteById = async (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      try{
        await Categories.findByIdAndDelete(req.params.id);
        await Categories.deleteMany({categories_id:req.params.id});
        res.json({
          messagge: title + " Deleted",
          variant: "info",
        })
      }
      catch(err){
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      }
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      try{
        var resdata = await Categories.deleteOne({
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        });
        if(resdata.deletedCount > 0){
          await Categories.deleteMany({categories_id:req.params.id});
          res.json({
            messagge: title + " Deleted",
            variant: "info",
          })
        }
        else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              variant: "error",
            },
          });
        }
      }
      catch(err){
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
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

// update data by id
exports.update = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      if(req.params.id===req.body.categories_id){
        return res.json({
          messagge: "Category cannot be same as its subcategory.",
          variant: "error",
        })
      }
      Categories.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Categories.findOneAndUpdate(
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
              variant: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              variant: "error",
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.getPublic = (req, res) => {
  if (req.params.id == "not") {
    Categories.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else {
    Categories.find({ isActive: req.params.id })
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  }
}

exports.getAppCategories = async (req,res) =>{
  try{
    var appCategories = await Categories.find({showOnApp:true});
    return res.json(appCategories);
  }
  catch(err){
    res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}
exports.getWebCategories = async (req,res) =>{
  try{
    var appCategories = await Categories.find({showOnWeb:true});
    return res.json(appCategories);
  }
  catch(err){
    res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}