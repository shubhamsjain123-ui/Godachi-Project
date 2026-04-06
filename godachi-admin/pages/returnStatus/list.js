import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { message, Image, Table, Popconfirm, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../config/config";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";

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
    },
    {
      title: intl.messages["app.pages.common.title"],
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Color Code",
      dataIndex: "colorCode",
      key: "colorCode",
      render: (text) => <span className="link">{text}</span>,
    },
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
      render: (text) => <span className="link">{text}</span>,
    },
    /* {
      title: intl.messages["app.pages.common.icon"],
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <>
          <Image src={IMG_URL + record.image} height={80} />
        </>
      ),
    }, */
    {
      title: intl.messages["app.pages.common.action"],
      key: "_id",
      width: 360,
      render: (text, record) => (
        <span className="link ant-dropdown-link">
          {role["orderstatus/id"] ? (
            <Link href={"/returnStatus/" + record._id}>
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
          {/* {role["orderstatusdelete"] ? (
            <>
              {record.children ? (
                ""
              ) : (
                <Popconfirm
                  placement="left"
                  title={intl.messages["app.pages.common.sureToDelete"]}
                  onConfirm={() => deleteData(record._id, record.image)}
                >
                  <a>
                    <DeleteOutlined
                      style={{ fontSize: "150%", marginLeft: "15px" }}
                    />{" "}
                  </a>
                </Popconfirm>
              )}
            </>
          ) : (
            ""
          )} */}
        </span>
      ),
    },
  ];

  const getDataFc = () => {
    axios
      .get(API_URL + "/returnStatus")
      .then((res) => {
        if (res.data.length > 0) {
          const data = res.data;
          seTdata(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFc();
  }, []);

 /*  const deleteData = (id, imagePath = 0) => {
    axios.delete(`${API_URL}/returnStatus/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      getDataFc();
      Router.push("/returnStatus/list");
    });

    if (imagePath != 0) {
      axios
        .post(`${API_URL}/upload/deleteorderstatusimage`, { path: imagePath })
        .then(() => {
          message.success(intl.messages["app.pages.common.deleteData"]);
          getDataFc();
          Router.push("/returnStatus/list");
        });
    }
  }; */

  return (
    <div>
      

      <Table
        title={() => "Return Order Status List"}
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
    const res = await axios.get(API_URL + "/returnStatus", {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

    const dataManipulate = res.data;

    return { getData: dataManipulate };
  }
};

export default Default;
