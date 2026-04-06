const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WebFaqsSchema = new Schema(
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
        ref: 'WebFaqsCategory',
        index:true
    }
  },
  {
    timestamps: true,
  }
);

const WebFaqs = mongoose.model("WebFaqs", WebFaqsSchema);

module.exports = WebFaqs;
