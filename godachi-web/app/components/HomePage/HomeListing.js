import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import HomePremiumProducts from "./HomePremiumProducts"
import HomeOnSaleProducts from "./HomeOnSaleProducts"
import Image from "next/image";
const Default = ({
   data,
   premiumProducts,
   onSaleProducts
}) => {
   if (!data)
      return (<></>)
   return (
      <section className="group-product-area section-padding listingSection">
         <div className="container">
            <div className="row">
               <div className="col-lg-6">
                  <div className="group-product-banner">
                     <figure className="banner-statistics">
                        <a href={data.media[0].url}>
                           {/* <img src={IMG_URL+data.media[0].image} alt="product banner" /> */}
                           <Image src={IMG_URL + data.media[0].image} alt="product banner"
                              width={600}
                              height={450} />
                        </a>
                        <div className="banner-content banner-content_style3 text-center">
                           <h6 className="banner-text1">{data.media[0].title}</h6>
                           <h2 className="banner-text2">{data.media[0].sub_title}</h2>
                           {/* <a href="shop.html" className="btn btn-text">
                        Shop Now
                     </a> */}
                        </div>
                     </figure>
                  </div>
               </div>
               <div className="col-lg-3">
                  <HomePremiumProducts data={premiumProducts} />
               </div>
               <div className="col-lg-3">
                  <HomeOnSaleProducts data={onSaleProducts} />
               </div>
            </div>
         </div>
      </section>

   );
};

export default Default;
