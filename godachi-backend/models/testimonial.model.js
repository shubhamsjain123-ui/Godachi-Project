const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema(
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
    name: {
      type: String,
      trim: true,
    },
    star: Number,
    review: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial;
