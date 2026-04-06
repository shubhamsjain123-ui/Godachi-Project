import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { API_URL } from "../../../../config/config";
import axios from "axios";
import Price from "../../Price"
import moment from "moment";
const Page = ({
  dateFilter=null
}) => {

    const [repotingData, setReportingData] = useState(null);
    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: (text) => <span className="link">{text}</span>,
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          render: (text) => <span className="link">{text}</span>,
        },
        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
          render: (text) => <span className="link">{text}</span>,
        },
        {
          title: "Referred Users",
          dataIndex: "totalReferrals",
          key: "totalReferrals",
          render: (text) => <span className="link">{text}</span>,
        },
        
        
    ];
    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/topReferralCustomer",{date:dateFilter})
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
                title={() => "Top Referral Customers"}
                columns={columns}
                dataSource={repotingData}
                rowKey="_id"
                pagination={false} 
            />
        </>
    );
};

export default Page;
