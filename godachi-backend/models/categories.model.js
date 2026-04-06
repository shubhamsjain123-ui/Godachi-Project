const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    categories_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      default: null,
    },
    order: {
      required: true,
      type: Number,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    seo: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    link: {
      type: String,
      default: "",
    },
    image: String,
    banner: String,
    showOnWeb: {
      type: Boolean,
      required: true,
      default: true,
    },
    showOnApp: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

const Categories = mongoose.model("Categories", CategoriesSchema);

Categories.getParentIds = async (categoryId)=>{
  var result = [];
  await getParentCategory(categoryId,result);
  return result
}
const getParentCategory = async (categoryId, value) =>{
  var details = await Categories.findOne({_id:categoryId},{categories_id:1});
  if(details.categories_id){
    var id = details.categories_id.toString();
    await getParentCategory(id,value);
  }
  value.push(categoryId)
}
module.exports = Categories;
