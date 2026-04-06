import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import Image from "next/image";

const Default = ({ data }) => {
   if (!data)
      return (<></>)
   return (
      <div
         className="service-policy"
         style={{ paddingTop: 20, paddingBottom: 20, background: "#fff" }}
      >
         <div className="container promisesSection">
            <div className="mgd_20_assurance-content sub-promises">
               {
                  data.map((promise) => {
                     return (
                        <div className="mgd_20_assurance-item">
                           <img
                              className=" lazyloaded"
                              alt={promise.name}
                              data-src={IMG_URL + promise.image}
                              src={IMG_URL + promise.image}
                           />
                           <h3>{promise.name}</h3>
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </div>

   );
};

export default Default;
