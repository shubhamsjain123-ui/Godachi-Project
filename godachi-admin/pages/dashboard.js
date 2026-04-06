import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Divider, Avatar, Col, Row, Radio } from "antd";
import CircularProgress from "../app/components/CircularProgress";
import Clock from "../app/components/Clock";
import { IMG_URL, API_URL } from "../config/config";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import IconWithTextCard from "../app/components/DashboardData/IconWithTextCard"
import TotalRevenueCard from "../app/components/DashboardData/TotalRevenueCard";

import TotalRevenue from "../app/components/Reporting/Order/TotalRevenue"
import AverageOrderValue from "../app/components/Reporting/Order/AverageOrderValue"
import DailyTransactions from "../app/components/Reporting/Order/DailyTransactions"

import NewCustomers from "../app/components/DashboardData/NewCustomers";
import GrowthCard from "../app/components/DashboardData/GrowthCard";
import DashboardStats from "../app/components/Reporting/Dashboard/DashboardStats";
import RecentContactUs from "../app/components/Reporting/Dashboard/RecentContactUs";
import RecentBulkOrders from "../app/components/Reporting/Dashboard/RecentBulkOrders";
import RecentCustomizeJewellery from "../app/components/Reporting/Dashboard/RecentCustomizeJewellery";
import RecentOrders from "../app/components/Reporting/Dashboard/RecentOrders";
import RecentReturns from "../app/components/Reporting/Dashboard/RecentReturns";
import ProductInventory from "../app/components/Reporting/Product/ProductInventory";
import OrderList from "../app/components/Order/orderList"
import ReturnList from "../app/components/Return/returnList"
import {recentActivity, taskList, trafficData} from "../constants/DashboardData";
import moment from "moment";
const CrmDashboard = () => {
  const { user } = useSelector(({ login }) => login);
  const [reportingDate, setReportingDate] = useState([
                                                      moment().startOf("day"),
                                                      moment().endOf("day"),
                                                    ]);

  const updateReportingDate = (value)=>{
    if(value=="day"){
      setReportingDate([
        moment().startOf("day"),
        moment().endOf("day"),
      ])
    }
    else if(value=="month"){
      setReportingDate([
        moment().startOf("month"),
        moment().endOf("month"),
      ])
      /* setReportingDate([
        moment().subtract(1,"month").startOf("month"),
        moment().subtract(1,"month").endOf("month"),
      ]) */
    }

  }

  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Radio.Group
        defaultValue="day"
        className=" w-full mr-0 h-0 overflow-hidden sm:h-auto sm:overflow-auto  text-center  mx-auto mb-5   "
        buttonStyle="solid"
        onChange={(val) => {
          updateReportingDate(val.target.value);
        }}
      >
        <Radio.Button value="day">
          Today's Reporting
        </Radio.Button>
        <Radio.Button value="month">
          This Month Reporting
        </Radio.Button>
      </Radio.Group>
      <DashboardStats dateFilter= {reportingDate} />
      <Row>
        <Col span={12}>
            <TotalRevenue startDate={reportingDate[0]} endDate={reportingDate[1]} />
        </Col>
        <Col span={12}>
            <AverageOrderValue startDate={reportingDate[0]} endDate={reportingDate[1]}/>
        </Col>
      </Row>
      {/* <Row>
        <Col xl={8} lg={24} md={8} sm={24} xs={24}>
          <TotalRevenue />
        </Col>
        <Col xl={8} lg={12} md={8} sm={24} xs={24}>
          <NewCustomers/>
        </Col>
        <Col xl={8} lg={12} md={8} sm={24} xs={24}>
          <GrowthCard trafficData={trafficData}/>
        </Col>
      </Row> */}
      <Row>
        <Col span={24}>
          <OrderList
            getData={[]}
            showFilters={false}
            showHeading={false}
            tableTitle="Orders List"
            dateFilter= {reportingDate}
            viewAll={true}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ReturnList
            getData={[]}
            showFilters={false}
            showHeading={false}
            tableTitle="Return Requests"
            dateFilter= {reportingDate}
            viewAll={true}
          />
        </Col>
      </Row>
      {/* <Row>
        <Col span={12}><RecentOrders /></Col>
        <Col span={24}><RecentReturns /></Col>
      </Row> */}
      <DailyTransactions startDate={reportingDate[0]} endDate={reportingDate[1]} />
      
      <RecentContactUs dateFilter= {reportingDate} viewAll={true}/>
      <RecentCustomizeJewellery dateFilter= {reportingDate} viewAll={true}/>
      <RecentBulkOrders dateFilter= {reportingDate} viewAll={true}/>
      
      <ProductInventory viewAll={true}/>
    </React.Fragment>
  );
};

export default CrmDashboard;
