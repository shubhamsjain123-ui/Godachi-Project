import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";


import dynamic from "next/dynamic";

const Head = dynamic(() => import("../../../app/core/Head"));
const BreadCrumb = dynamic(() => import("../../../app/components/BreadCrumb"));
const OrderDetails = dynamic(() => import("../../../app/components/MyAccount/Orders/Details"));
const ProfileLeftMenu = dynamic(() => import("../../../app/components/MyAccount/LeftMenu"));


const Default = ({orderId}) => {
   const { isAuthenticated } = useSelector((state) => state.login);

   useEffect(() => {
      if (!isAuthenticated) {
         Router.push("/");
      }
   }, []);

   return (
      <>
        <Head title="Profile" />
        <BreadCrumb />
        <div className="my-account-wrapper section-padding">
            <div className="container">
            <div className="section-bg-color">
                <div className="row">
                <div className="col-lg-12">
                    <div className="myaccount-page-wrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <ProfileLeftMenu activeTabName="orders" />
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div className="tab-content" id="myaccountContent">
                                <OrderDetails orderId={orderId}/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      </>
   );
};

export const getServerSideProps = async ({ query }) => {    
    return {
       props: {
          orderId: query.id
       },
    };
 };

export default Default;
