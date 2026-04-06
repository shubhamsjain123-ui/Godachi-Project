import Document, { Head, Html, Main, NextScript } from "next/document";
import { IMG_URL } from "../config/config"
export default class MyDocument extends Document {
   render() {
      return (
         <Html lang="en">
            <Head>
               <title>Buy Jewellery Online in Delhi, Pune, Indore | Godachi </title>
               <meta name="description" content={'Godachi a Trusted Online Jewellery store. Buy jewellery online in Delhi, Pune,Indore,Bhopal. One stop solution for you, Shopping Online Silver Jewellery.'} />
               <meta name="keywords" content='buy jewellery in delhi online, buy jewellery in pune online, buy jewellery in indore online, buy jewellery in bhopal online, buy jewellery in calcutta online, buy jewellery in chandigarh online, buy jewellery in Agra online, buy jewellery in Ahmedabad online' />
               <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
               <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap" rel="stylesheet" />
               <link href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,900" rel="stylesheet" />
               <link href="/assets/css/vendor/bootstrap.min.css" rel="stylesheet" />
               <link href="/assets/css/vendor/pe-icon-7-stroke.css" rel="stylesheet" />
               <link href="/assets/css/vendor/font-awesome.min.css" rel="stylesheet" />
               <link href="/assets/css/plugins/slick.min.css" rel="stylesheet" />
               <link href="/assets/css/plugins/animate.css" rel="stylesheet" />
               <link href="/assets/css/plugins/nice-select.css" rel="stylesheet" />
               <link href="/assets/css/plugins/jqueryui.min.css" rel="stylesheet" />

               <link rel="stylesheet" href="https://icodefy.com/Tools/iZoom/js/Vendor/fancybox/helpers/jquery.fancybox-thumbs.css" />
               <link href="/css/homePage.css" rel="stylesheet" />
               <link href="/assets/css/style.css" rel="stylesheet" />
               <link href="/css/custom.css" rel="stylesheet" />
               <link href="/css/areia-core.min.css" rel="stylesheet" />
               <link href="/css/swiper.min.css" rel="stylesheet" />
               <link href={IMG_URL + "/godachi.css"} rel="stylesheet" />
               <script>
                  {
                     `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-1RFJGJM6Z4');`
                  }
               </script>
            </Head>
            <body>
               {/* <div id="google_translate_element"></div> */}
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
