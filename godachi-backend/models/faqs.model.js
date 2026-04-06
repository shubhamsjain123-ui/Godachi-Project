const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FaqsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    typeId:{
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        index:true
    }
  },
  {
    timestamps: true,
  }
);

const Faqs = mongoose.model("Faqs", FaqsSchema);

module.exports = Faqs;
