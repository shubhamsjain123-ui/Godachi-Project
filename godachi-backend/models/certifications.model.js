const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CertificationsSchema = new Schema(
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
    image: {
        type: String,
        required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "certifications",
    timestamps: true,
  }
);

const Certifications = mongoose.model("Certifications", CertificationsSchema);

module.exports = Certifications;
