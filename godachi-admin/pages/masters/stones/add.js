import { useEffect } from "react";
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
  Row,
} from "antd";

import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const Default = () => {
  const intl = useIntl();

  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const router = useRouter();

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
      .post(`${API_URL}/masters/stones/add`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Stone not added" + res.data.messagge
          );
        } else {
          message.success("Stone Added");

          router.push("/masters/stones/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <Card className="card" title="Add Stone">
        <Form
          {...formItemLayout}
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={[
            {
              name: "name",
              value: "",
            },
          ]}
          scrollToFirstError
        >
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
          <Form.Item
            name="description"
            label="Description"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="materialFilter"
            label="Show In Material Filter"
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              valuePropName="checked"
            />
          </Form.Item>
          

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

export default Default;
