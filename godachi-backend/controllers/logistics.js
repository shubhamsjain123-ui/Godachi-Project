const IthinkLogistics = require("./iThinkLogistics")

exports.checkPinCode = async(req,res)=>{
    var pinCode = req.body.pinCode;
    var price = req.body.price;
    if(!pinCode){
        return res.json({
            success: false,
            message:"Please enter valid pin code"
        })
    }
    var checkPincode = await IthinkLogistics.getRates(pinCode,price);
    if(checkPincode?.status=="success"){
        return res.json({
            success: true,
            result:{
                expected_delivery_date: checkPincode.expected_delivery_date
            }
        })
    }
    return res.json({
        success: false,
        message:"We are not yet delivering to this pin code"
    })
}

exports.trackOrder = async(req,res)=>{
    var wayBill = req.params.wayBill;
    if(!wayBill){
        return res.json({
            success: false,
            message:"Please enter valid AWS number"
        })
    }
    var trackingDetails = await IthinkLogistics.trackOrder(wayBill);
    if(trackingDetails?.status_code==200){
        return res.json({
            success: true,
            result: trackingDetails.data[wayBill]?trackingDetails.data[wayBill]:trackingDetails.data["901234567109"]
        })
    }
    return res.json({
        success: false,
        message:"Unable to fetch data. Please try again"
    })
}

exports.printShipment = async(req,res)=>{
    var wayBill = req.params.wayBill;
    if(!wayBill){
        return res.json({
            success: false,
            message:"Please enter valid AWS number"
        })
    }
    var shipmentLabel = await IthinkLogistics.printShipmentLabel(wayBill);
    if(shipmentLabel?.status_code==200){
        return res.json({
            success: true,
            result: shipmentLabel.file_name
        })
    }
    return res.json({
        success: false,
        message:"Unable to fetch data. Please try again"
    })
}

exports.printManifest = async(req,res)=>{
    var wayBill = req.params.wayBill;
    if(!wayBill){
        return res.json({
            success: false,
            message:"Please enter valid AWS number"
        })
    }
    var shipmentLabel = await IthinkLogistics.printShipmentManifest(wayBill);
    if(shipmentLabel?.status_code==200){
        return res.json({
            success: true,
            result: shipmentLabel.file_name
        })
    }
    return res.json({
        success: false,
        message:"Unable to fetch data. Please try again"
    })
}