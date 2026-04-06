import { useState, useCallback, useEffect } from "react";
import { Input, Form, Button, Select, Divider, message } from "antd";
const { TextArea } = Input;
import {Modal} from "react-bootstrap";
import { useIntl } from "react-intl";
import { API_URL } from "../../../config/config";

import axios from "axios";
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, formatPhoneNumber  } from 'react-phone-number-input';
import { useSelector } from "react-redux";
const Defaut = () => {
   const { user } = useSelector((state) => state.login);
   const intl = useIntl();
   const [form] = Form.useForm();
   const [userDetails, setUserDetails] = useState();
   const [isEmailVerified, setIsEmailVerified] = useState(user.emailVerified==true?true:false);
   const [fields, setFields] = useState([]);


   const sendVerificationEmail = async () =>{
        console.log(fields);
        const updatedEmailObj = fields.find((field)=>field.name[0]=="email" && field.errors.length==0);
        console.log(updatedEmailObj)
        if(updatedEmailObj){
            const updatedEmail = updatedEmailObj.value;
            var axiosResponse = await axios.post(`${API_URL}/customers/sendVerificationEmail/`,{email: updatedEmail});
            if(axiosResponse){
                if(axiosResponse?.data?.success){
                    message.success("Verification Email sent successfully. Please check your email");
                    getDataFc();
                }
                else if(axiosResponse?.data?.message){
                    message.error(axiosResponse?.data?.message);
                }
                else{
                    message.error("There is some error. Please try again");
                }
            }
        }
   }
   const updateName = async () =>{
        const updatedNameObj = fields.find((field)=>field.name[0]=="name" && field.errors.length==0);
        if(updatedNameObj){
            const updatedName = updatedNameObj.value;
            var axiosResponse = await axios.post(`${API_URL}/customers/updateCustomerName/`,{name: updatedName});
            if(axiosResponse){
                if(axiosResponse?.data?.success){
                    message.success("Name Updated Successfully");
                    getDataFc();
                }
                else if(axiosResponse?.data?.message){
                    message.error(axiosResponse?.data?.message);
                }
                else{
                    message.error("There is some error. Please try again");
                }
            }
        }
   }

   const getDataFc = async () =>{
        var axiosResponse = await axios.get(`${API_URL}/customers/getMyDetails/`);
        if(axiosResponse){
            if(axiosResponse?.data?.success){
                var userResponse = axiosResponse.data.result
                setUserDetails(userResponse)
                setIsEmailVerified(userResponse.emailVerified)
                setFields(
                    Object.entries({
                        name:userResponse.name,
                        email:userResponse.email,
                       }).map(([name, value]) => ({ name:[name], value, errors:[] }))
                )
            }
        }
    }

    useEffect(()=>{
        getDataFc();
    },[])
   return (
      <>
        <div
            id="account-info"
        >
            <div className="myaccount-content">
                <h5>Account Details</h5>
                <Form 
                    form={form} 
                    fields={fields}
                    onFieldsChange={(_,allFields)=>{
                        setFields(allFields)
                    }}
                >
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="single-input-item">
                                <Form.Item
                                    name="name"
                                    label={
                                        <div>
                                            Name 
                                            <Button className="btn btn-sqr ms-3" onClick={updateName}>Update Name</Button>
                                        </div>}
                                    rules={[
                                    {
                                        required: true,
                                        message: intl.messages["app.pages.common.pleaseFill"],
                                        whitespace: true,
                                    },
                                    ]}
                                >
                                    <Input placeholder="Full Name"/>
                                </Form.Item>
                            </div>
                            <div className="single-input-item">
                                    <Form.Item
                                        label={
                                                <div>
                                                    Email 
                                                    {
                                                        isEmailVerified &&
                                                        <span className="text-success ms-3">
                                                            <i className="fa fa-check-circle">Verified</i>
                                                        </span>
                                                    }
                                                    {
                                                        !isEmailVerified &&
                                                        <Button className="btn btn-sqr ms-3" onClick={sendVerificationEmail}>verify email</Button>
                                                    }
                                                </div>}
                                       /*  {
                                            ...(user.email?{}:{name:"email"})
                                        } */
                                        name="email"
                                        rules={ [
                                            {
                                              type: "email",
                                              message: "Please enter a valid email address",
                                            },
                                          ]}
                                    >
                                        <Input 
                                            placeholder="Enter your Email" 
                                            /* disabled={user.email?true:false} */ 
                                            /* value={user.email}  */
                                            onChange={({target:{value}})=>{
                                                if(value && user.email && value==user.email && user.emailVerified==true){
                                                    setIsEmailVerified(true);
                                                }
                                                else{
                                                    setIsEmailVerified(false);
                                                }
                                            }}
                                        />
                                    </Form.Item>
                            </div>
                            <div className="single-input-item">
                                <Form.Item
                                    label={<div>Mobile Number <span className="text-success ms-3"><i className="fa fa-check-circle">Verified</i></span></div>}
                                >
                                    <PhoneInput
                                        country="IN"
                                        placeholder="Enter 10 digit mobile number"
                                        value={userDetails?.origPhoneInput}
                                        disabled={true}
                                    />
                                </Form.Item>
                            </div>
                        
                            
                            
                        </div>
                    </div>
                    
                  
                </Form>
            </div>
        </div>
        
      </>
   );
};

export default Defaut;
