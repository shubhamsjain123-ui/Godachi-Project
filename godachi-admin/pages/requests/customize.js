import { useEffect, useState } from "react";

import {Table, Image, Tag  } from "antd";

import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../config/config";

import { useIntl } from "react-intl";
import Date from "../../app/components/Date";

const Default = () => {
  const intl = useIntl();

  const [data, seTdata] = useState([]);
  const { user } = useSelector(({ login }) => login);
  const { role } = user;

  const columns = [
    {
      title: intl.messages["app.pages.common.name"],
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

  const getData = () => {
    axios
      .get(API_URL + "/customers/getCustomizeJewelleryRequest")
      .then((response) => {
        if (response.data.success) {
          seTdata(response.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table
        className="table-responsive"
        title={() => "Customize Jewellery Requests"}
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
      />
    </div>
  );
};

export default Default;
