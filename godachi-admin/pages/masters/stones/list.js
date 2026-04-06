import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";

import { Space, Tag, message, Table, Popconfirm, Button } from "antd";
import {
  PlusOutlined,
  PlusCircleOutlined,
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
            <Link href={"/masters/stonevariants/" + record._id + "/add"}>
             <a title="Add Variant">
                {" "}
                <PlusCircleOutlined
                  style={{ fontSize: "150%", marginLeft: "15px", color:"#ffa602" }}
                />
              </a>
            </Link>
          ) : (
            ""
          )}          
          {role["masters/id"] ? (
            <Link href={"/masters/stones/" + record._id}>
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

  const expandedRowRender = (row) => {
    const columns = [
      {title: "Variant", dataIndex: "name", key: "name"},
      {
        title: "Options",dataIndex: "variants",key: "variants",
        render: (_, record) => (
          <Space>
            {record.variants.map(({ name }) => (
              <Tag color="purple" key={name}>
                {name}
              </Tag>
            ))}
          </Space>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span className="link ant-dropdown-link">
            {role["mastersdelete"] ? (
              <Popconfirm
                placement="left"
                title="Sure to delete?"
                onConfirm={() => deleteVariantData(row._id,record._id)}
              >
                <Button type="danger" icon={<DeleteOutlined />} size="small">
                  Delete
                </Button>
              </Popconfirm>
            ) : ("")}

            {role["masters/id"] ? (
              <Link href={`/masters/stonevariants/${row._id}/${record._id}`}>
                <Button type="primary" icon={<EditOutlined />} size="small">
                  Edit
                </Button>
              </Link>
            ) : ("")}
          </span>
        ),
      },
    ];

    return <Table columns={columns} dataSource={row.variants} pagination={false} />;
  }

  const getData = () => {
    axios
      .get(API_URL + "/masters/stonesWithVariants")
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
    axios.delete(`${API_URL}/masters/stones/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      seTdata(data.filter((item) => item._id !== id));
      getData();
      Router.push("/masters/stones/list");
    });
  };
  const deleteVariantData = (stoneId,id) => {
    axios.delete(`${API_URL}/masters/stonevariants/${stoneId}/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      seTdata(data.filter((item) => item._id !== id));
      getData();
      Router.push("/masters/stones/list");
    });
  };

  return (
    <div>
      {role["masters/add"] ? (
        <Link href="/masters/stones/add">
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
        title={() => "Stones List"}
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record?.variants.length>0,
        }}
      />
    </div>
  );
};

export default Default;
