import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL, IMG_URL } from "../../../../config/config";
import { useSelector } from "react-redux";
import OrderRow from "./OrderRow";

const Defaut = () => {
   const { user } = useSelector((state) => state.login);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    await axios
    .post(`${API_URL}/orders/getMyOrders`, { })
    .then((res) => {
      console.log(res.data)
      setOrders(res.data);
    })
    .catch((error)=>{

    })
  };

  useEffect(()=>{
    getOrders();
  },[])

   return (
      <>
       <div className="tab-pane fade show active" id="orders" role="tabpanel">
      <div className="myaccount-content">
        <h5>Orders</h5>
        {
          orders.map((order)=>{
            return (
              <OrderRow details ={order} onRefresh={getOrders}/>
            )
          })
        }
        
      </div>
    </div>
        
      </>
   );
};

export default Defaut;
