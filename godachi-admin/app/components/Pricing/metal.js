import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config/config";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  message,
  Divider,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Tabs,
  Tag,
} from "antd";
const { TabPane } = Tabs;
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const MetalPricing = (props) => {
  const intl = useIntl();
  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const router = useRouter();
 

  
  const [metals, setMetals] = useState([]);


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

  const onSubmit = (Data) => {
    Data["created_user"] = { name: user.name, id: user.id };
    axios
      .post(`${API_URL}/masters/pricing/metal`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Price not added" + res.data.messagge
          );
        } else {
          message.success("Price Added");

          router.push("/pricing/metal");
        }
      })
      .catch((err) => console.log(err));
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(() => {
    getMetals();
  }, []);



  const getMetals = () =>{
    axios
      .get(API_URL + "/masters/metalsWithVariants")
      .then((res) => {
        if (res.data.length > 0) {
          setMetals(res.data);
        }
      })
      .catch((err) => console.log(err));
  }

  const updateMetalPrice = (selectedMetalId) => {
    var selectedMetal = metals.filter((metal)=>metal._id===selectedMetalId)[0];
    if(selectedMetal){
      const formData = form.getFieldsValue();
      var newFieldsValue = formData;
      selectedMetal.purity.forEach((purity)=>{
        if(!newFieldsValue[selectedMetalId]["variant_price"]){
          newFieldsValue[selectedMetalId]["variant_price"]={};
        }
        newFieldsValue[selectedMetalId]["variant_price"][purity._id] = (formData[selectedMetalId]["price"] * purity.sellingPercent / 100).toFixed(2)
      });
      form.setFieldsValue(newFieldsValue)
    }
  }


  return (
    <div>
      <Card className="card" title="Metal Pricing">
        <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          scrollToFirstError
        >
          <Tabs defaultActiveKey="1">
          {
            metals.map((metal,index)=>{
              return (
                <>
                  <TabPane tab={metal.name} key={index}>
                    <Form.List name={metal._id}>
                      {()=>(
                        <>
                          <Row>
                            <Col span={24}>
                                <Form.Item
                                  label={metal.name + "Price"}
                                  name="price"
                                  rules={[
                                    {
                                      required: true,
                                      message: intl.messages["app.pages.common.pleaseFill"],
                                    },
                                  ]}
                                  initialValue={metal.price}
                                >
                                  <InputNumber addonBefore="Rs." addonAfter="/ gm" style={{width:"100%"}} onChange={()=>{updateMetalPrice(metal._id)}}/>
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.List name="variant_price">
                                  {()=>(
                                    <Row gutter={12}>
                                      {metal.purity.map((purity)=>{
                                        return (
                                          <>
                                            <Col span={6}>
                                            <Form.Item
                                              label={
                                                <div>
                                                  <span className="mr-3">Price</span>
                                                  <span>
                                                    <Tag color="blue">
                                                      {"Purity : " + purity.name}
                                                    </Tag>
                                                  </span> 
                                                </div> 
                                              }
                                              name={purity._id}
                                              rules={[
                                                {
                                                  required: true,
                                                  message: intl.messages["app.pages.common.pleaseFill"],
                                                },
                                              ]}
                                              initialValue={purity.price}
                                            >
                                              <InputNumber addonBefore="Rs." addonAfter="/ gm" style={{width:"100%"}}/>
                                            </Form.Item>
                                          </Col>
                                          </>
                                        )
                                      })}
                                    </Row>
                                  )}
                                </Form.List>
                                
                              </Col>
                              
                            </Row>
                            <Divider />
                        </>
                      )}
                      
                    </Form.List>
                  </TabPane>
                </>
              )
            })
          }
          </Tabs>

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

export default MetalPricing;
