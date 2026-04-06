import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

import {
  Switch,
  Space,
  Button,
  Card,
  message,
  Divider,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
} from "antd";

import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const Metal = (props) => {
  const intl = useIntl();
  var metalDetails = props?.details;
  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const router = useRouter();

  const [purityPercent, setPurityPercent] = useState([]);
  // componentDidMount = useEffect
  useEffect(() => {}, []);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onSubmit = (Data) => {
    Data["created_user"] = { name: user.name, id: user.id };

    axios
      .post(`${API_URL}/masters/metals/add`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Metal not added" + res.data.messagge
          );
        } else {
          message.success("Metal Added");

          router.push("/masters/metals/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <Card className="card" title="Add Metal">
        <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={metalDetails}
          scrollToFirstError
          initialValues={{ purity: [""] }}
        >
          {
            metalDetails?
              <Form.Item
                name="_id"
                hidden={true}
              >
                <Input />
              </Form.Item>
            :null
          }
          <Row gutter={12}>
            <Col span ={8}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please fill this input.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span ={6}>
              <Form.Item
                name="seo_title"
                label="Seo Title"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span ={6}>
              <Form.Item
                name="seo_desc"
                label="Seo Description"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="materialFilter"
                label="Show In Material Filter"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Metal Description"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          
          

          <Divider />
              <Form.List name="purity">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, i) => (
                      <>
                        <Form.Item
                          name={[field.name, "_id"]}
                          hidden={true}
                        >
                          <Input />
                        </Form.Item>
                        <Row gutter={12}>
                          <Col span={7}>
                            <Form.Item
                              {...field}
                              label="Purity Name"
                              name={[field.name, "name"]}
                              fieldKey={[field.fieldKey, "name"]}
                              rules={[{ required: true, message: "Missing Area" }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={7}>
                            <Form.Item
                              {...field}
                              label="Purity Percent"
                              name={[field.name, "purityPercent"]}
                              fieldKey={[field.fieldKey, "purityPercent"]}
                              rules={[{ required: true, message: "Missing Area" }]}
                            >
                              <InputNumber 
                                min={1} 
                                max= {100} 
                                onChange={(value)=>{
                                  const { purity } = form.getFieldsValue();
                                  purity[field.key] = {
                                    ...purity[field.key],
                                    sellingPercent: value
                                  }
                                  form.setFieldsValue({ purity })
                                }}
                                addonAfter = "%"
                                />
                            </Form.Item>
                          </Col>
                          <Col span={7}>
                            <Form.Item
                              {...field}
                              label="Selling Percent"
                              name={[field.name, "sellingPercent"]}
                              fieldKey={[field.fieldKey, "sellingPercent"]}
                              rules={[{ required: true, message: "Missing Area" }]}
                            >
                              <InputNumber min={1} addonAfter = "%"/>
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className="float-left">
                              {fields.length > 1 ? (
                                <Button
                                  type="primary"
                                  shape="circle"
                                  onClick={() => remove(field.name)}
                                  icon={<DeleteOutlined />}
                                />
                              ) : null}
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    ))}

                    <Form.Item className="float-right">
                      <Button
                        className="float-right"
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add Purity
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            <Divider />
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              <IntlMessages id="app.pages.common.save" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Metal;
