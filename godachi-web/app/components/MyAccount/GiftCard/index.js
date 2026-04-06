import { useSelector } from "react-redux";
import BuyGiftCard from "./BuyGiftCard"
import RedeemGiftCard from "./RedeemGiftCard"
import GiftCardHistory from "./GiftCardHistory"
const Defaut = () => {
   const { user } = useSelector((state) => state.login);

   return (
      <>
        {/* <div id="payment-method" >
            <div className="myaccount-content">
                <div className="row">
                    <div className="col-md-6">
                        <BuyGiftCard />
                    </div>
                    <div className="col-md-6">
                        <RedeemGiftCard />
                    </div>
                    <div className="col-md-12">
                        <GiftCardHistory />
                    </div>
                </div>
            </div>
        </div>   */}  
         <div className="contact-area section-padding pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <BuyGiftCard />
                    </div>
                    <div className="col-lg-6">
                        <RedeemGiftCard />
                    </div>
                    <div className="col-md-12 mt-4">
                        <GiftCardHistory />
                    </div>
                </div>
            </div>
        </div>

    
        
      </>
   );
};

export default Defaut;
