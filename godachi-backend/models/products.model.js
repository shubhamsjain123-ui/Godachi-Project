const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    categories_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      default: null,
      index: true
    },
    productName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    seo: {
      type: String,
      required: true,
      index: true
    },
    //features:[],
    features:{
      type: Array,
      default:[],
      index: true
    },
    meta_title: {
      type: String,
      trim: true,
    },
    meta_keywords: {
      type: String,
      trim: true,
    },
    meta_description: {
      type: String,
      trim: true,
    },
    description_short: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    productCare: {
      type: String,
      trim: true,
    },
    priceType: {
      type: String,
      required: true,
    },
    productType: {
      type: Boolean,
      required: true,
    },
    warranty: Number,
    warrantyUnit: String,
    shopFor:{
      type: Array,
      index:true
    },
    occassions:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Occassions",
      default: null,
      index: true
    }],
    tags:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tags",
      default: null,
      index: true
    }],
    note:String,
    promises:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promises",
      default: null,
      index: true
    }],
    certifications:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certifications",
      default: null,
      index: true
    }],
    purchaseIncludes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseIncludes",
      default: null,
      index: true
    }],
    styleNo: String,
    certificateImage: String,
    description_certificate: String,
    variants: {
      type:[{
        master:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variants",
        },
        selectedValues:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: "VariantOptions",
          default: null,
        }]
      }],
      index: true
    },
    ratings:{
      type: Number,
      required: true,
      index: true,
      default: 0
    },
    reviews:{
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    collection: "products",
    timestamps: true,
  }
);



ProductsSchema.virtual('productMetalComponents', {
  ref: 'ProductMetalComponents', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'product', // Field on the trade schema
});
ProductsSchema.virtual('productStoneComponents', {
  ref: 'ProductStoneComponents', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'product', // Field on the trade schema
});
ProductsSchema.virtual('productDiamondComponents', {
  ref: 'ProductDiamondComponents', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'product', // Field on the trade schema
});
ProductsSchema.virtual('variant_products', {
  ref: 'ProductVariants', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'product', // Field on the trade schema
});
ProductsSchema.virtual('allImages', {
  ref: 'Productimages', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'product_id', // Field on the trade schema
});
ProductsSchema.virtual('otherSpecs', {
  ref: 'ProductOtherSpecs', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'product', // Field on the trade schema
});

ProductsSchema.virtual('variantProduct', {
  ref: 'ProductVariants', // What model to link
  localField: '_id', // field on the offer schema
  foreignField: 'product', // Field on the trade schema
  justOne: true
});

ProductsSchema.set('toObject', { virtuals: true })
ProductsSchema.set('toJSON', { virtuals: true })

//line for search text
ProductsSchema.index({ productName: "text", description: "text" });

const Products = mongoose.model("Products", ProductsSchema);
module.exports = Products;
