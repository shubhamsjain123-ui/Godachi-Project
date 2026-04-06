import { useRef, useEffect } from "react";
import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import { findDOMNode } from "react-dom";
const Default = ({data}) => {
   const ref = useRef(null)
   const arrowrRef = useRef(null)
  if(!data)
    return(<></>)
  
   const prevArrow = `<div className="swiper-button-prev swiper-button-outside swiper-button-prev-1" tabindex="0" role="button" aria-label="Previous slide"><svg className="qodef-svg--slider-arrow-left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="52px" height="13px" viewBox="0 0 52 13" enable-background="new 0 0 52 13" xml:space="preserve"><path d="M1.609,6.453L51,6.5L1.609,6.453z"></path><path d="M1.609,6.453L51,6.5L1.609,6.453z"></path><line x1="6.654" y1="1.284" x2="1.364" y2="6.483"></line><line x1="6.654" y1="11.483" x2="1.063" y2="6.094"></line></svg></div>`
   
   const nextArrow = `<div className="swiper-button-next swiper-button-outside swiper-button-next-1" tabindex="0" role="button" aria-label="Next slide"><svg className="qodef-svg--slider-arrow-right" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="52px" height="13px" viewBox="0 0 52 13" enable-background="new 0 0 52 13" xml:space="preserve"><path d="M50.453,6.453L1.063,6.5L50.453,6.453z"></path><path d="M50.453,6.453L1.063,6.5L50.453,6.453z"></path><line x1="45.408" y1="1.284" x2="50.699" y2="6.483"></line><line x1="45.408" y1="11.483" x2="51" y2="6.094"></line></svg></div>`
   
  const runSlider = () =>{
    if(ref){
      const $ = window.$;
      const el = findDOMNode(ref.current);
      const elArrow = findDOMNode(arrowrRef.current);
      $(el).slick({
         slidesToShow: 3,
         adaptiveHeight: true,
         appendArrows: elArrow,
         prevArrow: prevArrow,
			nextArrow: nextArrow,
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
         }]
      });
    }
  }
  useEffect(()=>{
    runSlider();
  },[ref])
   return (
      <section
         className=" qodef-elementor-content-grid qodef-extended-grid--right section-padding best-seller-section"
         style={{ marginTop: 60 }}
         >
         <div className="elementor-container elementor-column-gap-default">
            <div
               className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-ed58d41"
               data-id="ed58d41"
               data-element_type="column"
            >
               <div className="elementor-widget-wrap elementor-element-populated">
               <div
                  className="elementor-element elementor-element-c29a33b elementor-widget elementor-widget-areia_core_portfolio_list"
                  data-id="c29a33b"
                  data-element_type="widget"
                  data-widget_type="areia_core_portfolio_list.default"
               >
                  <div className="elementor-widget-container">
                     <div className="qodef-portfolio-slider-outer">
                     <div className="qodef-additional-info-wrapper">
                        <div itemProp="description" className="qodef-e-additional-info">
                           <h3 className="qodef-m-title">{data.title}</h3>
                           <span
                           className="qodef-m-subtitle"
                           style={{ color: "#ff6f52" }}
                           >
                           {data.sub_title}
                           </span>
                           {
                              data?.extraData.map((extra)=>{
                                 return(<p>- {extra} </p>)
                              })
                           }
                        </div>
                        <div className="qodef-portfolio-slider-outer-nav" ref={arrowrRef}>
                         
                        </div>
                     </div>



                     <div className="qodef-shortcode qodef-m qodef-portfolio-list qodef-item-layout--info-on-hover qodef-portfolio-list--custom-cursor qodef-content-full-width qodef-grid qodef-swiper-container qodef-gutter--normal qodef-col-num--3 qodef--no-bottom-space qodef-pagination--off qodef-responsive--predefined qodef-hover-animation--fade-in swiper-container-initialized swiper-container-horizontal qodef-swiper--initialized" ref={ref}>
                     {
                        data.media.map((media)=>{
                           return (
                              <article 
                                 className="qodef-e swiper-slide qodef-item--full post-1562 portfolio-item type-portfolio-item status-publish has-post-thumbnail hentry portfolio-category-design portfolio-tag-branding portfolio-tag-cosmetics portfolio-tag-skin swiper-slide-duplicate"
                                 style={{paddingRight: 30}}
                              >


                              <div className="qodef-e-inner">
                                 <div
                                    className="qodef-e-media-image qodef--background"
                                    style={{ backgroundImage: `url(${IMG_URL + media.image})` }}
                                 >
                                    <img
                                       src="./Areia – Portfolio and Agency Theme_files/h1-port-img1.jpg"
                                       className="attachment-full size-full bestseller-img"
                                       alt="j"
                                       loading="lazy"
                                       srcSet="#/wp-content/uploads/2021/09/h1-port-img1.jpg 800w, #/wp-content/uploads/2021/09/h1-port-img1-209x300.jpg 209w, #/wp-content/uploads/2021/09/h1-port-img1-715x1024.jpg 715w, #/wp-content/uploads/2021/09/h1-port-img1-768x1100.jpg 768w, #/wp-content/uploads/2021/09/h1-port-img1-600x860.jpg 600w"
                                       sizes="(max-width: 800px) 100vw, 800px"
                                       width={800}
                                       height={1146}
                                    />{" "}
                                 </div>
                                 <div className="qodef-e-content">
                                    <div className="qodef-e-top-holder">
                                       <div className="qodef-e-info">
                                       <h5 itemProp="name" className="qodef-e-title entry-title">
                                          <a
                                             itemProp="url"
                                             className="qodef-e-title-link"
                                             href={media.url}
                                             target="_self"
                                          >
                                             {media?.title}
                                          </a>
                                       </h5>
                                       </div>
                                    </div>
                                    <div className="qodef-e-text">
                                       <a href={media.url} rel="tag">
                                       {media?.sub_title}
                                       </a>{" "}
                                       <span className="qodef-info-separator-end" />
                                    </div>
                                   {/*  <div className="qodef-e-text">
                                       <div className="price-box-home">
                                          <span className="price-regular-home">₹700</span>
                                          <span className="price-old-home ps-2">
                                             <del>₹776</del>
                                          </span>
                                       </div>
                                    </div> */}
                                 </div>
                                 <a
                                    itemProp="url"
                                    className="qodef-e-post-link"
                                    href={media.url}
                                    target="_self"
                                 />
                                 </div>
                                 </article>
                           )
                        })
                     }
                     </div>







                     
                     </div>
                  </div>
               </div>
               </div>
            </div>
         </div>
         </section>

   );
};

export default Default;
