import { useRef, useEffect } from "react";
import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import { findDOMNode } from "react-dom";
import Image from "next/image";
const Default = ({ data }) => {
   const ref = useRef(null)
   if (!data)
      return (<></>)

   const runSlider = () => {
      if (ref) {
         const $ = window.$;
         const el = findDOMNode(ref.current);
         $(el).slick({
            infinite: true,
            autoplay: true,
            speed: 500,
            arrows: false,
            slidesToShow: 5,
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
      <section className="product-banner-statistics" style={{ paddingTop: "20px" }}>
         <div className="container-fluid">
            <div className="row">
               <div className="col-12">
                  {/* section title start */}
                  <div className="section-title text-center">
                     <h2 className="title">Shop by Occasion</h2>
                     <p className="sub-title">Identify your best suited specific products</p>
                  </div>
                  {/* section title start */}
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="product-banner-carousel slick-row-10 occasionSection" ref={ref} >
                     {
                        data.map((occassion) => {
                           return (
                              <div className="banner-slide-item">
                                 <figure className="banner-statistics">
                                    <a href={`/jewellery?occassions=${occassion._id}`} target="_blank">
                                       <Image
                                          src={IMG_URL + occassion.image}
                                          alt={occassion.name}
                                          width={250}
                                          height={250}
                                          loading="lazy"
                                       />
                                    </a>
                                    <div className="banner-content banner-content_style2">
                                       <h5 className="banner-text3">
                                          <a href={`/jewellery?occassions=${occassion._id}`} target="_blank">{occassion.name}</a>
                                       </h5>
                                    </div>
                                 </figure>
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
