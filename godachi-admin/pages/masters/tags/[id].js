import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
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
  const [state, seTstate] = useState({});
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  function getData() {
    axios.get(`${API_URL}/masters/tags/${id}`).then((response) => {
      var output = Object.entries(response.data).map(([name, value]) => ({
        name,
        value,
      }));

      seTstate(output);
    });
  }

  // componentDidMount = useEffect
  useEffect(() => {
    getData();
  }, []);

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
    axios
      .post(`${API_URL}/masters/tags/${id}`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Tag Not Updated" + res.data.messagge
          );
        } else {
          message.success("Tag Updated");

          router.push("/masters/tags/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <Card className="card" title="Edit Tag">
        <Form
          {...formItemLayout}
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={state}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: intl.messages["app.pages.common.pleaseFill"],
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
