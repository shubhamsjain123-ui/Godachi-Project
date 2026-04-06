import { useEffect } from "react";
import { Layout, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
   login_r,
   isAuthenticated_r,
   getBasket_r,
   updateBasketFromProduct,
   mergeBasket
} from "../../../redux/actions";
import { useRouter } from "next/router";
import AuthService from "../../../util/services/authservice";
import axios from "axios";
import func from "../../../util/helpers/func";
import dynamic from "next/dynamic";

const CategoriesMenu = dynamic(() => import("../../components/CategoriesMenu"));
const TopMenu = dynamic(() => import("../../components/TopMenu"));
const Footer = dynamic(() => import("../../components/Footer"));
//const Header = dynamic(() => import("../../components/Header"));
import Header from "../../components/Header"

import { hasCookie, getCookie } from "cookies-next";




axios.defaults.withCredentials = true;

const { Content } = Layout;

const AppLayout = ({ children }) => {

   const router = useRouter();
   const dispatch = useDispatch();
   const { errorFetch } = useSelector(({ settings }) => settings);
   const { isAuthenticated } = useSelector(({ login }) => login);
   const { basket } = useSelector(({ basket }) => basket);
   const { topmenu } = useSelector(({ topmenu }) => topmenu);

   const loginControl = () => {
      if (!isAuthenticated) {
         console.log("checking is authenticated")
         AuthService.isAuthenticated().then((auth) => {
            if (auth.isAuthenticated) {
               //dispatch(getBasket_r(auth.user.id));
               dispatch(mergeBasket(basket));
               dispatch(login_r(auth.user));
               dispatch(isAuthenticated_r(true));
            }
         });
      }
   };

   const fetchError = () => {
      if (errorFetch) {
         message.error(errorFetch);
      }
   };



   useEffect(() => {
      const haveCookie = hasCookie("access_token_user");
      console.log("hasCookie", hasCookie("access_token_user"))
      console.log("getCookie", getCookie("access_token_user"))
      if (haveCookie) {
         loginControl();
      }
      fetchError();
      console.log("layout is authenticated", isAuthenticated)
   }, [isAuthenticated]);

   const isUnRestrictedRoute = (pathname) => {
      return pathname === "/sitemap";
   };

   return isUnRestrictedRoute(router.pathname) ? (
      children
   ) : (
      <>
         {/* <CircularProgress className={!isLoaded ? "visible" : "hidden"} /> */}
         <Layout>
            {/*<div className="border-b bg-white">
               <div className=" container-custom   ">
                  <div className="h-7">
                     <TopMenu
                        socialmedia={func.getCategoriesTree(
                           topmenu,
                           "614b8cc75c153bab76bdf681"
                        )}
                        topmenu={func.getCategoriesTree(topmenu)}
                     />
                  </div>
                  <Header />
                  <div className="h-11">
                     <CategoriesMenu />
                  </div>
               </div>
            </div>*/}
            <Header />
            <div className="min-h-screen">
               <Content >{children}</Content>
            </div>
            <Footer />
         </Layout>
      </>
   );
};

export default AppLayout;
