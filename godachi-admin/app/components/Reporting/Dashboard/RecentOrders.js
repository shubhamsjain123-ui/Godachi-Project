import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { API_URL } from "../../../../config/config";
import axios from "axios";
import Price from "../../Price"
import Date from "../../Date"
import moment from "moment";
const Page = () => {

    const [repotingData, setReportingData] = useState(null);
    const columns = [
        {
          title: "Order Number",
          dataIndex: "orderNumber",
          key: "orderNumber",
        },
        {
          title: "Price",
          dataIndex: "finalPrice",
          key: "finalPrice",
          render: (text, record) => <Price data = {text} />,
        },
        {
          title: "Status",
          dataIndex: "orderStatus",
          key: "orderStatus",
          render: (text, record) => text?.title,
        },
        {
          title: "Date",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (text) => (
            <Tooltip placement="top" title={moment(text).fromNow()}>
              {moment(text).format("DD-MMM-YY hh:mm A")}
            </Tooltip>
          ),
        },
    
      ];
    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/recentOrder")
        .then((response) => {
          if(response?.data?.success){
            setReportingData(response.data.result)
          }
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      getDataFc();
    }, []);
    if(!repotingData){
      return <></>
    }

    return (
        <div style={{
          marginBottom:20,
      }}>
            <Table
                title={() => "Recent Orders"}
                columns={columns}
                dataSource={repotingData}
                rowKey="_id"
                pagination={false} 
            />
        </div>
    );
};

export default Page;
