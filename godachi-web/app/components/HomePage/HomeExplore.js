import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import Image from "next/image";

const Default = ({ data }) => {
   if (!data)
      return (<></>)
   return (
      <section className="section-padding explore-godachi">

         <div className="container">
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
            <div className="row">
               <div
                  className="col-lg-6 col-md-6 col-sm-6 col-xs-12 explore-godachi-col-1"
               >
                  <div className="row explore-godachi-row-1">
                     <div className="panel-block-row col-md-12 col-xs-12 margin-bottom30">
                        <div className="promobanner zoom explore-godachi-banner-1">

                           <a href={data.media[0].url}>

                              <Image
                                 alt=""
                                 src={IMG_URL + data.media[0].image}
                                 className="img-responsive explore-godachi-img-1"
                                 width={600}
                                 height={430}
                              />
                              {/* <img
                           alt=""
                           src={IMG_URL+ data.media[0].image}
                           className="img-responsive explore-godachi-img-1"
                        /> */}
                           </a>
                           <div className="text">
                              <div className="banner-text">
                                 <div className="text-center padding-bottom10"> </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 explore-godachi-col-2">
                  <div className="row explore-godachi-row-2">
                     <div
                        className="panel-block-row col-md-6 col-sm-6 col-xs-12"
                     >
                        <div className="promobanner zoom explore-godachi-banner-2">

                           <a href={data.media[1].url}>

                              {/* <img
                                 alt=""
                                 src={IMG_URL + data.media[1].image}
                                 className="img-responsive explore-godachi-img-2"
                              /> */}
                              <Image
                                 alt=""
                                 src={IMG_URL + data.media[1].image}
                                 className="img-responsive explore-godachi-img-2"
                                 width={300}
                                 height={250}
                              />
                           </a>
                           <div className="text">
                              <div className="banner-text">
                                 <div className="text-center padding-bottom10"> </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div
                        className="panel-block-row col-md-6 col-sm-6 col-xs-12"
                     >
                        <div className="promobanner zoom explore-godachi-banner-3">

                           <a href={data.media[2].url}>

                              <Image
                                 alt=""
                                 src={IMG_URL + data.media[2].image}
                                 className="img-responsive explore-godachi-img-3"
                                 data-src=""
                                 width={300}
                                 height={250}
                              />
                              {/* <img
                                 alt=""
                                 src={IMG_URL + data.media[2].image}
                                 className="img-responsive explore-godachi-img-3"
                                 data-src=""
                              /> */}
                           </a>
                           <div className="text">
                              <div className="banner-text">
                                 <div className="text-center padding-bottom10"> </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="panel-block-row col-md-12 col-xs-12 margin-bottom30">
                        <div className="promobanner zoom explore-godachi-banner-4">

                           <a href={data.media[3].url}>

                              <Image
                                 alt=""
                                 src={IMG_URL + data.media[3].image}
                                 className="img-responsive explore-godachi-img-4"
                                 width={600}
                                 height={150}
                              />
                              {/* <img
                                 alt=""
                                 src={IMG_URL + data.media[3].image}
                                 className="img-responsive explore-godachi-img-4"
                              /> */}
                           </a>
                           <div className="text">
                              <div className="banner-text">
                                 <div className="text-center padding-bottom10"></div>
                              </div>
                              <span className="banner-button"></span>
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
