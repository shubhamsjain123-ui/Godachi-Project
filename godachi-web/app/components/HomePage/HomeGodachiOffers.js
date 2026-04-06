import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, IMG_URL } from "../../../config/config";
import { findDOMNode } from "react-dom";
import axios from "axios";
const Default = ({ }) => {
  const ref = useRef(null)
  const [activeOffers, setActiveOffers] = useState([]);
  const fetchActiveOffers = async () => {
    try {
      var response = await axios.get(`${API_URL}/offers/getActiveOffers`);
      if (response.data) {
        setActiveOffers(response.data?.filter((offer) => offer.image && offer.image != ""));
      }
    }
    catch (error) {
      error.message && console.log(error.message);
    }
  }
  useEffect(() => {
    fetchActiveOffers();
  }, [])

  const runSlider = () => {
    if (ref) {
      const $ = window.$;
      const el = findDOMNode(ref.current);
      $(el).slick({
        fade: true,
        speed: 1000,
        dots: false,
        autoplay: true,
        prevArrow: '<button type="button" className="slick-prev"><i className="pe-7s-angle-left"></i></button>',
        nextArrow: '<button type="button" className="slick-next"><i className="pe-7s-angle-right"></i></button>',
        responsive: [{
          breakpoint: 992,
          settings: {
            arrows: false,
            dots: true
          }
        }]
      });
    }
  }
  useEffect(() => {
    runSlider();
  }, [ref, activeOffers])
  if (!activeOffers || activeOffers?.length == 0) {
    return <></>
  }
  return (
    <>
      <section className="slider-area godachOfferSlider">
        <div
          className="hero-slider-active slick-arrow-style slick-arrow-style_hero slick-dot-style"
          ref={ref}
        >
          {
            activeOffers.map((media) => {
              return (
                <div className="hero-single-slide hero-overlay godachOfferSliderImage">
                  <Link href={"/jewellery?godachiOffers=" + media._id}>
                    <a
                      className="hero-slider-item bg-img"
                      data-bg={IMG_URL + media.image}
                      style={{
                        backgroundImage: `url(${IMG_URL + media.image})`
                      }}
                    >


                    </a>
                  </Link>
                </div>
              )
            })
          }

        </div>
      </section>
    </>
  );
};

export default Default;
