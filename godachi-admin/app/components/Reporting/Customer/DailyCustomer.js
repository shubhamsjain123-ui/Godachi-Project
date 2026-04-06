import React, { useEffect, useState } from "react";
import { Card, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import {  API_URL } from "../../../../config/config";
import {BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer} from "recharts";
import axios from "axios";
import Price from "../../Price"
import moment from "moment";
const Page = ({
    dateFilter=null
}) => {

    const [repotingData, setReportingData] = useState(null);

    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/dailyCustomerBase",{date:dateFilter})
        .then((response) => {
          if(response?.data?.success){
            setReportingData(
                response.data.result.map((data)=>{
                    return {
                        count: data.count,
                        referral: data.referral,
                        date: moment(`${data._id.year}-${data._id.month}-${data._id.day}`,"YYYY-M-DDD").format("DD-MMM-YY")
                    }
                }))
          }
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      getDataFc();
    }, [dateFilter]);
    if(!repotingData){
      return <></>
    }

    return (
        <>
            <Card
                title="Daily Customer"
            >
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={repotingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                        <Bar dataKey="referral" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
                    
            </Card>
            
        </>
    );
};

export default Page;
