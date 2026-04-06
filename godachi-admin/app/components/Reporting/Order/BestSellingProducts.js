import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { API_URL } from "../../../../config/config";
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
          title: "Quantity Sold",
          dataIndex: "qty",
          key: "qty",
          render: (text) => <span className="link">{text}</span>,
        },
        {
          title: "Revenue",
          dataIndex: "amount",
          key: "amount",
          render: (text) => <Price data={text} />,
        }
    ];
    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/topSellingProducts",{date:dateFilter})
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
                title={() => "Best Selling Products"}
                columns={columns}
                dataSource={repotingData}
                rowKey="_id"
                pagination={false} 
            />
        </>
    );
};

export default Page;
