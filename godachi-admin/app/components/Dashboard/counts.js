import React, { useEffect, useState } from "react";
import { Divider, Row, Col } from "antd";
import axios from "axios";
import { API_URL } from "../../../config/config";

import {
  DollarCircleOutlined,
  UsergroupAddOutlined,
  CodeSandboxOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";
import IconWithTextCard from "../Metrics/IconWithTextCard"
const CrmCounts = () => {
  const intl = useIntl();

  const [counts, seTcounts] = useState({
    order: 0,
    customer: 0,
    category: 0,
    product: 0,
  });
  const getCountsFc = async () => {
    const order = await axios
      .get(API_URL + "/orders/counts/")
      .then((res) => res.data);
    const customer = await axios
      .get(API_URL + "/customers/counts/")
      .then((res) => res.data);
    const category = await axios
      .get(API_URL + "/categories/counts/")
      .then((res) => res.data);
    const product = await axios
      .get(API_URL + "/products/counts/")
      .then((res) => res.data);
    seTcounts({ product, category, customer, order });
  };

  useEffect(() => {
    getCountsFc();
  }, []);

  return (
    <>
      <Row>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="orders" iconColor="geekblue" title={counts.order} subTitle="Total Orders"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="profile" iconColor="geekblue" title={counts.customer} subTitle="Total Customers"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="crm" iconColor="geekblue" title={counts.category} subTitle="Total Categories"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="product-list" iconColor="geekblue" title={counts.product} subTitle="Total Products"/>
        </Col>

      </Row>


    
    </>
  );
};

export default CrmCounts;
