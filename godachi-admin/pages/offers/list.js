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
      title: "Offer Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Offer Duration",
      dataIndex: "offerPeriod",
      key: "offerPeriod",
      render: (text) => <span className="link">
        <Date data={text[0]} /> to <Date data={text[1]} />
      </span>,
    },
    {
      title: "Display in",
      dataIndex: "display",
      key: "display",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Number Of Products",
      dataIndex: "products",
      key: "products",
      render: (products) => <span className="link">{products.length}</span>,
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
            <Link href={"/offers/" + record._id}>
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
      .get(API_URL + "/offers")
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
    axios.delete(`${API_URL}/offers/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      seTdata(data.filter((item) => item._id !== id));
      getDataFc();
      Router.push("/offers/list");
    });
  };

  return (
    <div>
      {role["products/add"] ? (
        <Link href="/offers/add">
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
        title={() => "Offer List"}
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
    const res = await axios.get(API_URL + "/offers", {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

    return { getData: res.data };
  }
};

export default Default;
