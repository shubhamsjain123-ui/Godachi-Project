const router = require("express").Router();
const passport = require("passport");
let Topmenu = require("../models/topmenu.model");

const title = "Top Menu";
const roleTitle = "topmenu";

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Topmenu.find()
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
      Topmenu.find({
        "created_user.id": `${req.user._id}`,
      })
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
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// post new items
exports.add = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new Topmenu(req.body)
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

// update active data by id
exports.updateActive = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Topmenu.findByIdAndUpdate(req.params.id, req.body)
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
      Topmenu.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Topmenu.findOne({
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
exports.deleteById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      Topmenu.findByIdAndDelete(req.params.id)
        .then(() =>
          res.json({
            messagge: title + " Deleted",
            variant: "info",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Topmenu.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((resdata) => {
          if (resdata.deletedCount > 0) {
            res.json({
              messagge: title + " delete",
              variant: "success",
            });
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

// update data by id
exports.update = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Topmenu.findByIdAndUpdate(req.params.id, req.body)
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
      Topmenu.findOneAndUpdate(
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

// get all items
exports.getPublic = (req, res) => {
  if (req.params.id == "not") {
    Topmenu.find(
      {},
      {
        title: 1,
        order: 1,
        seo: 1,
        link: 1,
        categories_id: 1,
        _id: 1,
        isActive: 1,
      }
    )
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
  } else {
    Topmenu.find({ seo: req.params.id }, {})
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
  }
}