import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";
import moment from 'moment';
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
  InputNumber,
  Row,
  Typography,
  DatePicker
} from "antd";
const { Title, Text } = Typography;
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

import {WebSections} from "../../../config/homepage";

const Banner = ({ section, device }) => {
  const intl = useIntl();
  const [displaySave, seTdisplaySave] = useState(true);
  const [state, setState] = useState({});
  const [fields, setFields] = useState(
    Object.entries([]).map(([name, value]) => ({ name, value }))
  );
  
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
  const getDataFc = () => {
    axios.get(`${API_URL}/homeslider/getBanner/${device}/${section}`).then((response) => {
      setState(response.data);
      setFields(
        response.data ?
        Object.entries(response.data).map(([name, value]) => ({ name, value }))
        :null
      );
      
    });
  }

  const onSubmit = async (Data) => {
    Data["created_user"] = { name: user.name, id: user.id };
    if (Data.image != undefined) {
      if(state?.image){
        axios.post(`${API_URL}/upload/deleteBannerImage`, {
          path: state.image,
        });
      }
      const formData = new FormData();
      formData.append("image", Data.image.file.originFileObj);
      const dataImage = await axios.post(
        `${API_URL}/upload/uploadBannerImage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Data["image"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
    }

    Data["section"]= section;
    Data["device"]= device;
    axios
      .post(`${API_URL}/homeslider/addBanner/${device}/${section}`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Not Updated" + res.data.messagge
          );
        } else {
          message.success("Updated");

          router.push(`/homePage/${device}/${section}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(()=>{
    getDataFc();
    
  },[])
  
  return (
    <div>
      <Card className="card" title={`Our Story`}>
        <Form
          {...formItemLayout}
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          scrollToFirstError
          initialValues={{details:[""]}}
        >
             <Form.Item
                name="title"
                label="Heading"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="sub_title"
                label="Sub Heading"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="story"
                label="Story"
            >
                <Input.TextArea rows={3} />
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
            {
              state?.image &&
              <Form.Item
                  name="image"
                  label={intl.messages["app.pages.common.uploatedImage"]}
              >
                  <Image src={IMG_URL + state.image} width={200} />
              </Form.Item>
            }
           
            <Divider />
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

export default Banner;
