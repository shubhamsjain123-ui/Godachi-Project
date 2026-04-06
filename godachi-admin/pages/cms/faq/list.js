import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";

import { Space, Tag, message, Table, Popconfirm, Button, Modal, Form, Input } from "antd";
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
    const [form] = Form.useForm();
  const intl = useIntl();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <Date data={text} />,
    },
    {
        title: "Faqs",
        dataIndex: "_id",
        key: "_id",
        render: (text) => <Link href={`/cms/faq/${text}`}><Button>View Faq</Button></Link>,
    },
    {
      title: intl.messages["app.pages.common.action"],
      key: "action",
      width: 360,
      render: (text, record) => (
        <span className="link ant-dropdown-link">
            {role["masters/id"] ? (
            
            <EditOutlined
                style={{ fontSize: "150%", marginLeft: "15px", color:"#1890ff" }}
                onClick={()=>{
                    setShowModal(true)
                    setSelectedCategory(record)
                    form.setFieldsValue({
                        name:record.name
                    })
                }}
            />
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
      .get(API_URL + "/cms/faqCategory")
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

  const deleteData = (id) => {
    axios.delete(`${API_URL}/cms/faqCategory/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      seTdata(data.filter((item) => item._id !== id));
      getData();
      Router.push("/cms/faq/list");
    });
  };
  const onManageCategory = (Data) =>{
    Data["created_user"] = { name: user.name, id: user.id };
    var categoryId = selectedCategory?selectedCategory._id:"";
    axios
      .post(`${API_URL}/cms/faqCategory/${categoryId}`, Data)
      .then((res) => {
        if (!res.data.success) {
          message.error(
            "Category not added" + res.data.message
          );
        } else {
          message.success("Category Added");
          getData();
          setShowModal(false)
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {role["masters/add"] ? (
          <Button
            type="primary"
            className="float-right addbtn"
            icon={<AppstoreAddOutlined />}
            onClick={()=>{
                setShowModal(true)
                setSelectedCategory(null)
                form.setFieldsValue({
                    name:""
                })
            }}
          >
            Add New Category
          </Button>
      ) : (
        ""
      )}
      <Table
        className="table-responsive"
        title={() => "FAQ category List"}
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
      />

        <Modal
            title="Manage Category"
            visible={showModal}
            onCancel={() => setShowModal(false)}
            
            footer={null}
        >
            <Form
                layout="vertical"
                name="add"
                onFinish={onManageCategory}
                scrollToFirstError
                form={form}
            >
                <Form.Item
                    name="name"
                    label="Category Name"
                >
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form>
        </Modal>
    </div>
  );
};

export default Default;
