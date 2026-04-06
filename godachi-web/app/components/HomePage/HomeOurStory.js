import Link from "next/link";
import { IMG_URL } from "../../../config/config";

const Default = ({ data }) => {
  if (!data)
    return (<></>)
  return (
    <>
      <section
        className="about-us section-padding"
        style={{
          marginTop: 60,
        }}
        loading='lazy'
      >
        <div className="container">
          <div className="row align-items-center ourStorySection">
            <div className="col-lg-5">
              <div className="about-thumb">&nbsp;</div>
            </div>
            <div className="col-lg-7">
              <div className="about-content">
                <h2 className="about-title" style={{ color: "#c29958" }}>
                  {data.title}
                </h2>
                <h5
                  className="about-sub-title"
                  style={{
                    fontFamily: '"PT Serif", cursive',
                    fontWeight: 600,
                    fontSize: 32
                  }}
                >
                  {data.sub_title}
                </h5>
                <p style={{ textAlign: "justify", letterSpacing: 1, }}>
                  {data.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="about-us section-padding">
         <div className="row align-items-center ourStorySection">
           <div className="grid-section-half bg-pink col-lg-6">
             <div className="container-small align-center">
               <div className="uppercase subtitle">OUR STORY</div>
               <h4 className="large-heading">
                 {data.sub_title}
                 <br />
               </h4>
               <div className="text-block-2">

                 {data.story}
                 <br />
               </div>
               <div className="div-block-4">
                  <Link href="/about">
                 <a
               
                   className="button white-hover w-inline-block"
                 >
                   <div className="text-block-5">read more</div>
                 </a>
                 </Link>
               </div>
             </div>
           </div>
           <div className="grid-section-half bg-green  col-lg-6 pbb">
             <div className="container-small align-center">
               <div className="uppercase subtitle">WHY GODACHI</div>
               <h4 className="large-heading">Why Buy from Godachi ?</h4>
               <div className="text-block-2">
                 The jewellery symbolise security, wisdom, elegance, prosperity and to
                 showcase social status. Godachi has many positive strength to
                 encourage customers and built confidence to shop through our digital
                 platform godachi.com website or app.
                 <br />
                 <br />
                 <i className="fa fa-circle" /> Established jewellery business Legacy
                 since 1933
                 <br />
                 <i className="fa fa-circle" /> Deals in wide range of products
                 <br />
                 <i className="fa fa-circle" /> Experienced artesian strength
                 <br />
                 <i className="fa fa-circle" /> Large potential vendor network &amp;
                 channel partners
                 <br />
                 <i className="fa fa-circle" /> Pan India delivery network
                 <br />
                 <i className="fa fa-circle" /> Competitive rates with attractive
                 offers &amp; discounts
                 <br />
                 <i className="fa fa-circle" /> Assured quality
                 <br />
                 <i className="fa fa-circle" /> Easy Return
                 <br />
                 <i className="fa fa-circle" /> Safe &amp; secure payment modes &amp;
                 delivery
                 <br />
                 <i className="fa fa-circle" /> Excellent customer care services
                 <br />
               </div>
             </div>
           </div>
         </div>{" "}
       </section> */}
    </>


  );
};

export default Default;
