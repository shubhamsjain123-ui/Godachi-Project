import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Divider, Avatar, Col, Row, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { IMG_URL, API_URL } from "../../config/config";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

import CustomerStats from "../../app/components/Reporting/Customer/CustomerStats"
import MonthlyCustomer from "../../app/components/Reporting/Customer/MonthlyCustomer"
import DailyCustomer from "../../app/components/Reporting/Customer/DailyCustomer"
import NewlyAddedCustomer from "../../app/components/Reporting/Customer/NewlyAddedCustomer"
import TopPerformingCustomer from "../../app/components/Reporting/Customer/TopPerformingCustomer"
import TopReferralCustomer from "../../app/components/Reporting/Customer/TopReferralCustomer"

import {recentActivity, taskList, trafficData} from "../../constants/DashboardData";

const CrmDashboard = () => {
  const { user } = useSelector(({ login }) => login);
  const [dateFilter, setDateFilter] = useState(null);
  const updateReportingDate = (dates, dateStrings)=>{
    if(dates){
      var dateArray=[];
      if(dates?.[0]){
        dateArray[0]=moment(dates[0]).startOf("day");
      }
      else{
        dateArray[0]=null
      }
      if(dates?.[1]){
        dateArray[1]=moment(dates[1]).endOf("day");
      }
      else{
        dateArray[1]=null
      }
      setDateFilter(dateArray);
    }
    else{
      setDateFilter(null);
    }
  }
  return (
    <React.Fragment>
      <Head>
        <title>Customer Reporting</title>
      </Head>
      <div
        style={{
          display:"flex",
          justifyContent:"flex-end",
          marginBottom:10
        }}
      >

        <RangePicker 
          allowEmpty={[true, true]}
          onChange = {updateReportingDate}
          format='DD-MMM-YYYY'
        />
      </div>
      <CustomerStats dateFilter={dateFilter}/>
      <MonthlyCustomer dateFilter={dateFilter}/>
      <DailyCustomer dateFilter={dateFilter}/>
      <TopPerformingCustomer dateFilter={dateFilter}/>
      <Row style={{marginTop:30, marginBottom:30}}>
        <Col span={12}>
          <NewlyAddedCustomer dateFilter={dateFilter}/>
        </Col>
        <Col span={12}>
          <TopReferralCustomer dateFilter={dateFilter}/>
        </Col>
      </Row>
      
      
      
      
      
    </React.Fragment>
  );
};

export default CrmDashboard;
