import React, { useEffect, useState } from "react";
import { Table, Image, Tag } from "antd";
import { API_URL, IMG_URL } from "../../../../config/config";
import axios from "axios";
import Price from "../../Price"
import Date from "../../Date"
import Link from "next/link";
const Page = ({
  dateFilter=null,
  viewAll=false
}) => {

    const [repotingData, setReportingData] = useState(null);
    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          width: 150,
          render: (text) => <span className="link">{text}</span>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 150,
            render: (text) => <span className="link">{text}</span>,
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
            width: 150,
            render: (text, record) => <span className="link">{`${text}`}</span>,
        },
        {
            title: "Product Code",
            dataIndex: "productCode",
            key: "productCode",
            width: 150,
            render: (text) => <span className="link">{text}</span>,
        },
        {
            title: "Images",
            dataIndex: "images",
            key: "images",
            render: (text, record) => {
              return record.images?.map((image)=><Image src={IMG_URL + image} height={80} width={80} /> )
            },
          },
        {
          title: "Comment",
          dataIndex: "comments",
          key: "comments",
          render: (text) => <span className="link">{text}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => {
                return <Tag color={text=="confirmed"?"green":"orange"}>{text}</Tag>
            },
          },
        {
          title: "Created On",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (text) => <Date data={text} />,
        },
       
      ];
    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/recentCustomize",{date:dateFilter})
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
            marginTop:20,
            marginBottom:20,
        }}>
            <Table
                title={() => (
                  
                  <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems:"center"
                    }}
                  >
                    Customize Jewellery Query
                    {
                      viewAll &&
                      <Link href="/requests/customize">
                        <a>View All</a>
                      </Link>
                    }
                  </div>
              )}
                columns={columns}
                dataSource={repotingData}
                rowKey="_id"
                pagination={false} 
            />
        </div>
    );
};

export default Page;
