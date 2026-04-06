import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config/config";
import {
  Button,
  message,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Radio,
  Modal
} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price"
import moment from "moment";
const Default = ({
    show,
    setShow,
    wayBill
}) => {
    const [trackingDetails, setTrackingDetails] = useState(null)
    const fetchTrackingDetails = async () =>{
        setTrackingDetails(null)
        try{
            var axiosResponse = await axios.get(`${API_URL}/logistics/trackOrder/${wayBill}`)
            if(axiosResponse && axiosResponse.data){
                var response = axiosResponse.data;
                console.log(response)
                if(response.success){
                    console.log(response)
                    setTrackingDetails(response.result)
                }
            }
        }
        catch(error){
    
        }
    }

    useEffect(()=>{
        if(wayBill)
            fetchTrackingDetails()
    },[wayBill])




  return (
    <Modal 
        title={ <>
                    <h2>Delivery by {trackingDetails?.logistic}</h2>
                    <h4>Tracking ID: {wayBill}</h4>
                </>
            } 
        open={show} 
        onOk={()=>setShow(false)} 
        onCancel={()=>setShow(false)}
        footer={null}
    >
        {
            trackingDetails &&
            trackingDetails?.scan_details.map((track)=>{
                return(
                    <>
                        <div className="day_detail">
                            <label className="B15_42">{moment(track.scan_date_time).format("dddd, DD MMM YYYY")}</label>
                            <div className="detail">
                                <div className="M14_75 time">{moment(track.scan_date_time).format("hh:mm A")}</div>
                                <div className="M14_42 status">
                                    {track.remark} <br />
                                    <span className="italic">{track?.scan_location}</span>
                                </div>
                            </div>
                        </div>

                    </>
                )
            })
        }
    </Modal>
  );
};

export default Default;
