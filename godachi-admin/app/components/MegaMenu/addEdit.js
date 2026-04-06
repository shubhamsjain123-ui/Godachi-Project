import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import router from "next/router";
import { CheckOutlined, CloseOutlined, PlusOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Upload,
  Image,
  Switch,
  TreeSelect,
  Select,
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
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const Default = ({ getCategories = [], getData = [], id=null, getAdminFilterList = [] }) => {
  const intl = useIntl();

  const [state, seTstate] = useState(getData);
  const [fields, seTfields] = useState(
    Object.entries(getData).map(([name, value]) => ({ name, value }))
  );
  /* const [state, seTstate] = useState({ categories_id: null });
  const fields = Object.entries(state).map(([name, value]) => ({
    name,
    value,
  })); */
  const [dataCategories, seTdataCategories] = useState(getCategories);
  const [adminFilterList, setAdminFilterList] = useState(getAdminFilterList);
  const [adminFilterListOptions, setAdminFilterListOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(id?getData.category:null);
  const [displaySave, seTdisplaySave] = useState(true);
  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const getDataCategory = () => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        if (res.data.length > 0) {
          const data = res.data
                        .filter((cat)=>cat.categories_id==null)
                        .map((cat)=>{
                          return {
                            label:cat.title,
                            value:cat._id,
                            seo: cat.seo
                          }
                        });
          seTdataCategories(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const getAdminFilterListApi = () => {
    axios
      .post(`${API_URL}/filterMaster/adminFilterList`,{
        ...(selectedCategory?{category:selectedCategory}:{})
      })
      .then((res) => {
        if (res.data) {
          setAdminFilterList(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  async function getDataFc() {
    await axios
      .get(`${API_URL}/homeMenu/${id}`)
      .then((response) => {
        var output = response.data;
        seTstate(output);
        seTfields(
          Object.entries(output).map(([name, value]) => ({ name, value }))
        );
        var items = output.items;
        items.forEach((item,index) =>{
            onFilterSelected(index,item.filter)
        })
        
      })
  }

  // componentDidMount = useEffect
  useEffect(() => {
    getDataCategory();
    if(id){
        getDataFc();
    }
  }, []);
  useEffect(() => {
    getAdminFilterListApi();
  }, [selectedCategory]);

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
    
    if (Data.image != undefined && state.image != Data.image) {
        if(state.image){
            axios.post(`${API_URL}/upload/deletecertificationimage`, {
                path: state.image,
            });
        }
        const formData = new FormData();
        formData.append("image", Data.image.file.originFileObj);
  
        const dataImage = await axios.post(
          `${API_URL}/upload/uploadmenuimage`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
          console.log(dataImage.data)
        Data["image"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
      } 
    axios
      .post(`${API_URL}/homemenu/add`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            intl.messages["app.pages.category.notAdded"] + res.data.messagge
          );
        } else {
          message.success(intl.messages["app.pages.category.added"]);

          router.push("/megaMenu/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const onFilterSelected = (index, value) =>{
    var options = adminFilterList.find((filter)=>filter.shortName == value).options
    var newOptions = adminFilterListOptions;
    newOptions[index]=options;
    setAdminFilterListOptions(newOptions)
  }
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const onCategorySelect = (value) =>{
    setSelectedCategory(value)
    const formData = form.getFieldsValue();
    var newFieldsValue = formData;
    let seo = "";
    if(value){
        seo = dataCategories.find((cat)=>cat.value==value).seo;
    }
    newFieldsValue.seo = seo;
    form.setFieldsValue(newFieldsValue)
  }

  return (
    <div>
      <Card className="card" title={`${id?"Edit":"Add"} Menu Item`}>
        <Form
          layout = "vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          initialValues={{ items: [""] }}
          scrollToFirstError
        >
            <Form.Item name="_id" hidden={true}>
                <Input  />
            </Form.Item>
          <Row gutter={12}>
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
                <Input />
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
                name="category"
                label={intl.messages["app.pages.common.category"]}
              >
                <Select
                  style={{ width: "100%" }}
                  options={dataCategories}
                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                  onChange={(value)=>onCategorySelect(value)}
                />
                
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="seo"
                label="Seo Url"
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <Input disabled = {selectedCategory?true:false} />
              </Form.Item>
            </Col>
            <Col span={2}>
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
                    <Text >Recomended Size: 462 X 280</Text><br/>
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
          </Row>
          
         

          

          <Form.Item
            name="description"
            label={intl.messages["app.pages.common.description"]}
          >
            <Input />
          </Form.Item>
          <Divider />
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
               
                {fields.map((field, i) => (
                  <>
                  <Form.Item name={[field.name, "_id"]} hidden={true}>
                    <Input  />
                  </Form.Item>
                  <Row gutter={12}>
                    <Col span={4}>
                      <Form.Item name={[field.name, "title"]} label="Title" rules={[
                              {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                              },
                            ]}>
                        <Input  />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name={[field.name, "order"]} label="Order" rules={[
                              {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                              },
                            ]}>
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name={[field.name, "column"]} label="Column Number" rules={[
                              {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                              },
                            ]}>
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name={[field.name, "filter"]} fieldKey={0} label="Select Filter"
                        rules={[
                          {
                            required: true,
                            message: intl.messages["app.pages.common.pleaseFill"],
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          options={adminFilterList.map((filter)=>{
                            return{
                              label: filter.name+" Filter",
                              value: filter.shortName
                            }
                          })}
                          placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                          onChange={(value)=>{
                            onFilterSelected(i,value);
                            const formData = form.getFieldsValue();
                            var newFieldsValue = formData;
                            if(newFieldsValue.items){
                                if(newFieldsValue.items[i]){
                                    newFieldsValue.items[i].filterOptions =[]
                                    form.setFieldsValue(newFieldsValue)
                                }
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name={[field.name, "filterOptions"]} fieldKey={0} label="Select Filter Options"
                      >
                        <Select
                          showSearch
                          mode="multiple"
                          showArrow
                          style={{ width: "100%" }}
                          options={adminFilterListOptions[i]?adminFilterListOptions[i]:[]}
                          placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button
                        type="primary"
                        size="sm"
                        shape="circle"
                        onClick={() => {
                          remove(field.name);
                        }}
                        icon={<DeleteOutlined />}
                      />
                    </Col>
                  </Row>
                  
                  <Divider />
                </>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add SubMenu Item
                  </Button>
                </Form.Item>
                <Divider />
              </>
            )}
          </Form.List>

          

          <Divider />
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit"  disabled={!displaySave}>
              <IntlMessages id="app.pages.common.save" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Default;
