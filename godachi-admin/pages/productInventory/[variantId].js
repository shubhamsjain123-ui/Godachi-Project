import { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import { message, Table, Popconfirm, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
  UploadOutlined,
  LinkOutlined
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, WEBSITE_URL } from "../../config/config";
import Price from "../../app/components/Price";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";
import moment from "moment"
const Default = ({ getData = [] }) => {
  const { variantId } = router.query;
  const intl = useIntl();
  const [data, seTdata] = useState(getData);
  const { user } = useSelector(({ login }) => login);
  const { role } = user;



  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => {
        return <span className="link">{moment(text).format("DD-MMM-YYYY")}</span>
      },
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (text, record) => <span className="link">{record?.vendor?.name}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Note",
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="link">{text}</span>,
    }
  ];

  const getDataFc = () => {
    axios
      .get(API_URL + "/productInventory/" + variantId)
      .then((response) => {
        if (response.data.length > 0) {
          seTdata(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFc();
  }, []);

  return (
    <div>
      
      <Table
        title={() => "Inventory Transactions"}
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
        expandable={{ defaultExpandAllRows: true }}
        rowKey="_id"
      />
    </div>
  );
};

Default.getInitialProps = async ({ req, query }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const res = await axios.get(API_URL + "/productInventory/" + query.variantId, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

    return { getData: res.data, variantId: query.variantId };
  }
};

export default Default;
