import { useState } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import {Row, Col, Form, Button} from "react-bootstrap"
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../../../config/config";
import { message } from "antd";
const Defaut = () => {
   const { user } = useSelector((state) => state.login);
   const id = Router.query.id
   const [validated, setValidated] = useState(false);
   const [states, setStates] = useState([]);
   const [defaultFormData, setDefaultFormData] = useState({
        nickName: "",
        title: "",
        firstName: "",
        lastName: "",
        address: "",
        landmark: "",
        city: "",
        state: "",
        country: "India",
        pinCode: "",
        countryCode: "+91",
        phoneNumber: "",
        defaultAddress: false,
   })
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      
    }
    else{
        var formTarget = event.target;
        /* var formData ={
            nickName: formTarget.nickName?.value,
            title: formTarget.title?.value,
            firstName: formTarget.firstName?.value,
            lastName: formTarget.lastName?.value,
            address: formTarget.address?.value,
            landmark: formTarget.landmark?.value,
            city: formTarget.city?.value,
            state: formTarget.state?.value,
            country: formTarget.country?.value,
            pinCode: formTarget.pinCode?.value,
            countryCode: formTarget.countryCode?.value,
            phoneNumber: formTarget.phoneNumber?.value,
            defaultAddress: formTarget.defaultAddress?.checked,
        } */
        var url = `${API_URL}/customers/address/manage`
        if(id){
            url=url+`/${id}`
        }
        try{
            var response = await axios.post(url, defaultFormData);
            if(response.data){
                if(response.data.variant=="success"){
                    message.success(response.data.messagge);
                    Router.push("/profile/address")
                   
                }
                else if(response.data.variant=="error"){
                    message.error(response.data.messagge);
                }
            }
        }
        catch(error){
            message.error(error.message)
        }
        
    }
    
    setValidated(true);
  };
  const fetchAddress = async()=>{
    try{
        var response = await axios.get(`${API_URL}/customers/address/${id}`);
        if(response.data){
            if(response.data.variant=="success"){
                if(response.data.result?.firstName){
                    setDefaultFormData(response.data.result);
                }
                    
            }
            else if(response.data.variant=="error"){
                message.error(response.data.messagge);
            }
        }
    }
    catch(error){
        message.error(error.message)
    }
  }
  const fetchStatesMaster = async()=>{
    try{
        var response = await axios.get(`${API_URL}/masters/getStates`);
        if(response.data){
            if(response.data.success){
                setStates(response.data.result)
            }
        }
    }
    catch(error){
        message.error(error.message)
    }
  }
  useEffect(()=>{
    if(id){
        fetchAddress();
    }
    fetchStatesMaster();
  },[])
   return (
      <>
         <div
            id="address-edit"
        >
            <div className="myaccount-content">
            <h5>{id?"Edit Address":"Create Address"}</h5>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mt-3 single-input-item">
                    <Form.Label>Nick Name</Form.Label>
                    <Form.Control type="text" placeholder="Home, Office" value={defaultFormData.nickName} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, nickName:value})} />
                </Form.Group>
                <Row>
                    <Col md={4}>
                        <Form.Group className=" single-input-item">
                            <Form.Label>Title *</Form.Label>
                            <Form.Select aria-label="Default select example" name="title" required value={defaultFormData.title} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, title:value})}>
                                <option value="Mr.">Mr.</option>
                                <option value="Ms.">Ms.</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className=" single-input-item">
                            <Form.Label>First Name *</Form.Label>
                            <Form.Control type="text" placeholder="First Name"  name="firstName" required value={defaultFormData.firstName} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, firstName:value})}/>
                        </Form.Group>
                        
                    </Col>
                    <Col md={4}>
                        <Form.Group className=" single-input-item">
                            <Form.Label>Last Name *</Form.Label>
                            <Form.Control type="text" placeholder="Last Name"  name="lastName" required value={defaultFormData.lastName} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, lastName:value})}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className=" single-input-item">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control type="text" placeholder="Address"  name="address" required value={defaultFormData.address} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, address:value})}/>
                </Form.Group>
                <Form.Group className=" single-input-item">
                    <Form.Label>Landmark *</Form.Label>
                    <Form.Control type="text" placeholder="Landmark"  name="landmark" required value={defaultFormData.landmark} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, landmark:value})}/>
                </Form.Group>
                <Row>
                    <Col md={3}>
                        <Form.Group className=" single-input-item">
                            <Form.Label>City *</Form.Label>
                            <Form.Control type="text" placeholder="City"  name="city" required value={defaultFormData.city} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, city:value})}/>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className=" single-input-item">
                            <Form.Label>State *</Form.Label>
                            {/* <Form.Control type="text" placeholder="State"  name="state" required value={defaultFormData.state} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, state:value})}/> */}

                            <Form.Select name="state" required value={defaultFormData.state} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, state:value})}>
                                <option value="">Please Select</option>
                                {
                                    states.map((state)=>(
                                        <option value={state._id}>{state.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className=" single-input-item" >
                            <Form.Label>Country *</Form.Label>
                            <Form.Control type="text" placeholder="Country"  name="country" required disabled value={defaultFormData.country}/>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className=" single-input-item">
                            <Form.Label>Pin Code *</Form.Label>
                            <Form.Control type="text" placeholder="Pin Code"  name="pinCode" required value={defaultFormData.pinCode} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, pinCode:value})}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <Form.Group className=" single-input-item">
                            <Form.Label>Country Code *</Form.Label>
                            <Form.Control type="text" placeholder="Country Code"  name="countryCode" required value={defaultFormData.countryCode} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, countryCode:value})}/>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className=" single-input-item">
                            <Form.Label>Mobile Number *</Form.Label>
                            <Form.Control type="text" placeholder="Mobile Number"  name="phoneNumber" required value={defaultFormData.phoneNumber} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, phoneNumber:value})}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mt-3">
                    <Form.Check 
                        type="checkbox"
                        id="default"
                        label="Set as default"
                        name="defaultAddress"
                        checked = { defaultFormData.defaultAddress}
                        onChange={({target:{checked}})=> setDefaultFormData({...defaultFormData, defaultAddress:checked})}
                    />
                </Form.Group>
                <button className="btn btn-sqr mt-3">
                    Save Changes
                </button>
                </Form>
            </div>
        </div>
        
      </>
   );
};

export default Defaut;
