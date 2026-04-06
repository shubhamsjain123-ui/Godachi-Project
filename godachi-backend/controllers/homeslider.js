const router = require("express").Router();
const passport = require("passport");
let Homeslider = require("../models/homeslider.model");
let HomePageSection = require("../models/homePageSection.model");
let HomePageMedia = require("../models/homePageMedia.model");
let Testimonial = require("../models/testimonial.model");
let Blog = require("../models/blog.model");
let Stats = require("../models/stats.model");
let Categories = require("../models/categories.model");
let Promises = require("../models/promises.model");
let Occassions = require("../models/occassions.model");
let Products = require("../models/products.model");

const title = "Home Slider";
const roleTitle = "homeslider";

exports.getBanner = async (req,res)=>{
  var section = req.params.section;
  var device = req.params.device;
  try{
    let populate;
    switch (section) {
      case "blog":
        populate = "blog"
        break;
      case "testimonial":
        populate = "testimonial"
        break;
      case "stats":
        populate = "stats"
        break;
      default:
        populate = "media"
        break;
    }
    var data = await HomePageSection.findOne({section: section, device:device}).populate(populate);
    res.json(data);
  }
  catch(err){
    return res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}

exports.addBanner = async(req,res) =>{
  var section = req.params.section;
  var device = req.params.device;
  try{
    var sectionDetails = await HomePageSection.findOneAndUpdate(
                                    {section: section, device:device},
                                    {$set:req.body},
                                    {
                                      upsert:true,
                                      new: true
                                    }
                                  );
    var mediaDetails = req.body.media;
    var blogDetails = req.body.blog;
    var testimonialDetails = req.body.testimonial;
    var statDetails = req.body.stats;
    if(mediaDetails){
      var mediaIds = [];
      for(const media of mediaDetails){
        let mediaId;
        media.created_user = req.body.created_user;
        if(media._id){
          mediaId = media._id;
          await HomePageMedia.updateOne({_id: media._id},{$set:media})
        }
        else{
          media.section = sectionDetails
          var newMedia = await new HomePageMedia(media).save();
          mediaId = newMedia._id;
        }
        
        mediaIds.push(mediaId);
      }
      if(mediaIds.length>0)
        await HomePageMedia.deleteMany({section:sectionDetails, _id:{$nin:mediaIds}});
    }
    else if(blogDetails){
      var blogIds = [];
      for(const blog of blogDetails){
        let blogId;
        blog.created_user = req.body.created_user;
        if(blog._id){
          blogId = blog._id;
          await Blog.updateOne({_id: blog._id},{$set:blog})
        }
        else{
          blog.section = sectionDetails
          var newMedia = await new Blog(blog).save();
          blogId = newMedia._id;
        }
        
        blogIds.push(blogId);
      }
      if(blogIds.length>0)
        await Blog.deleteMany({section:sectionDetails, _id:{$nin:blogIds}});
    }
    else if(testimonialDetails){
      var testimonialIds = [];
      for(const testimonial of testimonialDetails){
        let testimonialId;
        testimonial.created_user = req.body.created_user;
        if(testimonial._id){
          testimonialId = testimonial._id;
          await Testimonial.updateOne({_id: testimonial._id},{$set:testimonial})
        }
        else{
          testimonial.section = sectionDetails
          var newMedia = await new Testimonial(testimonial).save();
          testimonialId = newMedia._id;
        }
        
        testimonialIds.push(testimonialId);
      }
      if(testimonialIds.length>0)
        await Testimonial.deleteMany({section:sectionDetails, _id:{$nin:testimonialIds}});
    }
    else if(statDetails){
      var statIds = [];
      for(const stat of statDetails){
        let statId;
        stat.created_user = req.body.created_user;
        if(stat._id){
          statId = stat._id;
          await Stats.updateOne({_id: stat._id},{$set:stat})
        }
        else{
          stat.section = sectionDetails
          var newMedia = await new Stats(stat).save();
          statId = newMedia._id;
        }
        
        statIds.push(statId);
      }
      if(statIds.length>0)
        await Stats.deleteMany({section:sectionDetails, _id:{$nin:statIds}});
    }
    
    return res.json({
      messagge: title + " Added",
      master: "success",
    })
  }
  catch(err){
    return res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}

exports.getWebHomePage = async (req,res) =>{
  try{
    var categoryData = await Categories.find({showOnWeb:true}).limit(10);
    var promiseData = await Promises.find({showOnWeb:true});
    var occassionData = await Occassions.find({showOnWeb:true});
    var sectionData = await HomePageSection
                            .find({device:{$in:["web","common"]}})
                            .populate({path:"media",options:{sort: { 'order': 1 }}})
                            //.populate("media")
                            .populate("blog")
                            .populate("testimonial")
                            .populate("stats");

    var premiumProducts = await Products.aggregate([
      {
        $match: { isActive: true, isDeleted:{$ne:true}, features:"premium" },
      },
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "variantProduct",
        }
      },
      {
        $lookup: {
          from: "productimages",
          localField: "_id",
          foreignField: "product_id",
          as: "allImages",
        },
      },
      { $limit: 8 },
    ])

    var onSaleProducts = await Products.aggregate([
      {
        $match: { isActive: true, isDeleted:{$ne:true}, features:"featured" },
      },
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "variantProduct",
        }
      },
      {
        $lookup: {
          from: "productimages",
          localField: "_id",
          foreignField: "product_id",
          as: "allImages",
        },
      },
      { $limit: 8 },
    ])

    res.json({
      category: categoryData,
      promise: promiseData,
      occassion: occassionData,
      section: sectionData,
      onSaleProducts,
      premiumProducts
    })
  }
  catch(err){
    return res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}

exports.getAppHomePage = async (req,res) =>{
  try{
    var categoryData = await Categories.find({showOnApp:true});
    var promiseData = await Promises.find({showOnApp:true});
    var occassionData = await Occassions.find({showOnApp:true});
    var sectionData = await HomePageSection
                            .find({device:{$in:["app","common"]}})
                            .populate("media")
                            .populate("blog")
                            .populate("testimonial")
                            .populate("stats");

    var premiumProducts = await Products.aggregate([
      {
        $match: { isActive: true, isDeleted:{$ne:true}, features:"premium" },
      },
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "variantProduct",
        }
      },
      {
        $lookup: {
          from: "productimages",
          localField: "_id",
          foreignField: "product_id",
          as: "allImages",
        },
      },
      { $limit: 4 },
    ])

    var onSaleProducts = await Products.aggregate([
      {
        $match: { isActive: true, isDeleted:{$ne:true}, features:"featured" },
      },
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "variantProduct",
        }
      },
      {
        $lookup: {
          from: "productimages",
          localField: "_id",
          foreignField: "product_id",
          as: "allImages",
        },
      },
      { $limit: 4 },
    ])

    res.json({
      category: categoryData,
      promise: promiseData,
      occassion: occassionData,
      section: sectionData,
      onSaleProducts,
      premiumProducts
    })
  }
  catch(err){
    return res.json({
      messagge: "Error: " + err,
      variant: "error",
    })
  }
}

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Homeslider.find()
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Homeslider.find({
        "created_user.id": `${req.user._id}`,
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// update active data by id
exports.updateActive = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Homeslider.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// post new items
exports.add = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      new Homeslider(req.body)
        .save()

        .then(() =>
          res.json({
            messagge: title + " Added",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: " Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// fetch data by id
exports.getById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      Homeslider.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Homeslider.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((data) => {
          if (data) {
            res.json(data);
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                variant: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// delete data by id
exports.deleteById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      Homeslider.findByIdAndDelete(req.params.id)
        .then(() =>
          res.json({
            messagge: title + " Deleted",
            variant: "info",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Homeslider.deleteOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
        .then((resdata) => {
          if (resdata.deletedCount > 0) {
            res.json({
              messagge: title + " delete",
              variant: "success",
            });
          } else {
            res.status(403).json({
              message: {
                messagge: "You are not authorized, go away!",
                variant: "error",
              },
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

// update data by id
exports.update = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/id"]) {
      Homeslider.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      Homeslider.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        req.body
      )
        .then((resdata) => {
          if (resdata) {
            res.json({
              messagge: title + " Update",
              variant: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              variant: "error",
            });
          }
        })
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }

exports.getAllPublic = (req, res) => {
  Homeslider.find(
    { isActive: true },
    { title: 1, description: 1, link: 1, image: 1, _id: 1, categories_id: 1 }
  )
    .sort({ order: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.json({
        messagge: "Error: " + err,
        variant: "error",
      })
    );
}
