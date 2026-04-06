import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import {  API_URL } from "../../../../config/config";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";
import Metrics from "../../Metrics";
import IconWithTextCard from "../../DashboardData/IconWithTextCard"
import axios from "axios";
import Price from "../../Price"
const Page = ({
  dateFilter=null
}) => {

    const [repotingData, setReportingData] = useState(null);

    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/customerStats",{date:dateFilter})
        .then((response) => {
          if(response?.data?.success){
            setReportingData(response.data.result)
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
            <Row>

                <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <IconWithTextCard cardColor="cyan" icon="orders" iconColor="geekblue" title={repotingData.totalUsers} subTitle="Total Users"/>
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <IconWithTextCard cardColor="orange" icon="profile" iconColor="geekblue" title={repotingData.referrals} subTitle="Referral Users"/>
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <IconWithTextCard cardColor="teal" icon="crm" iconColor="geekblue" title={repotingData.phoneVerified} subTitle="Phone Verified"/>
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <IconWithTextCard cardColor="red" icon="product-list" iconColor="geekblue" title={repotingData.emailVerified} subTitle="Email Verified"/>
                </Col>

            </Row>
            
        </>
    );
};

export default Page;
