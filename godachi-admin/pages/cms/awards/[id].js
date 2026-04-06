import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, IMG_URL } from "../../../config/config";
import { useRouter } from "next/router";
import { CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Upload,
  Image,
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
  Typography,
  DatePicker
} from "antd";
import moment from 'moment';
const { Title, Text } = Typography;
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const Default = () => {
  const intl = useIntl();
  const [state, seTstate] = useState({});
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const [displaySave, seTdisplaySave] = useState(true);
  const [fields, seTfields] = useState(
    Object.entries(getData).map(([name, value]) => ({ name, value }))
  );
  function getData() {
    axios.get(`${API_URL}/cms/awards/${id}`).then((response) => {
      var output = response.data;
      output.date =  moment(output.date);
      seTstate(output);
      seTfields(
        Object.entries(output).map(([name, value]) => ({ name, value }))
      );
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

  const onSubmit = async (Data) => {

    if (Data.image != undefined && state.image != Data.image) {
      axios.post(`${API_URL}/upload/deleteOccassionImage`, {
        path: state.image,
      });
      const formData = new FormData();
      formData.append("image", Data.image.file.originFileObj);
      const dataImage = await axios.post(
        `${API_URL}/upload/uploadOccassionImage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Data["image"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
    }

    axios
      .post(`${API_URL}/cms/awards/${id}`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Award Not Updated" + res.data.messagge
          );
        } else {
          message.success("Award Updated");

          router.push("/cms/awards/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <Card className="card" title="Edit Award & Recognition">
        <Form
          {...formItemLayout}
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          scrollToFirstError
        >
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
            />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
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
            name="organization"
            label="Organization"
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="image"
            label={intl.messages["app.pages.common.image"]}
          >
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                const isJPG =
                  file.type === "image/jpeg" ||
                  file.type === "image/png" ||
                  file.type === "image/jpg" ||
                  file.type === "image/gif";
                if (!isJPG) {
                  message.error(intl.messages["app.pages.common.onlyImage"]);
                  seTdisplaySave(false);
                  return false;
                } else {
                  seTdisplaySave(true);
                  return true;
                }
              }}
              showUploadList={{
                removeIcon: (
                  <DeleteOutlined onClick={() => seTdisplaySave(true)} />
                ),
              }}
            >
              <Button icon={<UploadOutlined />}>
                <IntlMessages id="app.pages.common.selectFile" />
              </Button>
            </Upload>
            
          </Form.Item>
          <div style={{textAlign: "center", paddingBottom:"10px"}}>
            <Text type="danger">allowed files: jpeg,png,jpg,gif, mp4</Text><br/>
            <Text type="danger">Maximum Size: 200 kb</Text><br/>
            <Text type="danger">Recomended Size: 100 X 80</Text><br/>
          </div>
          <Form.Item
            name="image"
            label={intl.messages["app.pages.common.uploatedImage"]}
          >
            <Image src={IMG_URL + state.image} width={200} />
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
