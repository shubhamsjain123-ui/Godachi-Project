/*import { IMG_URL } from "../../../config/config";

const Page = ({ state = {} }) => {
  const images = state.allImages;
  
   return (
     <div>
      <div className="product-large-slider">
        {images.map((imageDetail)=>{
          return(
            <div className="pro-large-img img-zoom">
              <img src={IMG_URL +imageDetail.image} alt="product-details" />
            </div>
          )
        })}
      </div>
      <div className="pro-nav slick-row-10 slick-arrow-style">
        {images.map((imageDetail)=>{
          return(
            <div className="pro-nav-thumb">
              <img src={IMG_URL +imageDetail.image} alt="product-details" />
            </div>
          )
        })}
        
      </div>
    </div>

   );
};

export default Page;*/


import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs, Autoplay } from "swiper";
// install Swiper modules

SwiperCore.use([Navigation, Thumbs, Autoplay]);

import { IMG_URL } from "../../../config/config";

const Default = ({ state = {} }) => {
   const images = state.allImages.sort((a,b)=>a.order-b.order);
   const [thumbsSwiper, setThumbsSwiper] = useState(null);

   useEffect(() => { }, []);

   return (
      <>
      {
        images.length>0 &&
        <div className="pdp-image-gallery-block">

          <div className="gallery-viewer">
            <img
              id="zoom_10"
              src={IMG_URL + images[0].image}
              data-zoom-image={IMG_URL + images[0].image}
              href={IMG_URL + images[0].image}
            />
          </div>
          <div className="gallery_pdp_container">
            <div id="gallery_pdp">
              <div className="wrapper">
              {images.map((imageDetail)=>{
                  return(
                      <a
                      href="#"
                      data-image={IMG_URL + imageDetail.image}
                      data-zoom-image={IMG_URL + imageDetail.image}
                      style={{
                        marginLeft:"5px"
                      }}
                      >
                      <img
                        id=""
                        src={IMG_URL + imageDetail.image}
                        style={{width:"100px"}}
                      />
                      </a>
                    
                  )
                })}
              </div>
              
              
            </div>
          </div>
        </div>
      }
         


{/* <div className="w-full">
         <Swiper
            style={{
               "--swiper-navigation-color": "#000",
               "--swiper-pagination-color": "#000",
            }}
            spaceBetween={0}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{
               delay: 15000,
               disableOnInteraction: false,
            }}
            className="w-full mb-1 text-center"
         >
            {images.map((imageDetail)=>{
              return(
                <SwiperSlide key={imageDetail.image}>
                  <div className="item -mb-10">
                     <img src={IMG_URL + imageDetail.image} width="500" height="500" alt=" " className="w-full" />
                  </div>
                </SwiperSlide>
              )
            })}
            
         </Swiper>
         <Swiper
            onSwiper={setThumbsSwiper}
            freeMode={true}
            watchSlidesProgress={true}
            className="mySwiper"
            breakpoints={{
               100: {
                  slidesPerView: 4,
                  spaceBetween: 15,
               },
               1024: {
                  slidesPerView: 7,
                  spaceBetween: 30,
               },
            }}
         >
            {images.map((imageDetail,i)=>{
              return(
                <SwiperSlide key={i}>
                  <div className="item">
                     <div
                        className="bg-cover bg-center  border-2 ml-2  h-20 w-20"
                        style={{
                           backgroundImage: "url(" + IMG_URL + "/" + imageDetail.image + ")",
                        }}
                     />
                  </div>
               </SwiperSlide>
              )
            })}
         </Swiper>
      </div> */}
      </>
      

      
   );
};

export default Default;
