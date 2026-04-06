import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import Image from "next/image";

const Default = ({ data }) => {
   if (!data)
      return (<></>)
   return (
      <section className="feature-product section-padding">
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
         </div>

         <div className="banner-statistics-area newArrivalSection">
            <div className="container">
               <div className="row row-20 mtn-20">
                  <div className="col-sm-4">
                     <div className="col-sm-12">
                        <figure className="banner-statistics mt-20">
                           <a href={data.media[0].url}>
                              {/* <img src={IMG_URL + data.media[0].image} alt="product banner"
                                 className="new-arrival-img-1" /> */}
                              <Image src={IMG_URL + data.media[0].image} alt="product banner"
                                 className="new-arrival-img-1"
                                 width={500}
                                 height={225} />
                           </a>
                        </figure>
                     </div>
                     <div className="col-sm-12">
                        <figure className="banner-statistics mt-20">
                           <a href={data.media[1].url}>
                              {/* <img src={IMG_URL + data.media[1].image} alt="product banner"
                                 className="new-arrival-img-2" /> */}
                              <Image src={IMG_URL + data.media[1].image} alt="product banner"
                                 className="new-arrival-img-2"
                                 width={500}
                                 height={225} />
                           </a>

                        </figure>
                     </div>
                  </div>
                  <div className="col-sm-4">
                     <div className="col-sm-12">
                        <figure className="banner-statistics mt-20">
                           <a href={data.media[2].url}>
                              {/* <img
                           src={IMG_URL+ data.media[2].image}
                           alt="product banner"
                           style={{ height: 381, marginTop: "-4px" }} 
                           className="new-arrival-img-3"
                        /> */}
                              <Image
                                 src={IMG_URL + data.media[2].image}
                                 alt="product banner"
                                 style={{ marginTop: "-4px" }}
                                 className="new-arrival-img-3"
                                 width={390}
                                 height={380}
                              />
                           </a>
                        </figure>
                     </div>
                  </div>
                  <div className="col-sm-4">
                     <div className="col-sm-12">
                        <figure className="banner-statistics mt-20">
                           <a href={data.media[3].url}>
                              {/* <img src={IMG_URL+ data.media[3].image} alt="product banner"  
                        className="new-arrival-img-4"/> */}
                              <Image src={IMG_URL + data.media[3].image} alt="product banner"
                                 className="new-arrival-img-4"
                                 width={500}
                                 height={225} />
                           </a>
                        </figure>
                     </div>
                     <div className="col-sm-12">
                        <figure className="banner-statistics mt-20">
                           <a href={data.media[4].url}>
                              <Image src={IMG_URL + data.media[4].image} alt="product banner"
                                 className="new-arrival-img-5"
                                 width={500}
                                 height={225} />
                           </a>
                        </figure>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

   );
};

export default Default;
