const router = require("express").Router();
const passport = require("passport");
let Settings = require("../models/settings.model");

const title = "Settings";

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["superadmin"]) {
      Settings.find()
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

// fetch data by id
exports.getById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["superadmin"]) {
      Settings.findById(req.params.id)
        .then((data) => res.json(data))
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

// update data by id
exports.update = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["superadmin"]) {
      Settings.findByIdAndUpdate(req.params.id, req.body)
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

exports.getAllPublic = (req, res) => {
  Settings.find()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) =>
      res.json({
        messagge: "Error: " + err,
        variant: "error",
      })
    );
}