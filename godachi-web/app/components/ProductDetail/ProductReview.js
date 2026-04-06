import { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating';
import axios from "axios";
import { API_URL, IMG_URL } from "../../../config/config";
import Date from "../Date";
import WriteReview from "./WriteReview"
const Page = (props) => {
    const {
        productDetails,
        productId,
        productRating,
        productReview
    } = props
    const [showWriteReview, setShowWriteReview] = useState(false)
    const [reviewDetails, setReviewDetails] = useState({
        canReview: false,
        totalReviews:0,
        totalRatings:0,
        list: []
    });
    const getReviews = async () =>{
        const response = await axios.get(`${API_URL}/productspublic/getAllReviews/${productId}`);
        setReviewDetails(response.data);
    }
    useEffect(()=>{
        //if(productRating){
            getReviews();
        //}
    },[])

     return (
        <div className="review-form" >
            <div className="d-flex justify-content-between">
                <div>
                {
                        reviewDetails.totalRatings>0?
                        <>
                            <div className="d-flex">
                                <Rating
                                    readonly = {true}
                                    initialValue = {reviewDetails.totalRatings}
                                    allowFraction = {true}
                                    size = {25}
                                    fillColor = "#ff6f52"
                                />
                                <h4 className="align-self-center ps-2">{reviewDetails.totalRatings}/5</h4>
                            </div>
                            
                            <h6 className="mt-2">
                                Based on {reviewDetails.totalReviews} Ratings & Reviews
                            </h6>
                        </>
                        :
                        <h6>
                            No Customer Reviews
                        </h6>
                    }
                </div>
                {
                    reviewDetails.canReview &&
                    <>
                        <button
                            className="btn col-3 mb-0 align-self-center"
                            style={{
                                color: "#fff",
                                backgroundColor: "#c29958",
                                fontSize: "12px",
                                padding:"10px"
                            }}
                            onClick={()=>setShowWriteReview(true)}
                        >
                            Write a Review
                        </button>
                        <WriteReview
                            showModal={showWriteReview}
                            setShowModal={setShowWriteReview}
                            productName={productDetails.productName}
                            productId={productDetails._id}
                            onSuccess = {getReviews}
                        />
                    </>
                    
                }
                
            </div>
            
            
            {
                reviewDetails?.list.map((review)=>{
                    return(
                        <div className="total-reviews mt-4" key={review._id}>
                            <div className="rev-avatar">
                                <img src={IMG_URL+"/images/avatar.jpg"} alt="" />
                            </div>
                            <div className="review-box">
                                <div className="ratings">
                                <Rating
                                    readonly = {true}
                                    initialValue = {review.rating}
                                    allowFraction = {true}
                                    size = {20}
                                    fillColor = "#ff6f52"
                                />
                                </div>
                                <div className="post-author">
                                    <p>
                                    <span>{review.customer.name} -</span> <Date data={review.createdAt} />
                                    </p>
                                </div>
                                <p>
                                    {review.review}
                                </p>
                                {
                                    review.images && review.images.length>0 &&
                                    <div className="row">
                                        {
                                           review.images.map((image)=>{
                                                return(
                                                    <div className="col-3">
                                                        <a href={IMG_URL+image} target="_blank">
                                                            <img 
                                                                src ={IMG_URL+image} 
                                                                style={{
                                                                    height: "100px",
                                                                    objectFit: "cover",
                                                                    border: "1px solid lightgray",
                                                                    width: "100%"
                                                                }}
                                                            />
                                                        </a>
                                                        
                                                    </div>
                                                )
                                           }) 
                                        }
                                    </div>
                                }
                                
                            </div>
                        </div>
                    )
                    
                })
            }
           
            
        </div>
     );
  };
  
  export default Page;
  