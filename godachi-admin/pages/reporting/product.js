import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Divider, Avatar, Col, Row } from "antd";
import { IMG_URL, API_URL } from "../../config/config";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";

import CategorywiseProducts from "../../app/components/Reporting/Product/CategorywiseProducts"
import MetalwiseProducts from "../../app/components/Reporting/Product/MetalwiseProducts"
import StonewiseProducts from "../../app/components/Reporting/Product/StonewiseProducts"
import ProductStats from "../../app/components/Reporting/Product/ProductStats"
import ProductInventory from "../../app/components/Reporting/Product/ProductInventory"

import {recentActivity, taskList, trafficData} from "../../constants/DashboardData";

const CrmDashboard = () => {
  const { user } = useSelector(({ login }) => login);

  return (
    <React.Fragment>
      <Head>
        <title>Product Reporting</title>
      </Head>
      <ProductStats />
      <Row>
        <Col span={16}><CategorywiseProducts /></Col>
        <Col span={8}><MetalwiseProducts /></Col>

      </Row>
      
      
      <StonewiseProducts />
      <ProductInventory viewAll={true} />
      
    </React.Fragment>
  );
};

export default CrmDashboard;
