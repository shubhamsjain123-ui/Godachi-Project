const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatsSchema = new Schema(
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
    value: {
        type: String,
        trim: true,
      },
  },
  {
    timestamps: true,
  }
);

const Stats = mongoose.model("Stats", StatsSchema);

module.exports = Stats;
