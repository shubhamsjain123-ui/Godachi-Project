const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeMenuSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    order: {
        type: Number,
        required: true,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
        index:true
    },
    description: {
        type: String,
        trim: true,
    },
    seo: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    }
  },
  {
    timestamps: true,
  }
);

HomeMenuSchema.virtual('items', {
  ref: 'HomeMenuItem', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'menu', // Field on the trade schema
});

HomeMenuSchema.set('toObject', { virtuals: true })
HomeMenuSchema.set('toJSON', { virtuals: true })


const HomeMenu = mongoose.model("HomeMenu", HomeMenuSchema);

module.exports = HomeMenu;
