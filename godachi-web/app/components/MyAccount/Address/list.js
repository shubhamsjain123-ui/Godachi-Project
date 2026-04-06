import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { API_URL, IMG_URL } from "../../../../config/config";
import { Row, Col} from 'react-bootstrap';
import Link from "next/link";
import axios from "axios";
const Defaut = () => {
   const { user } = useSelector((state) => state.login);
   const [addressList, setAddressList] = useState([]);

    const getAddressList = async () => {
        try{
            var axiosResponse = await axios.get(`${API_URL}/customers/address`);
            if(axiosResponse.data){
                var response = axiosResponse.data;
                if(response.variant=="error"){
                    
                }
                else if(response.variant=="success"){
                    setAddressList(response.result)
                }
            }
        }
        catch(error){
            console.log(error)
        }
    };

    useEffect(()=>{
        getAddressList();
    },[])

   return (
      <>
         <div
            id="address-edit"
        >
            <div className="myaccount-content">
                <div>
                    <h5>
                        Your Address
                        <span className="text-end" style={{float:"right"}}>
                            <Link href="/profile/address/create">
                                <a className="btn btn-sqr text-end">
                                    <i className="fa fa-plus" />
                                    Create Address
                                </a>
                            </Link>    
                        </span>
                    </h5>
                </div>
                
                <Row>
                    {
                        addressList.map((address)=>(
                            <Col md={4}>
                                <div className="addressContainer">
                                    <address>
                                        {
                                            address.nickName &&
                                            <p> <strong>{address.nickName}</strong></p>
                                        }
                                        {
                                            <p>{`${address.title} ${address.firstName} ${address.lastName}`}</p>
                                        }
                                        <p> {`${address.address}`}
                                            <br />
                                            {`${address.city}, ${address?.state?.name}`}
                                            <br />
                                            {`${address.country}, ${address.pinCode}`}
                                        </p>
                                        {
                                            address.landmark &&
                                            <p> Landmark: {address.landmark}</p>
                                        }
                                        <p>Mobile: ({address.countryCode}) {address.phoneNumber}</p>
                                    </address>
                                    <Link href={`/profile/address/${address._id}`}>
                                        <a className="btn btn-sqr">
                                            <i className="fa fa-edit" />
                                            Edit Address
                                        </a>
                                    </Link>
                                    
                                </div>
                                
                            </Col>
                        ))
                    }
                    
                </Row>
            </div>
        </div>
        
      </>
   );
};

export default Defaut;
