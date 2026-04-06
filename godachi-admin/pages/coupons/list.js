import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
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
import Date from "../../app/components/Date";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";
import moment from "moment";
const Default = ({ getData = [] }) => {
  const intl = useIntl();
  const [data, seTdata] = useState(getData);
  const { user } = useSelector(({ login }) => login);
  const { role } = user;

  const columns = [
    {
      title: "Coupon Name",
      dataIndex: "couponName",
      key: "couponName",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Coupon Duration",
      dataIndex: "couponValidity",
      key: "couponValidity",
      render: (text) => <span className="link">
        <Date data={text[0]} /> to <Date data={text[1]} />
      </span>,
    },
    {
      title: "Coupon Code",
      dataIndex: "couponCode",
      key: "couponCode",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Min Cart Value",
      dataIndex: "minCartValue",
      key: "minCartValue",
      render: (text) => <span className="link"><Price data={text} /></span>,
    },
    {
      title: "Offer Details",
      dataIndex: "offerValue",
      key: "offerValue",
      render: (text, record) => 
        <span className="link">
          { record.offerType == "percent"?
            record.offerValue+"%"+(record.maxDiscount? " Upto Rs. "+ record.maxDiscount+" Off":""):
            "Rs. "+ record.offerValue  
          }
        </span>,
    },
    {
      title: "Applicable On",
      dataIndex: "couponType",
      key: "couponType",
      render: (text) => <span className="link text-capitalize">{text}</span>,
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <Date data={text} />,
    },
    {
      title: intl.messages["app.pages.common.action"],
      key: "_id",
      width: 360,
      render: (text, record) => (
        <span className="link ant-dropdown-link">
          
          {role["products/id"] ? (
            <Link href={"/coupons/" + record._id}>
              <a>
                {" "}
                <EditOutlined
                  style={{ fontSize: "150%", marginLeft: "15px", color:"#1890ff" }}
                />
              </a>
            </Link>
          ) : (
            ""
          )}
          {role["productsdelete"] ? (
            <Popconfirm
              placement="left"
              title={intl.messages["app.pages.common.sureToDelete"]}
              onConfirm={() => deleteData(record._id)}
            >
              <a>
                <DeleteOutlined
                  style={{ fontSize: "150%", marginLeft: "15px", color:"red" }}
                />{" "}
              </a>
            </Popconfirm>
          ) : (
            ""
          )}
          
        </span>
      ),
    },
  ];

  const getDataFc = () => {
    axios
      .get(API_URL + "/coupons")
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

  const deleteData = (id) => {
    axios.delete(`${API_URL}/coupons/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      seTdata(data.filter((item) => item._id !== id));
      getDataFc();
      Router.push("/coupons/list");
    });
  };

  return (
    <div>
      {role["products/add"] ? (
        <Link href="/coupons/add">
          <Button
            type="primary"
            className="float-right addbtn"
            icon={<AppstoreAddOutlined />}
          >
            <IntlMessages id="app.pages.common.create" />
          </Button>
        </Link>
      ) : (
        ""
      )}
      <Table
        title={() => "Coupon List"}
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
        expandable={{ defaultExpandAllRows: true }}
        rowKey="_id"
      />
    </div>
  );
};

Default.getInitialProps = async ({ req }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const res = await axios.get(API_URL + "/coupons", {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

    return { getData: res.data };
  }
};

export default Default;
