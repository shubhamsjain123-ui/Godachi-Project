import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import {  API_URL } from "../../../../config/config";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";
import Metrics from "../../Metrics";
import axios from "axios";
import Price from "../../Price"
const Page = ({
  startDate=null,
  endDate=null
}) => {

    const [repotingData, setReportingData] = useState(null);

    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/totalRevenue",{startDate,endDate})
        .then((response) => {
          if(response?.data?.success){
            setReportingData(response.data.result)
          }
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      getDataFc();
    }, [startDate,endDate]);
    if(!repotingData){
      return <></>
    }

    return (
        <>
            <Metrics styleName={`gx-card-full`} title="Total Revenue">
            <Row>
                <Col lg={9} md={24} sm={9} xs={9}>
                <div className="gx-pb-4 gx-pl-4 gx-pt-4">
                    <h2 className="gx-fs-xxxl gx-font-weight-medium gx-mb-1 gx-chart-down"><Price data={repotingData.totalRevenue} />
                    </h2>
                    <p className="gx-mb-0 gx-text-grey">from {repotingData.totalOrders} orders</p>
                </div>
                </Col>
                <Col lg={15} md={24} sm={15} xs={15}>
                </Col>
            </Row>
            </Metrics>
            
        </>
    );
};

export default Page;
