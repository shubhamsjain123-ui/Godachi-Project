const router = require("express").Router();
let Turkey = require("../models/turkey.model");

// get all items
exports.getAll = (req, res) => {
  Turkey.find().then((data) => res.json(data));
}

// get item
exports.getById = (req, res) => {
  Turkey.find({ name: req.params.id }).then((data) => res.json(data));
}

