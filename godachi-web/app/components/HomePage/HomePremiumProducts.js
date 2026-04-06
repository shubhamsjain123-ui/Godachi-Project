import { useRef, useEffect } from "react";
import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import { findDOMNode } from "react-dom";
import HomeProductCard from "./HomeProductCard";
const Default = ({data}) => {
    const ref = useRef(null)
    const arrowrRef = useRef(null)
    const runSlider = () =>{
        if(ref){
            const $ = window.$;
            const el = findDOMNode(ref.current);
            const elArrow = findDOMNode(arrowrRef.current);
            $(el).slick({
                infinite: true,
                rows: 4,
                prevArrow: '<button type="button" className="slick-prev"><i className="pe-7s-angle-left"></i></button>',
                nextArrow: '<button type="button" className="slick-next"><i className="pe-7s-angle-right"></i></button>',
                appendArrows: elArrow,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            })
        }
    }
  useEffect(()=>{
    runSlider();
  },[ref])
   if(!data)
    return(<></>)
   return (
    <div className="categories-group-wrapper">
        {/* section title start */}
        <div className="section-title-append">
            <h4>Premium product</h4>
            <div className="slick-append" ref={arrowrRef}/>
        </div>
        {/* section title start */}
        {/* group list carousel start */}
        <div className="group-list-item-wrapper premiumProductSection">
            <div className="group-list-carousel" ref={ref}>
                {
                    data.map((product)=><HomeProductCard product={product} />)
                }
            </div>
        </div>
        {/* group list carousel start */}
    </div>
   )
}

export default Default;