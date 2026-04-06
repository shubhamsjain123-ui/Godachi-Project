const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = new Schema(
  {
    name: String,
    code: String
  },
);

const State = mongoose.model("state", StateSchema);

module.exports = State;
