import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../../config/config";
import Address from "../Address"
import { getCookie } from "cookies-next";
const Default = ({
    setParentAddress,
    title
}) => {
    const { isAuthenticated } = useSelector(({ login }) => login);
    const [addressList, setAddressList] = useState([]);
    const [address, setAddress] = useState(null);
    const getUserAddresses = async () => {
        if (isAuthenticated) {
            await axios
                .get(`${API_URL}/customers/address`)
                .then((res) => {
                    if (res.data?.result) {
                        setAddressList(res.data.result)
                        var defaultAddress = res.data.result.find((adrs) => adrs.defaultAddress == true)
                        if (defaultAddress) {
                            setAddress(defaultAddress)
                        }
                    }
                });
        }
    }

    const updateAddress = ({ target: { value } }) => {
        if (value == -1) {
            setAddress(null)
        }
        else if (value != "") {
            var selectedAddress = addressList.find((adrs) => adrs._id == value)
            if (selectedAddress) {
                setAddress(selectedAddress)
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            getUserAddresses();
        }
    }, [isAuthenticated])

    useEffect(() => {
        setParentAddress(address)
    }, [address])
    return (
        <>
            <div className="checkout-billing-details-wrap">
                {
                    title ?
                        <h5 className="checkout-title">{title}</h5>
                        : <div className="mb-3" />
                }
                {
                    addressList.length > 0 &&
                    <Row>
                        <Col md={12}>
                            <Form.Group className=" single-input-item">
                                <Form.Label>Select Address</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={updateAddress} className="select">
                                    <option value="">Please select</option>
                                    {
                                        addressList.map((adrs) => (
                                            <option value={adrs._id} selected={adrs.defaultAddress}>
                                                {`${adrs.firstName} ${adrs.lastName}, ${adrs.address}, ${adrs.city}, ${adrs?.state?.name}`}
                                            </option>
                                        ))
                                    }
                                    <option value="-1">Use Different Address</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                }
                <Address
                    addressDetails={address}
                    setAddressDetails={setAddress}
                />
            </div>

        </>

    );
};

export default Default;
