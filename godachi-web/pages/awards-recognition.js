import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL, IMG_URL } from "../config/config";
const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));
import { Table } from "react-bootstrap";
import moment from "moment";

const Page = () => {  

    const [AwardsList, setAwardsList] = useState([])
    const fetchAwardsList = async () =>{
        try{
            var axiosResponse = await axios.get(`${API_URL}/cms/awardsList`);
            if(axiosResponse.data){
                var response = axiosResponse.data;
                if(response.variant=="success"){
                setAwardsList(response.result)
                }  
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchAwardsList();
    },[])

   return (
      <>
         <BreadCrumb />
         <>
            {/* about us area start */}
            <section className="award-us section-padding">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                    <div className="award-content">
                        <h2 className="award-title">Awards & Recognitions</h2>
                        
                        <div className="col-md-12 mt-4">
                            {
                                AwardsList.length>0 &&
                                <>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Date</th>
                                        <th>Title</th>
                                        <th>Organization</th>
                                        <th>Image</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            AwardsList.map((award, index)=>{
                                            return(
                                                <tr key={award._id}>
                                                    <td>{index+1}</td>
                                                    <td>{moment(award.date).format("DD-MMM-YY")}</td>
                                                    <td>{award.title}</td>
                                                    <td>{award.organization}</td>
                                                    <td>
                                                    <img
                                                        className="img-fluid"
                                                        src={award.image ? IMG_URL +award.image : "/images/nofoto.jpg"}
                                                        alt="Product"
                                                        width="70"
                                                        height="70"
                                                        />
                                                    </td>
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
                </div>
            </section>
         </>
      </>
   );
};

export default Page;
