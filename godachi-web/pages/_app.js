import { wrapper } from "../redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
//import "../public/global.scss";
/*import "../public/assets/css/vendor/bootstrap.min.css";
import "../public/assets/css/vendor/pe-icon-7-stroke.css";
import "../public/assets/css/vendor/font-awesome.min.css";
import "../public/assets/css/plugins/slick.min.css";
import "../public/assets/css/plugins/animate.css";
import "../public/assets/css/plugins/nice-select.css";
import "../public/assets/css/plugins/jqueryui.min.css";
import "../public/assets/css/style.css";*/

//import 'antd/dist/antd.css';
import 'nextjs-breadcrumbs/dist/index.css';
import $ from 'jquery';
import jquery from 'jquery' 
import { useStore } from 'react-redux';
import LocaleProvider from "../app/core/LocaleProvider";
import AppLayout from "../app/core/Layout";
import {
   getBrands_r,
   getCategories_r,
   getTopmenu_r,
   settings_r,
   getFilterMaster,
   checkAuthenticated
} from "../redux/actions";

import { PersistGate } from 'redux-persist/integration/react';

const HomeApp = (props) => {
   const { Component, pageProps } = props;
   const store = useStore((state) => state);
   return (
      <>
         
         <LocaleProvider>
            <GoogleOAuthProvider clientId="837317352750-2gtqdoil64oqigj5i07vof6mev3l3t1s.apps.googleusercontent.com">
               
                  <AppLayout>
                  <PersistGate persistor={store.__PERSISTOR} loading={null}>
                     <Component {...pageProps} />
                     </PersistGate>
                  </AppLayout>
               
            </GoogleOAuthProvider>
         </LocaleProvider>
         
      </>
   );
};

HomeApp.getInitialProps = wrapper.getInitialPageProps((store) => async (context) => {
   await store.dispatch(settings_r());
   await store.dispatch(getCategories_r());
   await store.dispatch(getTopmenu_r());
   await store.dispatch(getFilterMaster());
   var cookies = context?.ctx?.req?.cookies;
   console.log(cookies)
   if(cookies && cookies.access_token_user){
      var header = context?.ctx?.req?.headers?.cookie ? { cookie: context.ctx.req.headers.cookie } : undefined;
      await store.dispatch(checkAuthenticated(header));
   }
});



export default wrapper.withRedux(HomeApp);
