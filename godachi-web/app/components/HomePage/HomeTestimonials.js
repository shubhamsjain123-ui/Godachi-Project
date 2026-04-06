import { useRef, useEffect } from "react";
import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import { findDOMNode } from "react-dom";
import Image from "next/image";

const Default = ({ data }) => {
   const imgRef = useRef(null)
   const reviewRef = useRef(null)

   const runSlider = () => {
      const $ = window.$;
      if (imgRef && reviewRef) {
         const elImg = findDOMNode(imgRef.current);
         const elReview = findDOMNode(reviewRef.current);
         $(elReview).slick({
            arrows: false,
            asNavFor: imgRef.current
         });
         $(elImg).slick({
            slidesToShow: 3,
            autoplay: true,
            speed: 1000,
            asNavFor: reviewRef.current,
            centerMode: true,
            arrows: false,
            centerPadding: 0,
            focusOnSelect: true
         });
      }
   }
   useEffect(() => {
      runSlider();
   }, [imgRef, reviewRef])
   if (!data)
      return (<></>)
   return (
      <section
         className="testimonial-area section-padding bg-img"
         data-bg="assets/img/testimonial/testimonials-bg.jpg"
         style={{
            backgroundImage: `url("assets/img/testimonial/testimonials-bg.jpg")`
         }}
      >
         <div className="container">
            <div className="row testimonialSection">
               <div className="col-12">
                  {/* section title start */}
                  <div className="section-title text-center">
                     <h2 className="title">{data.title}</h2>
                     <p className="sub-title">{data.sub_title}</p>
                  </div>
                  {/* section title start */}
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="testimonial-thumb-wrapper">
                     <div className="testimonial-thumb-carousel" ref={imgRef}>
                        {
                           data.testimonial.map((testimonial) => {
                              return (
                                 <div className="testimonial-thumb">
                                    {/* <img
                                       src={IMG_URL + testimonial.image}
                                       alt="testimonial-thumb"
                                    /> */}
                                    <Image
                                       src={IMG_URL + testimonial.image}
                                       alt="testimonial-thumb"
                                       width={100}
                                       height={120}
                                    />
                                 </div>
                              )
                           })
                        }
                     </div>
                  </div>
                  <div className="testimonial-content-wrapper">
                     <div className="testimonial-content-carousel" ref={reviewRef}>
                        {
                           data.testimonial.map((testimonial) => {
                              return (
                                 <div className="testimonial-content">
                                    <p>
                                       {testimonial.review}
                                    </p>
                                    <div className="ratings">
                                       {
                                          [...Array(
                                             parseInt(testimonial.star)
                                          ).keys()]
                                             .map(() => {
                                                return (
                                                   <span>
                                                      <i className="fa fa-star" />
                                                   </span>
                                                )
                                             })
                                       }
                                    </div>
                                    <h5 className="testimonial-author">{testimonial.name}</h5>
                                 </div>
                              )
                           })
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>


   );
};

export default Default;
