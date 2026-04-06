let Products = require("../models/products.model");
let ProductVariants = require("../models/productVariants.model");
let Orders = require("../models/orders.model");
let OrderReturn = require("../models/orderReturn.model");
let OrderProducts = require("../models/orderProducts.model");
let Customers = require("../models/customer.model");
let Metals = require("../models/metals.model");
let Stones = require("../models/stones.model");
let BulkOrder = require("../models/bulkOrder.model");
let ContactQuery = require("../models/contactQuery.model");
let CustomizeJewellery = require("../models/customizeJewellery.model");
const moment = require("moment");

exports.topSellingProducts = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var productList = await OrderProducts.aggregate([
                                                            {$match:query},
                                                            {$group: { 
                                                                _id: "$product", 
                                                                qty:{$sum:"$qty"},
                                                                amount:{$sum:"$total"}
                                                            }},
                                                            {$sort:{qty:-1}},
                                                            {$limit:5},
                                                            {$lookup: {
                                                                from: "products",
                                                                localField: "_id",
                                                                foreignField: "_id",
                                                                as: "productDetails"
                                                                }
                                                            },
                                                            {
                                                                $unwind: {path:"$productDetails"}
                                                            },
                                                            {
                                                                $project: {
                                                                    productName: "$productDetails.productName",
                                                                    seo: "$productDetails.seo",
                                                                    qty:1,
                                                                    amount:1
                                                                }
                                                            }
                                                        ]);
        res.json({
            success:true,
            result:productList
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}

exports.topReturnedProducts = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var productList = await OrderProducts.aggregate([
            {$match:{...query,orderReturn:{$exists: true}}},
            {$group: { 
                _id: "$product", 
                qty:{$sum:"$qty"},
                amount:{$sum:"$total"}
            }},
            {$sort:{qty:-1}},
            {$limit:5},
            {$lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
                }
            },
            {
                $unwind: {path:"$productDetails"}
            },
            {
                $project: {
                    productName: "$productDetails.productName",
                    seo: "$productDetails.seo",
                    qty:1,
                    amount:1
                }
            }
        ]);
        res.json({
            success:true,
            result:productList
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.categorywiseProducts = async (req, res) => {
    try{
        var productList = await Products.aggregate([
            {$group: { _id: "$categories_id", count:{$sum:1}}}, 
            {$lookup: {
                   from: "categories",
                   localField: "_id",
                   foreignField: "_id",
                   as: "categoryDetail"
                 }
            },
            {$unwind: {path:"$categoryDetail"}},
            {$project: {
                count:1,
                rootCategory:{$cond: [  "$categoryDetail.categories_id" , "$categoryDetail.categories_id", "$categoryDetail._id"  ]}
            }},
            {$group: { _id: "$rootCategory", count:{$sum:"$count"}}}, 
            {$sort:{count:-1}},
            {$lookup: {
                   from: "categories",
                   localField: "_id",
                   foreignField: "_id",
                   as: "categoryDetail"
                 }
            },
            {$unwind: {path:"$categoryDetail"}},{$lookup: {
                   from: "categories",
                   localField: "_id",
                   foreignField: "_id",
                   as: "categoryDetail"
                 }
            },
            {$unwind: {path:"$categoryDetail"}},
            {$project: {
                name: "$categoryDetail.title",
                count:1
            }}
        ])
        res.json({
            success:true,
            result:productList
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.metalwiseProducts = async (req, res) => {
    try{
        var productList = await Metals.aggregate([
            {$lookup: {
                   from: "productmetalcomponents",
                   localField: "_id",
                   foreignField: "metalType",
                   as: "products"
            }},
            {$project: {
                name:1,
                numOfProducts:{$size: "$products"}
            }}
        ])
        res.json({
            success:true,
            result:productList
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.stonewiseProducts = async (req, res) => {
    try{
        var productList = await Stones.aggregate([
            {$lookup: {
                from: "productstonecomponents",
                localField: "_id",
                foreignField: "stoneType",
                as: "products"
            }},
            {$project: {
                name:1,
                numOfProducts:{$size: "$products"}
            }},
            {$sort: {numOfProducts:-1}}
        ])
        res.json({
            success:true,
            result:productList
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.averageOrderValue = async (req, res) => {
    try{
        const {
            startDate,
            endDate
        } = req.body
        var matchQuery = {};
        if(startDate){
            matchQuery["createdAt"] = {$gte:moment(startDate).toDate()}
        }
        if(endDate){
            if(matchQuery.createdAt){
                matchQuery["createdAt"]["$lte"]=moment(endDate).toDate()
            }
            else
                matchQuery["createdAt"] = {$lte:moment(endDate).toDate()}
        }
        var productList = await Orders.aggregate([
            {$match:matchQuery},
            {$sort:{createdAt:-1}}, 
            {$project: {finalPrice:1, createdAt:1}},
            { $facet: {
                count:  [{ $group: { _id: "null",count:{$avg:"$finalPrice"}} }],
                data:[]
            }}
        ])
        res.json({
            success:true,
            result:productList
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.orderStats = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var details = await Orders.aggregate([
            {$match:query},
            {$lookup: {
                   from: "orderstatus",
                   localField: "orderStatus",
                   foreignField: "_id",
                   as: "orderStatus"
                 }
            },
            {$unwind: {path:"$orderStatus"}},
            {$facet: {
                totalOrder:[
                    {$group: { _id: "null",count:{$sum:1}, revenue:{$sum:"$finalPrice"}}}
                ],
                delivered:[
                    {$match:{"orderStatus.type":"delivered"}}, 
                    {$group: { _id: "null",count:{$sum:1}, revenue:{$sum:"$finalPrice"}}}
                ],
                cancelled:[
                    {$match:{"orderStatus.type":"cancelled"}}, 
                    {$group: { _id: "null",count:{$sum:1}, revenue:{$sum:"$finalPrice"}}}
                ],
                intransit:[
                    {$match:{"orderStatus.type":"packed"}}, 
                    {$group: { _id: "null",count:{$sum:1}, revenue:{$sum:"$finalPrice"}}}
                ]
            }}
        ])
        var stats = {
            totalOrders:details?.[0].totalOrder?.[0]?.count ? details[0].totalOrder[0].count : 0,
            totalRevenue:details?.[0].totalOrder?.[0]?.revenue ? details[0].totalOrder[0].revenue : 0,
            delivered:details?.[0].delivered?.[0]?.count ? details[0].delivered[0].count : 0,
            cancelled:details?.[0].cancelled?.[0]?.count ? details[0].cancelled[0].count : 0,
            intransit:details?.[0].intransit?.[0]?.count ? details[0].intransit[0].count : 0
        }
        res.json({
            success:true,
            result:stats
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.totalRevenue = async (req, res) => {
    try{
        const {
            startDate,
            endDate
        } = req.body
        var matchQuery = {};
        if(startDate){
            matchQuery["createdAt"] = {$gte:moment(startDate).toDate()}
        }
        if(endDate){
            if(matchQuery.createdAt){
                matchQuery["createdAt"]["$lte"]=moment(endDate).toDate()
            }
            else
                matchQuery["createdAt"] = {$lte:moment(endDate).toDate()}
        }
        var details = await Orders.aggregate([
            {$match:matchQuery},
            {$group: {
                _id: null ,
                totalOrder:{$sum:1},
                revenue:{$sum:"$finalPrice"}
            }},
        ])
        var stats = {
            totalOrders:details?.[0]?.totalOrder ? details[0].totalOrder : 0,
            totalRevenue:details?.[0]?.revenue ? details[0].revenue : 0,
        }
        res.json({
            success:true,
            result:stats
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.monthlyTransactions = async (req, res) => {
    try{
        const {
            startDate,
            endDate
        } = req.body
        var matchQuery = {};
        if(startDate){
            matchQuery["createdAt"] = {$gte:moment(startDate).toDate()}
        }
        if(endDate){
            if(matchQuery.createdAt){
                matchQuery["createdAt"]["$lte"]=moment(endDate).toDate()
            }
            else
                matchQuery["createdAt"] = {$lte:moment(endDate).toDate()}
        }
        var details = await Orders.aggregate([
            {$match:matchQuery},
            {$group: {
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                order:{$sum:1},
                revenue:{$sum:"$finalPrice"}
            }},
            {$sort:{_id:-1}},
            {$limit: 12},
            {$sort:{_id:1}},
        ])
       
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.dailyTransactions = async (req, res) => {
    try{
        const {
            startDate,
            endDate
        } = req.body
        var matchQuery = {};
        if(startDate){
            matchQuery["createdAt"] = {$gte:moment(startDate).toDate()}
        }
        if(endDate){
            if(matchQuery.createdAt){
                matchQuery["createdAt"]["$lte"]=moment(endDate).toDate()
            }
            else
                matchQuery["createdAt"] = {$lte:moment(endDate).toDate()}
        }
        var details = await Orders.aggregate([
            {$match:matchQuery},
            {$group: {
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" }, day:{$dayOfYear: "$createdAt"} },
                order:{$sum:1},
                revenue:{$sum:"$finalPrice"}
            }},
            {$sort:{_id:-1}},
            {$limit: 12},
            {$sort:{_id:1}},
        ])
       
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.productStats = async (req, res) => {
    try{
        var details = await Products.aggregate([
            {$facet: {
                totalProducts:[
                    {$group: { _id: "null",count:{$sum:1}}}
                ],
                deleted:[
                    {$match:{isDeleted:true}}, 
                    {$group: { _id: "null",count:{$sum:1}}}
                ],
                active:[
                    {$match:{isActive:true}}, 
                    {$group: { _id: "null",count:{$sum:1}}}
                ],
                approved:[
                    {$match:{isApproved:true}}, 
                    {$group: { _id: "null",count:{$sum:1}}}
                ],
                
            }}
        ])
        var stats = {
            totalProducts:details?.[0].totalProducts?.[0]?.count ? details[0].totalProducts[0].count : 0,
            deleted:details?.[0].deleted?.[0]?.count ? details[0].deleted[0].count : 0,
            active:details?.[0].active?.[0]?.count ? details[0].active[0].count : 0,
            approved:details?.[0].approved?.[0]?.count ? details[0].approved[0].count : 0
        }
        res.json({
            success:true,
            result:stats
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.customerStats = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var details = await Customers.aggregate([
            {$match:query},
            {$facet: {
                totalUsers:[
                    {$group: { _id: "null",count:{$sum:1}}}
                ],
                referrals:[
                    {$match:{referredBy:{$exists: true}}}, 
                    {$group: { _id: "null",count:{$sum:1}}}
                ],
                phoneVerified:[
                    {$match:{phoneVerified:true}}, 
                    {$group: { _id: "null",count:{$sum:1}}}
                ],
                emailVerified:[
                    {$match:{emailVerified:true}}, 
                    {$group: { _id: "null",count:{$sum:1}}}
                ],
                
            }}
        ])
        var stats = {
            totalUsers:details?.[0].totalUsers?.[0]?.count ? details[0].totalUsers[0].count : 0,
            referrals:details?.[0].referrals?.[0]?.count ? details[0].referrals[0].count : 0,
            phoneVerified:details?.[0].phoneVerified?.[0]?.count ? details[0].phoneVerified[0].count : 0,
            emailVerified:details?.[0].emailVerified?.[0]?.count ? details[0].emailVerified[0].count : 0
        }
        res.json({
            success:true,
            result:stats
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.monthlyCustomerBase = async (req, res) => {
    try{
        var query ={phoneVerified: true};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var details = await Customers.aggregate([
            {$match: query},
            {$group: {
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                count:{$sum:1},
                referral:{$sum:{$cond: [ "$referredBy",1 , 0  ]}}
            }},
            {$limit: 12},
            {$sort:{_id:1}},
        ])
       
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.dailyCustomerBase = async (req, res) => {
    try{
        var query ={phoneVerified:true};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var details = await Customers.aggregate([
            {$match: query},
            {$group: {
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" }, day:{$dayOfYear: "$createdAt"} },
                count:{$sum:1},
                referral:{$sum:{$cond: [ "$referredBy",1 , 0  ]}}
            }},
            {$limit: 15},
            {$sort:{_id:1}},
            
        ])
       
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.topReferralCustomer = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var list = await Customers.aggregate([
            {$match:{...query,referredBy:{$exists: true}}},
            {$group: { _id: "$referredBy", totalReferrals:{$sum:1}}},
            {$sort:{totalReferrals:-1}},
            {$limit: 10},
            {$lookup: {
                   from: "customers",
                   localField: "_id",
                   foreignField: "_id",
                   as: "referralUser"
                 }},
            {$unwind: {path:"$referralUser"}},
            {$project: {
                name:"$referralUser.name",
                phone:"$referralUser.phone",
                email:"$referralUser.email",
                totalReferrals:1
            }}
        ])
        res.json({
            success:true,
            result:list
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.topPerformingCustomer = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var list = await Orders.aggregate([
            {$match:query},
            {$group: { _id: "$customer",numOfOrder:{$sum:1},orderTotal:{$sum:"$finalPrice"}}},
            {$sort: {numOfOrder:-1}},
            {$limit: 10},
            {$lookup: {
                    from: "customers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
            }},
            {$unwind: {path:"$userDetails"}},
            {$project: {
                numOfOrder:1,
                orderTotal:1,
                name:"$userDetails.name",
                email:"$userDetails.email",
                phone:"$userDetails.phone",
            }}
        ])
        res.json({
            success:true,
            result:list
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.newlyAddedCustomer = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var list = await Customers.aggregate([
            {$match:{...query}},
            {$sort:{createdAt:-1}}, 
            {$limit:10},
            {$project: {
                name:1,
                email:1,
                phone:1,
                createdAt:1
            }}
        ])
        res.json({
            success:true,
            result:list
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.recentContactUs = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var details = await ContactQuery.find(query).sort({createdAt:-1}).limit(5)
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.recentCustomize = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var details = await CustomizeJewellery.find(query).sort({createdAt:-1}).limit(5)
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.recentBulkOrder = async (req, res) => {
    try{
        var query ={};
        var postData = req.body;
        
        if(postData?.date){
            var dateQuery = {};
            if(postData.date?.[0]){
                dateQuery["$gte"]= moment(postData.date?.[0]).startOf("day").toDate();
            }
            if(postData.date?.[1]){
                dateQuery["$lte"]= moment(postData.date?.[1]).endOf("day").toDate();
            }

            if(Object.keys(dateQuery).length>0)
                query["createdAt"]=dateQuery;
        }
        var details = await BulkOrder.find(query).sort({createdAt:-1}).limit(5)
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.recentOrder = async (req, res) => {
    try{
        var details = await Orders.find({}).sort({createdAt:-1}).limit(5).populate("orderStatus")
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.recentReturn = async (req, res) => {
    try{
        var details = await OrderReturn.find({}).sort({createdAt:-1}).limit(5).populate("returnStatus")
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}
exports.categoryWiseInventory = async (req, res) => {
    try{
        var details = await ProductVariants.aggregate([
            {$match:{quantity:{$lte:5}}},
            {$lookup: {
                   from: "products",
                   localField: "product",
                   foreignField: "_id",
                   as: "product"
                 }},
            {$unwind: {path:"$product"}},
            {$project:{
                name:"$product.productName",  
                categories_id:"$product.categories_id",  
                quantity:1,
                productCode:1
            }},
            {$lookup: {
                   from: "categories",
                   localField: "categories_id",
                   foreignField: "_id",
                   as: "categoryDetail"
                 }
            },
            {$unwind: {path:"$categoryDetail"}},
            {$project: {
                quantity:1,
                productCode:1,
                name:1,
                rootCategory:{$cond: [  "$categoryDetail.categories_id" , "$categoryDetail.categories_id", "$categoryDetail._id"  ]}
            }},
            {$group: { _id: "$rootCategory",products: { $push : "$$ROOT" }}},
            {$lookup: {
                   from: "categories",
                   localField: "_id",
                   foreignField: "_id",
                   as: "categoryDetail"
                 }
            },
            {$unwind: {path:"$categoryDetail"}},
            {$project: {
                categoyName:"$categoryDetail.title",
                products:1,
                _id:0
            }}
        ])
        res.json({
            success:true,
            result:details
        })
    }   
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    } 
}