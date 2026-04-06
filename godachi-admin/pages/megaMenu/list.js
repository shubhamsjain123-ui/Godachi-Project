import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { message, Table, Popconfirm, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../config/config";
import func from "../../util/helpers/func";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";
import Date from "../../app/components/Date";

const Default = ({ getData = [] }) => {
  const intl = useIntl();
  const [data, seTdata] = useState(getData);
  const { user } = useSelector(({ login }) => login);
  const { role } = user;

  const columns = [
    {
      title: intl.messages["app.pages.common.order"],
      dataIndex: "order",
      key: "order",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: intl.messages["app.pages.common.title"],
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: intl.messages["app.pages.common.description"],
      dataIndex: "description",
      key: "description",
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
          {role["masters/id"] ? (
            <Link href={"/megaMenu/" + record._id}>
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
          {role["mastersdelete"] ? (
            <>
              {record.children ? (
                ""
              ) : (
                <Popconfirm
                  placement="left"
                  title={intl.messages["app.pages.common.youSure"]}
                  onConfirm={() => deleteData(record._id)}
                >
                  <a>
                    <DeleteOutlined
                      style={{ fontSize: "150%", marginLeft: "15px", color:"red" }}
                    />{" "}
                  </a>
                </Popconfirm>
              )}
            </>
          ) : (
            ""
          )}
        </span>
      ),
    },
  ];

  const getDataFc = () => {
    axios
      .get(API_URL + "/homemenu")
      .then((response) => {
        if (response.data) {
          seTdata(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFc();
  }, []);

  const deleteData = (id) => {
    axios.delete(`${API_URL}/homemenu/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      getDataFc();
      Router.push("/megaMenu/list");
    });
  };

  return (
    <div>
      {role["masters/add"] ? (
        <Link href="/megaMenu/add">
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
      <h5>Menu List</h5>
      <Table
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
        rowKey="_id"
      />
    </div>
  );
};

Default.getInitialProps = async ({ req }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const res = await axios.get(API_URL + "/homemenu", {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

    return { getData: res.data };
  }
};

export default Default;
