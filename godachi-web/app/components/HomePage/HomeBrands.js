import { useRef, useEffect } from "react";
import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import { findDOMNode } from "react-dom";
const Default = ({data}) => {
   const ref = useRef(null)
  if(!data)
    return(<></>)
  
  const runSlider = () =>{
    if(ref){
      const $ = window.$;
      const el = findDOMNode(ref.current);
      $(el).slick({
         speed: 1000,
         slidesToShow: 5,
         adaptiveHeight: true,
         prevArrow: '<button type="button" className="slick-prev"><i className="pe-7s-angle-left"></i></button>',
         nextArrow: '<button type="button" className="slick-next"><i className="pe-7s-angle-right"></i></button>',
         responsive: [{
            breakpoint: 1200,
            settings: {
               slidesToShow: 4
            }
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 3,
               arrows: false
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               arrows: false
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               arrows: false
            }
         }]
      });
    }
  }
  useEffect(()=>{
    runSlider();
  },[ref])
   return (
      <div className="brand-logo section-padding pt-0">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  {/* section title start */}
                  <div className="section-title text-center">
                     <h2 className="title">{data.title}</h2>
                  </div>
                  {/* section title start */}
               </div>
            </div>
            <div className="row">
               <div className="col-12">
               <div className="brand-logo-carousel slick-row-10 slick-arrow-style brandSection" ref={ref}>
                  {
                     data.media.map((media)=>{
                        return (
                           <div className="brand-item">
                              <a href={media?.url? media.url : "/"}>
                                 <img src={IMG_URL + media.image} alt="" />
                              </a>
                           </div>
                        )
                     })
                  }
               </div>
               </div>
            </div>
         </div>
      </div>


   );
};

export default Default;
