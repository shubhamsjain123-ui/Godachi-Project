const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    section:{
      type: Schema.Types.ObjectId,
      ref: 'HomePageSection',
      required: true,
      index:true
    },
    order:{
      type:Number,
      required: true
    },
    title: {
      type: String,
      trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    url:{
      type: String
    },
    date:{
        type: Date,
        required:true
    },
    category:{
        type: String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
