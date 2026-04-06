import Link from "next/link";
import { IMG_URL } from "../../../config/config";

const Default = ({data}) => {
   if(!data)
    return(<></>)
   return (
      <section
         className="vc_row wpb_row vc_row-fluid section-padding"
         style={{ backgroundColor: "#fff", paddingTop: 30 }}
         >
         <div className="container">
            <div className="row statsSection">
               {
                  data.stats.map((stat,index)=>{
                     return(
                        <div className="col-md-3 col-lg-3 col-sm-6 col-6">
                           <div className={`single_crm stat${index}`}>
                              <div className="crm_body">
                                 <h4 style={{ textAlign: "center", fontSize: 30 }}>{stat.value}</h4>
                              </div>
                              <div
                                 className="crm_head  align-items-center justify-content-between"
                                 style={{
                                    textAlign: "center"
                                 }}
                              >
                                 <div className="thumb">
                                 <p style={{ fontWeight: "bold" }}>{stat.name}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </section>

   );
};

export default Default;
