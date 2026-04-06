import { useState, useEffect } from "react";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price";
import {Row, Col, Form, Button, Modal, InputGroup, Accordion } from "react-bootstrap";
import { message } from "antd";
import axios from "axios";
import { API_URL, IMG_URL } from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { updateBasketFromProduct } from "../../../redux/actions";
const Default = ({
    showCouponModal,
    setShowCouponModal
}) => {
    const { basket } = useSelector((state) => state.basket);
    const dispatch = useDispatch();
    const [couponCode, setCouponCode] = useState("");
    const [appliedCouponError, setAppliedCoupounError] = useState(null);
    //const [showCouponModal, setShowCouponModal] = useState(false);
    const [availableCouponCodes, setAvailableCouponCode] = useState([]);
    const onApplyCoupon = async(code=null)=>{
        if(!code && couponCode){
            code = couponCode;
        }
        else{
            setCouponCode(code)
        }

        if(code){
            //check if coupon can be applied
            var isCouponApplicable = false;
            try{
                var axiosResponse = await axios.post(`${API_URL}/coupons/isCouponApplicable`,{basket:basket,couponCode: code});
                if(axiosResponse && axiosResponse.data){
                    var response = axiosResponse.data;
                    if(response.variant=="error"){
                        //message.error(response.messagge);
                        setAppliedCoupounError(response.messagge)
                    }
                    else if(response.variant=="success"){
                        isCouponApplicable = true
                    }
                }
            }
            catch(error){
                message.error(error.message)
            }
            //if coupon applicable update applied coupon and update cart
            if(isCouponApplicable){
                setShowCouponModal(false)
                await dispatch(updateBasketFromProduct({
                    ...basket,
                    couponCode: code
                }));
                message.success({ content: "Coupon Applied Successfully", duration: 3 });
            }
        }else{
            message.error("Please enter a valid coupon code");
        }
        
    }

    const getAvailableCouponList = async ()=>{
        try{
            var axiosResponse = await axios.get(`${API_URL}/coupons/getAvailableCodes`);
            if(axiosResponse && axiosResponse.data){
                var response = axiosResponse.data;
                if(response.variant=="error"){
                    message.error(response.messagge);
                }
                else if(response.variant=="success"){
                    setAvailableCouponCode(response.result)
                }
            }
        }
        catch(error){
            message.error(error.message)
        }
    }

    useEffect(()=>{
        getAvailableCouponList()
    },[])
    useEffect(()=>{
        setAppliedCoupounError(null)
    },[couponCode])
   return (
        <>
            <Modal show={showCouponModal} onHide={()=>setShowCouponModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Apply Coupon</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <InputGroup>
                    <Form.Control
                        placeholder="Enter Coupon Code"
                        value={couponCode} 
                        onChange={({target:{value}})=>setCouponCode(value)}
                    />
                    <Button className="ps-3 pe-3" onClick={()=>onApplyCoupon()}>
                        Apply
                    </Button>
                </InputGroup>
                {
                    appliedCouponError &&
                    <div className="text-danger mt-1"><b><i>{appliedCouponError}</i></b></div>
                }
                <div className="mb-3"></div>
                {
                    availableCouponCodes.length==0 &&
                    <>
                        <p className="noCouponText">Sorry No Coupon Code Available</p>
                    </>
                }
                {
                    availableCouponCodes.length>0 &&
                    availableCouponCodes.map((availableCode)=>{
                        return(
                            <>
                                <div className="coupon-wrapper border">
                                    <div className="coupon-header">
                                        <p className="coupon-name">{availableCode.couponCode}</p>
                                        <p className="apply-coupon" onClick={()=>onApplyCoupon(availableCode.couponCode)}>Apply</p>
                                    </div>
                                    <div className="coupon-details">
                                        <div className="coupon-headline">{availableCode.couponName}</div>  
                                        {
                                            availableCode.description &&
                                            <div className="coupon-info">
                                                <p>{availableCode.description}</p>
                                            </div>
                                        }   
                                        {
                                            availableCode.tnc &&
                                            <Accordion>
                                                <Accordion.Item eventKey="0">
                                                <Accordion.Header>View Tnc</Accordion.Header>
                                                    <Accordion.Body>
                                                        {availableCode.tnc}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        }                                      
                                        
                                        
                                    </div>
                                    </div>
                            </>
                        )
                    })
                }
                </Modal.Body>
            </Modal>
        </>
        
   );
};

export default Default;
