import React, { useEffect, useState } from "react";
import { Card, Row, Col, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import {  API_URL } from "../../../../config/config";
import {BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer} from "recharts";
import axios from "axios";
import Price from "../../Price"
import moment from "moment";
const Page = ({
    startDate=null,
    endDate=null
  }) => {

    const [repotingData, setReportingData] = useState(null);

    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/dailyTransactions",{startDate,endDate})
        .then((response) => {
          if(response?.data?.success){
            setReportingData(
                response.data.result.map((data)=>{
                    return {
                        order: data.order,
                        revenue: data.revenue,
                        date: moment(`${data._id.year}-${data._id.month}-${data._id.day}`,"YYYY-M-DDD").format("DD-MMM-YY")
                    }
                }))
          }
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      getDataFc();
    }, [startDate, endDate]);
    if(!repotingData){
      return <></>
    }

    return (
        <>
            <Card
                title="Daily Transactions"
            >
                <Row>
                    <Col span={12}>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={repotingData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="order" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col span={12}>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={repotingData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Card>
            
        </>
    );
};

export default Page;
