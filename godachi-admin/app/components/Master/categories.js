import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config/config";
import router from "next/router";
import { CheckOutlined, CloseOutlined, PlusOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Upload,
  Image,
  Switch,
  TreeSelect,
  InputNumber,
  Button,
  Card,
  message,
  Divider,
  Form,
  Input,
  Row,
  Col,
  Typography
} from "antd";
const { Title, Text } = Typography;
import func from "../../../util/helpers/func";
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const Default = ({ getCategories = [], getData = [], id=null }) => {
  const intl = useIntl();
  const [state, seTstate] = useState(getData);
  const [fields, seTfields] = useState(
    Object.entries(getData).map(([name, value]) => ({ name, value }))
  );
  const [dataCategories, seTdataCategories] = useState([
    { label: intl.messages["app.pages.category.rootCategory"], value: null },
    ...getCategories,
  ]);
  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const getDataCategory = () => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        if (res.data.length > 0) {
          const data = func.getCategoriesTreeOptions(res.data);
          data.unshift({
            label: intl.messages["app.pages.category.rootCategory"],
            value: null,
          });
          seTdataCategories(data);
        }
      })
      .catch((err) => console.log(err));
  };

  function getDataFc() {
    axios.get(`${API_URL}/categories/${id}`).then((response) => {
        seTstate(response.data);
        seTfields(
          Object.entries(response.data).map(([name, value]) => ({ name, value }))
        );
      });
  }

  // componentDidMount = useEffect
  useEffect(() => {
    getDataCategory();
    if(id){
        getDataFc();
    }
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
    Data["created_user"] = { name: user.name, id: user.id };
    console.log(Data.image);
    if (Data.image != undefined && state.image != Data.image) {
      if(state.image){
          axios.post(`${API_URL}/upload/deleteCategoryImage`, {
              path: state.image,
          });
      }
      const formData = new FormData();
      formData.append("image", Data.image.file.originFileObj);

      const dataImage = await axios.post(
        `${API_URL}/upload/uploadCategoryImage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
        console.log(dataImage.data)
      Data["image"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
    } 


    axios
      .post(`${API_URL}/categories/add`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            intl.messages["app.pages.category.notAdded"] + res.data.messagge
          );
        } else {
          message.success(intl.messages["app.pages.category.added"]);

          router.push("/categories/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(()=>{
    seTfields(Object.entries(state).map(([name, value]) => ({ name, value })))
  },[state])

  return (
    <div>
      <Card className="card" title={intl.messages["app.pages.category.add"]}>
        <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          scrollToFirstError
        >
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item
                name="categories_id"
                label={intl.messages["app.pages.common.category"]}
              >
                <TreeSelect
                  style={{ width: "100%" }}
                  value={state.categories_id}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  treeData={dataCategories}
                  placeholder="Please select"
                  treeDefaultExpandAll
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={(newValue) => {
                    seTstate({ ...state, categories_id: newValue });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="order"
                label={intl.messages["app.pages.common.order"]}
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="title"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    seTstate({
                      ...state,
                      title: e.target.value,
                      seo: func.replaceSeoUrl(e.target.value),
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="seo" label="Seo Url" value={state.seo}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label={intl.messages["app.pages.common.description"]}
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
           
            <Col span={6}>
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
                        {" "}
                        <IntlMessages id="app.pages.common.selectFile" />
                    </Button>
                    </Upload>
                </Form.Item>
            </Col>
            <Col span={18}>
                <div>
                    <Text >allowed files: jpeg,png,jpg,gif, mp4</Text><br/>
                    <Text >Maximum Size: 200 kb</Text><br/>
                    <Text >Recomended Size: 100 X 80</Text><br/>
                </div>
            </Col>
            <Col span={24}>
                {
                    state.image &&
                    <Form.Item
                        name="image"
                        label="Uploaded Image"
                    >
                        <Image src={IMG_URL + state.image} width={200} />
                    </Form.Item>
                }
            </Col>
            <Col span={4}>
              <Form.Item
                name="isActive"
                label={intl.messages["app.pages.common.visible"]}
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Form.Item>
            </Col>
          </Row>         

          <Divider />
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
