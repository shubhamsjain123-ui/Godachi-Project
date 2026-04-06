import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Price from "../../Price";
import moment from "moment";
import axios from "axios";
import { API_URL, IMG_URL } from "../../../../config/config";
import Link from "next/link";
import Modal from 'react-bootstrap/Modal';
const Defaut = ({
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
        console.log(error)
       }
   }

   useEffect(()=>{
    console.log(wayBill)
       if(wayBill)
           fetchTrackingDetails()
   },[wayBill])

   return (
    <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>
                <h4>Delivery by {trackingDetails?.logistic}</h4>
                <h6>Tracking ID: {wayBill}</h6>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                trackingDetails &&
                trackingDetails?.scan_details.map((track)=>{
                    return(
                        <>
                            <div className="day_detail">
                                <label className="B15_42">{moment(track.status_date_time).format("dddd, DD MMM YYYY")}</label>
                                <div className="detail">
                                    <div className="M14_75 time">{moment(track.status_date_time).format("hh:mm A")}</div>
                                    <div className="M14_42 status">
                                        {track.status_remark} <br />
                                        <span className="italic">{track?.status_location}</span>
                                    </div>
                                </div>
                            </div>

                        </>
                    )
                })
            }
        </Modal.Body>
    </Modal>
   );
};

export default Defaut;
