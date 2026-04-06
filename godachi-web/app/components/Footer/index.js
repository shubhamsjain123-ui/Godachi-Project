import { useState } from "react";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import Image from "next/image";
import Script from 'next/script'
import CustomizeJewellery from "../Forms/CustomizeJewellery"
import BulkOrder from "../Forms/BulkOrder"
import Contact from "../Forms/Contact"
//import logo from "../../../public/assets/img/logo/logo.png"
<img src="/assets/img/logo/logo.png" alt="brand logo" />
import { FloatingWhatsApp } from 'react-floating-whatsapp'
const Default = ({ footerMenu }) => {
  const { settings } = useSelector(({ settings }) => settings);
  const [showCustomizeJewellery, setShowCustomizeJewellery] = useState(false);
  const [showBulkOrder, setShowBulkOrder] = useState(false);
  const [showContact, setShowContact] = useState(false);
  return (
    <>
      {/* footer area start */}
      <section className="vc_row wpb_row vc_row-fluid offercms-block vc_custom_1603953198979 vc_row-has-fill">
        <div className="wpb_column vc_column_container vc_col-sm-12">
          <div className="vc_column-inner">
            <div className="wpb_wrapper">
              <div className="vc_row wpb_row vc_inner vc_row-fluid theme-container">
                <div className="wpb_column vc_column_container vc_col-sm-12">
                  <div className="vc_column-inner">
                    <div className="wpb_wrapper">
                      <div className="offer-block  ">
                        <span className="offer-img">&nbsp;</span>
                        <div className="offer-detail">
                          <span className="text1 static-text">
                            {settings.footerOfferText1}
                          </span>
                          <span className="text2 static-text">
                            {settings.footerOfferText2}
                          </span>
                        </div>
                        <span className="shop-now">
                          <Link href={settings.footerOffer ? "/jewellery?godachiOffers=" + settings.footerOffer : "/images/Shop Now.pdf"}>
                            <a className="offer-btn" >Shop Now</a>
                          </Link>

                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer-widget-area">
        <div className="footer-top section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="widget-item">
                  <h6 className="widget-title">Information</h6>
                  <div className="widget-body">
                    <ul className="info-list">
                      <li>
                        <Link href="/about">
                          <a>About us</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/shipping-policy">
                          <a>Shipping policy</a>
                        </Link>
                      </li>
                      <li>
                        <a href="javascript:void(0)"
                          onClick={() => setShowCustomizeJewellery(true)}
                        >
                          Customise Your Jewellery
                        </a>
                      </li>
                      <li>
                        <Link href="/return-exchange-policy">
                          <a>Return & Exchange policy</a>
                        </Link>
                      </li>
                      <li>
                        <a target="_blank" href="/images/E-Catalogue.pdf">E-Catalogue</a>
                      </li>
                      <li>
                        <Link href="/lookbook">
                          <a>Look Book</a>
                        </Link>
                      </li>
                      <li>
                        <a target="_blank" href="/images/Jewellery-care-guide.pdf">Jewellery care guide</a>
                      </li>
                      <li>
                        <a target="_blank" href="/images/size_guide.pdf">Size Guide</a>
                      </li>
                      <li>
                        <Link href="/faqs">
                          <a>FAQ's</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/why-buy-from-godachi"><a >Why buy from Godachi</a></Link>
                      </li>
                      <li>
                        <Link href="/awards-recognition">
                          <a>Awards & Recognision</a>
                        </Link>
                      </li>
                    </ul>

                    <ul className="info-list halmarkfooter">
                      <li style={{ paddingTop: 10 }}>
                        <a href="javascript:void(0)" style={{ fontWeight: "bold", cursor: "auto" }}>
                          HALLMARK LICENCE :
                        </a>
                      </li>
                      <li>&nbsp;</li>
                      <li>
                        <a href="javascript:void(0)" style={{ cursor: "auto" }}>
                          SILVER : HM/C-8290420522
                        </a>
                      </li>
                      <li></li>
                      <li>
                        <a href="javascript:void(0)" style={{ cursor: "auto" }}>
                          GOLD : HM/C-8290419824
                        </a>
                      </li>
                    </ul>

                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="widget-item">
                  <h6 className="widget-title">Useful Links</h6>
                  <div className="widget-body">
                    <address className="contact-block">
                      <ul>
                        <li className="useful_links">
                          <Link href="/track-order">
                            <a>
                              <i className="pe-7s-car" style={{ color: "#02f5ea" }}></i> Track your order
                            </a>
                          </Link>
                        </li>
                        <li className="useful_links">
                          <Link href="/refer-your-friend">
                            <a >
                              <i className="pe-7s-users" style={{ color: "#02f902" }}></i>
                              Refer your friend
                            </a>
                          </Link>
                        </li>
                        <li className="useful_links">
                          <a
                            href="javascript:void(0)"
                            onClick={() => setShowBulkOrder(true)}
                          >
                            <i className="pe-7s-gym" style={{ color: "yellow" }}></i>
                            Bulk order
                          </a>
                        </li>
                        <li className="useful_links">
                          <a
                            href="javascript:void(0)"
                            onClick={() => setShowContact(true)}
                          >
                            <i className="pe-7s-plane" style={{ color: "orange" }}></i>  Write to Us
                          </a>
                        </li>
                      </ul>
                    </address>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="widget-item">
                  <h6 className="widget-title">Contact Us</h6>
                  <div className="widget-body">
                    <address className="contact-block">
                      <ul>
                        {
                          settings?.address?.map((address, index) => {
                            return (
                              <li key={index}>
                                <i className="pe-7s-home" />

                                <b>{address.name}</b> <br />
                                {address.value}
                              </li>
                            )
                          })
                        }
                        {
                          settings?.email?.map((email, index) => {
                            return (
                              <li key={index}>
                                <i className="pe-7s-mail" />
                                <a href={`mailto:${email.value}`}>
                                  {email.value}
                                </a>
                              </li>
                            )
                          })
                        }
                        {
                          settings?.phone?.map((phone, index) => {
                            return (
                              <li key={index}>
                                <i className="pe-7s-call" />
                                <a href={`tel:${phone.value}`}>
                                  {phone.value}
                                </a>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </address>
                  </div>
                </div>
                <div className="widget-item">
                  <h6 className="widget-title-download">Download Our App</h6>
                  <div className="widget-body">
                    <Image src="/assets/img/ios.png" style={{ width: 125 }} width={125} height={35} />
                    <a href="https://play.google.com/store/apps/details?id=com.godachiapp" target="_blank">
                      <Image
                        src="/assets/img/android.png"
                        style={{ width: 125, borderRadius: 7, float: "left" }}
                        width={125} height={35} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="widget-item">
                  <div className="widget-title">
                    <div className="widget-logo">
                      <a href="/">
                        <img src="/assets/img/logo/logo.png" alt="brand logo" />
                      </a>
                      <div className="widget-body social-link">
                        <a href="https://www.facebook.com/godachijewellery" target="_blank">
                          <i
                            className="fa fa-facebook"
                            style={{
                              fontFamily: 'var(--fa-style-family,"FontAwesome")'
                            }}
                          />
                        </a>
                        {/* <a href="https://twitter.com/Godachijewels" target="_blank">
                          <i
                            className="fa fa-twitter"
                            style={{
                              fontFamily: 'var(--fa-style-family,"FontAwesome")'
                            }}
                          />
                        </a> */}
                        <a href="https://www.instagram.com/godachijewellery/" target="_blank">
                          <i
                            className="fa fa-instagram"
                            style={{
                              fontFamily: 'var(--fa-style-family,"FontAwesome")'
                            }}
                          />
                        </a>
                        <a href="https://www.youtube.com/@godachiofficial" target="_blank">
                          <i
                            className="fa fa-youtube"
                            style={{
                              fontFamily: 'var(--fa-style-family,"FontAwesome")'
                            }}
                          />
                        </a>
                        <Link href="https://www.linkedin.com/in/godachijewellery" target="_blank">
                          <a >
                            <i
                              className="fa fa-linkedin"
                              style={{
                                fontFamily: 'var(--fa-style-family,"FontAwesome")'
                              }}
                            />
                          </a>
                        </Link>
                        <a href="https://www.pinterest.com/godachijewellery" target="_blank">
                          <i
                            className="fa fa-pinterest"
                            style={{
                              fontFamily: 'var(--fa-style-family,"FontAwesome")'
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="widget-body">
                    <ul className="info-list1">
                      <li>
                        <a href="/">
                          {/* <img src="/assets/img/godachiqr.png" /> */}
                          <Image src="/assets/img/godachiqr.png" width={100} height={100} />
                          <span>www.godachi.com</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container terms">
              <div className="row ">
                <div className="col-md-12">
                  <ul>
                    <li>
                      <i className="fa fa-angle-double-right" />
                      {/* <Link href="/copyright"> */}
                      <Link href="/copyright">
                        <a > Copyright</a>
                      </Link>
                    </li>
                    <li>
                      <i className="fa fa-angle-double-right" />
                      <Link href="/terms-and-conditions">
                        <a> Terms & Conditions</a>
                      </Link>

                    </li>
                    <li>
                      <i className="fa fa-angle-double-right" />
                      <Link href="/privacy-policy">
                        <a> Privacy Policy </a>
                      </Link>
                    </li>
                    <li>
                      <i className="fa fa-angle-double-right" />
                      {/* <Link href="/site-map"> */}
                      <Link href="/sitemap">
                        <a target="blank"> Site Map</a>
                      </Link>
                    </li>
                    <li>
                      {/* <img src="/assets/img/payment1.png" alt="payment method" /> */}
                      <Image src="/assets/img/payment1.png" alt="payment method" width={370} height={30} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <section className="container-fluid disclaimer">
            <div className="container">
              <div className="row ">
                <h6 className="widget-title-text">Disclaimer *</h6>
                <p>
                  The <a href="https://www.godachi.com">www.godachi.com</a> is the web platform, or mobile app showcasing contents for general information purposes only regarding Gems & Jewellery. Any information which is being provided on this website is not an offer, invitation or a solicitation. The decision with regard to buying of any product or any of the services by relying on this website is solely at users risk, cost and consequences. The Company does not warrant the accuracy, availability, completeness or suitability of the contents, images, price, offers, materials or the reliability of any statement or other information displayed or distributed through the website. The Company reserves the right to add, alter or delete any material from the Website at any time and revise these terms without notifying.
                  By accessing this site, you unconditionally and without any limitation agree to the
                  <a href="/terms-and-conditions" target="_blank">
                    Terms &amp; Conditions
                  </a>
                  and
                  <a href="/privacy-policy" target="_blank">
                    privacy policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="footer-bottom clrwhtf">
          <div className="container">
            <div className="row">
              <div className="col-12" style={{ padding: 7, paddingBottom: 8 }}>
                <div className="copyright-text text-center">
                  <div className="brand-logo">
                    <div className="container">
                      <div className="row">
                        <div className="col-12">
                          {/* <img src="/assets/img/aff.jpg" alt="payment method" /> */}
                          <Image src="/assets/img/aff.jpg" alt="payment method" width={300} height={40} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>© 2022 Godachi Pvt. Ltd. | All rights reserved.</p>
        </div>
      </footer>
      {/* footer area end */}

      <Script strategy="beforeInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-1RFJGJM6Z4" />
      <Script strategy="beforeInteractive" src="/assets/js/vendor/jquery-3.6.0.min.js" />
      <Script strategy="beforeInteractive" src="/assets/js/vendor/modernizr-3.6.0.min.js" />
      <Script strategy="beforeInteractive" src="/assets/js/vendor/bootstrap.bundle.min.js" />
      <Script strategy="beforeInteractive" src="/assets/js/plugins/slick.min.js" />
      <Script strategy="beforeInteractive" src="/assets/js/plugins/countdown.min.js" />
      <Script strategy="beforeInteractive" src="/assets/js/plugins/nice-select.min.js" />
      <Script strategy="beforeInteractive" src="/assets/js/plugins/jqueryui.min.js" />
      <Script strategy="beforeInteractive" src="/assets/js/plugins/imagesloaded.pkgd.min.js" />
      <Script strategy="beforeInteractive" src="/assets/js/plugins/ajaxchimp.js" />
      <Script strategy="beforeInteractive" src="/assets/js/plugins/ajax-mail.js" />
      <Script strategy="beforeInteractive" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCfmCVTjRI007pC1Yk2o2d_EhgkjTsFVN8" />
      <Script strategy="beforeInteractive" src="/assets/js/plugins/google-map.js" />

      <Script strategy="beforeInteractive" src="https://icodefy.com/Tools/iZoom/js/Vendor/ui-carousel/ui-carousel.js" />
      <Script strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js" />
      <Script strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/elevatezoom/2.2.3/jquery.elevatezoom.min.js" />
      {/* <Script strategy="beforeInteractive" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" /> */}
      <Script strategy="beforeInteractive" src="/assets/js/main.js" />

      <CustomizeJewellery
        show={showCustomizeJewellery}
        setShow={setShowCustomizeJewellery}
      />
      <BulkOrder
        show={showBulkOrder}
        setShow={setShowBulkOrder}
      />
      <Contact
        show={showContact}
        setShow={setShowContact}
      />

      <FloatingWhatsApp
        phoneNumber="917354999999"
        chatMessage='Hello, how can we help you?'
        accountName="Godachi"
        statusMessage="Online"
        // avatar="http://localhost:3000/assets/img/logo/logo.jpg"
        avatar="/assets/img/logo/logo.jpg"
        onClick={() => console.log("hi")}
      />
    </>

  );
};

export default Default;
