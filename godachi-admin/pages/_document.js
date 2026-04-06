import Document, { Head, Html, Main, NextScript } from "next/document";
import {IMG_URL} from "../config/config"
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="/vendors/gaxon/styles.css"/>
          <link rel="stylesheet" href="/vendors/flag/sprite-flags-24x24.css"/>
          <link rel="stylesheet" href="/vendors/noir-pro/styles.css"/>
          <link href={IMG_URL+"/godachiAdmin.css"} rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
