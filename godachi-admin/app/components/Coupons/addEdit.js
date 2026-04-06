import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import moment from 'moment';
import {
  Upload,
  Image,
  Space,
  Button,
  Card,
  message,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  DatePicker,
  Drawer,
  Table,
  Typography,
  Select,
  TreeSelect
} from "antd";
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";
import func from "../../../util/helpers/func";
import SearchProducts from "./searchProducts"
import Price from "../Price"
const Default = ({getData = [], id=null,getCategories = []}) => {
  const intl = useIntl();
    console.log(id)
  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();
  const [state, seTstate] = useState(getData);
  const [fields, seTfields] = useState(
    Object.entries(getData).map(([name, value]) => ({ name, value }))
  );

  const [categoriesList, setCategoriesList] = useState(getCategories);
  const [couponType, setCouponType] = useState(null);
  const [couponValueType, setCouponValueType] = useState("percent")
  const [userList, setUserList] = useState([])
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

  const onSubmit = async (Data) => {
    Data["created_user"] = { name: user.name, id: user.id };
    /* console.log(Data);
    return; */
    axios
      .post(`${API_URL}/coupons/add`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Coupon not added" + res.data.messagge
          );
        } else {
          message.success("Coupon Added");

          router.push("/coupons/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const getDataCategory = () => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        if (res.data.length > 0) {
          const data = func.getCategoriesTreeOptions(res.data, true);
          setCategoriesList(data);
        }
      })
      .catch((err) => console.log(err));
  }; 
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  /* const onDateSelected = (date)=>{
    setDateSelected(date?date:false);
  } */

  const checkUniqueCouponCode = async (rule, value) =>{
    if(!value){
      return Promise.reject("Please");
    }
    else{
      var request = {
        couponCode: value.trim()
      }
      if(id)
        request.couponId = id;
      try{
        var axiosResponse = await axios.post(API_URL + "/coupons/checkCouponCodeAvailable",request)
        if(axiosResponse.data){
          if(axiosResponse.data.success)
            return Promise.resolve();
        }
      }
      catch(error){
        console.log(error)
      }
      return Promise.reject("Coupon Code Already Taken")
    }
  }
 
  const handleSearch = (searchValue) => {
    console.log(searchValue)
    axios
      .post(`${API_URL}/customers/search`,{search: searchValue})
      .then((res) => {
        if (res.data.length > 0) {
            setUserList(res.data.map((list)=>{
                return {
                    label: list.name,
                    value: list._id
                }
            }))
        }
        else{
            setUserList([])
        }
      })
      .catch((err) => console.log(err));
    
  };

  const handleChange = (newValue) => {
    //setValue(newValue);
  };
  async function getDataFc() {
    await axios
      .get(`${API_URL}/coupons/${id}`)
      .then((response) => {
        var output = response.data;
        output.couponValidity = [
                                moment(output.couponValidity[0]),
                                moment(output.couponValidity[1])
                            ];
        seTstate(output);
        seTfields(
          Object.entries(output).map(([name, value]) => ({ name, value }))
        );

        setCouponType(output.couponType);
        setCouponValueType(output.offerType);
        
        
      })
  }

  useEffect(() => {
    getDataCategory();
    if(id){
        getDataFc();
    }
  }, []);
  return (
    <div>
      <Card className="card" title={`${id?"Edit":"Create"} Coupon`}>
        <Form
          layout="vertical"
          form={form}
          name={id?"edit":"add"}
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          scrollToFirstError
        >
            <Form.Item name="_id" hidden={true}>
                <Input  />
            </Form.Item>
            <Row gutter={12}>
                <Col span={6}>
                    <Form.Item
                        name="couponName"
                        label="Coupon Name"
                        rules={[
                        {
                            required: true,
                            message: "Please fill this input.",
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="couponCode"
                        label="Coupon Code"
                        rules={[
                            {
                                required: true,
                            },
                            { validator: checkUniqueCouponCode },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="couponValidity"
                        label="Coupon Validity"
                        rules={[
                        {
                            required: true,
                            message: "Please fill this input.",
                        },
                        ]}
                    >
                        <RangePicker 
                            style={{width:"100%"}}
                            format='DD-MMM-YYYY'
                            disabledDate={(current)=>current && current < moment().startOf('day')}
                            //onChange={onDateSelected}
                        />
                    </Form.Item>
                </Col>
                
                <Col span={6}>
                    <Form.Item
                        name="couponType"
                        label="Applicable On"
                        rules={[
                        {
                            required: true,
                            message: "Please fill this input.",
                        },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            options={[
                                {label:"General", value:"all"},
                                {label:"Category", value:"category"},
                                {label:"Users", value:"user"},
                            ]}
                            onChange={(value)=>setCouponType(value)}
                            placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    {
                        couponType=="category" &&
                        <Form.Item
                            name="applicableOnCategories"
                            label="Select Categories"
                            rules={[
                                {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                                },
                            ]}
                        >
                            <TreeSelect
                                treeData={categoriesList}
                                placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                                treeDefaultExpandAll
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                                                optionA.children
                                                                    .toLowerCase()
                                                                    .localeCompare(optionB.children.toLowerCase())
                                }
                                allowClear
                                multiple
                            />
                        </Form.Item>
                    }
                    {
                        couponType=="user" &&
                        <Form.Item
                            name="applicableOnUsers"
                            label="Search Users"
                            rules={[
                                {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                                },
                            ]}
                        >
                             <Select
                                mode="multiple"
                                showSearch
                                placeholder="Search Users"
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onSearch={handleSearch}
                                onChange={handleChange}
                                notFoundContent={"Sorry No User Found"}
                                options={userList}
                                allowClear
                            />
                        </Form.Item>
                       
                    }
                    
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="offerValue"
                        label="Coupon Value"
                    >
                        <InputNumber 
                            style={{width: '100%'}} 
                            addonAfter={
                                <Form.Item name="offerType" noStyle initialValue="percent">
                                  <Select  onChange={(value)=>setCouponValueType(value)}>
                                    <Select.Option value="percent">%</Select.Option>
                                    <Select.Option value="fixed">Rs</Select.Option>
                                  </Select>
                                </Form.Item>
                              }
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Minimum Cart Value"
                        name="minCartValue"
                        rules={[
                            {
                                required: true,
                                message: "Please fill this input.",
                            },
                        ]}
                    >
                        <InputNumber 
                            style={{width: '100%'}} 
                            addonBefore="Rs."
                        />
                    </Form.Item>
                </Col>
                {
                    couponValueType=="percent" &&
                    <Col span={6}>
                        <Form.Item
                            label="Maximum Discount"
                            name="maxDiscount"
                        >
                            <InputNumber 
                                style={{width: '100%'}} 
                                addonBefore="Rs."
                            />
                        </Form.Item>
                    </Col>
                }
                
                <Col span={24}>
                    <Form.Item
                        label="Terms & Conditions"
                    >
                        <TextArea rows={4} placeholder="Terms & Conditions" />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    {id?"Update":"Save"}
                </Button>
            </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Default;
