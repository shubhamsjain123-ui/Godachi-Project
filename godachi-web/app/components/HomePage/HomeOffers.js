import { useRef, useEffect } from "react";
import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import { findDOMNode } from "react-dom";
const Default = ({ data }) => {
   const ref = useRef(null)
   if (!data)
      return (<></>)

   const runSlider = () => {
      if (ref) {
         const $ = window.$;
         const el = findDOMNode(ref.current);
         $(el).slick({
            autoplay: true,
            speed: 1000,
            arrows: false,
            slidesToShow: 7,
            adaptiveHeight: true,
            responsive: [{
               breakpoint: 992,
               settings: {
                  slidesToShow: 3
               }
            },
            {
               breakpoint: 768,
               settings: {
                  slidesToShow: 2
               }
            },
            {
               breakpoint: 480,
               settings: {
                  slidesToShow: 1
               }
            }]
         });
      }
   }
   useEffect(() => {
      runSlider();
   }, [ref])
   return (
      <section className="instagram-area section-padding ">
         <div className="container-fluid">
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
            <div className="row offerSection">
               <div className="instagram-feed-thumb">
                  <div className="instagram-carousel" ref={ref}>
                     {
                        data.media.map((media, key) => {
                           return (
                              <div key={key}
                                 className="instagram-item"
                                 style={{ width: "100%", display: "inline-block" }}
                              >
                                 <a href={media.url}>
                                    <img src={IMG_URL + media.image} />
                                 </a>
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
