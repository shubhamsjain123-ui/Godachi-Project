import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { API_URL } from "../../../../config/config";
import axios from "axios";
import Price from "../../Price"
import Date from "../../Date"
import moment from "moment";
const Page = ({
  dateFilter=null,
}) => {

    const [repotingData, setReportingData] = useState(null);
    const columns = [
        {
          title: "Return Number",
          dataIndex: "returnNumber",
          key: "returnNumber",
        },
        {
          title: "Price",
          dataIndex: "total_price",
          key: "total_price",
          render: (text, record) => <Price data = {text} />,
        },
        {
          title: "Status",
          dataIndex: "returnStatus",
          key: "returnStatus",
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
        .post(API_URL + "/reporting/recentReturn",{
          date: dateFilter
        })
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
        <div style={{
          marginBottom:20,
      }}>
            <Table
                title={() => "Recent Return Requests"}
                columns={columns}
                dataSource={repotingData}
                rowKey="_id"
            />
        </div>
    );
};

export default Page;
