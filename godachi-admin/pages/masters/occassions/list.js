import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";

import { Space, Tag, message, Table, Popconfirm, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config/config";

import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";
import Date from "../../../app/components/Date";

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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <Date data={text} />,
    },
    {
      title: intl.messages["app.pages.common.action"],
      key: "action",
      width: 360,
      render: (text, record) => (
        <span className="link ant-dropdown-link">          
          {role["masters/id"] ? (
            <Link href={"/masters/occassions/" + record._id}>
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
            <Popconfirm
              placement="left"
              title="Sure to delete?"
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

  const getData = () => {
    axios
      .get(API_URL + "/masters/occassions")
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          seTdata(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = (id) => {
    axios.delete(`${API_URL}/masters/occassions/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      seTdata(data.filter((item) => item._id !== id));
      getData();
      Router.push("/masters/occassions/list");
    });
  };

  return (
    <div>
      {role["masters/add"] ? (
        <Link href="/masters/occassions/add">
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
        className="table-responsive"
        title={() => "Occasions List"}
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
      />
    </div>
  );
};

export default Default;
