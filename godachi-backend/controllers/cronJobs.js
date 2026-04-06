const {
    updateProductPrice
} = require("../utils/productPrice")


const {
    getTrackableOrder,
    updateTrackableOrder
} = require("./orders")

const {
    trackOrder
} = require("./iThinkLogistics")
exports.updateProductPriceController = async(req,res)=>{
    var updateJob = await updateProductPrice();
    res.json(200)
}

exports.updateTrackingStatus = async(req,res)=>{
    //get package that are in transit limit to 10
    var orderList = await getTrackableOrder();
    if(orderList && orderList?.length>0){
        //call track api
        var awb_number_list = orderList.map((orderDetail)=>orderDetail.waybill);
        var trackOrderResponse = await trackOrder(awb_number_list.join(","));
        //based on the current status update data
        await updateTrackableOrder(orderList, trackOrderResponse?.data);
        /* if(trackOrderResponse?.status_code==200 && trackOrderResponse?.data){
            
        } */
    }
    res.sendStatus(200)
}

