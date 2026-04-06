import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../../../config/config";
import { Table } from "react-bootstrap";
import Price from "../../Price";
import moment from "moment";

const Defaut = () => {
   const { user } = useSelector((state) => state.login);
   const [WalletHistory, setWalletHistory] = useState([])
   const [WalletBalance, setWalletBalance] = useState(0)
   const fetchWalletHistory = async () =>{
      try{
         var axiosResponse = await axios.get(`${API_URL}/customers/myWalletDetails`);
         if(axiosResponse.data){
             var response = axiosResponse.data;
             if(response.variant=="success"){
               setWalletHistory(response.result.walletHistory)
               if(response.result.balance)
                setWalletBalance(response.result.balance);
             }  
         }
     }
     catch(error){
         console.log(error)
     }
   }

   useEffect(()=>{
      fetchWalletHistory();
   },[])
   return (
      <>  
         <div className="contact-area section-padding pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h5>Balance: <Price data={WalletBalance} /></h5>
                    </div>
                    <div className="col-md-12 mt-4">
                    {
                        WalletHistory.length>0 &&
                        <>
                        <h5 className="mb-3">Wallet History</h5>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    WalletHistory.map((transaction)=>{
                                    return(
                                        <tr>
                                            <td>{transaction.transactionType.name}</td>
                                            <td><Price data={transaction.amount}/></td>
                                            <td>{transaction.type=="cr"?"Credited":"Debit"}</td>
                                            <td>{moment(transaction.createdAt).format("DD-MMM-YY hh:mm A")}</td>
                                        </tr>
                                    )
                                    })
                                }
                            </tbody>
                        </Table>
                        </>
                    }
                    </div>
                </div>
            </div>
        </div>

    
        
      </>
   );
};

export default Defaut;
