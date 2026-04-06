import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";

import { Space, Tag, message, Table, Popconfirm, Button, Image } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";

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
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (text) => <Date data={text} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text,record) => record.image?<Image src={IMG_URL + record.image} height={80} />:<></>,
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
            <Link href={"/cms/awards/" + record._id}>
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
      .get(API_URL + "/cms/awards")
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
    axios.delete(`${API_URL}/cms/awards/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      seTdata(data.filter((item) => item._id !== id));
      getData();
      Router.push("/cms/awards/list");
    });
  };

  return (
    <div>
      {role["masters/add"] ? (
        <Link href="/cms/awards/add">
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
        title={() => "Awards & Recognition List"}
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
      />
    </div>
  );
};

export default Default;
