const router = require("express").Router();
let Country = require("../models/country.model");

// get all items
exports.getAll = (req, res) => {
  Country.find().then((data) => res.json(data));
}

// get item
exports.getById = (req, res) => {
  Country.find({ name: req.params.id }).then((data) => res.json(data));
}

