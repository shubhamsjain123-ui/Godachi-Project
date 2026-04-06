import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import { Row, Col, Form, Button } from "react-bootstrap"
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../../config/config";
import { message } from "antd";
const Defaut = ({
    addressDetails,
    setAddressDetails
}) => {
    const form = useRef(null);
    var initialState = {
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
        phoneNumber: ""
    }
    const [defaultFormData, setDefaultFormData] = useState(initialState);
    const [states, setStates] = useState([]);
    const fetchStatesMaster = async () => {
        try {
            var response = await axios.get(`${API_URL}/masters/getStates`);
            if (response.data) {
                if (response.data.success) {
                    setStates(response.data.result)
                }
            }
        }
        catch (error) {
            message.error(error.message)
        }
    }
    useEffect(() => {
        setAddressDetails(defaultFormData);
    }, [defaultFormData])
    useEffect(() => {
        setDefaultFormData(addressDetails ? addressDetails : initialState)
    }, [addressDetails])
    useEffect(() => {
        fetchStatesMaster();
    }, [])
    return (
        <>
            <Row>
                <Col md={4}>
                    <Form.Group className=" single-input-item">
                        <Form.Label>Title *</Form.Label>
                        <Form.Select aria-label="Default select example" className="select" name="title" required value={defaultFormData.title} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, title: value })}>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className=" single-input-item">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control type="text" placeholder="First Name" name="firstName" required value={defaultFormData.firstName} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, firstName: value })} />
                    </Form.Group>

                </Col>
                <Col md={4}>
                    <Form.Group className=" single-input-item">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" name="lastName" required value={defaultFormData.lastName} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, lastName: value })} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className=" single-input-item">
                <Form.Label>Address *</Form.Label>
                <Form.Control type="text" placeholder="Address" name="address" required value={defaultFormData.address} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, address: value })} />
            </Form.Group>
            <Form.Group className=" single-input-item">
                <Form.Label>Landmark *</Form.Label>
                <Form.Control type="text" placeholder="Landmark" name="landmark" required value={defaultFormData.landmark} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, landmark: value })} />
            </Form.Group>
            <Row>
                <Col md={3}>
                    <Form.Group className=" single-input-item">
                        <Form.Label>City *</Form.Label>
                        <Form.Control type="text" placeholder="City" name="city" required value={defaultFormData.city} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, city: value })} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className=" single-input-item">
                        <Form.Label>State *</Form.Label>
                        {/* <Form.Control type="text" placeholder="State"  name="state" required value={defaultFormData.state} onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, state:value})}/> */}
                        <Form.Select name="state" className="select" required value={defaultFormData?.state?._id} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, state: value })}>
                            <option value="">Please Select</option>
                            {
                                states.map((state) => (
                                    <option value={state._id}>{state.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className=" single-input-item">
                        <Form.Label>Country *</Form.Label>
                        <Form.Control type="text" placeholder="Country" name="country" required disabled value={defaultFormData.country} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, country: value })} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className=" single-input-item">
                        <Form.Label>Pin Code *</Form.Label>
                        <Form.Control type="text" placeholder="Pin Code" name="pinCode" required value={defaultFormData.pinCode} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, pinCode: value })} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <Form.Group className=" single-input-item">
                        <Form.Label>Code *</Form.Label>
                        <Form.Control type="text" placeholder="Country Code" name="countryCode" required value={defaultFormData.countryCode} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, countryCode: value })} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className=" single-input-item">
                        <Form.Label>Mobile Number *</Form.Label>
                        <Form.Control type="text" placeholder="Mobile Number" name="phoneNumber" required value={defaultFormData.phoneNumber} onChange={({ target: { value } }) => setDefaultFormData({ ...defaultFormData, phoneNumber: value })} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};

export default Defaut;
