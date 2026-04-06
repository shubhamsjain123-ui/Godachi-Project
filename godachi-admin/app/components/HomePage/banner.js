import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";

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
  Select 
} from "antd";
const { Title, Text } = Typography;
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

import WebSections from "../../../config/homepage";

const Banner = ({ section, device }) => {
  const intl = useIntl();
  const [displaySave, seTdisplaySave] = useState(true);
  const [state, setState] = useState({});
  const [fields, setFields] = useState(
    Object.entries([]).map(([name, value]) => ({ name, value }))
  );
  const [sectionConfig, setSectionConfig] = useState(WebSections[device].find((sec)=>sec.section == section))
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
    var mediaData = Data.media;
    for(const media of mediaData){
        if (media.image != undefined) {
            let oldImage = null;
            if(media._id){
                var oldImageData = state.media.find((details)=> details._id==media._id);
                oldImage = oldImageData?oldImageData.image:null;
            }
            console.log(oldImage)
            console.log(media.image)
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
    setSectionConfig(
      WebSections[device].find((sec)=>sec.section == section)
    )
    
  },[section])
  
  return (
    <div>
      <Card className="card" title={`Manage ${sectionConfig?.title}`}>
        <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          scrollToFirstError
          initialValues={{ 
            media: [...Array(
              sectionConfig.numOfMedia?sectionConfig.numOfMedia:1
            ).keys()]
            .map(()=>"")
          }}
        >
            {
                sectionConfig.headingRequired &&
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
            }
            {
              sectionConfig?.extraData &&
              <Form.Item
                  name="extraData"
                  label="Add Extra Data"
              >
                  <Select 
                    mode="tags"
                    style={{
                      width: '100%',
                    }}
                    placeholder="Add Extra Data" 
                  />
              </Form.Item>
            }
            {
              sectionConfig.mediaDetails &&
              <div style={{textAlign: "center", paddingBottom:"10px"}}>
                <Text>allowed files: {sectionConfig.mediaDetails?.allowedExtensions.map((ext)=>ext.split("/")[1]).join(", ")}</Text><br/>
                <Text>Maximum Size: {sectionConfig.mediaDetails?.maxSize}</Text><br/>
                <Text>Recomended Size: {`${sectionConfig.mediaDetails?.width} X ${sectionConfig.mediaDetails?.height}`}</Text><br/>
              </div>
            }
          

          <Divider />
              <Form.List name="media">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, i) => (
                      <div key={i}>
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
                              <InputNumber size="small" style={{width:"100%"}} />
                            </Form.Item>
                          </Col>
                          {
                            (sectionConfig?.mediaDetails?.title || sectionConfig?.media?.[i].title) &&
                            <Col span={3}>
                              <Form.Item
                                {...field}
                                label="Media Title"
                                name={[field.name, "title"]}
                                fieldKey={[field.fieldKey, "title"]}
                              >
                                <Input size="small" />
                              </Form.Item>
                            </Col>
                          }
                          {
                            (sectionConfig?.mediaDetails?.sub_title || sectionConfig?.media?.[i].sub_title) &&
                            <Col span={4}>
                              <Form.Item
                                {...field}
                                label="Sub Title"
                                name={[field.name, "sub_title"]}
                                fieldKey={[field.fieldKey, "sub_title"]}
                              >
                                <Input size="small" />
                              </Form.Item>
                            </Col>
                          }
                          
                          
                          <Col span={2}>
                            <Form.Item
                                name={[field.name, "image"]}
                                fieldKey={[field.fieldKey, "image"]}
                                label="Media"
                                
                            >
                                <Upload
                                maxCount={1}
                                beforeUpload={(file) => {
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
                                }}
                                showUploadList={{
                                    removeIcon: (
                                    <DeleteOutlined onClick={() => seTdisplaySave(true)} />
                                    ),
                                }}
                                >
                                <Button icon={<UploadOutlined />} size="small" style={{marginTop:6}}>
                                    Upload
                                </Button>
                                </Upload>
                                
                            </Form.Item>
                            {
                              sectionConfig?.media?.[i] &&
                              <div>
                                <Text>Ext: {sectionConfig.media[i]?.allowedExtensions.map((ext)=>ext.split("/")[1]).join(", ")}</Text><br/>
                                <Text>Size: {sectionConfig.media[i]?.maxSize}</Text><br/>
                                <Text>Dimension: {`${sectionConfig.media[i]?.width} X ${sectionConfig.media[i]?.height}`}</Text><br/>
                              </div>
                            }
                          </Col>
                          <Col span={2}>
                            {
                                state?.media?.[i]?.image &&
                                <Form.Item
                                    name={[field.name, "image"]}
                                    fieldKey={[field.fieldKey, "image"]}
                                    label="Image"
                                >
                                    <Image src={IMG_URL + state.media[i].image} width={50} />
                                </Form.Item>
                            }
                          </Col>
                          <Col span={9}>
                            <Form.Item
                              {...field}
                              label="URL"
                              name={[field.name, "url"]}
                              fieldKey={[field.fieldKey, "url"]}
                            >
                              <Input
                                size="small"
                                {
                                  ...(
                                      device=="app"?
                                      {
                                        addonBefore:`${process.env.NEXT_PUBLIC_WEB_URL}`
                                      }
                                      :{}
                                    )
                                }
                              />
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
                      </div>
                    ))}
                    {
                      !(sectionConfig.numOfMedia) &&
                      <Form.Item className="float-right">
                        <Button
                          className="float-right"
                          type="dashed"
                          onClick={() => {
                            add();
                          }}
                          icon={<PlusOutlined />}
                        >
                          Add Media
                        </Button>
                      </Form.Item>
                    }
                    
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
