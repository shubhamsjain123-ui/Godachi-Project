import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import moment from 'moment';
import {
  Select,
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
  DatePicker
} from "antd";

import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";

const Default = ({
    selectedVariantId,
    onSuccess
}) => {
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
      .post(`${API_URL}/productInventory/remove/${selectedVariantId}`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Quantity Removed");
          onSuccess();
          form.resetFields();
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
       <Form
          {...formItemLayout}
          form={form}
          name="remove"
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
            name="quantity"
            label="Quantity"
            rules={[
                {
                required: true,
                message: intl.messages["app.pages.common.pleaseFill"],
                },
            ]}
          >
            <InputNumber style={{width:"100%"}}/>
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[
                {
                required: true,
                message: intl.messages["app.pages.common.pleaseFill"],
                },
            ]}
            initialValue={moment()} 
          >
            <DatePicker 
                style={{width:"100%"}}
                
                format='DD-MMM-YYYY'
                disabledDate={(current)=>current && current > moment().endOf('day')}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Note"
          >
            <Input/>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              <IntlMessages id="app.pages.common.save" />
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
};

export default Default;
