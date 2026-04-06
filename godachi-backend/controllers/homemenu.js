const router = require("express").Router();
const passport = require("passport");
let HomeMenu = require("../models/homeMenu.model");
let HomeMenuItem = require("../models/homeMenuItems.model");

const title = "masters";
const roleTitle = "masters";

exports.getPublicMenu = async (req,res)=>{
  try{
    var menuDetails = await HomeMenu.find({isActive: true})
                            .populate({
                                        path: 'items', 
                                        options: { sort: { 'column': 1,'order': 1 } } 
                                    });
    res.json(menuDetails);
  }
  catch(error){
    res.json({
      messagge: "Error: " + error,
      variant: "error",
    })
  }
}

// get all items
exports.getAll = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      HomeMenu.find()
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
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      HomeMenu.find({
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

exports.counts = (req, res) => {
    HomeMenu.countDocuments()
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  }

  exports.addEdit = async (req,res) =>{
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/add"]) {
      var menuDetails = req.body;
      const {items, ...menuDetail} = menuDetails;
      try{
        if(menuDetails._id){
          var dbMenu = await HomeMenu.findByIdAndUpdate(menuDetails._id, menuDetail);
        }
        else{
          var dbMenu = await new HomeMenu(menuDetail).save();
        }
        if(dbMenu){
          var itemIds=[];
          for(const itemDetail of items){
            let itemId;
            itemDetail.menu = dbMenu._id;
            itemDetail.created_user = menuDetails.created_user;
            if(itemDetail._id){
              itemId = itemDetail._id;
              await HomeMenuItem.findByIdAndUpdate(itemDetail._id, itemDetail);
            }
            else{
              var newPurity = await new HomeMenuItem(itemDetail).save();
              itemId = newPurity._id;
            }
            itemIds.push(itemId);
          }
          if(itemIds.length>0)
            await HomeMenuItem.deleteMany({menu:dbMenu, _id:{$nin:itemIds}});
        }
        return res.json({
          messagge: title + " Added",
          master: "success",
        })
      }
      catch(error){
        return res.json({
            messagge: " Error: " + error,
            master: "error",
          })
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          master: "error",
        },
      });
    }
  }

// fetch data by id
exports.getById = (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "/list"]) {
      HomeMenu.findById(req.params.id)
      .populate("items")
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      HomeMenu.findOne({
        _id: req.params.id,
        "created_user.id": `${req.user._id}`,
      })
      .populate("items")
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
exports.deleteById = async (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl[roleTitle + "delete"]) {
      try{
        await HomeMenu.findByIdAndDelete(req.params.id);
        await HomeMenuItem.deleteMany({menu:req.params.id});
        res.json({
          messagge: title + " Deleted",
          variant: "info",
        })
      }
      catch(err){
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      }
    } else if (rolesControl[roleTitle + "onlyyou"]) {
      try{
        var resdata = await HomeMenu.deleteOne({
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        });
        if(resdata.deletedCount > 0){
          await HomeMenuItem.deleteMany({menu:req.params.id});
          res.json({
            messagge: title + " Deleted",
            variant: "info",
          })
        }
        else {
          res.status(403).json({
            message: {
              messagge: "You are not authorized, go away!",
              variant: "error",
            },
          });
        }
      }
      catch(err){
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }