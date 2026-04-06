const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductVariantsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      index: true
    },
    variantCombination:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "VariantOptions",
        default: null,
        index: true
    }],
    productCode:{
        type: String,
        unique: true,
        required:true,
        index: true
    }, 
    quantity:{
      type: Number,
      required:true,
      default:0,
      index: true
    },
    height: Number,
    heightUnit:String,
    width: Number,
    widthUnit: String,
    length: Number,
    lengthUnit:String,
    totalWeight:{
      type:Number,
      index: true
    },
    totalWeightUnit: String,
    price:{
        type:Number,
        required: true,
        index: true
    },
    discount:{
        type:Number,
        required: true,
        default: 0,
        index: true
    },
    discountType:String,
        finalPrice:{
        type:Number,
        required: true,
        index: true
    },
    gst:{
        type:Number,
        required: true
    },
    grandTotal:{
        type:Number,
        required: true,
        index: true
    },
    making:{},
    inventoryNote:String,
    inventoryMarkAsImportant: {
      type:Boolean,
      require: true,
      default: false
    },
    priceDetails:{
      type:{},
      default:{}
    }
  },
  {
    timestamps: true,
  }
);

ProductVariantsSchema.virtual('metalDetails', {
  ref: 'ProductVariantMetalDetails', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'variant', // Field on the trade schema
});
ProductVariantsSchema.virtual('stoneDetails', {
  ref: 'ProductVariantStoneDetails', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'variant', // Field on the trade schema
});
ProductVariantsSchema.virtual('diamondDetails', {
  ref: 'ProductVariantDiamondDetails', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'variant', // Field on the trade schema
});

ProductVariantsSchema.virtual('productImages', {
  ref: 'Productimages', // What model to link
  localField: 'product', // field on the offer schema
  foreignField: 'product_id', // Field on the trade schema
});

ProductVariantsSchema.set('toObject', { virtuals: true })
ProductVariantsSchema.set('toJSON', { virtuals: true })

const ProductVariants = mongoose.model("ProductVariants", ProductVariantsSchema);

module.exports = ProductVariants;
