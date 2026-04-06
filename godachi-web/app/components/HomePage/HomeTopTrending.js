import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import Image from "next/image";

const Default = ({ data }) => {
   if (!data)
      return (<></>)
   return (
      <section className="feature-product section-padding">
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
         </div>

         <div className="banner-statistics-area trendingSection">
            <div className="container">
               <div className="row row-20 mtn-20">
                  <div className="col-sm-5">
                     <figure className="banner-statistics">
                        <a href={data.media[0].url}>
                           {/* <img
                        src={IMG_URL+ data.media[0].image}
                        alt="product banner"
                        style={{ height: 435 }}
                        className="top-trending-img-1"
                     /> */}
                           <Image
                              src={IMG_URL + data.media[0].image}
                              alt="product banner"
                              // style={{ height: 435 }}
                              className="top-trending-img-1"
                              height={440}
                              width={500}
                           />
                        </a>
                     </figure>
                  </div>
                  <div className="col-sm-7">
                     <div className="row">
                        <div
                           className="col-sm-6"
                           style={{ marginTop: "-20px", paddingRight: 10 }}
                        >
                           <figure className="banner-statistics mt-20">
                              <a href={data.media[1].url}>
                                 {/* <img
                                    src={IMG_URL + data.media[1].image}
                                    alt="product banner"
                                    className="top-trending-img-2"
                                 /> */}
                                 <Image
                                    src={IMG_URL + data.media[1].image}
                                    alt="product banner"
                                    className="top-trending-img-2"
                                    height={178}
                                    width={350}
                                 />
                              </a>
                           </figure>
                        </div>
                        <div
                           className="col-sm-6"
                           style={{ paddingLeft: 10, marginTop: "-20px" }}
                        >
                           <figure className="banner-statistics mt-20">
                              <a href={data.media[2].url}>
                                 {/* <img
                                    src={IMG_URL + data.media[2].image}
                                    alt="product banner"
                                    style={{ height: 178 }}
                                    className="top-trending-img-3"
                                 /> */}
                                 <Image
                                    src={IMG_URL + data.media[2].image}
                                    alt="product banner"
                                    // style={{ height: 178 }}
                                    className="top-trending-img-3"
                                    height={178}
                                    width={350}
                                 />
                              </a>
                           </figure>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-sm-4" style={{ paddingRight: 10 }}>
                           <figure className="banner-statistics mt-20">
                              <a href={data.media[3].url}>
                                 {/* <img
                                    src={IMG_URL + data.media[3].image}
                                    alt="product banner"
                                    style={{ height: 237 }}
                                    className="top-trending-img-4"
                                 /> */}
                                 <Image
                                    src={IMG_URL + data.media[3].image}
                                    alt="product banner"
                                    // style={{ height: 237 }}
                                    className="top-trending-img-4"
                                    width={220}
                                    height={237}
                                 />

                              </a>

                           </figure>
                        </div>
                        <div
                           className="col-sm-4"
                           style={{ paddingLeft: 10, paddingRight: 10 }}
                        >
                           <figure className="banner-statistics mt-20">
                              <a href={data.media[4].url}>
                                 {/* <img
                                    src={IMG_URL + data.media[4].image}
                                    alt="product banner"
                                    style={{ height: 237 }}
                                    className="top-trending-img-5"
                                 /> */}
                                 <Image
                                    src={IMG_URL + data.media[4].image}
                                    alt="product banner"
                                    // style={{ height: 237 }}
                                    className="top-trending-img-5"
                                    width={220}
                                    height={237}
                                 />
                              </a>

                           </figure>
                        </div>
                        <div className="col-sm-4" style={{ paddingLeft: 10 }}>
                           <figure className="banner-statistics mt-20">
                              <a href={data.media[5].url}>
                                 {/* <img
                                    src={IMG_URL + data.media[5].image}
                                    alt="product banner"
                                    style={{ height: 237 }}
                                    className="top-trending-img-6"
                                 /> */}
                                 <Image
                                    src={IMG_URL + data.media[5].image}
                                    alt="product banner"
                                    // style={{ height: 237 }}
                                    className="top-trending-img-6"
                                    width={220}
                                    height={237}
                                 />
                              </a>
                           </figure>
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
