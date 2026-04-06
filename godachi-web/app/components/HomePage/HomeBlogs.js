import { useRef, useEffect } from "react";
import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import { findDOMNode } from "react-dom";
import Date from "../Date"
const Default = ({data}) => {
   const ref = useRef(null)

   const runSlider = () =>{
      if(ref){
         const $ = window.$;
         const el = findDOMNode(ref.current);
         $(el).slick({
            autoplay: true,
            speed: 1000,
            slidesToShow: 3,
            adaptiveHeight: true,
            prevArrow: '<button type="button" className="slick-prev"><i className="pe-7s-angle-left"></i></button>',
            nextArrow: '<button type="button" className="slick-next"><i className="pe-7s-angle-right"></i></button>',
            responsive: [{
               breakpoint: 992,
               settings: {
                  slidesToShow: 2
               }
            },
            {
               breakpoint: 768,
               settings: {
                  arrows: false,
                  slidesToShow: 1
               }
            }]
         });
      }
    }
    useEffect(()=>{
      runSlider();
    },[ref])

   if(!data)
    return(<></>)
   return (
      <section className="latest-blog-area section-padding">
         <div className="container">
            <div className="row">
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
               <div className="blog-carousel-active slick-row-10 slick-arrow-style" ref={ref}>
                  {
                     data.blog.map((blog)=>{
                        return(
                           <div className="blog-post-item">
                              <figure className="blog-thumb">
                                 <a href={blog.url}>
                                    <img src={IMG_URL+ blog.image} alt="blog image" />
                                 </a>
                              </figure>
                              <div className="blog-content">
                                 <div className="blog-meta">
                                    <p>
                                       <Date data={blog.date} /> | <a href="#">{blog.category}</a>
                                    </p>
                                 </div>
                                 <h5 className="blog-title">
                                    <a href={blog.url}>
                                       {blog.title}
                                    </a>
                                 </h5>
                              </div>
                           </div>
                        )
                     })
                  }
               </div>
            </div>
            </div>

         </div>
      </section>

   );
};

export default Default;
