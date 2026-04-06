import { BASKET_FETCH, RESET_BASKET } from "../types";

const initialSettings = {
   basket: {
         products: [],
         shipping_address:{},
         billing_address:{},
         shipToDiffAddress:false,
         useWalletCredits: false,
         listedPrice:0,
         price:0,
         couponDiscount:0,
         couponCode: null,
         shippingCharge:0,
         priceWithoutGst:0,
         gst:0,
         walletCredits:0,
         finalPrice:0,
         payableAmount:0,
         paymentType:"gateway"
      },
};

const basket = (state = initialSettings, action) => {
   switch (action.type) {
   case BASKET_FETCH:
      return {
         ...state,
         basket: action.payload?action.payload:initialSettings.basket,
      };
   case RESET_BASKET:
      return {
         ...state,
         basket: initialSettings.basket,
      };

   default:
      return state;
   }
};

export default basket;
