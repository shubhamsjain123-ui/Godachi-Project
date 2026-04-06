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
  Select
} from "antd";
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";
import SearchProducts from "./searchProducts"
import Price from "../Price"
const Default = ({getData = [], id=null,}) => {
  const intl = useIntl();

  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();
  const [state, seTstate] = useState(getData);
  const [fields, seTfields] = useState(
    Object.entries(getData).map(([name, value]) => ({ name, value }))
  );
  const [isDateSelected,setDateSelected] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [displaySave, seTdisplaySave] = useState(true);
  const [defaultDiscount, setDefaultDiscount] = useState(null);
  const [displayOffer, setDisplayOffer] = useState(null);
  const router = useRouter();

  // componentDsearchMount = useEffect
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
    if(selectedProducts.length==0){
        return message.error("Please Select atleast one Product to continue");
    }
    Data["created_user"] = { name: user.name, id: user.id };
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
    Data["products"] = selectedProducts;
    axios
      .post(`${API_URL}/offers/add`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Offer not added" + res.data.messagge
          );
        } else {
          message.success("Offer Added");

          router.push("/offers/list");
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const onDateSelected = (date)=>{
    setDateSelected(date?date:false);
  }
  const onProductSelect = (product) =>{
    var addProduct={
        key: product._id,
        variant: product._id,
        productName: product.productName,
        productCode: product.productCode,
        mrp: product.mrp,
        sellingPrice: product.sellingPrice
    }
    
    const price= addProduct.sellingPrice;
    let discountedPrice= price;
    let offerPercent = 0;
    let offerValue = 0;
    if(defaultDiscount){
        if(displayOffer=="percent"){
            discountedPrice = ((1-(defaultDiscount/100))*price).toFixed(2);
            offerPercent=defaultDiscount;
            offerValue = (price-discountedPrice).toFixed(2);
        }
        else if(displayOffer=="value"){
            discountedPrice = price - defaultDiscount;
            offerPercent=(defaultDiscount/price*100).toFixed(2);
            offerValue = defaultDiscount;
        }
    }
    setSelectedProducts([
        ...selectedProducts,
        {
            ...addProduct,
            offerPercent,
            offerValue,
            discountedPrice,
        }
    ])
 }

const onBulkUpdate = (products, removedProductKeys)=>{
    if(products.length>0){
        var updatedProducts = products.map((product)=>{
            const price= product.sellingPrice;
            let discountedPrice= price;
            let offerPercent = 0;
            let offerValue = 0;
            if(defaultDiscount){
                if(displayOffer=="percent"){
                    discountedPrice = ((1-(defaultDiscount/100))*price).toFixed(2);
                    offerPercent=defaultDiscount;
                    offerValue = (price-discountedPrice).toFixed(2);
                }
                else if(displayOffer=="value"){
                    discountedPrice = price - defaultDiscount;
                    offerPercent=(defaultDiscount/price*100).toFixed(2);
                    offerValue = defaultDiscount;
                }
            }
            return{
                key: product._id,
                variant: product._id,
                productName: product.productName,
                productCode: product.productCode,
                mrp: product.mrp,
                sellingPrice: product.sellingPrice,
                offerPercent,
                offerValue,
                discountedPrice,
            }
        })
        setSelectedProducts([
            ...selectedProducts,
            ...updatedProducts
        ])
    }
    if(removedProductKeys.length>0){
        setSelectedProducts(
            (selectedProducts)=>selectedProducts.filter((selectedProduct)=>!removedProductKeys.includes(selectedProduct.key))
        )
    }
}

 const onSelectChange = (product, selected)=>{
    var addProduct={
        key: product._id,
        variant: product._id,
        productName: product.productName,
        productCode: product.productCode,
        mrp: product.mrp,
        sellingPrice: product.sellingPrice
    }
    if(selected){
        //add to selected products
        const price= addProduct.sellingPrice;
        let discountedPrice= price;
        let offerPercent = 0;
        let offerValue = 0;
        if(defaultDiscount){
            if(displayOffer=="percent"){
                discountedPrice = ((1-(defaultDiscount/100))*price).toFixed(2);
                offerPercent=defaultDiscount;
                offerValue = (price-discountedPrice).toFixed(2);
            }
            else if(displayOffer=="value"){
                discountedPrice = price - defaultDiscount;
                offerPercent=(defaultDiscount/price*100).toFixed(2);
                offerValue = defaultDiscount;
            }
        }
        setSelectedProducts([
            ...selectedProducts,
            {
                ...addProduct,
                offerPercent,
                offerValue,
                discountedPrice,
            }
        ])
    }
    else{
        //remove from selected products
        setSelectedProducts((selectedProducts)=>selectedProducts.filter((selectedProduct)=>selectedProduct.key!=product._id))
    }
    
 }
 const removeSelectedProduct = (removeProduct) =>{
    setSelectedProducts(selectedProducts.filter((product)=>product.key!=removeProduct.key));
 }
  const updateOfferPrice=(variant, value, type) => {
    var productIndex = selectedProducts.findIndex((product)=>product.variant==variant);
    if(productIndex!=-1){
        var product = selectedProducts[productIndex];
        const price= product.sellingPrice;
        let discountedPrice= price;
        let offerPercent = 0;
        let offerValue = 0;
        if(type=="percent"){
            discountedPrice = ((1-(value/100))*price).toFixed(2);
            offerPercent=value;
            offerValue = (price-discountedPrice).toFixed(2);
        }
        else if(type=="value"){
            discountedPrice = price - value;
            offerPercent=(value/price*100).toFixed(2);
            offerValue = value;
        }
        setSelectedProducts(
            selectedProducts.map((selProduct)=> selProduct.variant==variant?{
                ...selProduct,
                offerPercent,
                offerValue,
                discountedPrice
            }:selProduct)
        )
    }
  }

  const selectedProductColumns=[
    {
      title: 'Product Code',
      dataIndex: 'productCode',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
    },
    {
        title: 'M.R.P',
        dataIndex: 'mrp',
        render: (text, record) => {
            return <Price data={text} />
        },
    },
    {
        title: 'Product Discount',
        render: (text, record) => {
            var discount = record.mrp - record.sellingPrice;
            var discountPercent = ((discount/record.mrp)*100).toFixed(2);
            return <span>{discountPercent}%</span>
        },
    },
    {
        title: 'Selling Price',
        dataIndex: 'sellingPrice',
        render: (text, record) => {
            return <Price data={text} />
        },
    },
    
    {
        title: 'Offer (%)',
        dataIndex: 'offerPercent',
        render: (text, record) => {
            return <InputNumber min={0} max={100} value={record.offerPercent} onChange={(value)=>updateOfferPrice(record.variant,value,"percent")}/>
        },
    },
    {
        title: 'Offer (₹)',
        dataIndex: 'offerValue',
        render: (text, record) => {
            return <InputNumber min={0} value={record.offerValue} onChange={(value)=>updateOfferPrice(record.variant,value,"value")}/>
        },
    },
    {
        title: 'Discounted Price',
        dataIndex: 'discountedPrice',
        render: (text, record) => {
            return <Price data={text} />
        },
    },
    {
        title: 'Delete',
        render: (text, record) => {
            return <span>
                        <DeleteOutlined style={{color:"red"}} onClick={() => removeSelectedProduct(record)} />
                    </span>
        },
    },
  ];

  async function getDataFc() {
    await axios
      .get(`${API_URL}/offers/${id}`)
      .then((response) => {
        var output = response.data;
        output.offerPeriod = [
                                moment(output.offerPeriod[0]),
                                moment(output.offerPeriod[1])
                            ];
        onDateSelected(output.offerPeriod);
        seTstate(output);
        seTfields(
          Object.entries(output).map(([name, value]) => ({ name, value }))
        );
        var defaultDisplayOffer = output.display;
        setDisplayOffer(defaultDisplayOffer);
        setDefaultDiscount(output.defaultDiscount);

        var productDetails = output.products.map((product)=>{
            var mrp = product.variant.price;
            var sellingPrice = product.variant.finalPrice;
            let discountedPrice= sellingPrice;
            let offerPercent = product.offerPercent;
            let offerValue = product.offerValue;
            if(defaultDisplayOffer=="percent"){
                discountedPrice = ((1-(offerPercent/100))*sellingPrice).toFixed(2);
                offerValue = (sellingPrice-discountedPrice).toFixed(2);
            }
            else if(defaultDisplayOffer=="value"){
                discountedPrice = sellingPrice - offerValue;
                offerPercent=(offerValue/sellingPrice*100).toFixed(2);
            }
            return{
                _id: product._id,
                key: product.variant._id,
                variant: product.variant._id,
                productName: product.variant.product.productName,
                productCode: product.variant.productCode,
                sellingPrice,
                offerPercent,
                mrp,
                offerValue,
                discountedPrice,
            }
        })
        setSelectedProducts(productDetails);
        
      })
  }

  useEffect(() => {
    if(id){
        getDataFc();
    }
  }, []);
  return (
    <div>
      <Card className="card" title="Create Offer">
        <Form
          layout="vertical"
          form={form}
          name="add"
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
                        name="name"
                        label="Offer Name"
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
                        name="offerPeriod"
                        label="Offer Period"
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
                            onChange={onDateSelected}
                        />
                    </Form.Item>
                </Col>
                
                <Col span={6}>
                    <Form.Item
                        name="display"
                        label="Display Offer"
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
                                {label:"Percentage", value:"percent"},
                                {label:"Value (in ₹)", value:"value"}
                            ]}
                            placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                            value={displayOffer}
                            onChange={(value)=>setDisplayOffer(value)}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="defaultDiscount"
                        label="Default Discount"
                    >
                        <InputNumber 
                            style={{width: '100%'}} 
                            value={defaultDiscount}
                            onChange={(value)=>setDefaultDiscount(value)}
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
                <Col span={6}>
                    <div>
                        <Text >allowed files: jpeg,png,jpg,gif, mp4</Text><br/>
                        <Text >Maximum Size: 2MB</Text><br/>
                        <Text >Recomended Size: 1400 X 400</Text><br/>
                    </div>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            {
                isDateSelected &&
                <>
                     <Table 
                        dataSource={selectedProducts} 
                        columns={selectedProductColumns} 
                        pagination={{
                            showTotal:(total, range) => `Showing ${range[0]}-${range[1]} of ${total} products`,
                        }}
                        title={
                            () => {
                                return (
                                    <Row>
                                        <Col span={19}>
                                            Selected Products
                                        </Col>
                                        <Col span={5}>
                                        <Button type="default" icon={<SearchOutlined />} onClick={()=>setOpenDrawer(true)}>
                                            Search Products
                                        </Button>
                                        </Col>
                                    </Row>
                                )
                            }}
                    />
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" disabled={!displaySave}>
                        <IntlMessages id="app.pages.common.save" />
                        </Button>
                    </Form.Item>
                </>
               
            }
            
          

          

          
        </Form>
      </Card>
      
      <SearchProducts
        offerId={id}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        selectedProducts={selectedProducts}
        selectedDate={isDateSelected}
        onProductSelect={onProductSelect}
        onSelectChange={onSelectChange}
        onBulkUpdate={onBulkUpdate}
      />
    </div>
  );
};

export default Default;
