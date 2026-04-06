import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, IMG_URL } from "../../config/config";
import router from "next/router";
import dynamic from "next/dynamic";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Upload,
  Space,
  Image,
  InputNumber,
  Button,
  Card,
  message,
  Divider,
  Col,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";
const Editor = dynamic(() => import("../../app/components/Editor/index"));
const Default = () => {
  const intl = useIntl();
  const [state, seTstate] = useState({});
  const [states, setStates] = useState([]);
  const [activeOffers, setActiveOffers] = useState([]);
  const [displaySave, seTdisplaySave] = useState(true);
  const fields = Object.entries(state).map(([name, value]) => ({
    name,
    value,
  }));
  const [form] = Form.useForm();
  const { id } = router.query;

  function getDataFc() {
    axios.get(`${API_URL}/settings/${id}`).then((response) => {
      seTstate(response.data);
    });
  }
  const fetchStatesMaster = async()=>{
    try{
        var response = await axios.get(`${API_URL}/masters/getStates`);
        if(response.data){
            if(response.data.success){
                setStates(response.data.result)
            }
        }
    }
    catch(error){
        message.error(error.message)
    }
  }
  const fetchActiveOffers = async()=>{
    try{
        var response = await axios.get(`${API_URL}/offers/getActiveOffers`);
        if(response.data){
           setActiveOffers(response.data);
        }
    }
    catch(error){
        message.error(error.message)
    }
  }
  // componentDidMount = useEffect
  useEffect(() => {
    getDataFc();
    fetchStatesMaster();
    fetchActiveOffers();
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
      axios.post(`${API_URL}/upload/deletelogoimage`, { path: state.image });

      const formData = new FormData();
      formData.append("image", Data.image.file.originFileObj);

      const dataImage = await axios.post(
        `${API_URL}/upload/uploadlogoimage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Data["image"] = dataImage.data.path.replace("public/", "/");
    }

    axios
      .post(`${API_URL}/settings/${id}`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            intl.messages["app.pages.settings.notUpdated"] + res.data.messagge
          );
        } else {
          message.success(intl.messages["app.pages.settings.updated"]);
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <Card
        className="card"
        title={intl.messages["app.pages.settings.settings"]}
      >
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
            <Col span={24}>
              <Form.Item
                name="image"
                label="Logo Image"
              >
                <Image src={IMG_URL + state.image} width={200} />
              </Form.Item>
              <Form.Item
                name="image"
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
                    Upload Logo
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="company"
                label={intl.messages["app.pages.common.company"]}
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
                name="title"
                label={intl.messages["app.pages.common.title"]}
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
                name="website"
                label={intl.messages["app.pages.settings.website"]}
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
                name="taxnumber"
                label={intl.messages["app.pages.settings.taxNumber"]}
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
                name="taxcenter"
                label={intl.messages["app.pages.settings.taxCenter"]}
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
                name="gst"
                label="GST"
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <InputNumber min={1} max={100} addonAfter="%" style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="price_icon"
                label={intl.messages["app.pages.product.priceIcon"]}
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
                extra="$,€,₺,USD,CAD"
              >
                <Input />
              </Form.Item>


            </Col>
            <Col span={6}>
              <Form.Item
                name="price_type"
                label={intl.messages["app.pages.product.priceType"]}
              >
                <Select
                  className=" w-full"
                  options={[
                    {
                      label: intl.messages["app.pages.product.start"],
                      value: true,
                    },
                    { label: intl.messages["app.pages.product.end"], value: false },
                  ]}
                  placeholder={intl.messages[" $20 or 20$"]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="keywords"
                label={intl.messages["app.pages.common.keywords"]}
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row gutter={[20]}>
                <Col md={4} className="text-end mt-2">
                  <h6>
                    <IntlMessages id="app.pages.common.email" />:
                  </h6>
                </Col>
                <Col md={20}>
                  <Form.List
                    label={intl.messages["app.pages.common.email"]}
                    name="email"
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
                            <Form.Item
                              {...field}
                              label={intl.messages["app.pages.common.name"]}
                              className="float-left"
                              name={[field.name, "name"]}
                              fieldKey={[field.fieldKey, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    intl.messages[
                                    "app.pages.common.pleaseFill"
                                    ],
                                },
                              ]}
                              labelCol={24}
                              wrapperCol={24}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              className="float-left"
                              label={intl.messages["app.pages.common.values"]}
                              name={[field.name, "value"]}
                              fieldKey={[field.fieldKey, "value"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    intl.messages[
                                    "app.pages.common.pleaseFill"
                                    ],
                                },
                              ]}
                              labelCol={24}
                              wrapperCol={24}
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

                        <Form.Item
                          labelCol={24}
                          wrapperCol={24}
                          className="float-right w-full"
                        >
                          <Button
                            className="float-right w-full"
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
              <Divider />
            </Col>
            <Col span={12}>
              <Row gutter={[20]}>
                <Col md={4} className="text-end mt-2">
                  <h6>
                    <IntlMessages id="app.pages.common.address" />:
                  </h6>
                </Col>
                <Col md={20}>
                  <Form.List
                    name="address"
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
                            <Form.Item
                              {...field}
                              label={intl.messages["app.pages.common.name"]}
                              className="float-left"
                              name={[field.name, "name"]}
                              fieldKey={[field.fieldKey, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    intl.messages[
                                    "app.pages.common.pleaseFill"
                                    ],
                                },
                              ]}
                              labelCol={24}
                              wrapperCol={24}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              className="float-left"
                              label={intl.messages["app.pages.common.values"]}
                              name={[field.name, "value"]}
                              fieldKey={[field.fieldKey, "value"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    intl.messages[
                                    "app.pages.common.pleaseFill"
                                    ],
                                },
                              ]}
                              labelCol={24}
                              wrapperCol={24}
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

                        <Form.Item
                          labelCol={24}
                          wrapperCol={24}
                          className="float-right w-full"
                        >
                          <Button
                            className="float-right w-full"
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
              <Divider />
            </Col>
            <Col span={12} className="border-end">
              <Row gutter={[20]}>
                <Col md={4} className="text-end mt-2">
                  <h6>
                    <IntlMessages id="app.pages.common.phone" />:
                  </h6>
                </Col>
                <Col md={20}>
                  <Form.List
                    name="phone"
                    label={intl.messages["app.pages.common.phone"]}
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
                            <Form.Item
                              {...field}
                              label={intl.messages["app.pages.common.name"]}
                              className="float-left"
                              name={[field.name, "name"]}
                              fieldKey={[field.fieldKey, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    intl.messages[
                                    "app.pages.common.pleaseFill"
                                    ],
                                },
                              ]}
                              labelCol={24}
                              wrapperCol={24}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              className="float-left"
                              label={intl.messages["app.pages.common.values"]}
                              name={[field.name, "value"]}
                              fieldKey={[field.fieldKey, "value"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    intl.messages[
                                    "app.pages.common.pleaseFill"
                                    ],
                                },
                              ]}
                              labelCol={24}
                              wrapperCol={24}
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

                        <Form.Item
                          labelCol={24}
                          wrapperCol={24}
                          className="float-right w-full"
                        >
                          <Button
                            className="float-right w-full"
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

            </Col>
            

            <Col span={24}>
              <Divider />
              <Row>
                <Col span={6}>
                  <Form.Item
                    name="companyGst"
                    label="Company GST Number"
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
                    name="panNumber"
                    label="Company PAN"
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
                    name="companyState"
                    label="Company State"
                    rules={[
                      {
                        required: true,
                        message: intl.messages["app.pages.common.pleaseFill"],
                      },
                    ]}
                  >
                    <Select
                      className=" w-full"
                      options={states.map((stateData)=>{return{label:stateData.name, value: stateData._id}})}
                    />
                  </Form.Item>
                  
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="companyPoNo"
                    label="Company PO NO"
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
                    name="invoiceCompanyName"
                    label="Company Name on Invoice"
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
                <Col span={18}>
                  <Form.Item
                    name="invoiceCompanyAddress"
                    label="Company Address on Invoice"
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
                <Col span={24}>
                  <Form.Item
                    name="invoiceCertifyText"
                    label="Invoice Certification Text"
                    rules={[
                      {
                        required: true,
                        message: intl.messages["app.pages.common.pleaseFill"],
                      },
                    ]}
                  >
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="invoiceBottomText"
                    label="Invoice Bottom Text"
                    rules={[
                      {
                        required: true,
                        message: intl.messages["app.pages.common.pleaseFill"],
                      },
                    ]}
                  >
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>

                <Divider />
                <Col span={8}>
                  <Form.Item
                    name="referralAmount"
                    label="Referral Reward"
                  >
                    <InputNumber min={0}  addonBefore="₹" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="refereeAmount"
                    label="Referee Reward"
                  >
                    <InputNumber min={0} addonBefore="₹" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="shippingCartValue"
                    label="Shipping charge minimum cart value"
                  >
                    <InputNumber min={0} addonBefore="₹" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <h2>Top Offer Management</h2>
              <Row>
                  <Col span={8}>
                    <Form.Item
                      name="topOfferText"
                      label="Offer Text"
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
                  <Col span={8}>
                    <Form.Item
                      name="topOffer"
                      label="Select Offer"
                    >
                      <Select
                        className=" w-full"
                        options={activeOffers.map((offer)=>{return{label:offer.name, value: offer._id}})}
                        allowClear={true}
                      />
                    </Form.Item>
                  </Col>
              </Row>
              <Divider />
              <h2>Below Banner Offer Management</h2>
              <Row>
                  <Col span={8}>
                    <Form.Item
                      name="belowBannerOfferText1"
                      label="Offer Text 1"
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
                  <Col span={8}>
                    <Form.Item
                      name="belowBannerOfferText2"
                      label="Offer Text 2"
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
                  <Col span={8}>
                    <Form.Item
                      name="belowBannerOffer"
                      label="Select Offer"
                    >
                      <Select
                        className=" w-full"
                        options={activeOffers.map((offer)=>{return{label:offer.name, value: offer._id}})}
                        allowClear={true}
                      />
                    </Form.Item>
                  </Col>
              </Row>
              <Divider />
              <h2>Footer Offer Management</h2>
              <Row>
                  <Col span={8}>
                    <Form.Item
                      name="footerOfferText1"
                      label="Offer Heading"
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
                  <Col span={8}>
                    <Form.Item
                      name="footerOfferText2"
                      label="Offer Text"
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
                  <Col span={8}>
                    <Form.Item
                      name="footerOffer"
                      label="Select Offer"
                    >
                      <Select
                        className=" w-full"
                        options={activeOffers.map((offer)=>{return{label:offer.name, value: offer._id}})}
                        allowClear={true}
                      />
                    </Form.Item>
                  </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Divider />
              <Form.Item
                name="return_exchange_clause"
                label="Return Exchange Clause"
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider />
              <Form.Item
                name="shipping_policy"
                label="Shipping Policies"
              >
                <Editor form={form} fieldName="shipping_policy" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider />
              <Form.Item
                name="return_policy"
                label="Return Policies"
              >
                <Editor form={form} fieldName="return_policy" />
              </Form.Item>
            </Col>
          </Row>


















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
