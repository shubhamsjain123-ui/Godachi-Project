import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../config/config";
import router from "next/router";
import { CheckOutlined, CloseOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Upload,
  Switch,
  TreeSelect,
  InputNumber,
  Button,
  Card,
  message,
  Divider,
  Form,
  Input,
  Typography
} from "antd";
const { Title, Text } = Typography;
import func from "../../util/helpers/func";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";

const Default = ({ getCategories = [] }) => {
  const intl = useIntl();
  const [state, seTstate] = useState({ categories_id: null });
  const fields = Object.entries(state).map(([name, value]) => ({
    name,
    value,
  }));
  const [displaySave, seTdisplaySave] = useState(true);
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

  // componentDidMount = useEffect
  useEffect(() => {
    getDataCategory();
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

    if (Data.image != undefined) {
      const formData = new FormData();
      formData.append("image", Data.image.file.originFileObj);

      const dataImage = await axios.post(
        `${API_URL}/upload/uploadCategoryImage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
        console.log(dataImage.data)
      Data["image"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
    } else {
      
    }

    if (Data.banner != undefined) {
      const formData = new FormData();
      formData.append("banner", Data.banner.file.originFileObj);

      const dataImage = await axios.post(
        `${API_URL}/upload/uploadCategoryBanner`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
        console.log(dataImage.data)
      Data["banner"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
    } else {
      Data["banner"] = "";
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

  return (
    <div>
      <Card className="card" title={intl.messages["app.pages.category.add"]}>
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
            <InputNumber style={{ width: 200 }} />
          </Form.Item>

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

          <Form.Item name="seo" label="Seo Url" value={state.seo}>
            <Input />
          </Form.Item>
          {/*<Form.Item
            name="link"
            label={intl.messages["app.pages.category.otherLink"]}
          >
            <Input />
          </Form.Item>*/}
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
          <div style={{textAlign: "center", paddingBottom:"10px"}}>
            <Text type="danger">allowed files: jpeg,png,jpg,gif, mp4</Text><br/>
            <Text type="danger">Maximum Size: 200 kb</Text><br/>
            <Text type="danger">Recomended Size: 100 X 80</Text><br/>
          </div>

          <Form.Item
            name="banner"
            label="Upload Banner"
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
          <div style={{textAlign: "center", paddingBottom:"10px"}}>
            <Text type="danger">allowed files: jpeg,png,jpg,gif, mp4</Text><br/>
            <Text type="danger">Maximum Size: 200 kb</Text><br/>
            <Text type="danger">Recomended Size: 100 X 80</Text><br/>
          </div>
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
          <Form.Item
            name="showOnWeb"
            label="Display On Web Home"
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="showOnApp"
            label="Display On App Home"
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
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

Default.getInitialProps = async ({ req }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const getDataCategories = await axios.get(`${API_URL}/categories`, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });
    const geTdataCategoriesManipulate = [
      { label: "▣ Root Category ", value: null },
    ];
    if (getDataCategories.data.length > 0) {
      geTdataCategoriesManipulate.push(
        func.getCategoriesTreeOptions(getDataCategories.data)
      );
    }
    return { getCategories: geTdataCategoriesManipulate };
  }
};

export default Default;
