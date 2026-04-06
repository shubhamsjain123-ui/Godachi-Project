import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, IMG_URL } from "../../config/config";
import { useRouter } from "next/router";
import { CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined, UploadOutlined  } from "@ant-design/icons";
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
  Typography
} from "antd";
const { Title, Text } = Typography;
import func from "../../util/helpers/func";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";

const Default = ({ getData = [], getCategories = [] }) => {
  const intl = useIntl();
  const [state, seTstate] = useState(getData);
  const [displaySave, seTdisplaySave] = useState(true);
  const [fields, seTfields] = useState(
    Object.entries(getData).map(([name, value]) => ({ name, value }))
  );
  const [dataCategories, seTdataCategories] = useState(getCategories);
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const getDataCategory = () => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        if (res.data.length > 0) {
          const data = func.getCategoriesTreeOptions(res.data);
          data.unshift({
            title: intl.messages["app.pages.category.rootCategory"],
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
  //componentDidMount = useEffect
  useEffect(() => {
    getDataCategory();
    getDataFc();
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
      Data["image"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
    }

    if (Data.banner != undefined && state.banner != Data.banner) {
      if(state.banner){
        axios.post(`${API_URL}/upload/deleteCategoryBanner`, {
          path: state.banner,
        });
      }
      
      const formData = new FormData();
      formData.append("banner", Data.banner.file.originFileObj);
      const dataImage = await axios.post(
        `${API_URL}/upload/uploadCategoryBanner`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Data["banner"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
    }

    axios
      .post(`${API_URL}/categories/${id}`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            intl.messages["app.pages.category.notUpdated"] + res.data.messagge
          );
        } else {
          message.success(intl.messages["app.pages.category.updated"]);

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
      <Card className="card" title={intl.messages["app.pages.category.edit"]}>
        <Form
          {...formItemLayout}
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          scrollToFirstError
          fields={fields}
        >
          <Form.Item
            name="categories_id"
            label={intl.messages["app.pages.common.category"]}
          >
            <TreeSelect
              style={{ width: "100%" }}
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
                if (newValue == "0-0") {
                  newValue = null;
                }
                seTstate({
                  ...state,
                  categories_id: newValue,
                });
                seTfields(
                  Object.entries({ categories_id: newValue }).map(
                    ([name, value]) => ({ name, value })
                  )
                );
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
                seTfields(
                  Object.entries({
                    seo: func.replaceSeoUrl(e.target.value),
                  }).map(([name, value]) => ({ name, value }))
                );
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

          <Form.Item name="seo" label="Seo Url">
            <Input />
          </Form.Item>
         {/* <Form.Item
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

          <Form.Item
            name="banner"
            label="Banner Image"
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
            name="banner"
            label="Uploaded Banner"
          >
            <Image src={IMG_URL + state.banner} width={200} />
          </Form.Item>

          <Form.Item
            name="isActive"
            label={intl.messages["app.pages.common.visible"]}
            valuePropName="checked"
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="showOnWeb"
            label="Display On Web Home"
            valuePropName="checked"
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="showOnApp"
            label="Display On App Home"
            valuePropName="checked"
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

Default.getInitialProps = async ({ req, query }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const getData = await axios.get(API_URL + "/categories/" + query.id, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });
    const geTdataManipulate = getData.data;

    const getDataCategories = await axios.get(`${API_URL}/categories`, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });
    const geTdataCategoriesManipulate = func.getCategoriesTreeOptions(
      getDataCategories.data
    );
    geTdataCategoriesManipulate.unshift({
      label: "▣ Root Category ",
      value: null,
    });

    return {
      getData: geTdataManipulate,
      getCategories: geTdataCategoriesManipulate,
    };
  }
};

export default Default;
