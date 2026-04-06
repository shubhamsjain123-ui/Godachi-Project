import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import {
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
  TreeSelect,
  Collapse,
  Tag,
  Select,
  Tabs 
} from "antd";
const { Panel } = Collapse;
const { TabPane } = Tabs;
import func from "../../../util/helpers/func";
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const StonePricing = (props) => {
  const intl = useIntl();
  //var faqDetails = props?.details;
  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const router = useRouter();


  const [stones, setStones] = useState([]);
  const [stoneVariantCombinations, setStoneVariantCombinations] = useState({});
  const [stoneWeightUnit, setStoneWeightUnit] = useState({});
  const [stonePriceType, setStonePriceType] = useState({});


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
    axios
      .post(`${API_URL}/masters/pricing/stone`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Price not added" + res.data.messagge
          );
        } else {
          message.success("Price Added");

          router.push("/pricing/stone");
        }
      })
      .catch((err) => console.log(err));
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(() => {
    getStones();
  }, []);



  const getStones = () =>{
    axios
      .get(API_URL + "/masters/stonesWithVariantsPricing")
      .then((res) => {
        if (res.data.length > 0) {
          setStones(res.data);
          var fetchedStones = res.data;
          var combinationList = [];
          var initialStoneWeightUnit={};
          var initialStonePriceType={};
          fetchedStones.forEach((fetchedStone)=>{
            var stoneVariants = fetchedStone.variants.filter((variant)=>variant.priceDependant==true);
            if(stoneVariants.length > 0) {
              var variantsArray = stoneVariants.map((stoneVariant)=>stoneVariant.variants.map((details)=>({...details,variantName:stoneVariant.name})));
              var combinations = cartesian(...variantsArray);
              
              //combinationList[fetchedStone._id] = combinations;
              combinationList[fetchedStone._id] = combinations.map((combination)=>{
                var responseData = {variants:combination};
                var idArray = combination.map((list)=>list._id);
                if(fetchedStone.variant_price){
                  var variantPrices = fetchedStone.variant_price;
                  var priceExists = variantPrices.findIndex((varPrice)=>{
                    let subset = varPrice.variant_id.every(a => idArray.some(b => a === b));
                    let sameLength = varPrice.variant_id.length === idArray.length;
                    return subset && sameLength;
                  });
                  if(priceExists!=-1){
                    responseData.price = variantPrices[priceExists].price;
                  }
                }
                return responseData;
              })
              //console.log();
            }
            initialStoneWeightUnit[fetchedStone._id]=fetchedStone.weightUnit?fetchedStone.weightUnit:"ct";
            initialStonePriceType[fetchedStone._id]=fetchedStone.priceType?fetchedStone.priceType:"weight";
          })
          setStoneVariantCombinations(combinationList)
          setStoneWeightUnit(initialStoneWeightUnit)
          setStonePriceType(initialStonePriceType)
        }
      })
      .catch((err) => console.log(err));
  }
  const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

  return (
    <div>
      <Card className="card" title="Stone Pricing">
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
            stones.map((stone, index)=>{
              return(
                <>
                  <TabPane tab={stone.name} key={index}>
                  <Form.List name={stone._id}>
                  {()=>(
                    <>
                      <Row>
                        <Col span={24}>
                          <h4>{stone.name} Pricing</h4>
                          <Row gutter={12}>
                            <Col span={12}>
                              <Form.Item
                                label="Price Type"
                                name="priceType"
                                rules={[
                                  {
                                    required: true,
                                    message: intl.messages["app.pages.common.pleaseFill"],
                                  },
                                ]}
                                initialValue={stone.priceType?stone.priceType:"weight"}
                              >
                                <Select 
                                  onChange={
                                    (value)=>{
                                      setStonePriceType({
                                        ...stonePriceType,
                                        [stone._id]:value
                                      })
                                    }
                                  }
                                >
                                  <Select.Option value="weight">Weight Based</Select.Option>
                                  <Select.Option value="stone">Number Of Stones</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                label="Weight Unit"
                                name="weightUnit"
                                rules={[
                                  {
                                    required: true,
                                    message: intl.messages["app.pages.common.pleaseFill"],
                                  },
                                ]}
                                initialValue={stone.weightUnit?stone.weightUnit:"ct"}
                              >
                                <Select 
                                  onChange={
                                    (value)=>{
                                      setStoneWeightUnit({
                                        ...stoneWeightUnit,
                                        [stone._id]:value
                                      })
                                    }
                                  }
                                >
                                  <Select.Option value="gm">Gram (gm)</Select.Option>
                                  <Select.Option value="ct">Carat (ct)</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                          
                        </Col>
                        <Col span={24}>
                          <Row gutter={12}>
                                {
                                  stoneVariantCombinations[stone._id]?
                                  <Form.List name="variant_price">
                                    {()=>(
                                      <>
                                        {
                                          stoneVariantCombinations[stone._id].map((variantCombinations, index)=>{
                                            return (
                                              <>
                                                <Form.List name={index}>
                                                  {()=>(
                                                    <Col span={12}>
                                                      <Form.Item
                                                        name="variant_id"
                                                        hidden={true}
                                                        initialValue={variantCombinations.variants.map((variantDetails)=>variantDetails._id)}
                                                      >
                                                        <Select mode="multiple">
                                                          {
                                                            variantCombinations.variants.map((variantDetails)=>{
                                                              return (
                                                                <Select.Option value={variantDetails._id}>{variantDetails.name}</Select.Option>
                                                              )
                                                            })
                                                          }
                                                        </Select>
                                                      </Form.Item>
                                                    <Form.Item
                                                      label={
                                                        <div>
                                                          <span className="mr-3">Price</span>
                                                          <span>
                                                          {
                                                            variantCombinations.variants.map((variantDetails)=>{
                                                              return(<Tag color="blue">
                                                              {variantDetails.variantName+ " : " + variantDetails.name}
                                                            </Tag>)
                                                            })
                                                          }
                                                          </span> 
                                                        </div> 
                                                      }
                                                      name="price"
                                                      initialValue={variantCombinations.price?variantCombinations.price:''}
                                                    >
                                                      <InputNumber 
                                                        addonBefore="Rs." 
                                                        addonAfter={
                                                          stonePriceType[stone._id] == "stone" ? "/ stone" : `/ ${stoneWeightUnit[stone._id]}`
                                                        } 
                                                        style={{width:"100%"}} 
                                                      />
                                                    </Form.Item>
                                                  </Col>
                                                  )}
                                                </Form.List>
                                                
                                              </>
                                            )
                                          })
                                        }
                                      </>
                                    )}
                                  </Form.List>
                                  : 
                                  <Col span={24}>
                                    <Form.Item
                                      label="Price"
                                      name="price"
                                      initialValue={stone.price?stone.price:''}
                                    >
                                      <InputNumber 
                                        addonBefore="Rs." 
                                        addonAfter={
                                          stonePriceType[stone._id] == "stone" ? "/ stone" : `/ ${stoneWeightUnit[stone._id]}`
                                        } 
                                        style={{width:"100%"}} 
                                      />
                                    </Form.Item>
                                  </Col>
                                }
                                {/*  {stone.variants.map((variant)=>{
                                  return (
                                    <>
                                      <Col span={6}>
                                      <Form.Item
                                        label={variant.name + " Price"}
                                        name={variant._id}
                                        rules={[
                                          {
                                            required: true,
                                            message: intl.messages["app.pages.common.pleaseFill"],
                                          },
                                        ]}
                                      >
                                        <InputNumber addonBefore="Rs." addonAfter="/ gm" style={{width:"100%"}}/>
                                      </Form.Item>
                                    </Col>
                                    </>
                                  )
                                })} */}
                              </Row>
                          
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

export default StonePricing;
