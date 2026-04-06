
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs, Autoplay } from "swiper";
// install Swiper modules
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import ReactImageMagnify from 'react-image-magnify';
import ReactImageZoom from 'react-image-zoom';
import ReactPlayer from 'react-player';
import SliderImage from 'react-zoom-slider';

SwiperCore.use([Navigation, Thumbs, Autoplay]);

import { IMG_URL } from "../../../config/config";

const Default = ({ state = {} }) => {
  const images = state.allImages.sort((a, b) => b.order - a.order).map((imageDetail) => {

    return {
      original: IMG_URL + imageDetail.image,
      thumbnail: imageDetail.mimeType?.includes("video") ? "/images/video-thumb.png" : IMG_URL + imageDetail.image,
      renderItem: () => {
        return (
          <>
            {
              imageDetail.mimeType?.includes("video") ?
                <>
                  <ReactPlayer
                    url={IMG_URL + imageDetail.image}
                    controls={true}
                    playing={true}
                    muted={true}
                    loop={true}
                    width="100%"
                    height="100%"
                  />
                </>

                :
                <ReactImageZoom {...{
                  img: IMG_URL + imageDetail.image,
                  zoomPosition: "original"
                }} />
            }
          </>

        )
      },
      /* ...(
        imageDetail.mimeType?.includes("video") &&
        {
          renderThumbInner : () =>{
            return(
              <ReactPlayer 
                  url={IMG_URL + imageDetail.image} 
                  light={true}
                  playIcon={<img src="/images/video-thumb.png" />}
                  width="100px"
                  height="100px"
                />
            )
          }
        }
      ) */
    }
  });
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => { }, []);

  return (
    <>
      {
        images.length > 0 &&
        <>
          {/*  <SliderImage 
            data={images} 
            width="500px" 
            showDescription={true} 
            direction="right" 
          /> */}
          <ImageGallery
            items={images}
            showNav={false}
            showFullscreenButton={false}
            showPlayButton={false}
          />

        </>

      }

    </>



  );
};

export default Default;
