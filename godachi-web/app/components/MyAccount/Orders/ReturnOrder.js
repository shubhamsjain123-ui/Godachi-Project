import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Price from "../../Price";
import moment from "moment";
import axios from "axios";
import { API_URL, IMG_URL } from "../../../../config/config";
import Link from "next/link";
import {Row, Col, Form, Button, Modal} from "react-bootstrap"
import {useDropzone} from 'react-dropzone';
import styled from "styled-components";
import { message } from "antd";
const getColor = (props) => {
    if (props.isDragAccept) {
      return "#00e676";
    }
    if (props.isDragReject) {
      return "#ff1744";
    }
    if (props.isFocused) {
      return "#2196f3";
    }
    return "#eeeeee";
  };
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const Defaut = ({
    show,
    setShow,
    orderId,
    orderNumber,
    products,
    onRefresh
}) => {

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
      }, [])
      const {acceptedFiles, fileRejections, getRootProps, getInputProps} = useDropzone({
        maxFiles:3,
        accept: {
            'image/*': [],
          },
        onDrop
      });
      const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            <img src={ URL.createObjectURL(file)} width={80}/>
            <div>
                {file.path}
            </div>
        </li>
      ));
    
      const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
      ));

    const [defaultFormData, setDefaultFormData] = useState({
       products:[],
       reason:"",
       description:"",
       userConcent: true

   })
    const [validated, setValidated] = useState(false);

    const updateProductValue = (value, isChecked)=>{
        console.log(value)
        var defaultProducts = defaultFormData.products;
        if(isChecked){
            if(!defaultProducts.includes(value)){
                defaultProducts.push(value)
                setDefaultFormData({
                    ...defaultFormData,
                    products: defaultProducts
                })
            } 
        }
        else{
            if(defaultProducts.includes(value)){
                defaultProducts.splice(value,1)
                setDefaultFormData({
                    ...defaultFormData,
                    products: defaultProducts
                })
            } 
        }
    }
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if(defaultFormData.products.length==0){
            message.error("Please Select atleast one product to initiate return request")
            return 
        }
        setValidated(true);
        if(defaultFormData.reason=="" ){
            message.error("Please Select reason to initiate return request")
            return
        }
        if(defaultFormData.userConcent!=true ){
            message.error("Please agree to continue")
            return
        }
        if (form.checkValidity() !== false) {
            var returnImages = [];
            try{
                if(acceptedFiles.length>0){
                    const formData = new FormData();
                    for (let i = 0; i < acceptedFiles.length; i += 1) {
                        formData.append('image', acceptedFiles[i]);
                    }
        
                    const dataImage = await axios.post(
                        `${API_URL}/upload/uploadReturnImage`,
                        formData,
                        { headers: { "Content-Type": "multipart/form-data" } }
                    );
                    returnImages = dataImage.data?.path?.map((filePath)=>filePath.replace(/\\/g, '/').replace("../admin/public/", "/"))
                }
            }
            catch(error){
                message.error("Some error occured. Please try again after some time")
            }
            try{
                var axiosData = {
                    ...defaultFormData,
                    images: returnImages,
                }
                var axiosResponse = await axios.post(`${API_URL}/orders/returnRequest/${orderId}`,axiosData)
                if(axiosResponse && axiosResponse.data){
                    var response = axiosResponse.data;
                    if(response.variant=="error"){
                        message.error(response.messagge);
                    }
                    else if(response.variant=="success"){
                        message.success(response.messagge);
                        setShow(false);
                        onRefresh();
                    }
                }
            }
            catch(error){
                message.error("Some error occured. Please try again after some time")
            }
        }
      };
    useEffect(()=>{
        console.log(defaultFormData)
    },[defaultFormData])
   return (
    <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>
                <h4>Return Items</h4>
                <h6>Order ID: {orderNumber}</h6>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {
                    products && products.map((product)=>{
                        const allImgData = product.product?.allImages?.filter((img)=>img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
                        const img = allImgData[0] ? IMG_URL + allImgData[0].image : "/images/nofoto.jpg";
                        return (
                            <>
                            <Form.Check 
                                type="checkbox"
                                label={<div className="d-flex flex-row bd-highlight mb-3">
                                            <div className="p-2 bd-highlight"><img width="60" src={img} /></div>
                                            <div className="p-2 bd-highlight">
                                                <div><h6>{product.product.productName}</h6></div>
                                                <div><p>qty: {product.qty}</p></div>
                                                <div><p><Price data={product?.total} /></p></div>
                                            </div>
                                        </div>}
                                name="products"
                                style={{
                                    /* display: "flex",
                                    alignItems:"center" */
                                }}
                                value={product._id}
                                //defaultChecked
                                onChange={({target:{value,checked}})=>updateProductValue(value,checked)}
                            />
                                
                            </>
                          
                        )
                      })
                }
                <Form.Group className=" single-input-item">
                    <Form.Label>Select Reason *</Form.Label>
                    <Form.Select 
                        name="reason" 
                        required
                        value = {defaultFormData.reason}
                        onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, reason:value})}
                    >
                        <option value="">Please Select</option>
                        <option value="Defective Item">Defective Item</option>
                        <option value="Incorrect Size">Incorrect Size</option>
                        <option value="Wrong Product Received">Wrong Product Received</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className=" single-input-item mb-4">
                    <Form.Label>Description *</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Add Description"  
                        name="description" 
                        required 
                        value={defaultFormData.description} 
                        onChange={({target:{value}})=>setDefaultFormData({...defaultFormData, description:value})}
                    />
                </Form.Group>
                
                

                <Container {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop image files here, or click to select files</p>
                    <em>(Only image files will be accepted)</em>
                </Container>
                <aside>
                    {
                        acceptedFileItems.length>0 &&
                        <>
                            <h4>Uploaded Images</h4>
                            <ul>{acceptedFileItems}</ul>
                        </>
                    }
                    {
                        fileRejectionItems.length>0 &&
                        <>
                            <h4>Rejected files</h4>
                            <ul>{fileRejectionItems}</ul>
                        </>
                    }
                </aside>
                <Form.Group className="mt-3">
                    <Form.Check 
                        type="checkbox"
                        id="default"
                        label="I confrim that the product and it's part are in an unused condition & packed in their original packing which is not torn and the original receipt intact for the refund."
                        name="userConcent"
                        checked = { defaultFormData.userConcent}
                        onChange={({target:{checked}})=> setDefaultFormData({...defaultFormData, userConcent:checked})}
                    />
                </Form.Group>
                <button className="btn btn-sqr mt-3">
                    Process Return
                </button>
            </Form>
        </Modal.Body>
    </Modal>
   );
};

export default Defaut;
