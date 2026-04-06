const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomePageSectionSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    title: {
      type: String,
      trim: true,
    },
    section: {
        type: String,
        required: true,
    },
    device: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
      trim: true,
    },
    extraData:[],
    story: String,
    image: String
  },
  {
    timestamps: true,
  }
);

HomePageSectionSchema.virtual('media', {
  ref: 'HomePageMedia', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'section', // Field on the trade schema
});

HomePageSectionSchema.virtual('blog', {
  ref: 'Blog', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'section', // Field on the trade schema
});

HomePageSectionSchema.virtual('testimonial', {
  ref: 'Testimonial', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'section', // Field on the trade schema
});

HomePageSectionSchema.virtual('stats', {
  ref: 'Stats', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'section', // Field on the trade schema
});

HomePageSectionSchema.set('toObject', { virtuals: true })
HomePageSectionSchema.set('toJSON', { virtuals: true })

const HomePageSection = mongoose.model("HomePageSection", HomePageSectionSchema);

module.exports = HomePageSection;
