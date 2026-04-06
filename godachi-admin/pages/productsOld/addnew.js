import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../config/config";
import router from "next/router";
import dynamic from "next/dynamic";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Tag,
  TreeSelect,
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
  Table,
  Typography 
} from "antd";
import func from "../../util/helpers/func";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";

const { Title } = Typography;

const Default = ({ getCategories = [] }) => {
  const Editor = dynamic(() => import("../../app/components/Editor/index"));
  const intl = useIntl();
  const [state, seTstate] = useState({ categories_id: null, type: 0 });
  const [dataCategories, seTdataCategories] = useState(getCategories);
  const [dataVariants, seTdataVariants] = useState([]);
  const [variantsOp, seTvariantsOp] = useState({ options: [""] });
  const [dataBrands, seTdataBrands] = useState([]);
  const [meta, seTmeta] = useState([]);
  const { user } = useSelector(({ login }) => login);
  const [metals, setMetals] = useState([]);
  const [metalsList, setMetalsList] = useState([]);
  const [metalDetails, setMetalDetails] = useState(null);
  const [stones, setStones] = useState([]);
  const [stonesList, setStonesList] = useState([]);
  const [stoneAttributes, setStoneAttributes] = useState([]);
  const [priceType, setPriceType] = useState("fixed");
  const [metalPurityList, setMetalPurityList] = useState([]);
  const [metalColorList, setMetalColorList] = useState([]);
  const [productComponents, setProductComponents] = useState([]);
  const [form] = Form.useForm();
  const getDataBrands = () => {
    axios
      .get(`${API_URL}/brands`)
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].title,
              value: res.data[i]._id,
            });
          }
          seTdataBrands(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  };

  const getMetals = () =>{
    axios
      .get(API_URL + "/masters/metalsWithVariants")
      .then((res) => {
        if (res.data.length > 0) {
          setMetals(res.data);
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setMetalsList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }
  const getMetalColors = () =>{
    axios
      .get(API_URL + "/masters/metalcolors")
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setMetalColorList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }
  const handleMetalChange = (value) =>{
    if(!value)
      return setMetalDetails(null);

    var selectedMetal = metals.filter((metal)=>metal._id===value)[0];
    var purities = [];
    selectedMetal.purity.forEach((metalPurity)=>{
      purities.push({
        label: metalPurity.name,
        value: metalPurity._id,
      });
      /*variants.push( <Col span={6}><Form.Item name={metalVariant._id} label={metalVariant.name}>
                <Select
                  style={{ width: "100%" }}
                  options={metalVariant.variants}
                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                />
              </Form.Item></Col>)*/
    });
    setMetalPurityList(purities)
  }
  const handleStoneChange = (value, key) =>{
    if(!value)
      return setStoneAttributes(Object.values({...stoneAttributes, [key]:[]}));

    var selectedStone = stones.filter((stone)=>stone._id===value)[0];
    var variants = [];
   /* selectedStone.variants.forEach((stoneVariant)=>{
      variants.push( <Col span={6}><Form.Item name={stoneVariant._id} label={stoneVariant.name}>
                <Select
                  style={{ width: "100%" }}
                  options={stoneVariant.variants}
                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                />
              </Form.Item></Col>)
    });
    setStoneDetails(variants.length>0?variants:null)*/
    setStoneAttributes(Object.values({...stoneAttributes, [key]:selectedStone.variants}));
  }
  const getStones = () =>{
    axios
      .get(API_URL + "/masters/stonesWithVariants")
      .then((res) => {
        if (res.data.length > 0) {
          setStones(res.data);
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setStonesList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }

  // componentDidMount = useEffect
  useEffect(() => {
    getDataCategory();
    getDataVariants();
    getDataBrands();
    getMetals();
    getStones();
    getMetalColors();
    console.log("price type", priceType);
  }, []);

  useEffect(() => {
    console.log("price type", priceType);
  }, [priceType]);

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

  const onSubmit = (Data) => {
    Data["created_user"] = { name: user.name, id: user.id };

    axios
      .post(`${API_URL}/products/add`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            intl.messages["app.pages.product.notAdded"] + res.data.messagge
          );
        } else {
          message.success(intl.messages["app.pages.product.added"]);

          router.push("/products/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const getDataCategory = () => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        if (res.data.length > 0) {
          const data = func.getCategoriesTreeOptions(res.data, true);
          seTdataCategories(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const getDataVariants = () => {
    axios
      .get(`${API_URL}/variants`)
      .then((res) => {
        if (res.data.length > 0) {
          const details = [];
          for (const i in res.data) {
            details.push({
              label: res.data[i].name,
              value: res.data[i].name,
            });
          }
          seTdataVariants({ options: details, data: res.data });
        }
      })
      .catch((err) => console.log(err));
  };

  let getProducts = (arrays) => {
    if (arrays.length === 0) {
      return [[]];
    }

    let results = [];

    getProducts(arrays.slice(1)).forEach((product) => {
      arrays[0].forEach((value) => {
        results.push([value].concat(product));
      });
    });

    return results;
  };

  let getAllCombinations = (attributes) => {
    let attributeNames = Object.keys(attributes);

    let attributeValues = attributeNames.map((name) => attributes[name]);

    return getProducts(attributeValues).map((product) => {
      const obj = {};
      attributeNames.forEach((name, i) => {
        obj[name] = product[i];
      });
      return obj;
    });
  };

  const selectVariants = () => {
    const formData = form.getFieldsValue();

    const varib = [];
    if (formData.variants.length > 0) {
      for (const i in formData.variants) {
        const varib2 = [];
        for (const j in formData.variants[i].value) {
          varib2.push(formData.variants[i].value[j]);
        }
        varib[formData.variants[i].name] = varib2;
      }

      const objToArr = getAllCombinations(varib);
      const DataS = [];
      for (const i in objToArr) {
        const variantsP = Object.entries(objToArr[i]).map(
          ([key, initialValue]) => ({ key, initialValue })
        );
        DataS.push(variantsP);
      }
      seTmeta(DataS);
    } else {
      seTmeta([]);
    }
  };

  const updateComponents = () => {
    const formData = form.getFieldsValue();
    const compList = [];
    if (formData.components.length > 0) {
      for (const i in formData.components) {
        let shortName = [];
        let componentName;
        if(i==0 && formData.components[i].metalType){
          var selectedMetal = metals.filter((metal)=> metal._id===formData.components[i].metalType)[0];
          if(formData.components[i].metalPurity){
            var selectedPurity = selectedMetal.purity.filter((purity)=>purity._id == formData.components[i].metalPurity)[0]
            shortName.push(selectedPurity.name)
          }
          componentName = selectedMetal.name

        }
        else if(formData.components[i].stoneType){
          componentName = stones.filter((stone)=> stone._id===formData.components[i].stoneType)[0].name;
          var componentVariants = formData.components[i].stoneVariants;
          /*for (const [key, value] of Object.entries(formData.components[i])) {
            if(!["componentType","weight","noOfStones", "stoneType"].includes(key) && value){
              shortName.push(value)
            }
          }*/
          if(componentVariants){
            for (const [key, value] of Object.entries(componentVariants)) {
              if(value)
                shortName.push(value);
            }
          }
          
        }
        if(componentName){
          if(!productComponents[i])
            compList[i] = { };
          else
            compList[i] = productComponents[i];

          compList[i].shortName = `${componentName} (${shortName.join(" - ")})`;
          if(formData.components[i]?.weight){
            compList[i].weight = `${formData.components[i]?.weight} ${formData.components[i]?.weightUnit}`;
          }
        }
       
        
      }
      setProductComponents(compList);
    } else {
      setProductComponents([]);
    }
  }

  const updatePrice = () =>{
    const formData = form.getFieldsValue();
    let totalPrice=0;
    let totalFinalPrice=0;
    var newFieldsValue = formData;
    if(priceType=="distributed"){
      //newFieldsValue.priceComponents=[];
      var priceComponents = formData.priceComponents;
      priceComponents.forEach((priceComponent,index)=>{
        var priceType = priceComponent.priceType;
        if(priceType=="weight"){
          if(priceComponent.weight && priceComponent.rate){
            priceComponent.price = priceComponent.weight*priceComponent.rate;
          }else{
            priceComponent.price = 0;
          }
        }
        var {price, finalPrice} = calculateRowPrice(priceComponent);
        totalPrice+=price;
        totalFinalPrice+=finalPrice;
        //newFieldsValue.priceComponents[index]={};
        newFieldsValue.priceComponents[index].finalPrice = finalPrice;
      })

      var makingComponent = formData.making;
      var {price, finalPrice} = calculateRowPrice(makingComponent);
      totalPrice+=price;
      totalFinalPrice+=finalPrice;
      //newFieldsValue.making = {}
      newFieldsValue.making.finalPrice = finalPrice;
    }
    else{
      totalPrice = formData.price?formData.price:0;
      var {price, finalPrice} = calculateRowPrice({
        price: formData.price,
        discount: formData.discount,
        discountType: formData.discountType,
        finalPrice: formData.finalPrice
      });
      console.log(price,finalPrice);
      totalFinalPrice+=finalPrice;
      //newFieldsValue.finalPrice = finalPrice;
    }
    var gst = parseInt(totalFinalPrice * (5/100));
    var grandTotal = totalFinalPrice+gst;
    newFieldsValue.price = totalPrice;
    newFieldsValue.finalPrice = totalFinalPrice;
    newFieldsValue.gst = gst;
    newFieldsValue.grandTotal = grandTotal;
    /*var priceDiscount = formData.discount;
    var priceDiscountType = formData.discountType;
    let finalPrice = totalPrice;
    if(priceDiscount){
      if(priceDiscountType=="percent")
        finalPrice = parseInt(totalPrice*(1-(priceDiscount/100)));
      else {
        finalPrice= parseInt(totalPrice-priceDiscount)
      }
    }
    formData.finalPrice = finalPrice;
    var gst = parseInt(finalPrice * (5/100));
    formData.gst = gst;
    var grandTotal = finalPrice+gst;
    formData.grandTotal = grandTotal;
    var newFieldsValue = {
      finalPrice: finalPrice,
      gst: gst,
      grandTotal: grandTotal
    }*/
    console.log(newFieldsValue);
    form.setFieldsValue(newFieldsValue)
  }

  const calculateRowPrice = (row) =>{
    var price = row.price?row.price:0;
    var priceDiscount = row.discount;
    var priceDiscountType = row.discountType;
    let finalPrice = price;
    if(priceDiscount){
      if(priceDiscountType=="percent")
        finalPrice = parseInt(price*(1-(priceDiscount/100)));
      else {
        finalPrice= parseInt(price-priceDiscount)
      }
    }
    return {
      price: price,
      finalPrice:finalPrice
    }
  }
  return (
    <div>
      <Form
        layout = "vertical"
        form={form}
        name="add"
        onFinishFailed={onFinishFailed}
        onFinish={onSubmit}
        fields={[
          {
            name: "categories_id",
            value: state.categories_id,
          },
          {
            name: "title",
            value: state.title,
          },

          {
            name: "description",
          },
          {
            name: "order",
          },

          {
            name: "seo",
            value: state.seo,
          },
          {
            name: "visible",
            value: true,
          },
          {
            name: "before_price",
            value: 0,
          },
          {
            name: "price",
            value: 0,
          },
          {
            name: "qty",
            value: 100,
          },
          {
            name: "saleqty",
            value: 0,
          },
        ]}
        initialValues={{ components: [""] }}
        scrollToFirstError
      >
        <Card className="card" title={intl.messages["app.pages.product.addd"]}>
          <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="categories_id"
                  label={intl.messages["app.pages.common.category"]}
                >
                  <TreeSelect
                    style={{ width: "100%" }}
                    value={state.categories_id}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    treeData={dataCategories}
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
                    onChange={(newValue) => {
                      seTstate({ ...state, categories_id: newValue });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="productCode"
                  label="Product Code"
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
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="productName"
                  label="Product Name"
                  rules={[
                    {
                      required: true,
                      message: intl.messages["app.pages.common.pleaseFill"],
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      var value= e.target.value
                      seTstate({
                        ...state,
                        title: value,
                        seo: func.replaceSeoUrl(value),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="seo" label="Seo Url" value={state.seo}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>




            
          
          
         
          <Form.Item
            name="description_short"
            label={intl.messages["app.pages.common.descriptionShort"]}
            rules={[
              {
                required: true,
                message: intl.messages["app.pages.common.pleaseFill"],
              },
            ]}
          >
            <Input.TextArea rows={1} />
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
            <Editor form={form} />
          </Form.Item>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="styleNo" label="Style Number">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="height" label="Product Height">
                <InputNumber 
                  addonAfter={
                    <Form.Item name="heightUnit" initialValue="cm" noStyle>
                      <Select>
                        <Select.Option value="cm">cm</Select.Option>
                        <Select.Option value="mm">mm</Select.Option>
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="width" label="Product Width">
                <InputNumber
                  addonAfter={
                    <Form.Item name="widthUnit" initialValue="cm" noStyle>
                      <Select>
                        <Select.Option value="cm">cm</Select.Option>
                        <Select.Option value="mm">mm</Select.Option>
                      </Select>
                    </Form.Item>
                  }
                 />
              </Form.Item>
              
            </Col>
            <Col span={6}>
              <Form.Item name="totalWeight" label="Total Weight">
                <InputNumber
                  addonAfter={
                    <Form.Item name="totalWeightUnit" initialValue="gm" noStyle>
                      <Select>
                        <Select.Option value="gm">gm</Select.Option>
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6}>
             
            </Col>
          </Row>
          {/*<Row gutter={24}>
              <Col span={12}>

              </Col>
              <Col span={12}>

              </Col>
            </Row>*/}
          {/*<Form.Item name="saleqty" initialValue={0} className="invisible">
            <Input />
          </Form.Item>*/}
          

          {/*<Form.Item
            name="brands_id"
            label={intl.messages["app.pages.common.brands"]}
          >
            <Select
              style={{ width: "100%" }}
              options={dataBrands}
              placeholder={intl.messages["app.pages.common.pleaseSelect"]}
            />
          </Form.Item>*/}
          <Divider />
          {/*<Form.Item
            name="type"
            label={intl.messages["app.pages.product.productType"]}
          >
            <Select
              style={{ width: "100%" }}
              initialValue={false}
              options={[
                {
                  label: intl.messages["app.pages.product.simple"],
                  value: false,
                },
                {
                  label: intl.messages["app.pages.product.variant"],
                  value: true,
                },
              ]}
              placeholder={intl.messages["app.pages.common.pleaseSelect"]}
              onChange={(newValue) => {
                seTstate({ ...state, type: newValue });
              }}
            />
          </Form.Item>*/}
        </Card>

        <Card
          className="card"
          title="Product Components"
        >
          <Form.List name="components">
            {(fields, { add, remove }) => (
              <>
               
                {fields.map((field, i) => (
                  <>
                  {
                    i==0 &&
                    <>
                      <Form.Item name={[field.name, "componentType"]} hidden={true} initialValue="metal">
                        <Input  />
                      </Form.Item>
                      <Row gutter={12}>
                        <Col span={22}>
                          <Row gutter={12}>
                            <Col span={6}>
                              <Form.Item name={[field.name, "metalType"]} fieldKey={0} label="Metal Type">
                                <Select
                                  style={{ width: "100%" }}
                                  options={metalsList}
                                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                                  onChange={
                                    (value)=>{
                                      handleMetalChange(value);
                                      updateComponents();
                                    }}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item name={[field.name, "metalPurity"]} fieldKey={0} label="Metal Purity">
                                <Select
                                  style={{ width: "100%" }}
                                  options={metalPurityList}
                                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                                  onChange={updateComponents}
                                  
                                />
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item name={[field.name, "metalColor"]} fieldKey={0} label="Metal Color">
                                <Select
                                  style={{ width: "100%" }}
                                  options={metalColorList}
                                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item name={[field.name, "weight"]} fieldKey={0} label="Metal Weight">
                                <InputNumber 
                                  onChange={updateComponents}
                                  addonAfter={
                                    <Form.Item name={[field.name, "weightUnit"]} initialValue="gm" noStyle>
                                      <Select onChange={updateComponents}>
                                        <Option value="gm">gm</Option>
                                      </Select>
                                    </Form.Item>
                                  }
                                />
                              </Form.Item>
                            </Col>
                           
                          </Row>
                        </Col>
                      </Row>
                      
                      <Divider />
                    </>
                  }
                  {
                    i>0 &&
                    <>
                      <Form.Item name="componentType" hidden={true}>
                        <Input value="stone" />
                      </Form.Item>
                      <Row gutter={12}>
                        <Col span={22}>
                          <Row gutter={12}>
                            <Col span={6}>
                              <Form.Item 
                                name={[field.name, "stoneType"]} 
                                label="Stone Type"
                              >
                                <Select
                                  style={{ width: "100%" }}
                                  options={stonesList}
                                  placeholder="Please Select Stone Type"
                                  onChange={
                                    (value)=>{
                                      handleStoneChange(value,i);
                                      updateComponents();
                                    }
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item name={[field.name, "noOfStones"]} label="No. Of Stones">
                                <InputNumber style={{width:"100%"}}/>
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item name={[field.name, "weight"]} label="Stone Weight">
                                <InputNumber 
                                  onChange={updateComponents}
                                  addonAfter={
                                    <Form.Item name={[field.name, "weightUnit"]} initialValue="ct" noStyle>
                                      <Select  onChange={updateComponents}>
                                        <Option value="gm">gm</Option>
                                        <Option value="ct">ct</Option>
                                      </Select>
                                    </Form.Item>
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Form.List name={[field.name, "stoneVariants"]} key={i}>
                              {()=>(
                                <>
                                  {stoneAttributes[i]?.map((stoneVariant)=>(
                                    <Col span={6} key={stoneVariant._id}>
                                      <Form.Item name={stoneVariant.name} label={stoneVariant.name}>
                                        <Select
                                          style={{ width: "100%" }}
                                          options={stoneVariant.variants}
                                          placeholder="Select"
                                          onChange={updateComponents}
                                        />
                                      </Form.Item>
                                    </Col>
                                  ))}
                                </>
                              )}
                            </Form.List>
                            
                          </Row>
                        </Col>
                        <Col span={2}>
                          <Button
                            type="primary"
                            size="sm"
                            shape="circle"
                            onClick={() => {
                              remove(field.name);
                              updateComponents();
                            }}
                            icon={<DeleteOutlined />}
                          />
                        </Col>
                      </Row>
                      <Divider />
                    </>
                  }
                   
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
                    Add Stone
                  </Button>
                </Form.Item>
                <Divider />
              </>
            )}
          </Form.List>
          
        </Card>

      

        <Card
          className="card"
          title="Price Information"
        >
          <Form.Item
            name="priceType"
            label="Price Type" 
            initialValue={priceType}
          >
            <Select
              
              onChange={(value)=>{setPriceType(value)}}
              placeholder="Please Select"
            >
              <Select.Option value="fixed"> Fixed Price </Select.Option>
              <Select.Option value="distributed"> Distributed Price </Select.Option>
            </Select>
            
          </Form.Item>

          <Row gutter={12}>
            <Col span = {6}>
              <Title level={5}>Particular</Title>
            </Col>
            <Col span = {3}>
              <Title level={5}>Rate</Title>
            </Col>
            <Col span = {3}>
              <Title level={5}>Weight</Title>
            </Col>
            <Col span = {3}>
              <Title level={5}>Price Type</Title>
            </Col>
            <Col span = {3}>
              <Title level={5}>Price</Title>
            </Col>
            <Col span = {3}>
              <Title level={5}>Discount</Title>
            </Col>
            <Col span = {3}>
              <Title level={5}>Final Price</Title>
            </Col>
          </Row>
          { priceType=="distributed" &&
            <>
              <Form.List name="priceComponents">
                {() => (
                  <>
                    {productComponents?.map((field, i) => (
                      <Form.List name={i} key={i}>
                        {() => (
                          <> 
                          <Row gutter={12}>
                            <Col span = {6}>
                              {field.shortName}
                              <Form.Item name="shortName" initialValue={field.shortName} hidden={true}>
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col span = {3}>
                              
                            </Col>
                            <Col span={3}>
                              {field.weight}
                            </Col>
                            <Col span = {3} >
                              <Form.Item name="priceType" initialValue="fixed" onChange={updatePrice}>
                                <Select  >
                                  <Select.Option value="fixed">Fixed</Select.Option>
                                  <Select.Option value="weight">Weight Based</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item
                                name="price"
                              >
                                <InputNumber addonBefore="Rs." style={{width:"100%"}} onChange={updatePrice}/>
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item name="discount" >
                                <InputNumber  
                                  onChange={updatePrice}
                                  addonAfter={
                                    <Form.Item name="discountType" initialValue="percent" noStyle>
                                      <Select  onChange={updatePrice}>
                                        <Select.Option value="percent">%</Select.Option>
                                        <Select.Option value="fixed">Rs</Select.Option>
                                      </Select>
                                    </Form.Item>
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item
                                name="finalPrice"
                              >
                                <InputNumber addonBefore="Rs." style={{width:"100%"}} />
                              </Form.Item>
                            </Col>
                          </Row>
                          </>
                        )}
                      </Form.List>
                      
                    ))}
                  </>
                )}
              </Form.List>
              <Form.List name="making">
                {() => (
                  <> 
                  <Row gutter={12}>
                    <Col span = {6}>
                      Making Charges
                    </Col>
                    <Col span={3}>
                      
                    </Col>
                    <Col span={3}>
                      
                    </Col>
                    <Col span={3}>
                      
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        name="price"
                      >
                        <InputNumber addonBefore="Rs." style={{width:"100%"}} onChange={updatePrice}/>
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name="discount" >
                        <InputNumber 
                          onChange={updatePrice} 
                          addonAfter={
                            <Form.Item name="discountType" initialValue="percent" noStyle>
                              <Select  onChange={updatePrice}>
                                <Select.Option value="percent">%</Select.Option>
                                <Select.Option value="fixed">Rs</Select.Option>
                              </Select>
                            </Form.Item>
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        name="finalPrice"
                      >
                        <InputNumber addonBefore="Rs." style={{width:"100%"}} />
                      </Form.Item>
                    </Col>
                  </Row>
                  </>
                )}
              </Form.List>
              
            </>
          }
          
          <Row gutter={12}>
            <Col span = {6}>
              Total Price
            </Col>
            <Col span={3}>
              
            </Col>
            <Col span={3}>
              
            </Col>
            <Col span={3}>
              
            </Col>
            <Col span={3}>
              <Form.Item
                name="price"
              >
                <InputNumber addonBefore="Rs." style={{width:"100%"}} onChange={updatePrice} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="discount" >
                <InputNumber  
                  onChange={updatePrice}
                  addonAfter={
                    <Form.Item name="discountType" initialValue="percent" noStyle>
                      <Select  onChange={updatePrice}>
                        <Select.Option value="percent">%</Select.Option>
                        <Select.Option value="fixed">Rs</Select.Option>
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                name="finalPrice"
              >
                <InputNumber addonBefore="Rs." style={{width:"100%"}} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span = {6}>
              Gst (5%)
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Form.Item
                name="gst"
              >
                <InputNumber addonBefore="Rs." style={{width:"100%"}} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span = {6}>
              Grand Total
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Form.Item
                name="grandTotal"
              >
                <InputNumber addonBefore="Rs." style={{width:"100%"}} />
              </Form.Item>
            </Col>
          </Row>
         
          
        </Card>
        <Card className="card">
          <Form.Item className="float-right">
            <Button type="primary" htmlType="submit">
              <IntlMessages id="app.pages.common.save" />
            </Button>
          </Form.Item>
        </Card>
      </Form>
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
    const geTdataCategoriesManipulate = [];
    if (getDataCategories.data.length > 0) {
      geTdataCategoriesManipulate.push(
        func.getCategoriesTreeOptions(getDataCategories.data, true)
      );
    }
    return { getCategories: geTdataCategoriesManipulate };
  }
};

export default Default;
