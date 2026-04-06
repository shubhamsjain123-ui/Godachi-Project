import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../../../config/config";
import { Table } from "react-bootstrap";
import Price from "../../Price";
import moment from "moment";
const Defaut = () => {
   const { user } = useSelector((state) => state.login);
   const [giftCardHistory, setGiftCardHistory] = useState([])
   const fetchGiftCardHistory = async () =>{
      try{
         var axiosResponse = await axios.get(`${API_URL}/customers/myGiftCardBuyHistory`);
         if(axiosResponse.data){
             var response = axiosResponse.data;
             if(response.variant=="success"){
               setGiftCardHistory(response.result)
             }
         }
     }
     catch(error){
         console.log(error)
     }
   }

   useEffect(()=>{
      fetchGiftCardHistory();
   },[])
   return (
      <>
         {
            giftCardHistory.length>0 &&
            <>
               <h5 className="mb-3">Gift Card History</h5>
               <Table striped bordered hover>
                  <thead>
                  <tr>
                     <th>Receiver Name</th>
                     <th>Receiver Email</th>
                     <th>Receiver Mobile</th>
                     <th>Amount</th>
                     <th>Receiver Message</th>
                     <th>Gift Code</th>
                     <th>Bought On</th>
                  </tr>
                  </thead>
                  <tbody>
                     {
                        giftCardHistory.map((giftCard)=>{
                           return(
                              <tr>
                                 <td>{giftCard.receiverName}</td>
                                 <td>{giftCard.receiverEmail}</td>
                                 <td>{`${giftCard.receiverCountryCode} - ${giftCard.receiverPhoneNumber}`}</td>
                                 <td><Price data={giftCard.amount}/></td>
                                 <td>{giftCard.receiverMessage}</td>
                                 <td>{giftCard.giftCode}</td>
                                 <td>{moment(giftCard.boughtOn).format("DD-MMM-YY hh:mm A")}</td>
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </Table>
            </>
         }
        
      </>
   );
};

export default Defaut;
