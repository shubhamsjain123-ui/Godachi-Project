import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import Image from "next/image";

const Default = ({ data }) => {
   if (!data)
      return (<></>)
   return (
      <section className="product-area section-padding">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  {/* section title start */}
                  <div className="section-title text-center">
                     <h2 className="title">Shop by Category</h2>
                     <p className="sub-title">Select products matching to your requirements</p>
                  </div>
                  {/* section title start */}
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="product-container categorySection">
                     <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2">
                        {
                           data.map((cat, index) => {
                              return (
                                 <div className="col owl-item" key={index}>
                                    <Link href={`/jewellery/${cat.seo}`}>
                                       <div className="cat-item">
                                          <div className="cat-wapper">
                                             <div className="cat-img">
                                                <Image
                                                   src={IMG_URL + cat.image}
                                                   title={cat.title}
                                                   alt={cat.title}
                                                   width={250}
                                                   height={250}
                                                />
                                             </div>
                                          </div>
                                          <div className="cat-description">
                                             <div className="cat-title" role="button">
                                                {cat.title}
                                             </div>
                                          </div>
                                       </div>
                                    </Link>

                                 </div>
                              )
                           })
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

   );
};

export default Default;
