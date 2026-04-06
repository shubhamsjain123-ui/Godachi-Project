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
import BestSellingProducts from "../../app/components/Reporting/Order/BestSellingProducts"
import TopReturnedProducts from "../../app/components/Reporting/Order/TopReturnedProducts"
import AverageOrderValue from "../../app/components/Reporting/Order/AverageOrderValue"
import TotalRevenue from "../../app/components/Reporting/Order/TotalRevenue"
import OrderStats from "../../app/components/Reporting/Order/OrderStats"
import MonthlyTransactions from "../../app/components/Reporting/Order/MonthlyTransactions"
import DailyTransactions from "../../app/components/Reporting/Order/DailyTransactions"
import OrderList from "../../app/components/Order/orderList"
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
        <title>Order Reporting</title>
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
      <OrderStats dateFilter={dateFilter} />
      <Row>
        <Col span={12}>
            <TotalRevenue startDate={dateFilter?.[0]} endDate={dateFilter?.[1]}/>
        </Col>
        <Col span={12}>
            <AverageOrderValue startDate={dateFilter?.[0]} endDate={dateFilter?.[1]} />
        </Col>
      </Row>
      <DailyTransactions startDate={dateFilter?.[0]} endDate={dateFilter?.[1]} />
      <MonthlyTransactions startDate={dateFilter?.[0]} endDate={dateFilter?.[1]} />
      
      <Row>
        <Col span={12}>
            <BestSellingProducts dateFilter={dateFilter} />
        </Col>
        <Col span={12}>
            <TopReturnedProducts dateFilter={dateFilter} />
        </Col>
      </Row>
      
      <Row>
        <Col span={24}>
          <OrderList
            getData={[]}
            showFilters={false}
            showHeading={false}
            tableTitle="Orders List"
            dateFilter= {dateFilter}
            limit={10}
            viewAll={true}
          />
        </Col>
      </Row>

    </React.Fragment>
  );
};

export default CrmDashboard;
