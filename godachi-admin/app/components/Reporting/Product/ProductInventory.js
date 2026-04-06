import React, { useEffect, useState } from "react";
import { Card, Table, Tabs  } from "antd";
import {  API_URL } from "../../../../config/config";
import {BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer} from "recharts";
import axios from "axios";
import Price from "../../Price"
import Link from "next/link";
const Page = ({
  viewAll=false
}) => {

    const [repotingData, setReportingData] = useState(null);

    const columns = [
        {
          title: "Product Name",
          dataIndex: "name",
          key: "name",
          render: (text) => <span className="link">{text}</span>,
        },
        {
          title: "Product Code",
          dataIndex: "productCode",
          key: "productCode",
          render: (text) => <span className="link">{text}</span>,
        },
        {
          title: "Inventory",
          dataIndex: "quantity",
          key: "quantity",
          render: (text) => <span className="link">{text}</span>,
        }
    ];

    const getDataFc = () => {
      axios
        .post(API_URL + "/reporting/categoryWiseInventory")
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
        <>
            <Card
                title="Category Wise Product Inventory"
                extra={
                  <>
                  {
                    viewAll &&
                    <Link href="/productInventory/list">
                      <a>View All</a>
                    </Link>
                  }
                  </>
                }
            >
                <Tabs 
                    defaultActiveKey="1" 
                    items={
                        repotingData?.map((cat,index)=>{
                            return{
                                key: index,
                                label: cat.categoyName,
                                children: <Table
                                                columns={columns}
                                                dataSource={cat.products}
                                                rowKey="_id"
                                                pagination={true} 
                                            />,
                            }
                        })
                    } />
                    
            </Card>
            
        </>
    );
};

export default Page;
