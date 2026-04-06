import React from "react";
import Head from "next/head";
import withRedux from "next-redux-wrapper";

/* import "antd/dist/antd.css";
import "../public/loader.css";
import "../public/global.scss";
//import "../public/style.min.css";
import "../public/style.css"; */

//import 'react-notifications/lib/notifications.css';
import 'antd/dist/antd.css';
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

import "../public/loader.css";
import "../styles/style.css"
import "../styles/custom.css"

import initStore from "../redux/store";
import { Provider } from "react-redux";
import LocaleProvider from "../app/core/LocaleProvider";
import AppLayout from "../app/core/Layout";

const Page = ({ Component, pageProps, store }) => {
  return (
    <React.Fragment>
      <Head>
        <title> Admin Dashboard</title>
      </Head>
      <Provider store={store}>
        <LocaleProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </LocaleProvider>
      </Provider>
    </React.Fragment>
  );
};

export default withRedux(initStore)(Page);
