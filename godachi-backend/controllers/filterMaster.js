//let Brands = require("../models/brands.model");
const {
    priceFilter,
    shopForFilter,
    offerFilter,
    trendingFilter,
    virtualTryFilter,
    ratingFilter,
    weightFilter
} = require("../config/filters");
let Occassions = require("../models/occassions.model");
let Metals = require("../models/metals.model");
let Categories = require("../models/categories.model");
let Stones = require("../models/stones.model");
let MetalColors = require("../models/metalcolors.model");
let StoneColors = require("../models/stoneColors.model");
let DiamondVariants = require("../models/diamondVariants.model");
let Tags = require("../models/tags.model");
let Offers = require("../models/productOffers.model");
const moment = require("moment");

const getOfferFilters = async () =>{
    var availableOffers = await Offers.find({
        "offerPeriod.0":{$lte:moment().toDate()},
        "offerPeriod.1":{$gte:moment().toDate()},
    })
    var offerFilters = availableOffers.map((option)=>{return {label:"OFFER: "+option.name,value:option._id}});
    return offerFilters;
}

const getMaterialFilters = async () =>{
    var allMetals = await Metals.find({materialFilter: true});
    var materialFilters = allMetals.map((option)=>{return {label:option.name,value:option._id}});
    materialFilters.push({label:"Diamond",value:"diamond"})
    materialFilters.push({label:"GemStones",value:"stones"})
    var allStones = await Stones.find({materialFilter: true});
    var stoneMaterialFilters = allStones.map((option)=>{return {label:option.name,value:option._id}});
    if(stoneMaterialFilters.length>0){
        materialFilters.push(...stoneMaterialFilters);
    }
    return materialFilters;
}

exports.getWebMaster = async (req, res) => {
    var {
        material
    } = req.body;
    try{

        var materialMetalFilters = material && material.length>0 ? material: [];
        materialMetalFilters = materialMetalFilters.filter(item => !["diamond","stones"].includes(item));
        var isMaterialMetalSelected = materialMetalFilters.length>0?true:false;
        var isMaterialDiamondSelected = material && material.length>0 ?
                                  (material.includes("diamond")?true:false)
                                  : false;
        var isMaterialStoneSelected = material && material.length>0 ?
                                  (material.includes("stones")?true:false)
                                  : false;
        var masterFilters = [];
        var otherFilterCount = 0;
        var mainFilterCount = 0;
        
        // material filters
        var materialFilters = await getMaterialFilters();
        masterFilters.push({
            name:"Material",
            shortName:"material",
            options: materialFilters,
            type: "main",
            order: ++mainFilterCount
        });


        //price filters
        masterFilters.push({
            name:"Price",
            shortName:"price",
            options: priceFilter,
            type: "main",
            order: ++mainFilterCount
        });


        //occassion filters
        var occassionFilter = await Occassions.find({});
        masterFilters.push({
            name:"Occassions",
            shortName:"occassions",
            options: occassionFilter.map((option)=>{return {label:option.name,value:option._id}}),
            type: "main",
            order: ++mainFilterCount
        });

        //Shop For filters
        masterFilters.push({
            name:"Shop For",
            shortName:"shopFor",
            options: shopForFilter,
            type: "main",
            order: ++mainFilterCount
        });

        //Offer filters
        masterFilters.push({
            name:"Offers",
            shortName:"offers",
            options: offerFilter,
            type: "main",
            order: ++mainFilterCount
        });

        //Offer filters
        var otherOfferFilters = await getOfferFilters();
        masterFilters.push({
            name:"Offers Others",
            shortName:"godachiOffers",
            options: otherOfferFilters,
            type: "noshow",
            order: 0
        });

        //Category filters
        var categoryFilter = await Categories.find({});
        masterFilters.push({
            name:"Product Type",
            shortName:"categories",
            options: categoryFilter.map((option)=>{return {label:option.title,value:option._id}}),
            type: "main",
            order: ++mainFilterCount
        });

        //--------------------Other Filters --------------//

        //trendingFilter
        masterFilters.push({
            name:"Trending",
            shortName:"trending",
            options: trendingFilter,
            type: "other",
            order: ++otherFilterCount
        });

        //metal purity filters
        if(isMaterialMetalSelected){
            var allMetals = await Metals.find({}).populate("purity");
            allMetals.forEach((metal)=>{
                if(material.includes(metal._id.toString())){
                    masterFilters.push({
                        name:`${metal.name} Purity`,
                        shortName:`${metal.name.toLowerCase()}Purity`,
                        options: metal.purity.map((option)=>{return {label:option.name,value:option._id}}),
                        type: "other",
                        order: ++otherFilterCount
                    });
                }
            })
        }
        

        //diamond variant Filters
        if(isMaterialDiamondSelected){
            var allDiamondVariants = await DiamondVariants.find({}).populate("variants")
            allDiamondVariants.forEach((diamondVariant)=>{
                masterFilters.push({
                    name:`Diamond ${diamondVariant.name}`,
                    shortName:`diamond${diamondVariant.name.toLowerCase()}`,
                    options: diamondVariant.variants.map((option)=>{return {label:option.name,value:option._id}}),
                    type: "other",
                    order: ++otherFilterCount
                });
            })
        }
        

        //Stone filters
        var stoneFilter = await Stones.find({});
        masterFilters.push({
            name:"Stones",
            shortName:"stones",
            options: stoneFilter.map((option)=>{return {label:option.name,value:option._id}}),
            type: "other",
            order: ++otherFilterCount
        });

        //Metal Color filters
        if(isMaterialMetalSelected){
            var metalColorFilter = await MetalColors.find({});
            masterFilters.push({
                name:"Metal Color",
                shortName:"metalColor",
                options: metalColorFilter.map((option)=>{return {label:option.name,value:option._id}}),
                type: "other",
                order: ++otherFilterCount
            });
        }

        //Stone Color filters
        if(isMaterialStoneSelected){
            var stoneColorFilter = await StoneColors.find({});
            masterFilters.push({
                name:"Stone Color",
                shortName:"stoneColor",
                options: stoneColorFilter.map((option)=>{return {label:option.name,value:option._id}}),
                type: "other",
                order: ++otherFilterCount
            });
        }
        
        //tags filter
        var tagsFilter = await Tags.find({});
        masterFilters.push({
            name:"Tags",
            shortName:"tags",
            options: tagsFilter.map((option)=>{return {label:option.name,value:option._id}}),
            type: "other",
            order: ++otherFilterCount
        });

        //virtualTryFilter
        masterFilters.push({
            name:"Virtual Try",
            shortName:"virtualTry",
            options: virtualTryFilter,
            type: "other",
            order: ++otherFilterCount
        });

        //ratingFilter
        masterFilters.push({
            name:"Product Rating",
            shortName:"rating",
            options: ratingFilter,
            type: "other",
            order: ++otherFilterCount
        });

        //weightFilter
        masterFilters.push({
            name:"Weight",
            shortName:"weight",
            options: weightFilter,
            type: "other",
            order: ++otherFilterCount
        });

        /* return res.json({
            materials: [],
            price: [],
            occassions: occassionFilter,
            shopFor: [],
            offers: [],
            productType: [],
            stones: [],
            trending: [],
            metalColor: [],
            virtualTry: [],
            productRating: [],
            stoneColor: [],
            diamondFilters: [],
            metalFilters:[],
            weight: []
        }) */
        return res.json(masterFilters);
        
    }
    catch(err){
        console.error(err);
        return res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
    }
}

exports.getAppMaster = async (req, res) => {
    var {
        material
    } = req.body;
    try{

        var materialMetalFilters = material && material.length>0 ? material: [];
        materialMetalFilters = materialMetalFilters.filter(item => !["diamond","stones"].includes(item));
        var isMaterialMetalSelected = materialMetalFilters.length>0?true:false;
        var isMaterialDiamondSelected = material && material.length>0 ?
                                  (material.includes("diamond")?true:false)
                                  : false;
        var isMaterialStoneSelected = material && material.length>0 ?
                                  (material.includes("stones")?true:false)
                                  : false;
        var masterFilters = [];
        var mainFilterCount = 0;
        
        // material filters
        var materialFilters = await getMaterialFilters();
        masterFilters.push({
            name:"Material",
            shortName:"material",
            options: materialFilters,
            type: "main",
            order: ++mainFilterCount
        });


        //price filters
        masterFilters.push({
            name:"Price",
            shortName:"price",
            options: priceFilter,
            type: "main",
            order: ++mainFilterCount
        });


        //occassion filters
        var occassionFilter = await Occassions.find({});
        masterFilters.push({
            name:"Occassions",
            shortName:"occassions",
            options: occassionFilter.map((option)=>{return {label:option.name,value:option._id}}),
            type: "main",
            order: ++mainFilterCount
        });

        //Shop For filters
        masterFilters.push({
            name:"Shop For",
            shortName:"shopFor",
            options: shopForFilter,
            type: "main",
            order: ++mainFilterCount
        });

        //Offer filters
        masterFilters.push({
            name:"Offers",
            shortName:"offers",
            options: offerFilter,
            type: "main",
            order: ++mainFilterCount
        });

        //Offer filters
        var otherOfferFilters = await getOfferFilters();
        masterFilters.push({
            name:"Offers Others",
            shortName:"godachiOffers",
            options: otherOfferFilters,
            type: "noshow",
            order: 0
        });

        //Category filters
        var categoryFilter = await Categories.find({});
        masterFilters.push({
            name:"Product Type",
            shortName:"categories",
            options: categoryFilter.map((option)=>{return {label:option.title,value:option._id}}),
            type: "main",
            order: ++mainFilterCount
        });

        //trendingFilter
        masterFilters.push({
            name:"Trending",
            shortName:"trending",
            options: trendingFilter,
            type: "other",
            order: ++mainFilterCount
        });

        //metal purity filters
        if(isMaterialMetalSelected){
            var allMetals = await Metals.find({}).populate("purity");
            allMetals.forEach((metal)=>{
                if(material.includes(metal._id.toString())){
                    masterFilters.push({
                        name:`${metal.name} Purity`,
                        shortName:`${metal.name.toLowerCase()}Purity`,
                        options: metal.purity.map((option)=>{return {label:option.name,value:option._id}}),
                        type: "other",
                        order: ++mainFilterCount
                    });
                }
            })
        }
        

        //diamond variant Filters
        if(isMaterialDiamondSelected){
            var allDiamondVariants = await DiamondVariants.find({}).populate("variants")
            allDiamondVariants.forEach((diamondVariant)=>{
                masterFilters.push({
                    name:`Diamond ${diamondVariant.name}`,
                    shortName:`diamond${diamondVariant.name.toLowerCase()}`,
                    options: diamondVariant.variants.map((option)=>{return {label:option.name,value:option._id}}),
                    type: "other",
                    order: ++mainFilterCount
                });
            })
        }
        

        //Stone filters
        var stoneFilter = await Stones.find({});
        masterFilters.push({
            name:"Stones",
            shortName:"stones",
            options: stoneFilter.map((option)=>{return {label:option.name,value:option._id}}),
            type: "other",
            order: ++mainFilterCount
        });

        //Metal Color filters
        if(isMaterialMetalSelected){
            var metalColorFilter = await MetalColors.find({});
            masterFilters.push({
                name:"Metal Color",
                shortName:"metalColor",
                options: metalColorFilter.map((option)=>{return {label:option.name,value:option._id}}),
                type: "other",
                order: ++mainFilterCount
            });
        }

        //Stone Color filters
        if(isMaterialStoneSelected){
            var stoneColorFilter = await StoneColors.find({});
            masterFilters.push({
                name:"Stone Color",
                shortName:"stoneColor",
                options: stoneColorFilter.map((option)=>{return {label:option.name,value:option._id}}),
                type: "other",
                order: ++mainFilterCount
            });
        }
        
        //tags filter
        var tagsFilter = await Tags.find({});
        masterFilters.push({
            name:"Tags",
            shortName:"tags",
            options: tagsFilter.map((option)=>{return {label:option.name,value:option._id}}),
            type: "other",
            order: ++mainFilterCount
        });

        //virtualTryFilter
        masterFilters.push({
            name:"Virtual Try",
            shortName:"virtualTry",
            options: virtualTryFilter,
            type: "other",
            order: ++mainFilterCount
        });

        //ratingFilter
        masterFilters.push({
            name:"Product Rating",
            shortName:"rating",
            options: ratingFilter,
            type: "other",
            order: ++mainFilterCount
        });

        //weightFilter
        masterFilters.push({
            name:"Weight",
            shortName:"weight",
            options: weightFilter,
            type: "other",
            order: ++mainFilterCount
        });
        return res.json(masterFilters);
        
    }
    catch(err){
        console.error(err);
        return res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
    }
}

exports.adminFilterList = async (req, res) => {
    try{
        var {
            category
        } = req.body;
        var masterFilters = [];
    
        // material filters
        var materialFilters = await getMaterialFilters();
        masterFilters.push({
            name:"Material",
            shortName:"material",
            options: materialFilters
        });
    
        //price filters
        masterFilters.push({
            name:"Price",
            shortName:"price",
            options: priceFilter
        });
    
    
        //occassion filters
        var occassionFilter = await Occassions.find({});
        masterFilters.push({
            name:"Occassions",
            shortName:"occassions",
            options: occassionFilter.map((option)=>{return {label:option.name,value:option._id}})
        });
        
        //Shop For filters
        masterFilters.push({
            name:"Shop For",
            shortName:"shopFor",
            options: shopForFilter
        });
    
        //weightFilter
        masterFilters.push({
            name:"Weight",
            shortName:"weight",
            options: weightFilter
        });

        //tags filter
        var tagsFilter = await Tags.find({});
        masterFilters.push({
            name:"Tags",
            shortName:"tags",
            options: tagsFilter.map((option)=>{return {label:option.name,value:option._id}})
        });

        if(category){
            //Sub Category filters
            var subCategoryFilter = await Categories.find({categories_id: category});
            if(subCategoryFilter.length>0){
                masterFilters.push({
                    name:"Sub Category",
                    shortName:"categories",
                    options: subCategoryFilter.map((option)=>{return {label:option.title,value:option._id}})
                });
            }
            
        }
        //Other Category filters
        var otherCategoryFilter = await Categories.find({categories_id: null});
        masterFilters.push({
            name:"Other Category",
            shortName:"otherCategories",
            options: otherCategoryFilter.map((option)=>{return {label:option.title,value:option._id}})
        });
        return res.json(masterFilters);
    }
    catch(err){
        console.error(err);
        return res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
    }
    
}

exports.adminProductFilters = async (req, res) => {
    try{
        var masterFilters = [];
    
        // material filters
        var materialFilters = await getMaterialFilters();
        masterFilters.push({
            name:"Material",
            shortName:"material",
            options: materialFilters
        });

        //Category filters
        var categoryFilter = await Categories.find({});
        masterFilters.push({
            name:"Product Type",
            shortName:"categories",
            options: categoryFilter.map((option)=>{return {label:option.title,value:option._id}})
        });

        //Metal filters
        var metalFilter = await Metals.find({});
        masterFilters.push({
            name:"Metals",
            shortName:"metals",
            options: metalFilter.map((option)=>{return {label:option.name,value:option._id}})
        });

        //Stone filters
        var stoneFilter = await Stones.find({});
        masterFilters.push({
            name:"Stones",
            shortName:"stones",
            options: stoneFilter.map((option)=>{return {label:option.name,value:option._id}})
        });

        //price filters
        masterFilters.push({
            name:"Price",
            shortName:"price",
            options: priceFilter
        });
    
    
        //occassion filters
        var occassionFilter = await Occassions.find({});
        masterFilters.push({
            name:"Occassions",
            shortName:"occassions",
            options: occassionFilter.map((option)=>{return {label:option.name,value:option._id}})
        });
        
        //Shop For filters
        masterFilters.push({
            name:"Shop For",
            shortName:"shopFor",
            options: shopForFilter
        });
    
        //tags filter
        var tagsFilter = await Tags.find({});
        masterFilters.push({
            name:"Tags",
            shortName:"tags",
            options: tagsFilter.map((option)=>{return {label:option.name,value:option._id}})
        });

        return res.json(masterFilters);
    }
    catch(err){
        console.error(err);
        return res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
    }
    
}
