import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, PlusOutlined, UploadOutlined, FilePdfOutlined } from "@ant-design/icons";
import Link from "next/link"
import {
  Upload,
  Image,
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
const { Title, Text } = Typography;
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";

const Default = () => {
  const intl = useIntl();
  const [displaySave, seTdisplaySave] = useState(true);
  const [state, seTstate] = useState({});
  const [fields, seTfields] = useState({});
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector(({ login }) => login);

  function getData() {
    axios.get(`${API_URL}/variants/${id}`).then((response) => {
      /* var output = Object.entries(response.data).map(([name, value]) => ({
        name,
        value,
      }));
      console.log(output)
      seTstate(output); */
      seTstate(response.data);
      seTfields(
        Object.entries(response.data).map(([name, value]) => ({ name, value }))
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

  const onSubmit = async(Data) => {
    Data["created_user"] = { name: user.name, id: user.id };

    if (Data.image != undefined && state.image != Data.image) {
      axios.post(`${API_URL}/upload/deleteVariantPdf`, {
        path: state.image,
      });
      const formData = new FormData();
      formData.append("image", Data.image.file.originFileObj);
      const dataImage = await axios.post(
        `${API_URL}/upload/uploadVariantPdf`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Data["image"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
    }

    axios
      .post(`${API_URL}/variants/${id}`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            intl.messages["app.pages.variants.notUpdated"] + res.data.messagge
          );
        } else {
          message.success(intl.messages["app.pages.variants.updated"]);

          router.push("/variants/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <Card className="card" title={intl.messages["app.pages.variants.edit"]}>
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
            name="name"
            label={intl.messages["app.pages.variants.name"]}
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
            label={intl.messages["app.pages.common.description"]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Size Guide"
          >
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                const isPdf = file.type === "application/pdf" ;
                if (!isPdf) {
                  message.error("Only Pdf files are allowed");
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
            <Text type="danger">allowed files: pdf</Text><br/>
          </div>
          <Form.Item
            name="image"
            label={intl.messages["app.pages.common.uploatedImage"]}
          >
            {/* <Image src={IMG_URL + state.image} width={200} /> */}
            {
              state.image &&
              <Link target="_blank" href={IMG_URL + state.image}  >
                <FilePdfOutlined style={{fontSize:80}} />
              </Link>
            }
            
            
          </Form.Item>
          <Divider />
          <Row>
            <Col md={12} sm={0} />
            <Col md={12} sm={24}>
              <Form.List
                name="variants"
                initialValue={[{ name: "", value: "" }]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{
                          display: "flex-start",
                          alignItems: "flex-start",
                          marginBottom: 8,
                        }}
                        block
                        align="baseline"
                      >
                        <Form.Item name={[field.name, "_id"]} hidden={true}>
                          <Input  />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label={intl.messages["app.pages.common.name"]}
                          className="float-left"
                          name={[field.name, "name"]}
                          fieldKey={[field.fieldKey, "name"]}
                          rules={[{ required: true, message: "Missing Area" }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          className="float-left"
                          label={intl.messages["app.pages.common.values"]}
                          name={[field.name, "value"]}
                          fieldKey={[field.fieldKey, "value"]}
                          rules={[{ required: true, message: "Missing Area" }]}
                        >
                          <Input />
                        </Form.Item>
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
                      </Space>
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
                        <IntlMessages id="app.pages.settings.addSights" />
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>

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
