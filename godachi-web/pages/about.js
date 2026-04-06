import dynamic from "next/dynamic";

const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));

const Page = () => {  

   return (
      <>
         <BreadCrumb />
         <>
  {/* about us area start */}
  <section className="about-us section-padding">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-5 abtimg">
          <div className="about-thumb">
            <img src="/images/about.jpg" alt="about thumb" />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="about-content">
            <h2 className="about-title">Our Story</h2>
            <h5 className="about-sub-title">
              We are a 90 year old jewellery business in MP &amp; Rajasthan and
              Our forefathers shri Omkarmal ji was making the Jewellery for
              elephants during the Royal estate of Makrai in 1933, and then shri
              Nanuram ji soni taken up the business to next level of ethnic
              jewellery.
            </h5>
            <p>
              A manufacturer, retailer, craftsman Shri Nanuram ji soni built his
              empire with dedication, constant innovation for royal vintage to
              contemporary designs &amp; tribal jewellery. Having completed 89
              years of existence in jewellery business, the soni family was
              known as a true heritage brand of handcrafted jewellery. Five
              generations of the family is deeply involved in the development of
              highest quality jewellery harmoniously combined traditional with
              modern design, ethic and making hand-made jewelry and selling it
              from home.
            </p>
            <p>
              Shri Pradeep soni has expanded the business with opening of new
              branches in Sirali &amp; Indore by the brand name Kanhaiya
              Abhushan Kendra. Mr Sandeep Soni has taken up the responsibility
              to continue grow the 89 years of family business Legacy with
              adding online platform godachi.com for synonymous to innovative
              designs, expert craftsmanship and unmatched quality for global
              customers. Our exciting journey of many years serving jewellery
              lovers in India will make the brand Godachi strong, resilient and
              focused towards all our customers, craftsman's and business
              associates. Godachi is widely preferred for its trustworthiness,
              authenticity, commitment to design, quality, convenience, service
              and value known as the go-to brand for jewellery and Gift
              accessories.
            </p>
            <p>
              The customers can shop online by visiting our website godachi.com
              &amp; apps. Godachi has a strong presence in the central Indian
              market and is now looking to enter into south and north indian
              markets as we deal in all kinds of hallmarked gold, silver,
              Platinum, Pearl and certified diamond jewellery, solitaires and
              precious gemstones. The skilled craftsmen at Godachi have created
              pieces that speak of timelessness, elegance and heritage with a
              touch of modernity makes the brand’s latest collection filled with
              memories, emotions and expressions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* about us area end */}
  {/* choosing area start */}
  <div className="choosing-area section-padding pt-0">
    <div className="container">
      <hr />
      <div className="about-content">
        <div className="row">
          <div className="col-lg-8">
            <h3>Why Godachi</h3>
            <p>
              Godachi is an online shopping web platform with mobile apps to
              facilitate the customers to buy jewellery of their choice from any
              location. The jewellery symbolise messages such as security,
              wisdom, elegance, prosperity and to showcase social status.
              Godachi has many positive strength to encourage customers and
              built confidence to shop through our digital platform godachi.com
              website or app
            </p>
            <ul className="abtul">
              <li>Established jewellery business Legacy since 1933</li>
              <li> Deals in wide range of products</li>
              <li> Experience artesian strength</li>
              <li> Large potential vendor network &amp; channel partners</li>
              <li> Pan India delivery network</li>
              <li> Competitive rates with attractive offers &amp; discounts</li>
              <li> Assured quality</li>
              <li> Easy Return</li>
              <li> Safe &amp; secure payment modes &amp; delivery</li>
              <li> Excellent customer care services</li>
            </ul>
          </div>
          <div className="col-lg-4 abtimg">
            <blockquote>
              {" "}
              <h4>Our Mission : </h4>
              <p>
                Inspire happiness and celebrations to enlighten and enrich
                lives, customer delight, quality &amp; values by offering
                meticulously crafted fine jewelry, satisfactory services and
                innovative lifestyle solutions.
              </p>
            </blockquote>
            <blockquote>
              <h4>Our Vision : </h4>
              <p>
                To create the sustainable jewellery brand by using technology
                that stands true to its legacy of traditional handcraft with
                Innovative design, quality, cost efficiency, transparency,
                culture of excellence, ethics, and exceptional customer service
                experience to meet the desires of new age consumers at
                affordable price.
              </p>
            </blockquote>
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
