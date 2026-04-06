import React, { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Divider, Avatar, Col, Row } from "antd";
import CircularProgress from "../app/components/CircularProgress";
import Clock from "../app/components/Clock";
import { IMG_URL } from "../config/config";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import TaskList from "../app/components/Dashboard/CRM/TaskList";
import SiteVisit from "../app/components/Dashboard/CRM/SiteVisit";
import RecentActivity from "../app/components/Dashboard/CRM/RecentActivity";
import TicketList from "../app/components/Dashboard/CRM/TicketList";
import TaskByStatus from "../app/components/Dashboard/CRM/TaskByStatus";
import WelComeCard from "../app/components/Dashboard/CRM/WelComeCard";
import Overview from "../app/components/Dashboard/CRM/Overview";
import SiteAudience from "../app/components/Dashboard/CRM/SiteAudience";

import TotalRevenueCard from "../app/components/Dashboard/CRM/TotalRevenueCard";
import NewCustomers from "../app/components/Dashboard/CRM/NewCustomers";
import GrowthCard from "../app/components/Dashboard/CRM/GrowthCard";
import Widget from "../app/components/Widget";
//import CurrencyCalculator from "../app/components/Dashboard/Crypto/CurrencyCalculator";
import IconWithTextCard from "../app/components/Dashboard/CRM/IconWithTextCard";
import {recentActivity, taskList, trafficData} from "../constants/DashboardData";

const CrmDashboard = () => {
  const { user } = useSelector(({ login }) => login);
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
     
      <Row>
        <Col span={24}>
          <div className="gx-card">
            <div className="gx-card-body">
              <Row>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <WelComeCard/>
                </Col>

                <Col xl={6} lg={12} md={12} sm={12} xs={24} className="gx-audi-col">
                  <SiteAudience/>
                </Col>

                <Col xl={12} lg={24} md={24} sm={24} xs={24} className="gx-visit-col">
                  <SiteVisit/>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col xl={8} lg={24} md={8} sm={24} xs={24}>
          <TotalRevenueCard/>
        </Col>
        <Col xl={8} lg={12} md={8} sm={24} xs={24}>
          <NewCustomers/>
        </Col>
        <Col xl={8} lg={12} md={8} sm={24} xs={24}>
          <GrowthCard trafficData={trafficData}/>
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-2">
          <Widget>
            <RecentActivity recentList={recentActivity} shape="circle"/>
          </Widget>
          {/* <CurrencyCalculator/> */}
        </Col>

        <Col xl={16} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-1">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="cyan" icon="diamond" title="09" subTitle="Projects"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="orange" icon="tasks" title="687" subTitle="Tasks"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="teal" icon="team" title="04" subTitle="Teams"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="red" icon="files" title="09" subTitle="Files"/>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <TaskList taskList={taskList}/>
            </Col>
            <Col xl={16} lg={16} md={16} sm={24} xs={24}>
              <TicketList/>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24}>
              <TaskByStatus/>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Overview/>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CrmDashboard;
