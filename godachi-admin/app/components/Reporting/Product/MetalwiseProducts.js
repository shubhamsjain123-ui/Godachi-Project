import React, { useEffect, useState } from "react";
import { Card } from "antd";
import {  API_URL } from "../../../../config/config";
import {BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer} from "recharts";
import axios from "axios";
import Price from "../../Price"
const Page = () => {

    const [repotingData, setReportingData] = useState(null);

    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/metalwiseProducts")
        .then((response) => {
          if(response?.data?.success){
            setReportingData(response.data.result)
          }
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      getDataFc();
    }, []);
    if(!repotingData){
      return <></>
    }

    return (
        <>
            <Card
                title="Metal Wise Products"
            >
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={repotingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="numOfProducts" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                    
            </Card>
            
        </>
    );
};

export default Page;
