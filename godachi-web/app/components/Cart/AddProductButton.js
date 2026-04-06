import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Button } from "antd";
import { ShoppingCartOutlined, LoadingOutlined, CreditCardOutlined } from "@ant-design/icons";
import { updateBasketFromProduct } from "../../../redux/actions";
import axios from "axios";
import { API_URL } from "../../../config/config";

import { useRouter } from "next/router";
import Image from "next/image";
const Page = ({
   state,
   selectedVariant,
   quantity = 1,
   displayPage = null
}) => {
   const dispatch = useDispatch();

   const { isAuthenticated, user } = useSelector(({ login }) => login);
   const { basket } = useSelector(({ basket }) => basket);
   const [loadingButton, seTloadingButton] = useState(true);
   // const seo = router.query.seo
   const router = useRouter();

   const addBasket = () => {
      var selectedVariantId = selectedVariant._id;
      let newCart = basket;
      if (!newCart.products) {
         newCart.products = [];
      }
      var productIndex = newCart.products.findIndex((product) => product.selectedVariant == selectedVariantId);
      if (productIndex != -1) {
         newCart.products[productIndex].qty = newCart.products[productIndex].qty + quantity;
      }
      else {
         newCart.products.push({
            product_id: state._id,
            seo: state.seo,
            selectedVariant: selectedVariantId,
            qty: quantity,
         })
      }
      seTloadingButton(true);
      message.success({ content: "Product Added to Cart!", duration: 3 });
      dispatch(updateBasketFromProduct(newCart));
   }

   const onButtonClick = (redirectToCart = false) => {
      seTloadingButton(false);
      if (loadingButton) {
         addBasket();
         if (redirectToCart)
            router.push("/cart");
      }
   }
   const renderButtons = () => {
      if (displayPage) {
         switch (displayPage) {
            case 'wishlist':
               return (<a
                  className="btn btn-sqr"
                  onClick={() => onButtonClick()}
               >
                  Add to Cart
               </a>);
            case 'shortDetail':
               return (<button
                  className="btn col-3 mb-0 pt-1 pb-1"
                  style={{
                     color: "#fff",
                     backgroundColor: "#c29958",
                     fontSize: "11px",
                  }}
                  onClick={() => onButtonClick()}
               >
                  Add To Cart
               </button>
               );
         }
      }
      else {
         return (
            <div className="quantity-cart-box d-flex align-items-center mt-25">
               <div className="action_link mr-20" style={{}}>
                  <a
                     className="btn btn-cart2"
                     onClick={() => onButtonClick()}
                  >
                     Add to Cart
                  </a>
               </div>
               <div className="action_link buy-now-button">
                  <a
                     className="btn btn-cart2 bgOrange"
                     onClick={() => onButtonClick(true)}
                  >
                     Buy Now
                  </a>
               </div>
               <span className="helpBlock-span">
                  <p className="helpBlock">
                     Need help?
                     <a href="https://api.whatsapp.com/send/?phone=917354999999&text=I'd like to chat with you">
                        <Image
                           alt="Whatsapp"
                           rel="nofollow"
                           src="/images/whatsapp-icn.png"
                           className="helpwhat"
                           width={"40"}
                           height={"40"}
                        />
                     </a>
                  </p>
               </span>
            </div>
         );
      }
      return null;
   }
   return (
      <>
         {
            renderButtons()
         }

      </>


   );
};

export default Page;
