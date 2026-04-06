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
    const [averageValue, setAverageValue] = useState(0);

    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/averageOrderValue",{startDate,endDate})
        .then((response) => {
          if(response?.data?.success){
            setReportingData(response.data.result[0].data)
            setAverageValue(response.data.result[0].count[0].count)
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
            <Metrics styleName={`gx-card-full`} title="Average Order Value">
            <Row>
                <Col lg={9} md={24} sm={9} xs={9}>
                <div className="gx-pb-4 gx-pl-4 gx-pt-4">
                    <h2 className="gx-fs-xxxl gx-font-weight-medium gx-mb-1 gx-chart-up"><Price data={averageValue} />
                    </h2>
                    {/* <p className="gx-mb-0 gx-text-grey">All Time</p> */}
                </div>
                </Col>
                <Col lg={15} md={24} sm={15} xs={15}>
                <ResponsiveContainer width="100%" height={103}>
                    <AreaChart data={repotingData}
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <Tooltip/>
                    <defs>
                        <linearGradient id="color1" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="#FF55AA" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#6757DE" stopOpacity={0.9}/>
                        </linearGradient>
                    </defs>
                    <Area dataKey='finalPrice' strokeWidth={0} stackId="2" stroke='#867AE5' fill="url(#color1)" fillOpacity={1}/>
                    </AreaChart>
                </ResponsiveContainer>
                </Col>
            </Row>
            </Metrics>
            
        </>
    );
};

export default Page;
