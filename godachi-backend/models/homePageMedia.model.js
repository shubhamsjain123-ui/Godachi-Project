const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomePageMediaSchema = new Schema(
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
    sub_title: {
      type: String,
      trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    url:{
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const HomePageMedia = mongoose.model("HomePageMedia", HomePageMediaSchema);

module.exports = HomePageMedia;
