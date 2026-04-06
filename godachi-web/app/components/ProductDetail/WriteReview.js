
import { useEffect, useState, useCallback } from "react";
import { Rating } from 'react-simple-star-rating';
import ImageUploading from 'react-images-uploading';
import axios from "axios";
import { API_URL, IMG_URL } from "../../../config/config";
import {useDropzone} from 'react-dropzone';
import styled from "styled-components";
import {Row, Col, Form, Button, Modal} from "react-bootstrap"
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


const Page = ({
    showModal, 
    setShowModal,
    productName,
    productId,
    onSuccess
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


    //const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const handleClose = ()=>{
        setShowModal(false);
    }

    const postReview = async ()=>{
        if(rating==0){
            message.error("Please Rate product to continue");
            return
        }
        if(review==""){
            message.error("Please add review to continue");
            return
        }
        var returnImages = [];
        try{
            if(acceptedFiles.length>0){
                const formData = new FormData();
                for (let i = 0; i < acceptedFiles.length; i += 1) {
                    formData.append('image', acceptedFiles[i]);
                }
    
                const dataImage = await axios.post(
                    `${API_URL}/upload/uploadReviewImage`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                returnImages = dataImage.data?.path?.map((filePath)=>filePath.replace(/\\/g, '/').replace("../admin/public/", "/"))
            }
        }
        catch(error){
            console.log(error)
            message.error("Some error occured. Please try again after some time")
        }
        try{
            var axiosData = {
                rating,
                review,
                images: returnImages,
            }
            var axiosResponse = await axios.post(`${API_URL}/products/postReview/${productId}`,axiosData)
            if(axiosResponse && axiosResponse.data){
                var response = axiosResponse.data;
                if(response.variant=="error"){
                    message.error(response.messagge);
                }
                else if(response.variant=="success"){
                    message.success(response.messagge);
                    setShowModal(false);
                    onSuccess()
                }
            }
        }
        catch(error){
            message.error("Some error occured. Please try again after some time")
        }
    }
    
     return (
        <>
            
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {productName}
					</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <Rating
                            onClick={(rate)=>setRating(rate)}
                            size = {35}
                            fillColor = "#ff6f52"
                        />
                        <p>Tap on the stars to rate your experience</p>

                        {/* <ImageUploading
                            multiple
                            value={images}
                            onChange={()=>{}}
                            maxNumber={3}
                            dataURLKey="data_url"
                        >
                            {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                            }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                Click or Drop here
                                </button>
                                &nbsp;
                                <button onClick={onImageRemoveAll}>Remove all images</button>
                                {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}
                        </ImageUploading> */}
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
                        <Form.Group className=" single-input-item mb-4">
                            <Form.Label>Description *</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Add Description"   
                                required 
                                value={review} 
                                onChange={({target:{value}})=>setReview(value)}
                            />
                        </Form.Group>
                        <button className="btn btn-sqr mt-3" onClick={postReview}>
                            Post Review
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
     );
  };
  
  export default Page;
  