import { useSelector } from "react-redux";
const Defaut = () => {
   const { user } = useSelector((state) => state.login);

   return (
      <>
         <div
            id="payment-method"
        >
            <div className="myaccount-content">
            <h5>Payment Method</h5>
            <p className="saved-message">
                You Can't Saved Your Payment Method yet.
            </p>
            </div>
        </div>      
        
      </>
   );
};

export default Defaut;
