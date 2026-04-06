import { useSelector } from "react-redux";
const Defaut = () => {
   const { user } = useSelector((state) => state.login);

   return (
      <>
         <div
            id="address-edit"
        >
            <div className="myaccount-content">
            <h5>Billing Address</h5>
            <address>
                <p>
                <strong>Erik Jhonson</strong>
                </p>
                <p>
                1355 Market St, Suite 900 <br />
                San Francisco, CA 94103
                </p>
                <p>Mobile: (123) 456-7890</p>
            </address>
            <a href="#" className="btn btn-sqr">
                <i className="fa fa-edit" />
                Edit Address
            </a>
            </div>
        </div>
        
      </>
   );
};

export default Defaut;
