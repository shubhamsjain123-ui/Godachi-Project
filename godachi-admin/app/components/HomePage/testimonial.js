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
    var mediaData = Data.testimonial;
    for(const media of mediaData){
        if (media.image != undefined) {
            let oldImage = null;
            if(media._id){
                var oldImageData = state.testimonial.find((details)=> details._id==media._id);
                oldImage = oldImageData?oldImageData.image:null;
            }
            if(oldImage != media.image){
              if(oldImage){
                axios.post(`${API_URL}/upload/deleteBannerImage`, {
                    path: oldImage.image,
                  });
              }
              const formData = new FormData();
              formData.append("image", media.image.file.originFileObj);
              const dataImage = await axios.post(
                  `${API_URL}/upload/uploadBannerImage`,
                  formData,
                  { headers: { "Content-Type": "multipart/form-data" } }
              );
              media.image = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
            }
            
        }
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
      <Card className="card" title={`Manage Testimonials`}>
        <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          scrollToFirstError
          initialValues={{testimonial:[""]}}
        >
            <Row gutter={12}>
                <Col span ={8}>
                <Form.Item
                    name="title"
                    label="Title"
                >
                    <Input />
                </Form.Item>
                </Col>
                <Col span ={16}>
                <Form.Item
                    name="sub_title"
                    label="Sub Title"
                >
                    <Input />
                </Form.Item>
                </Col>
                
            </Row>
          
          

          <Divider />
              <Form.List name="testimonial">
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
                          <Col span={2}>
                            <Form.Item
                              {...field}
                              label="Star"
                              name={[field.name, "star"]}
                              fieldKey={[field.fieldKey, "star"]}
                            >
                                <InputNumber 
                                    style={{width:"100%"}}
                                />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...field}
                              label="Review"
                              name={[field.name, "review"]}
                              fieldKey={[field.fieldKey, "review"]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          
                          
                          <Col span={3}>
                            <Form.Item
                                name={[field.name, "image"]}
                                fieldKey={[field.fieldKey, "image"]}
                                label="Media"
                                
                            >
                                <Upload
                                maxCount={1}
                                /* beforeUpload={(file) => {
                                  const checkDetails = sectionConfig?.media?.[i] ? sectionConfig?.media?.[i] : sectionConfig.mediaDetails;
                                  var isAllowed = checkDetails.allowedExtensions.includes(file.type);
                                    
                                    if (!isAllowed) {
                                      message.error("Please upload a valid file");
                                      seTdisplaySave(false);
                                      return false;
                                    } else {
                                      seTdisplaySave(true);
                                      return true;
                                    }
                                }} */
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
                           
                          </Col>
                          <Col span={3}>
                            {
                                state?.testimonial?.[i]?.image &&
                                <Form.Item
                                    name={[field.name, "image"]}
                                    fieldKey={[field.fieldKey, "image"]}
                                    label={intl.messages["app.pages.common.uploatedImage"]}
                                >
                                    <Image src={IMG_URL + state.testimonial[i].image} width={100} />
                                </Form.Item>
                            }
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
                            Add Testimonial
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
