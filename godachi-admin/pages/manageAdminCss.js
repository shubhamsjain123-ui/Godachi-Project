import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";

import {
  Upload,
  Space,
  Button,
  Card,
  message,
  Divider,
  Col,
  Form,
  Input,
  Row,
  Typography
} from "antd";
const { TextArea } = Input;
const { Title, Text } = Typography;

import { useIntl } from "react-intl";
import IntlMessages from "../util/IntlMessages";

const Default = () => {
  const intl = useIntl();
  const [displaySave, seTdisplaySave] = useState(true);
  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();
  const [fields, seTfields] = useState({});
  const router = useRouter();

  
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

  const onSubmit = async (Data) => {
       
    axios
      .post(`${API_URL}/upload/updateGodachiAdminCss`, Data)
      .then((res) => {
        if (res.data.success) {
          message.success("Saved Successfully")
        } else {
            message.error("not saved")
        }
      })
      .catch((err) => console.log(err));
  };

  function getData() {
    axios.get(`${API_URL}/upload/getGodachiAdminCss`).then((response) => {
      var data = {
        content:response.data
      }
      seTfields(
        Object.entries(data).map(([name, value]) => ({ name, value }))
      );
    });
  }

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(()=>{
    getData()
  },[])

  return (
    <div>
      <Card className="card" title="Godachi Admin Css">
        <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          scrollToFirstError
        >
          <Form.Item
            name="content"
            label={intl.messages["app.pages.variants.name"]}
            rules={[
              {
                required: true,
                message: "Please fill this input.",
              },
            ]}
          >
            <TextArea rows={10}/>
          </Form.Item>
          
          
          
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={!displaySave}>
              <IntlMessages id="app.pages.common.save" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Default;
