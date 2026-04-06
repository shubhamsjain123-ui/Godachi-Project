import { useSelector } from "react-redux";
const Defaut = () => {
   const { user } = useSelector((state) => state.login);

   return (
      <>
         <div id="dashboad">
            <div className="myaccount-content">
                <h5>Dashboard</h5>
                <div className="welcome">
                <p>
                    Hello, <strong>{user.name}</strong> 
                </p>
                </div>
                <p className="mb-0">
                From your account dashboard. you can easily check
                &amp; view your recent orders, manage your shipping
                and billing addresses and edit your password and
                account details.
                </p>
            </div>
        </div>
        
      </>
   );
};

export default Defaut;
