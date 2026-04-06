// import { useRef, useEffect } from "react";
// import Link from "next/link";
// import { IMG_URL } from "../../../config/config";
// import { findDOMNode } from "react-dom";
// const Default = ({ data }) => {
//   const ref = useRef(null)
//   if (!data)
//     return (<></>)

//   const runSlider = () => {
//     if (ref) {
//       const $ = window.$;
//       const el = findDOMNode(ref.current);
//       $(el).slick({
//         fade: true,
//         speed: 1000,
//         dots: false,
//         autoplay: true,
//         prevArrow: '<button type="button" className="slick-prev"><i className="pe-7s-angle-left"></i></button>',
//         nextArrow: '<button type="button" className="slick-next"><i className="pe-7s-angle-right"></i></button>',
//         responsive: [{
//           breakpoint: 992,
//           settings: {
//             arrows: false,
//             dots: true
//           }
//         }]
//       });
//     }
//   }
//   useEffect(() => {
//     runSlider();
//   }, [ref])
//   return (
//     <section className="slider-area">
//       <div
//         className="hero-slider-active slick-arrow-style slick-arrow-style_hero slick-dot-style"
//         ref={ref}
//       >
//         {
//   (data?.media || []).map((media, index) => {
//     return (
//       <div className="hero-single-slide hero-overlay" key={index}>
//         <a
//           className="hero-slider-item bg-img"
//           data-bg={IMG_URL + media.image}
//           style={{
//             backgroundImage: `url(${IMG_URL + media.image})`
//           }}
//           href={media.url}
//           target="_blank"
//           loading="lazy"
//         >
//         </a>
//       </div>
//     )
//   })
// }

//       </div>
//     </section>

//   );
// };

// export default Default;
import { useRef, useEffect } from "react";
import { IMG_URL } from "../../../config/config";
import { findDOMNode } from "react-dom";

const Default = ({ data }) => {
  const ref = useRef(null);

  
  if (!data || !data.media || !Array.isArray(data.media) || data.media.length === 0) {
    return null;
  }

  const runSlider = () => {
    
    if (typeof window !== "undefined" && window.$ && ref.current) {
      const $ = window.$;
      const el = findDOMNode(ref.current);

      if (!el) return;

      $(el).slick({
        fade: true,
        speed: 1000,
        dots: false,
        autoplay: true,
        prevArrow:
          '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true,
            },
          },
        ],
      });
    }
  };

  useEffect(() => {
    runSlider();
  }, []);

  return (
    <section className="slider-area">
      <div
        className="hero-slider-active slick-arrow-style slick-arrow-style_hero slick-dot-style"
        ref={ref}
      >
        {data.media.map((media, index) => (
          <div className="hero-single-slide hero-overlay" key={index}>
            <a
              className="hero-slider-item bg-img"
              style={{
                backgroundImage: `url(${IMG_URL + (media?.image || "")})`,
              }}
              href={media?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Default;