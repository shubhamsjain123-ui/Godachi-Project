import router from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../../util/services/authservice";
import { logout_r } from "../../../redux/actions";
import { removeCookies } from "cookies-next";
const Defaut = ({ activeTabName }) => {
   const { user } = useSelector((state) => state.login);
   const dispatch = useDispatch();

   return (
      <>
         <div className="myaccount-tab-menu nav" role="tablist">
            <Link href="/profile/dashboard">
               <a className={activeTabName == "dashboard" ? "active" : ""}>
                  <i className="fa fa-dashboard" />
                  Dashboard
               </a>
            </Link>
            <Link href="/profile/refer">
               <a className={activeTabName == "refer" ? "active" : ""}>
                  <i className="fa fa-dashboard" />
                  Refer & Earn
               </a>
            </Link>
            <Link href="/profile/wallet">
               <a className={activeTabName == "wallet" ? "active" : ""}>
                  <i className="fa fa-dashboard" />
                  Wallet
               </a>
            </Link>
            <Link href="/profile/orders">
               <a className={activeTabName == "orders" ? "active" : ""}>
                  <i className="fa fa-cart-arrow-down" />
                  Orders
               </a>
            </Link>
            <Link href="/profile/gift-card">
               <a className={activeTabName == "giftcard" ? "active" : ""}>
                  <i className="fa fa-credit-card" />
                  Gift Card
               </a>
            </Link>
            <Link href="/profile/address">
               <a className={activeTabName == "address" ? "active" : ""}>
                  <i className="fa fa-map-marker" />
                  Address
               </a>
            </Link>
            <Link href="/profile/profile">
               <a className={activeTabName == "profile" ? "active" : ""}>
                  <i className="fa fa-user" />
                  Account Details
               </a>
            </Link>
            <a
               onClick={async () => {
                  await AuthService.logout();
                  await dispatch(logout_r());
                  removeCookies("iswebuser");
                  removeCookies("access_token_user");
                  router.push("/");
               }}
            >
               <i className="fa fa-sign-out" />
               Logout
            </a>
         </div>

      </>
   );
};

export default Defaut;
