import { useEffect, useState } from "react";

import {Table } from "antd";

import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../config/config";

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
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
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
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        width: 150,
        render: (text) => <span className="link">{text}</span>,
    },
    {
        title: "City",
        dataIndex: "city",
        key: "city",
        width: 150,
        render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Comment",
      dataIndex: "comments",
      key: "comments",
      render: (text) => <span className="link">{text}</span>,
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
      .get(API_URL + "/customers/getBulkOrderRequest")
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
        title={() => "Bulk Order Requests"}
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
      />
    </div>
  );
};

export default Default;
