import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import { useSelector } from "react-redux";
const Default = (props) => {
   const { settings } = useSelector(({ settings }) => settings);
   return (
      <div className="twitter-feed">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="twitter-feed-content text-center">
                     <p style={{ color: "#555", fontSize: 13 }}>
                        {settings.belowBannerOfferText1} {" "}
                        <Link href={settings.belowBannerOffer ? "/jewellery?godachiOffers=" + settings.belowBannerOffer : "/images/Shop Now.pdf"}>
                           <a
                              target="blank"
                              style={{
                                 background:
                                    "url(/images/sale.png)",
                                 color: "#FFF",
                                 padding: "3PX 25PX",
                                 borderRadius: "4PX",
                                 fontWeight: "bold"
                              }}
                           >
                              SALE
                           </a>
                        </Link>
                        {" "}
                        {settings.belowBannerOfferText2}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

   );
};

export default Default;
