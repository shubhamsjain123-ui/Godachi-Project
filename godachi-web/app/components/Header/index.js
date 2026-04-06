import { useState, useEffect } from "react";
import AuthService from "../../../util/services/authservice";
import { useDispatch, useSelector } from "react-redux";
import {
  login_r,
  isAuthenticated_r,
  logout_r,
  filterProducts_r,
} from "../../../redux/actions";
import { Input, Modal, Form, message, Badge } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import CustomizeJewellery from "../Forms/CustomizeJewellery";
import Menu from "./menu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { API_URL, IMG_URL } from "../../../config/config";
import axios from "axios";
import { removeCookies, setCookie } from "cookies-next";
import func from "../../../util/helpers/func";
import Script from "next/script";

const Default = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { isFallback, events } = useRouter();
  const { settings } = useSelector(({ settings }) => settings);
  const { basket } = useSelector((state) => state.basket);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useSelector(({ login }) => login);
  const { filterProducts } = useSelector(
    ({ filterProducts }) => filterProducts
  );
  const [searchTextValue, setSearchTextValue] = useState("");
  const [openModalLogin, seTopenModalLogin] = useState(false);
  const [confirmLoadingLogin, seTconfirmLoadingLogin] = useState(false);
  const [openModalSignup, seTopenModalSignup] = useState(false);
  const [confirmLoadingSignup, seTconfirmLoadingSignup] = useState(false);
  const [stateisAuthenticated, seTstateisAuthenticated] = useState(false);
  const [showCustomizeJewellery, setShowCustomizeJewellery] = useState(false);

  const dispatch = useDispatch();

  const AddFunction = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-1RFJGJM6Z4");
  };

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        //includedLanguages: 'en,hi'
      },
      "google_translate_element"
    );
  };

  /*  useEffect(() => {
     const id = 'google-translate-script'
 
     const addScript = () => {
       const s = document.createElement('script')
       s.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
       s.setAttribute('id', id)
       const q = document.getElementById(id)
       if (!q) {
         document.body.appendChild(s)
         window.googleTranslateElementInit = googleTranslateElementInit
       }
     }
 
     const removeScript = () => {
       const q = document.getElementById(id)
       if (q) q.remove()
       const w = document.getElementById('google_translate_element')
       if (w) w.innerHTML = ''
     }
 
     isFallback || addScript()
 
     events.on('routeChangeStart', removeScript)
     events.on('routeChangeComplete', addScript)
 
     return () => {
       events.off('routeChangeStart', removeScript)
       events.off('routeChangeComplete', addScript)
     }
   }, []) */

  const onSubmitSignup = (Data) => {
    Data["username"] = Data.username.toLowerCase();

    axios
      .post(`${API_URL}/users/register`, Data)
      .then((res) => {
        if (res.data.error) {
          message.error(res.data.messagge);
        } else {
          form.resetFields();
          message.success(res.data.messagge);
          onSubmitLogin(Data);
        }
      })
      .catch((err) => console.log("err", err));
  };

  const onSubmitLogin = (Data) => {
    Data["username"] = Data.username.toLowerCase();
    AuthService.login(Data).then((data) => {
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        dispatch(login_r(user));
        dispatch(isAuthenticated_r(true));
        message.success("Login Successfully");
        seTopenModalLogin(false);
        seTopenModalSignup(false);
        setCookie("iswebuser", true);
      } else {
        message.error("Login not Successfully");
      }
    });
  };

  const ontextSearch = () => {
    var newFilter = { ...filterProducts, text: searchTextValue, skip: 0 };

    var urlParams = func.generateUrlParams(newFilter);
    console.log("router");
    console.log(router);
    let pathName = "/jewellery";
    if (router.pathname.includes("")) {
      pathName = router.pathname;
      urlParams.seo = router.query.seo;
    }
    router.push({
      pathname: pathName,
      query: urlParams,
    });
    /* dispatch(
      filterProducts_r(newFilter)
    );
    router.push("/jewellery"); */
  };

  useEffect(() => {
    if (isAuthenticated) {
      seTstateisAuthenticated(isAuthenticated);
    }
  }, [isAuthenticated]);

  return (
    <>
      <header className="header-area header-wide">
        <div className="main-header d-none d-lg-block">
          <div
            className="header-top bdr-bottom"
            style={{ background: "#E9DBDE" }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="welcome-message">
                    <p>
                      {settings.topOfferText}{" "}
                      <Link
                        href={
                          settings.topOffer
                            ? "/jewellery?godachiOffers=" + settings.topOffer
                            : "/images/Shop Now.pdf"
                        }
                      >
                        <a target="blank" className="show_now">Shop Now</a>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 text-right">
                  {/* <div className="header-search-container">
                      <button className="search-trigger d-xl-none d-lg-block">
                        <i className="pe-7s-search" />
                      </button>
                      
                        <input
                          type="text"
                          placeholder="Search on Godachi"
                          className="header-search-field"
                          onChange={(event)=>setSearchTextValue(event.target.value)}
                        />
                        <button className="header-search-btn" onClick={ontextSearch}>
                          <i className="pe-7s-search" />
                        </button>
                        
                        
                      
                    </div> */}
                  <SearchBar />
                </div>
                <div className="col-lg-5 text-right">
                  <div className="header-top-settings">
                    <ul className="nav align-items-center justify-content-end">
                      <li className="language" style={{ fontWeight: 600 }}>
                        <Link href="/track-order">
                          <a>
                            <i className="pe-7s-car" /> Track your Order{" "}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.godachiapp"
                          target="_blank"
                        >
                          <i
                            className="fa fa-mobile-phone"
                            style={{ fontSize: 18 }}
                          />{" "}
                          Get App{" "}
                        </a>
                      </li>
                      <li className="language">
                        <Link href="https://api.whatsapp.com/send/?phone=917354999999&text=I'd like to chat with you">
                          <a target="_blank">
                            <svg
                              width={17}
                              height={17}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0025 0H9.9975C4.48375 0 0 4.485 0 10C0 12.1875 0.705 14.215 1.90375 15.8612L0.6575 19.5763L4.50125 18.3475C6.0825 19.395 7.96875 20 10.0025 20C15.5162 20 20 15.5138 20 10C20 4.48625 15.5162 0 10.0025 0Z"
                                fill="#4CAF50"
                              />
                              <path
                                d="M15.8213 14.1212C15.58 14.8025 14.6225 15.3675 13.8588 15.5325C13.3363 15.6437 12.6538 15.7325 10.3563 14.78C7.4175 13.5625 5.525 10.5762 5.3775 10.3825C5.23625 10.1887 4.19 8.80123 4.19 7.36623C4.19 5.93123 4.91875 5.23248 5.2125 4.93248C5.45375 4.68623 5.8525 4.57373 6.235 4.57373C6.35875 4.57373 6.47 4.57998 6.57 4.58498C6.86375 4.59748 7.01125 4.61498 7.205 5.07873C7.44625 5.65998 8.03375 7.09498 8.10375 7.24248C8.175 7.38998 8.24625 7.58998 8.14625 7.78373C8.0525 7.98373 7.97 8.07248 7.8225 8.24248C7.675 8.41248 7.535 8.54248 7.3875 8.72498C7.2525 8.88373 7.1 9.05373 7.27 9.34748C7.44 9.63498 8.0275 10.5937 8.8925 11.3637C10.0088 12.3575 10.9138 12.675 11.2375 12.81C11.4788 12.91 11.7663 12.8862 11.9425 12.6987C12.1663 12.4575 12.4425 12.0575 12.7238 11.6637C12.9238 11.3812 13.1763 11.3462 13.4413 11.4462C13.7113 11.54 15.14 12.2462 15.4338 12.3925C15.7275 12.54 15.9213 12.61 15.9925 12.7337C16.0625 12.8575 16.0625 13.4387 15.8213 14.1212Z"
                                fill="#FAFAFA"
                              />
                            </svg>
                            <span> Whatsapp</span>
                          </a>
                        </Link>
                      </li>
                      {/* <li className="language">
                          <img src="/assets/img/icon/en.png" alt="flag" /> English
                          <i className="fa fa-angle-down" />
                           <ul className="dropdown-list">
                            <li>
                              <a href="#">
                                <img src="/assets/img/icon/en.png" alt="flag" />{" "}
                                English
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="/assets/img/icon/fr.png" alt="flag" /> Hindi
                              </a>
                            </li>
                          </ul> 

                           <div id="google_translate_element"></div> 
                        </li>*/}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-main-area sticky">
            <div className="container">
              <div className="row align-items-center position-relative">
                <div className="col-lg-2">
                  <div className="logo">
                    <Link href="/">
                      <a>
                        <img src="/assets/img/logo/logo.png" alt="Brand Logo" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-8 position-static">
                  <Menu />
                </div>
                <div className="col-lg-2">
                  <div className="header-right d-flex align-items-center   justify-content-lg-end">
                    <div className="header-configure-area">
                      <ul className="nav justify-content-end">
                        <li className="user-hover">
                          <Link
                            href={
                              isAuthenticated ? "/profile/dashboard" : "/signin"
                            }
                          >
                            <a>
                              <svg
                                width={27}
                                height={27}
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18.9 21.5001C19.2866 21.5001 19.6 21.1867 19.6 20.8001C19.6 20.4135 19.2866 20.1001 18.9 20.1001C18.5134 20.1001 18.2 20.4135 18.2 20.8001C18.2 21.1867 18.5134 21.5001 18.9 21.5001Z"
                                  fill="#001325"
                                  fillOpacity="0.92"
                                />
                                <path
                                  d="M15.9 21.5001C16.2866 21.5001 16.6 21.1867 16.6 20.8001C16.6 20.4135 16.2866 20.1001 15.9 20.1001C15.5134 20.1001 15.2 20.4135 15.2 20.8001C15.2 21.1867 15.5134 21.5001 15.9 21.5001Z"
                                  fill="#001325"
                                  fillOpacity="0.92"
                                />
                                <path
                                  d="M12.9 21.5001C13.2866 21.5001 13.6 21.1867 13.6 20.8001C13.6 20.4135 13.2866 20.1001 12.9 20.1001C12.5134 20.1001 12.2 20.4135 12.2 20.8001C12.2 21.1867 12.5134 21.5001 12.9 21.5001Z"
                                  fill="#001325"
                                  fillOpacity="0.92"
                                />
                                <path
                                  d="M12 4C12.7 4 13.3 4.2 13.8 4.7C14.3 5.2 14.5 5.9 14.5 6.6V6.7C14.5 7.4 14.3 8.2 13.8 8.7C12.8 9.7 11.2 9.7 10.2 8.7C9.69998 8.2 9.39998 7.5 9.39998 6.8V6.7C9.29998 5.3 10.3 4.1 11.7 4C11.8 4 11.9 4 12 4ZM12 2.5C9.79998 2.5 7.99998 4.3 7.99998 6.5C7.99998 6.6 7.99998 6.6 7.99998 6.7V6.8C7.89998 9 9.59998 10.9 11.8 11C11.9 11 11.9 11 12 11C13.1 11 14.1 10.6 14.9 9.8C15.7 9 16.1 7.9 16 6.8V6.6C16 5.5 15.6 4.4 14.8 3.6C14.1 2.9 13 2.5 12 2.5Z"
                                  fill="#001325"
                                  fillOpacity="0.92"
                                />
                                <path
                                  d="M9.79999 21.5002H5.79999C5.39999 21.5002 4.99999 21.3002 4.69999 21.0002C4.39999 20.7002 4.29999 20.2002 4.39999 19.8002C4.99999 15.4002 8.99999 12.4002 13.4 13.0002C16.2 13.4002 18.6 15.2002 19.7 17.8002C19.8 18.2002 19.6 18.6002 19.2 18.8002C18.8 18.9002 18.4 18.8002 18.3 18.4002C17 15.1002 13.2 13.4002 9.89999 14.7002C7.69999 15.6002 6.09999 17.6002 5.79999 20.0002H9.79999C10.2 20.0002 10.6 20.3002 10.6 20.8002C10.6 21.3002 10.2 21.5002 9.79999 21.5002Z"
                                  fill="#001325"
                                  fillOpacity="0.92"
                                />
                              </svg>
                            </a>
                          </Link>
                          {isAuthenticated && (
                            <div className="dropdown-list tqAccountPopLogin">
                              <div className="name">Hi! {user?.name},</div>
                              <h6>{user?.phone}</h6>
                              <li>
                                <Link href="/profile/dashboard">
                                  <a>My Account</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/profile/wallet">
                                  <a>My Wallet</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/profile/orders">
                                  <a>Order History</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/profile/address">
                                  <a>Manage Address</a>
                                </Link>
                              </li>

                              <li>
                                <a
                                  onClick={async () => {
                                    await AuthService.logout();
                                    await dispatch(logout_r());
                                    seTstateisAuthenticated(false);
                                    removeCookies("iswebuser");
                                    removeCookies("access_token_user");
                                    router.push("/");
                                  }}
                                >
                                  Logout
                                </a>
                              </li>
                            </div>
                          )}

                          {!isAuthenticated && (
                            <div className="dropdown-list tqAccountPop">
                              <h4>My Account</h4>
                              <h6>Login to access your account</h6>
                              <div className="tqAccountPopCTA">
                                <div id="common-button">
                                  <Link href="/signin">
                                    <a className="btn secondary-btn ">
                                      <span className="">Log In</span>
                                    </a>
                                  </Link>
                                </div>
                                <div id="common-button">
                                  <Link href="/signin">
                                    <a className="btn primary-btn ">
                                      <span className="">Sign Up</span>
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* <ul className="dropdown-list">
                              {
                                !isAuthenticated &&
                                <>
                                  <li>
                                    <Link href="/signin">
                                      <a>Login</a>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/signin">
                                      <a>Register</a>
                                    </Link>
                                    
                                  </li>
                                </>
                              }
                              {
                                isAuthenticated &&
                                <>
                                  <li>
                                    <Link href="/profile/dashboard">
                                      <a>My Account</a>
                                    </Link>
                                    <a
                                      onClick={async () => {
                                        await AuthService.logout();
                                        await dispatch(logout_r());
                                        seTstateisAuthenticated(false);
                                        removeCookies("iswebuser");
                                        router.push("/");
                                    }}
                                    >Logout</a>
                                  </li>
                                </>
                              }
                              
                            </ul> */}
                        </li>
                        <li>
                          <Link href="/wishlist">
                            <a>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                viewBox="0 0 25 25"
                              >
                                <title>Heart icon</title>
                                <path
                                  className="heart-icon-path"
                                  fill="#fff"
                                  stroke="currentColor"
                                  d="M11.4967297,19.0021565 C12.1501607,18.4744665 15.7313591,16.1461023 16.6556949,15.4660553 C20.4639993,12.6642314 22.5,9.83806845 22.500204,6.31427989 C22.4080534,3.08900922 19.7336922,0.5 16.5,0.5 C14.6798666,0.5 13.0132876,1.30878098 11.8904344,2.71234752 L11.5,3.20039053 L11.1095656,2.71234752 C9.98671236,1.30878098 8.32013337,0.5 6.5,0.5 C3.16873226,0.5 0.5,3.08355995 0.5,6.3 C0.5,9.87466924 2.55294628,12.7216506 6.38828771,15.5301224 C7.34346545,16.229562 10.7334347,18.4195137 11.4967297,19.0021565 Z"
                                />
                              </svg>
                              <div className="notification">
                                {wishlist.length}
                              </div>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/cart">
                            <a className="minicart-btn">
                              <svg
                                width={27}
                                height={27}
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.5 7.2H16.2V6.9C16.3 4.5 14.4 2.5 12 2.5C9.6 2.6 7.8 4.5 7.8 6.9V7.2H3.5C2.9 7.2 2.5 7.6 2.5 8.2V16.4C2.5 19.2 4.7 21.4 7.5 21.4H16.5C19.3 21.4 21.5 19.2 21.5 16.4V8.2C21.5 7.7 21.1 7.2 20.5 7.2ZM9.3 6.9C9.3 5.4 10.5 4.1 12 4C13.5 4.1 14.7 5.4 14.7 6.9V7.2H9.3V6.9ZM20 16.5C20 18.4 18.4 20 16.5 20H7.5C5.6 20 4 18.4 4 16.5V8.7H7.8V10.7C7.6 10.9 7.5 11.2 7.5 11.4C7.5 12 8 12.4 8.5 12.4C9 12.4 9.5 11.9 9.5 11.4C9.5 11.1 9.4 10.9 9.2 10.7V8.7H14.6V10.6C14.4 10.8 14.3 11.1 14.3 11.4C14.3 12 14.7 12.5 15.3 12.5C15.9 12.5 16.4 12.1 16.4 11.5C16.4 11.2 16.3 11 16.1 10.8V8.8H20V16.5Z"
                                  fill="black"
                                />
                              </svg>
                              <div className="notification">
                                {basket.products.length}
                              </div>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="header-top d-lg-none d-md-block bdr-bottom"
          style={{ background: "#E9DBDE" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="welcome-message">
                  <p>
                    Welcome to GODACHI Jewellery store{" "}
                    <a href="#" className="show_now">
                      Shop Now
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-header d-lg-none d-md-block sticky">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="mobile-main-header">
                  <div className="mobile-logo">
                    <Link href="/">
                      <a>
                        <img src="/assets/img/logo/logo.png" alt="Brand Logo" />
                      </a>
                    </Link>
                  </div>
                  <div className="mobile-menu-toggler">
                    <div className="mini-cart-wrap mr-15">
                      <Link href="/wishlist">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={22}
                            height={22}
                            viewBox="0 0 25 25"
                          >
                            <title>Heart icon</title>
                            <path
                              className="heart-icon-path"
                              fill="#fff"
                              stroke="currentColor"
                              d="M11.4967297,19.0021565 C12.1501607,18.4744665 15.7313591,16.1461023 16.6556949,15.4660553 C20.4639993,12.6642314 22.5,9.83806845 22.500204,6.31427989 C22.4080534,3.08900922 19.7336922,0.5 16.5,0.5 C14.6798666,0.5 13.0132876,1.30878098 11.8904344,2.71234752 L11.5,3.20039053 L11.1095656,2.71234752 C9.98671236,1.30878098 8.32013337,0.5 6.5,0.5 C3.16873226,0.5 0.5,3.08355995 0.5,6.3 C0.5,9.87466924 2.55294628,12.7216506 6.38828771,15.5301224 C7.34346545,16.229562 10.7334347,18.4195137 11.4967297,19.0021565 Z"
                            />
                          </svg>
                          <div className="notification">{wishlist.length}</div>
                        </a>
                      </Link>
                    </div>
                    <div className="mini-cart-wrap">
                      <Link href="/cart">
                        <a>
                          <svg
                            width={27}
                            height={27}
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.5 7.2H16.2V6.9C16.3 4.5 14.4 2.5 12 2.5C9.6 2.6 7.8 4.5 7.8 6.9V7.2H3.5C2.9 7.2 2.5 7.6 2.5 8.2V16.4C2.5 19.2 4.7 21.4 7.5 21.4H16.5C19.3 21.4 21.5 19.2 21.5 16.4V8.2C21.5 7.7 21.1 7.2 20.5 7.2ZM9.3 6.9C9.3 5.4 10.5 4.1 12 4C13.5 4.1 14.7 5.4 14.7 6.9V7.2H9.3V6.9ZM20 16.5C20 18.4 18.4 20 16.5 20H7.5C5.6 20 4 18.4 4 16.5V8.7H7.8V10.7C7.6 10.9 7.5 11.2 7.5 11.4C7.5 12 8 12.4 8.5 12.4C9 12.4 9.5 11.9 9.5 11.4C9.5 11.1 9.4 10.9 9.2 10.7V8.7H14.6V10.6C14.4 10.8 14.3 11.1 14.3 11.4C14.3 12 14.7 12.5 15.3 12.5C15.9 12.5 16.4 12.1 16.4 11.5C16.4 11.2 16.3 11 16.1 10.8V8.8H20V16.5Z"
                              fill="black"
                            />
                          </svg>
                          <div className="notification">
                            {basket.products.length}
                          </div>
                        </a>
                      </Link>
                    </div>
                    <button className="mobile-menu-btn">
                      <span />
                      <span />
                      <span />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="off-canvas-wrapper">
          <div className="off-canvas-overlay" />
          <div className="off-canvas-inner-content">
            <div className="btn-close-off-canvas">
              <i className="pe-7s-close" />
            </div>
            <div className="off-canvas-inner">
              <div className="search-box-offcanvas">
                {/*  <form>
                    <input 
                      type="text" 
                      placeholder="Search on Godachi"
                      onChange={(event)=>setSearchTextValue(event.target.value)}
                    />
                    <button className="search-btn" onClick={ontextSearch}>
                      <i className="pe-7s-search" />
                    </button>
                  </form> */}
                <SearchBar />
              </div>
              <MobileMenu />
              {/* <div className="mobile-navigation">
                  <nav>
                    <ul className="mobile-menu">
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/earrings">
                          <a>Earrings</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li className="mega-title menu-item-has-children1">
                            <a href="index.html">Shop By Metal</a>
                            <ul className="dropdown">
                              <li>
                                <a href="index.html">Gold</a>
                              </li>
                              <li>
                                <a href="index.html">Silver</a>
                              </li>
                              <li>
                                <a href="index.html">Diamond</a>
                              </li>
                              <li>
                                <a href="index.html">Gemstone</a>
                              </li>
                              <li>
                                <a href="index.html">Pearl</a>
                              </li>
                              <li>
                                <a href="index.html">Moissanite</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-2.html">Shop By Price</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">
                                  Up to <i className="fa fa-inr" />
                                  2,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  2,000 - <i className="fa fa-inr" />
                                  5,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  5,000 - <i className="fa fa-inr" />
                                  10,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  10,000 - <i className="fa fa-inr" />
                                  25,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  25,000 - <i className="fa fa-inr" />
                                  50,000
                                </a>
                              </li>
                              <li>
                                <a href="privacy-policy.html">
                                  <i className="fa fa-inr" />
                                  50,000 and Above{" "}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-3.html">Shop For</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">Women</a>
                              </li>
                              <a href="product-details.html"></a>
                              <li>
                                <a href="product-details.html" />
                                <a href="product-details-affiliate.html">Men</a>
                              </li>
                              <a href="product-details-affiliate.html"></a>
                              <li>
                                <a href="product-details-affiliate.html" />
                                <a href="privacy-policy.html">Kids</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-4.html">Shop By Occasion</a>
                            <ul className="dropdown">
                              <li>
                                <a href="my-account.html">Wedding</a>
                              </li>
                              <li>
                                <a href="login-register.html">Party Wear</a>
                              </li>
                              <li>
                                <a href="about-us.html">Traditional &amp; Ethnic</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Office Wear</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Daily Wear</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/rings">
                          <a>Rings</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li className="mega-title menu-item-has-children1">
                            <a href="index.html">Shop By Metal</a>
                            <ul className="dropdown">
                              <li>
                                <a href="index.html">Gold</a>
                              </li>
                              <li>
                                <a href="index.html">Silver</a>
                              </li>
                              <li>
                                <a href="index.html">Diamond</a>
                              </li>
                              <li>
                                <a href="index.html">Gemstone</a>
                              </li>
                              <li>
                                <a href="index.html">Pearl</a>
                              </li>
                              <li>
                                <a href="index.html">Moissanite</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-2.html">Shop By Price</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">
                                  Up to <i className="fa fa-inr" />
                                  2,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  2,000 - <i className="fa fa-inr" />
                                  5,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  5,000 - <i className="fa fa-inr" />
                                  10,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  10,000 - <i className="fa fa-inr" />
                                  25,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  25,000 - <i className="fa fa-inr" />
                                  50,000
                                </a>
                              </li>
                              <li>
                                <a href="privacy-policy.html">
                                  <i className="fa fa-inr" />
                                  50,000 and Above{" "}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-3.html">Shop For</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">Women</a>
                              </li>
                              <a href="product-details.html"></a>
                              <li>
                                <a href="product-details.html" />
                                <a href="product-details-affiliate.html">Men</a>
                              </li>
                              <a href="product-details-affiliate.html"></a>
                              <li>
                                <a href="product-details-affiliate.html" />
                                <a href="privacy-policy.html">Kids</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-4.html">Shop By Occasion</a>
                            <ul className="dropdown">
                              <li>
                                <a href="my-account.html">Wedding</a>
                              </li>
                              <li>
                                <a href="login-register.html">Party Wear</a>
                              </li>
                              <li>
                                <a href="about-us.html">Traditional &amp; Ethnic</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Office Wear</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Daily Wear</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/bangles-bracelets">
                          <a>Bangles &amp; Bracelets</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li className="mega-title menu-item-has-children1">
                            <a href="index.html">Shop By Metal</a>
                            <ul className="dropdown">
                              <li>
                                <a href="index.html">Gold</a>
                              </li>
                              <li>
                                <a href="index.html">Silver</a>
                              </li>
                              <li>
                                <a href="index.html">Diamond</a>
                              </li>
                              <li>
                                <a href="index.html">Gemstone</a>
                              </li>
                              <li>
                                <a href="index.html">Pearl</a>
                              </li>
                              <li>
                                <a href="index.html">Moissanite</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-2.html">Shop By Price</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">
                                  Up to <i className="fa fa-inr" />
                                  2,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  2,000 - <i className="fa fa-inr" />
                                  5,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  5,000 - <i className="fa fa-inr" />
                                  10,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  10,000 - <i className="fa fa-inr" />
                                  25,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  25,000 - <i className="fa fa-inr" />
                                  50,000
                                </a>
                              </li>
                              <li>
                                <a href="privacy-policy.html">
                                  <i className="fa fa-inr" />
                                  50,000 and Above{" "}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-3.html">Shop For</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">Women</a>
                              </li>
                              <a href="product-details.html"></a>
                              <li>
                                <a href="product-details.html" />
                                <a href="product-details-affiliate.html">Men</a>
                              </li>
                              <a href="product-details-affiliate.html"></a>
                              <li>
                                <a href="product-details-affiliate.html" />
                                <a href="privacy-policy.html">Kids</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-3.html">Shop By Category</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">Bangles</a>
                              </li>
                              <a href="product-details.html"></a>
                              <li>
                                <a href="product-details.html" />
                                <a href="product-details-affiliate.html">Bracelets</a>
                              </li>
                              <a href="product-details-affiliate.html"></a>
                              <li>
                                <a href="product-details-affiliate.html" />
                                <a href="privacy-policy.html">Mangalsutra Bracelets</a>
                              </li>
                              <li>
                                <a href="privacy-policy.html">Kadas</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-4.html">Shop By Occasion</a>
                            <ul className="dropdown">
                              <li>
                                <a href="my-account.html">Wedding</a>
                              </li>
                              <li>
                                <a href="login-register.html">Party Wear</a>
                              </li>
                              <li>
                                <a href="about-us.html">Traditional &amp; Ethnic</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Office Wear</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Daily Wear</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/chains">
                          <a>Chains &amp; Pendants</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li className="mega-title menu-item-has-children1">
                            <a href="index.html">Shop By Metal</a>
                            <ul className="dropdown">
                              <li>
                                <a href="index.html">Gold</a>
                              </li>
                              <li>
                                <a href="index.html">Silver</a>
                              </li>
                              <li>
                                <a href="index.html">Diamond</a>
                              </li>
                              <li>
                                <a href="index.html">Gemstone</a>
                              </li>
                              <li>
                                <a href="index.html">Pearl</a>
                              </li>
                              <li>
                                <a href="index.html">Moissanite</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-2.html">Shop By Price</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">
                                  Up to <i className="fa fa-inr" />
                                  2,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  2,000 - <i className="fa fa-inr" />
                                  5,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  5,000 - <i className="fa fa-inr" />
                                  10,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  10,000 - <i className="fa fa-inr" />
                                  25,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  25,000 - <i className="fa fa-inr" />
                                  50,000
                                </a>
                              </li>
                              <li>
                                <a href="privacy-policy.html">
                                  <i className="fa fa-inr" />
                                  50,000 and Above{" "}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-3.html">Shop For</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">Women</a>
                              </li>
                              <a href="product-details.html"></a>
                              <li>
                                <a href="product-details.html" />
                                <a href="product-details-affiliate.html">Men</a>
                              </li>
                              <a href="product-details-affiliate.html"></a>
                              <li>
                                <a href="product-details-affiliate.html" />
                                <a href="privacy-policy.html">Kids</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-3.html">Shop By Category</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">Chains</a>
                              </li>
                              <a href="product-details.html"></a>
                              <li>
                                <a href="product-details.html" />
                                <a href="product-details-affiliate.html">Pendants</a>
                              </li>
                              <a href="product-details-affiliate.html"></a>
                              <li>
                                <a href="product-details-affiliate.html" />
                                <a href="privacy-policy.html">Mangalsutra</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-4.html">Shop By Occasion</a>
                            <ul className="dropdown">
                              <li>
                                <a href="my-account.html">Wedding</a>
                              </li>
                              <li>
                                <a href="login-register.html">Party Wear</a>
                              </li>
                              <li>
                                <a href="about-us.html">Traditional &amp; Ethnic</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Office Wear</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Daily Wear</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/necklaces">
                          <a>Necklaces</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li className="mega-title menu-item-has-children1">
                            <a href="index.html">Shop By Metal</a>
                            <ul className="dropdown">
                              <li>
                                <a href="index.html">Gold</a>
                              </li>
                              <li>
                                <a href="index.html">Silver</a>
                              </li>
                              <li>
                                <a href="index.html">Diamond</a>
                              </li>
                              <li>
                                <a href="index.html">Gemstone</a>
                              </li>
                              <li>
                                <a href="index.html">Pearl</a>
                              </li>
                              <li>
                                <a href="index.html">Moissanite</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-2.html">Shop By Price</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">
                                  Up to <i className="fa fa-inr" />
                                  2,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  2,000 - <i className="fa fa-inr" />
                                  5,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  5,000 - <i className="fa fa-inr" />
                                  10,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  10,000 - <i className="fa fa-inr" />
                                  25,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  25,000 - <i className="fa fa-inr" />
                                  50,000
                                </a>
                              </li>
                              <li>
                                <a href="privacy-policy.html">
                                  <i className="fa fa-inr" />
                                  50,000 and Above{" "}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-4.html">Shop By Occasion</a>
                            <ul className="dropdown">
                              <li>
                                <a href="my-account.html">Wedding</a>
                              </li>
                              <li>
                                <a href="login-register.html">Party Wear</a>
                              </li>
                              <li>
                                <a href="about-us.html">Traditional &amp; Ethnic</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Office Wear</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Daily Wear</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/anklets">
                          <a>Anklets</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li className="mega-title menu-item-has-children1">
                            <a href="index.html">Shop By Metal</a>
                            <ul className="dropdown">
                              <li>
                                <a href="index.html">Gold</a>
                              </li>
                              <li>
                                <a href="index.html">Silver</a>
                              </li>
                              <li>
                                <a href="index.html">Diamond</a>
                              </li>
                              <li>
                                <a href="index.html">Gemstone</a>
                              </li>
                              <li>
                                <a href="index.html">Pearl</a>
                              </li>
                              <li>
                                <a href="index.html">Moissanite</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-2.html">Shop By Price</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">
                                  Up to <i className="fa fa-inr" />
                                  2,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  2,000 - <i className="fa fa-inr" />
                                  5,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  5,000 - <i className="fa fa-inr" />
                                  10,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  10,000 - <i className="fa fa-inr" />
                                  25,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  25,000 - <i className="fa fa-inr" />
                                  50,000
                                </a>
                              </li>
                              <li>
                                <a href="privacy-policy.html">
                                  <i className="fa fa-inr" />
                                  50,000 and Above{" "}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-4.html">Shop for</a>
                            <ul className="dropdown">
                              <li>
                                <a href="my-account.html">Women</a>
                              </li>
                              <li>
                                <a href="login-register.html">Kids</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/jewellery-sets">
                          <a>Jewellery Sets</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li className="mega-title menu-item-has-children1">
                            <a href="index.html">Shop By Metal</a>
                            <ul className="dropdown">
                              <li>
                                <a href="index.html">Gold</a>
                              </li>
                              <li>
                                <a href="index.html">Silver</a>
                              </li>
                              <li>
                                <a href="index.html">Diamond</a>
                              </li>
                              <li>
                                <a href="index.html">Gemstone</a>
                              </li>
                              <li>
                                <a href="index.html">Pearl</a>
                              </li>
                              <li>
                                <a href="index.html">Moissanite</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-2.html">Shop By Price</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">
                                  Up to <i className="fa fa-inr" />
                                  2,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  2,000 - <i className="fa fa-inr" />
                                  5,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  5,000 - <i className="fa fa-inr" />
                                  10,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  10,000 - <i className="fa fa-inr" />
                                  25,000
                                </a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  <i className="fa fa-inr" />
                                  25,000 - <i className="fa fa-inr" />
                                  50,000
                                </a>
                              </li>
                              <li>
                                <a href="privacy-policy.html">
                                  <i className="fa fa-inr" />
                                  50,000 and Above{" "}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-4.html">Shop By Occasion</a>
                            <ul className="dropdown">
                              <li>
                                <a href="my-account.html">Wedding</a>
                              </li>
                              <li>
                                <a href="login-register.html">Party Wear</a>
                              </li>
                              <li>
                                <a href="about-us.html">Traditional &amp; Ethnic</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Office Wear</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Daily Wear</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/other-jewellery">
                          <a>Other Jewellery</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li className="mega-title menu-item-has-children1">
                            <a href="index.html">Shop By Category</a>
                            <ul className="dropdown">
                              <li>
                                <a href="shop-grid-right-sidebar.html">Mang Tikka</a>
                              </li>
                              <li>
                                <a href="shop-list-right-sidebar.html">Brooch</a>
                              </li>
                              <li>
                                <a href="shop-list-right-sidebar.html">Hair Pins</a>
                              </li>
                              <li>
                                <a href="shop-list-right-sidebar.html">
                                  Notepins/Noserings
                                </a>
                              </li>
                              <li>
                                <a href="shop-list-left-sidebar.html">Waist Chain</a>
                              </li>
                              <li>
                                <a href="shop-list-right-sidebar.html">Toe Ring</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Cufflinks</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-2.html">Shop By Metal</a>
                            <ul className="dropdown">
                              <li>
                                <a href="index.html">Gold</a>
                              </li>
                              <li>
                                <a href="index.html">Silver</a>
                              </li>
                              <li>
                                <a href="index.html">Diamond</a>
                              </li>
                              <li>
                                <a href="index.html">Gemstone</a>
                              </li>
                              <li>
                                <a href="index.html">Pearl</a>
                              </li>
                              <li>
                                <a href="index.html">Moissanite</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-3.html">Shop For</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">Women</a>
                              </li>
                              <a href="product-details.html"></a>
                              <li>
                                <a href="product-details.html" />
                                <a href="product-details-affiliate.html">Men</a>
                              </li>
                              <a href="product-details-affiliate.html"></a>
                              <li>
                                <a href="product-details-affiliate.html" />
                                <a href="privacy-policy.html">Kids</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-3.html">Other</a>
                            <ul className="dropdown">
                              <li>
                                <a href="my-account.html">Multi Stone</a>
                              </li>
                              <li>
                                <a href="login-register.html">Solitaires </a>
                              </li>
                              <li>
                                <a href="about-us.html">Polki</a>
                              </li>
                              <li>
                                <a href="contact-us.html">Navratna</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-4.html">Precious stones</a>
                            <ul className="dropdown">
                              <li>
                                <a href="cart.html">Heera (Diamond)</a>
                              </li>
                              <li>
                                <a href="checkout.html">Neelam (Blue Sapphire)</a>
                              </li>
                              <li>
                                <a href="compare.html">Pukhraj (Yellow Sapphire)</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Panna (Emerald)</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Manik (Ruby)</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Gomed (Hessonite)</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Moonga (Coral Red)</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Moti (Pearl)</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Lehsunia</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/coins">
                          <a>Coins</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li className="mega-title menu-item-has-children1">
                            <a href="index.html">Shop By Metal</a>
                            <ul className="dropdown">
                              <li>
                                <a href="index.html">Gold</a>
                              </li>
                              <li>
                                <a href="index.html">Silver</a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title menu-item-has-children1">
                            <a href="index-2.html">Shop By Category</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">Floral</a>
                              </li>
                              <a href="product-details.html"></a>
                              <li>
                                <a href="product-details.html" />
                                <a href="product-details-affiliate.html">
                                  Laxmi Ganesh
                                </a>
                              </li>
                              <a href="product-details-affiliate.html"></a>
                              <li>
                                <a href="product-details-affiliate.html" />
                                <a href="product-details-affiliate.html">Kalash</a>
                              </li>
                              <a href="product-details-affiliate.html"></a>
                            </ul>
                            <a href="product-details-affiliate.html"></a>
                          </li>
                          <a href="product-details-affiliate.html"></a>
                          <li className="mega-title menu-item-has-children1">
                            <a href="product-details-affiliate.html" />
                            <a href="index-4.html">Shop By Weight</a>
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">Up to 2 gms</a>
                              </li>
                              <li>
                                <a href="product-details-affiliate.html">
                                  2 gms - 4 gms
                                </a>
                              </li>
                              <li>
                                <a href="product-details-variable.html">
                                  4 gms - 6 gms
                                </a>
                              </li>
                              <li>
                                <a href="product-details-group.html">6 gms - 8 gms</a>
                              </li>
                              <li>
                                <a href="product-details-group.html">8 gms - 16 gms</a>
                              </li>
                              <li>
                                <a href="product-details-group.html">16 gms - 32 gms</a>
                              </li>
                              <li>
                                <a href="product-details-group.html">
                                  32 gms &amp; Above
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children1">
                        <Link href="/jewellery/gift-items">
                          <a>Gifts</a>
                        </Link>
                        <ul className="megamenu dropdown">
                          <li>
                            <a href="index.html">Watches</a>
                          </li>
                          <li>
                            <a href="index-2.html">Belt Buckle</a>
                          </li>
                          <li>
                            <a href="index-3.html">Golden Roses</a>
                          </li>
                          <li>
                            <a href="index-4.html">Gold Shirt Buttons</a>
                          </li>
                          <li>
                            <a href="index-5.html">Custom Eye Glasses</a>
                          </li>
                          <li>
                            <a href="index-6.html">Customized Ring Box</a>
                          </li>
                          <li>
                            <a href="index-6.html">Unique Coin Box</a>
                          </li>
                          <li>
                            <a href="index-6.html">Gift Card</a>
                          </li>
                          <li>
                            <a href="index-6.html">Gift Voucher</a>
                          </li>
                          <li>
                            <a href="index-6.html">Gold Greeting Card</a>
                          </li>
                          <li>
                            <a href="index-6.html">Silver Greeting Card</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div> */}
              <div className="mobile-settings">
                <ul className="nav">
                  <li>
                    <div className="dropdown mobile-top-dropdown">
                      <a
                        href="#"
                        className="dropdown-toggle"
                        id="myaccount"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        My Account
                        <i className="fa fa-angle-down" />
                      </a>

                      <div
                        className="dropdown-menu"
                        aria-labelledby="myaccount"
                      >
                        {isAuthenticated && (
                          <>
                            <Link href="/profile/dashboard">
                              <span className="dropdown-item">My Account</span>
                            </Link>
                            <Link href="/profile/wallet">
                              <span className="dropdown-item">My Wallet</span>
                            </Link>
                            <Link href="/profile/orders">
                              <span className="dropdown-item">Order History</span>
                            </Link>
                            <Link href="/profile/address">
                              <span className="dropdown-item">Manage Address</span>
                            </Link>
                            <span
                              className="dropdown-item"
                              onClick={async () => {
                                await AuthService.logout();
                                await dispatch(logout_r());
                                seTstateisAuthenticated(false);
                                removeCookies("iswebuser");
                                router.push("/");
                              }}
                            >
                              Logout
                            </span>
                          </>
                        )}
                        {!isAuthenticated && (
                          <>
                            <Link href="/signin">
                              <span className="dropdown-item">Login</span>
                            </Link>
                            <Link href="/signin">
                              <span className="dropdown-item">Sign Up</span>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      onClick={() => setShowCustomizeJewellery(true)}
                      className="clrOrange"
                    >
                      Customize Your Jewellery
                    </a>
                  </li>
                  {/* <li>
                      <a href="#">Get Mobile App</a>
                    </li> */}
                </ul>
              </div>
              <div className="offcanvas-widget-area">
                <div className="off-canvas-contact-widget">
                  <ul>
                    {/* {
                        settings?.address?.map((address)=>{
                          return(
                            <li>
                              <i className="fa fa-home" />

                                <b>{address.name}</b> <br />
                                {address.value}
                            </li>
                          )
                        })
                      } */}
                    {settings?.phone?.map((phone, index) => {
                      return (
                        <li key={index}>
                          <i className="fa fa-mobile" />
                          <a href={`tel:${phone.value}`}>{phone.value}</a>
                        </li>
                      );
                    })}
                    {settings?.email?.map((email, index) => {
                      return (
                        <li key={index}>
                          <i className="fa fa-envelope-o" />
                          <a href={`mailto:${email.value}`}>{email.value}</a>
                        </li>
                      );
                    })}
                    <li>
                      <Link href="https://api.whatsapp.com/send/?phone=917354999999&text=I'd like to chat with you">
                        <a target="_blank">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.0025 0H9.9975C4.48375 0 0 4.485 0 10C0 12.1875 0.705 14.215 1.90375 15.8612L0.6575 19.5763L4.50125 18.3475C6.0825 19.395 7.96875 20 10.0025 20C15.5162 20 20 15.5138 20 10C20 4.48625 15.5162 0 10.0025 0Z"
                              fill="#4CAF50"
                            />
                            <path
                              d="M15.8213 14.1212C15.58 14.8025 14.6225 15.3675 13.8588 15.5325C13.3363 15.6437 12.6538 15.7325 10.3563 14.78C7.4175 13.5625 5.525 10.5762 5.3775 10.3825C5.23625 10.1887 4.19 8.80123 4.19 7.36623C4.19 5.93123 4.91875 5.23248 5.2125 4.93248C5.45375 4.68623 5.8525 4.57373 6.235 4.57373C6.35875 4.57373 6.47 4.57998 6.57 4.58498C6.86375 4.59748 7.01125 4.61498 7.205 5.07873C7.44625 5.65998 8.03375 7.09498 8.10375 7.24248C8.175 7.38998 8.24625 7.58998 8.14625 7.78373C8.0525 7.98373 7.97 8.07248 7.8225 8.24248C7.675 8.41248 7.535 8.54248 7.3875 8.72498C7.2525 8.88373 7.1 9.05373 7.27 9.34748C7.44 9.63498 8.0275 10.5937 8.8925 11.3637C10.0088 12.3575 10.9138 12.675 11.2375 12.81C11.4788 12.91 11.7663 12.8862 11.9425 12.6987C12.1663 12.4575 12.4425 12.0575 12.7238 11.6637C12.9238 11.3812 13.1763 11.3462 13.4413 11.4462C13.7113 11.54 15.14 12.2462 15.4338 12.3925C15.7275 12.54 15.9213 12.61 15.9925 12.7337C16.0625 12.8575 16.0625 13.4387 15.8213 14.1212Z"
                              fill="#FAFAFA"
                            />
                          </svg>
                          <span> Whatsapp</span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="off-canvas-social-widget">
                  <a
                    href="https://www.facebook.com/godachijewellery"
                    target="_blank"
                  >
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="https://twitter.com/Godachijewels" target="_blank">
                    <i className="fa fa-twitter" />
                  </a>
                  <a
                    href="https://www.instagram.com/godachijewellery/"
                    target="_blank"
                  >
                    <i className="fa fa-instagram" />
                  </a>
                  <a
                    href="https://www.pinterest.com/godachijewellery"
                    target="_blank"
                  >
                    <i className="fa fa-pinterest-p" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/godachijewellery"
                    target="_blank"
                  >
                    <i className="fa fa-linkedin" />
                  </a>
                  <a
                    href="https://www.youtube.com/@godachiofficial"
                    target="_blank"
                  >
                    <i className="fa fa-youtube-play" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </header>
      <CustomizeJewellery
        show={showCustomizeJewellery}
        setShow={setShowCustomizeJewellery}
      />
    </>
  );
};

export default Default;
