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
      <Card className="card" title={`Manage Stats`}>
        <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          scrollToFirstError
          initialValues={{stat:[""]}}
        >
            
              <Form.List name="stats">
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
                        <Col span={2}>
                            <Form.Item
                              {...field}
                              label="Order"
                              name={[field.name, "order"]}
                              fieldKey={[field.fieldKey, "order"]}
                              rules={[
                                {
                                  required: true,
                                  message: intl.messages["app.pages.common.pleaseFill"],
                                }
                              ]}
                            >
                              <InputNumber style={{width:"100%"}} />
                            </Form.Item>
                          </Col>
                          
                          <Col span={4}>
                            <Form.Item
                              {...field}
                              label="Name"
                              name={[field.name, "name"]}
                              fieldKey={[field.fieldKey, "name"]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          
                          <Col span={8}>
                            <Form.Item
                              {...field}
                              label="Value"
                              name={[field.name, "value"]}
                              fieldKey={[field.fieldKey, "value"]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          
                          <Col span={2}>
                            <Form.Item className="float-left">
                              {fields.length > 1 ? (
                                <Button
                                  type="danger"
                                  shape="circle"
                                  onClick={() => remove(field.name)}
                                  icon={<DeleteOutlined />}
                                />
                              ) : null}
                            </Form.Item>
                          </Col>
                        </Row>
                        <Divider />
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
                            Add Stats
                        </Button>
                    </Form.Item>
                    
                  </>
                )}
              </Form.List>
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
