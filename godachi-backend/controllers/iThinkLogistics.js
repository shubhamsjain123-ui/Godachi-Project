const TRACK_API_URL = process.env.ITHINKLOGISTICS_TRACK_URL;
const API_URL = process.env.ITHINKLOGISTICS_URL;
const accessToken = process.env.ITHINKLOGISTICS_ACCESS_TOKEN;
const secretKey = process.env.ITHINKLOGISTICS_SECRET_KEY;
const pickupAddressID = process.env.ITHINKLOGISTICS_PICKUP_ADDRESS_ID;
const pickupPinCode = process.env.ITHINKLOGISTICS_PICKUP_PINCODE;

const axios = require('axios');

const sendApiCall = async (path, data, url = API_URL)=>{
    try{
        var axiosResponse = await axios.post(`${url}${path}`,{
            data:{
                access_token: accessToken,
                secret_key: secretKey,
                ...data
            }
        },{
            headers: {
                'content-type': "application/json",
                'cache-control': "no-cache",
                "Accept-Encoding": "*",
            }
        })
        return axiosResponse
    }
    catch(error){
        return false
    }
}

exports.checkPinCode = async (pinCode) =>{
    const result = await sendApiCall("pincode/check.json",{pincode: pinCode});
    if(result){
        return result.data;
    }
    return false
}

exports.getOrderShipping = async (data) =>{
    data.from_pincode = pickupPinCode;
    const result = await sendApiCall("rate/check.json",data);
    if(result){
        return result.data;
    }
    return false
}

exports.getRates = async (pinCode, mrp, weight="1", paymentMethod="cod") =>{
    const result = await sendApiCall("rate/check.json",{
        from_pincode: pickupPinCode,
        to_pincode: pinCode,
        shipping_weight_kg:weight,
        payment_method:paymentMethod,
        product_mrp:mrp,
        order_type : "forward",
        shipping_length_cms  : "22",
        shipping_width_cms  : "12",
        shipping_height_cms  : "12",
    });
    if(result){
        return result.data;
    }
    return false
}

exports.getZoneRates = async (weight, paymentMethod, mrp) =>{
    const result = await sendApiCall("rate/zone_rate.json",{
        from_pincode: pickupPinCode,
        shipping_weight_kg:weight,
        payment_method:paymentMethod,
        product_mrp:mrp
    });
    if(result){
        return result.data;
    }
    return false
}

exports.trackOrder = async (trackingId) =>{
    const result = await sendApiCall("order/track.json",{
        awb_number_list: trackingId
    }, TRACK_API_URL);
    if(result){
        return result.data;
    }
    return false
}

/*
    Shipment Label Page Size(eg. A4, A5, A6). 
    {
        "awb_numbers" : "86210010463",       #AWB Number whose data is needed.
        "page_size" : "A4",
        "access_token" : "eb24e17b9d88443e26bc822419b90ddf",
        "secret_key" : "bed1a92798551638eeb0f2ceb1845d3d",
        "display_cod_prepaid" : "",        #1- yes, 0- No, blank - Default as per settings.     #NEW
        "display_shipper_mobile" : "",         #1- yes, 0- No, blank - Default as per settings.      #NEW
        "display_shipper_address" : "",        #1- yes, 0- No, blank - Default as per settings.        #NEW
    }
*/
exports.printShipmentLabel = async (trackingId, pageSize = "A4" ) =>{
    const result = await sendApiCall("shipping/label.json",{
        awb_numbers: trackingId,
        page_size: pageSize
    });
    if(result){
        return result.data;
    }
    return false
}

exports.printShipmentManifest = async (trackingId ) =>{
    const result = await sendApiCall("shipping/manifest.json",{
        awb_numbers: trackingId
    });
    if(result){
        return result.data;
    }
    return false
}

exports.createOrder = async (shipmentData, logistics) =>{
    const result = await sendApiCall("order/add.json",{
        shipments: [{
            ...shipmentData,
            return_address_id:pickupAddressID
        }],
        pickup_address_id: pickupAddressID,
        logistics: logistics,
        s_type:""
    });
    if(result){
        return result.data;
    }
    return false
}

exports.returnOrder = async (shipmentData,logistics) =>{
    const result = await sendApiCall("order/add.json",{
        shipments: [{
            ...shipmentData,
            return_address_id:pickupAddressID
        }],
        pickup_address_id: pickupAddressID,
        logistics:logistics,
        order_type: "reverse",
        s_type:""
    });
    if(result){
        return result.data;
    }
    return false
}

exports.cancelOrder = async (trackingId ) =>{
    const result = await sendApiCall("order/cancel.json",{
        awb_numbers: trackingId
    });
    if(result){
        return result.data;
    }
    return false
}