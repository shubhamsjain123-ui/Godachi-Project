import dynamic from "next/dynamic";

const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));

const Page = () => {

  return (
    <>
      <BreadCrumb />
      <>
        {/* choosing area start */}
        <div className="choosing-area section-padding pt-0">
          <div className="container">
            <hr />
            <div className="about-content">
              <div className="row">
                <div className="col-lg-12">
                  <h3>Why Buy from Godachi ?</h3>
                  <p>
                    The jewellery symbolise security, wisdom, elegance, prosperity and to showcase social status. Godachi has many positive strength to encourage customers and built confidence to shop through our digital platform <><a href="https://www.godachi.com">godachi.com</a> website or <a target="blank" href="https://play.google.com/store/apps/details?id=com.godachiapp">app</a></>
                  </p>
                  <ul className="abtul">
                    <li> Established jewellery business Legacy since 1933</li>
                    <li> Deals in wide range of products</li>
                    <li> Experienced artesian strength</li>
                    <li> Large potential vendor network &amp; channel partners</li>
                    <li> Pan India delivery network</li>
                    <li> Competitive rates with attractive offers &amp; discounts</li>
                    <li> Assured quality</li>
                    <li> Easy Return</li>
                    <li> Safe &amp; secure payment modes &amp; delivery</li>
                    <li> Excellent customer care services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* choosing area end */}
      </>
    </>
  );
};

export default Page;
