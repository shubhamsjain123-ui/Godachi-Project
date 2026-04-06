import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Divider, Avatar, Col, Row, Table } from "antd";
import { IMG_URL, API_URL } from "../../../../config/config";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import Price from "../../Price"
const Page = ({
  dateFilter=null
}) => {

    const [repotingData, setReportingData] = useState(null);
    const columns = [
        {
          title: "Product Name",
          dataIndex: "productName",
          key: "productName",
          render: (text) => <span className="link">{text}</span>,
        },
        {
          title: "Quantity Returned",
          dataIndex: "qty",
          key: "qty",
          render: (text) => <span className="link">{text}</span>,
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
          render: (text) => <Price data={text} />,
        }
    ];
    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/topReturnedProducts",{date:dateFilter})
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
        <>
            <Table
                title={() => "Most Returned Products"}
                columns={columns}
                dataSource={repotingData}
                rowKey="_id"
                pagination={false} 
            />
        </>
    );
};

export default Page;
