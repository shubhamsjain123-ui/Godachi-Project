const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "tags",
    timestamps: true,
  }
);

const Tags = mongoose.model("Tags", TagsSchema);

module.exports = Tags;
