import Link from "next/link";
import { IMG_URL } from "../../../config/config";

const Default = ({data}) => {
   if(!data)
    return(<></>)
   return (
      <section
         className="vc_row wpb_row vc_row-fluid section-padding"
         style={{ backgroundImage: 'url("images/bg1.jpg")' }}
         >
         <div className="row newsSection">
            <div
               className="wpb_column vc_column_container col-md-12"
               style={{ borderRight: "1px solid #fff" }}
            >
               <div className="vc_column-inner" style={{ textAlign: "center" }}>
               <div className="wpb_wrapper">
                  <div className="vc_row wpb_row vc_inner vc_row-fluid theme-container">
                     <div className="brand_logo wpb_column vc_column_container vc_col-sm-12">
                     <div className="vc_column-inner">
                        <div className="wpb_wrapper">
                           <div
                           className="section-title text-center"
                           style={{ marginBottom: 35 }}
                           >
                           <h2 className="title">{data.title}</h2>
                           </div>
                           <div
                           id="brand-products"
                           className="tmpoption_logocontent"
                           style={{ paddingLeft: "17%" }}
                           >
                           <div
                              id="6_brand_carousel"
                              className="brand-carousel tm-logo-content owl-carousel owl-theme"
                              style={{ opacity: 1, display: "block" }}
                           >
                              <div className="owl-wrapper-outer">
                                 <div
                                 className="owl-wrapper"
                                 style={{ width: 3120, left: 0, display: "block" }}
                                 >
                                    {
                                       data.media.map((media)=>{
                                          return(
                                             <div
                                                className="owl-item"
                                                style={{ width: 96, marginRight: 20 }}
                                             >
                                                <div className="item brand_main">
                                                   <div className="product-block">
                                                   <a
                                                      href="#"
                                                      style={{
                                                         borderRadius: "50%",
                                                         height: 85,
                                                         width: 85,
                                                         background: "white",
                                                         overflow: "hidden",
                                                         float: "left",
                                                         lineHeight: 6
                                                      }}
                                                   >
                                                      <img
                                                         src={IMG_URL + media.image}
                                                         alt="Logo Image"
                                                      />
                                                   </a>
                                                   </div>
                                                </div>
                                             </div>
                                          )
                                          
                                       })
                                    }
                                
                                 </div>
                              </div>
                              <div className="owl-controls clickable" />
                           </div>
                           </div>
                        </div>
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
