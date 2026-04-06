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

  const [stoneVariantCombinations, setStoneVariantCombinations] = useState([]);


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
      .post(`${API_URL}/masters/pricing/diamond`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Price not added" + res.data.messagge
          );
        } else {
          message.success("Price Added");

          router.push("/pricing/diamond");
        }
      })
      .catch((err) => console.log(err));
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(() => {
    getDiamondVariantsPrice();
  }, []);

  const getDiamondVariantsPrice = () =>{
    axios
      .get(API_URL + "/masters/diamondWithVariantsPricing")
      .then((res) => {
        if (res.data.diamondVariants) {
            var diamondVariants = res.data.diamondVariants;
            diamondVariants = diamondVariants.filter((diamondVariant) =>diamondVariant.priceDependant==true)
            var diamondVariantPricing = res.data.diamondVariantPricing;
            if(diamondVariants.length > 0) {
              var variantsArray = diamondVariants.map((diamondVariant)=>diamondVariant.variants.map((details)=>({...details,variantName:diamondVariant.name})));
              var combinations = cartesian(...variantsArray);
              var combinations = combinations.map((combination)=>{
                var responseData = {variants:combination};
                var idArray = combination.map((list)=>list._id);
                if(diamondVariantPricing){
                  var priceExists = diamondVariantPricing.findIndex((varPrice)=>{
                    let subset = varPrice.variant_id.every(a => idArray.some(b => a === b));
                    let sameLength = varPrice.variant_id.length === idArray.length;
                    return subset && sameLength;
                  });
                  if(priceExists!=-1){
                    responseData.price = diamondVariantPricing[priceExists].price;
                  }
                }
                return responseData;
              })
              setStoneVariantCombinations(combinations)
            }
        }
      })
      .catch((err) => console.log(err));
  }

  const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

  return (
    <div>
      <Card className="card" title="Diamond Pricing">
        <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          scrollToFirstError
        >
          <Row gutter={12}>
            <Form.List name="variant_price">
              {()=>(
                <>
                  {
                    stoneVariantCombinations.map((variantCombinations, index)=>{
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
                                      `/ ct`
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

export default StonePricing;
