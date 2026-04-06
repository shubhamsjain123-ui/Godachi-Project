import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import router from "next/router";
import dynamic from "next/dynamic";
import { DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Tag,
  Upload,
  Image,
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
  Checkbox,
  Typography 
} from "antd";
import func from "../../../util/helpers/func";
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const { Title, Text } = Typography;

const Default = ({ getCategories = [], getData = [], id=null }) => {
  const Editor = dynamic(() => import("../Editor/index"));
  const intl = useIntl();
  const [state, seTstate] = useState(getData);
  const [fields, seTfields] = useState(
    Object.entries(getData).map(([name, value]) => ({ name, value }))
  );
  const [initialValues, setInitialValues] = useState({ 
    components: [""],
    shopFor:["women"] 
  })
  const [dataCategories, seTdataCategories] = useState(getCategories);
  const [dataVariants, setDataVariants] = useState({});
  const [variantsOp, seTvariantsOp] = useState({ options: [""] });
  const [dataBrands, seTdataBrands] = useState([]);
  const [variantCombinations, setVariantCombinations] = useState([]);
  const { user } = useSelector(({ login }) => login);
  const { settings } = useSelector(({ settings }) => settings);
  const [metals, setMetals] = useState([]);
  const [metalsList, setMetalsList] = useState([]);
  const [metalDetails, setMetalDetails] = useState(null);
  const [stones, setStones] = useState([]);
  const [stonesList, setStonesList] = useState([]);
  const [stoneAttributes, setStoneAttributes] = useState([]);
  const [priceType, setPriceType] = useState("fixed");
  const [metalPurityList, setMetalPurityList] = useState([]);
  const [metalColorList, setMetalColorList] = useState([]);
  const [stoneColorList, setStoneColorList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [occassionList, setOccassionList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [certificationList, setCertificationList] = useState([]);
  const [promiseList, setPromiseList] = useState([]);
  const [purchaseIncludeList, setPurchaseIncludeList] = useState([]);
  const [productComponents, setProductComponents] = useState([]);
  const [productMetalComponents, setProductMetalComponents] = useState([]);
  const [diamondVariants, setDiamondVariants] = useState([]);
  const [diamondVariantsPrice, setDiamondVariantsPrice] = useState([]);
  const [productDiamondComponents, setProductDiamondComponents] = useState([]);
  const [productStoneComponents, setProductStoneComponents] = useState([]);
  const [makingPriceType, setMakingPriceType] = useState("fixed");
  const [productType, setProductType] = useState(false)
  const [gst,]= useState(settings.gst)
  const [form] = Form.useForm();
  const [displaySave, seTdisplaySave] = useState(true);
    useEffect(() => {
      console.log("diamondVariants", diamondVariants)
    },[diamondVariants])

   async function getDataFc() {
    await axios
      .get(`${API_URL}/products/${id}`)
      .then((response) => {
        var output = response.data;
        console.log(output)
        seTstate(output);
        seTfields(
          Object.entries(output).map(([name, value]) => ({ name, value }))
        );
      })
      .then(() => {
        
        setTimeout(()=>{
          selectVariants();
          handleComponentChange();
          updateMetalComponents();
          updateStoneComponents();
          updateDiamondComponents();
        },500)
       /*  setTimeout(()=>{
          variantCombinations.forEach((value,index)=>{
            updatePrice(index);
          })
        },5000) */
      });
  }

  const checkUniqueProductCode = async (rule, value) =>{
    if(!value){
      return Promise.reject("Please Enter Product Code");
    }
    else{
      var request = {
        productCode: value.trim()
      }
      if(id)
        request.productId = id;
      try{
        var axiosResponse = await axios.post(API_URL + "/products/checkProductCodeAvailable",request)
        if(axiosResponse.data){
          if(axiosResponse.data.success)
            return Promise.resolve();
        }
      }
      catch(error){
        console.log(error)
      }
      return Promise.reject("Product Code Already Taken")
    }
  }

  const checkUniqueSeoUrl = async (rule, value) =>{
    if(!value){
      return Promise.reject("Please Enter Seo Url");
    }
    else{
      var request = {
        seoUrl: value.trim()
      }
      if(id)
        request.productId = id;
      try{
        var axiosResponse = await axios.post(API_URL + "/products/checkProductSeoAvailable",request)
        if(axiosResponse.data){
          if(axiosResponse.data.success)
            return Promise.resolve();
        }
      }
      catch(error){
        console.log(error)
      }
      return Promise.reject("Seo Url Already Taken")
    }
  }
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
  const getOccassions = () =>{
    axios
      .get(API_URL + "/masters/occassions")
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setOccassionList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }
  const getTags = () =>{
    axios
      .get(API_URL + "/masters/tags")
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setTagList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }
  const getCertifications = () =>{
    axios
      .get(API_URL + "/masters/certifications")
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setCertificationList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }
  const getPromises = () =>{
    axios
      .get(API_URL + "/masters/promises")
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setPromiseList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }
  const getPurchaseIncludes = () =>{
    axios
      .get(API_URL + "/masters/purchaseincludes")
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setPurchaseIncludeList(dataManipulate);
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

  const getStoneColors = () =>{
    axios
      .get(API_URL + "/masters/stonecolors")
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setStoneColorList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }

  const getVendors = () =>{
    axios
      .get(API_URL + "/masters/vendors")
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          setVendorList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleComponentChange = () => {
    const formData = form.getFieldsValue();
   
    if (formData.productMetalComponents.length > 0) {
      for (const i in formData.productMetalComponents) {
        handleMetalChange(formData.productMetalComponents[i].metalType,i) 
      }
    } 
    if (formData.productStoneComponents.length > 0) {
      for (const i in formData.productStoneComponents) {
        handleStoneChange(formData.productStoneComponents[i].stoneType,i) 
      }
    } 
    setPriceType(formData.priceType);
    setProductType(formData.productType);
  }

  const handleMetalChange = (value,key) =>{
    if(!value)
      return setMetalDetails(null);

    var selectedMetal = metals.filter((metal)=>metal._id===value)[0];
    var purities = [];
    selectedMetal.purity.forEach((metalPurity)=>{
      purities.push({
        label: metalPurity.name,
        value: metalPurity._id,
      });
    });
    setMetalPurityList({
      ...metalPurityList,
      [key]:purities
    })
  }
  const handleStoneChange = (value, key) =>{
    var newState = stoneAttributes;
    if(!newState[key])
      newState[key]=[];
    if(!value)
      return setStoneAttributes(newState);
    var selectedStone = stones.filter((stone)=>stone._id===value)[0];
    var variants = [];
    newState[key] = selectedStone.variants
    setStoneAttributes(newState);
  }
  const getStones = () =>{
    axios
      .get(API_URL + "/masters/stonesWithVariantsPricing")
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
  const getDiamondVariants = () =>{
    axios
      .get(API_URL + "/masters/diamondWithVariantsPricing")
      .then((res) => {
        if (res.data.diamondVariants) {
          setDiamondVariants(res.data.diamondVariants);
          setDiamondVariantsPrice(res.data.diamondVariantPricing);
          /* const dataManipulate = [];
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          } */
          //setStonesList(dataManipulate);
        }
      })
      .catch((err) => console.log(err));
  }

  // componentDidMount = useEffect
  useEffect(() => {
    getMetals();
    getStones();
    getDiamondVariants();
    getDataCategory();
    getDataVariants();
    //getDataBrands();
    getMetalColors();
    getStoneColors();
    getOccassions();
    getTags();
    getCertifications();
    getPromises();
    getPurchaseIncludes();
    getVendors();
    /* if(id){
      setTimeout(()=>{
        getDataFc();
      },500)
      
    } */
  }, []);
  useEffect(()=>{
    if(metalsList.length>0 && stonesList.length>0 && dataVariants.data && diamondVariants.length>0 && id){
      getDataFc();
    }
  },[metalsList,stonesList, dataVariants, diamondVariants])
  
  useEffect(()=>{
    if(!productType){
      setVariantCombinations([[]]);
      const formData = form.getFieldsValue();
      var newFieldsValue = formData
      if(newFieldsValue.variant_products){
        if(newFieldsValue?.variant_products[0]){
          newFieldsValue.variant_products[0].variantCombination =null
          form.setFieldsValue(newFieldsValue)
        }
      }
    }
    else if(id){
      selectVariants();
    }
  },[productType])

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

  const onSubmit = async (Data) => {
    //console.log(Data);return;
    seTdisplaySave(false);
    Data["created_user"] = { name: user.name, id: user.id };
    if (Data.certificateImage?.file) {
      const formData = new FormData();
      formData.append("image", Data.certificateImage.file.originFileObj);

      const dataImage = await axios.post(
        `${API_URL}/upload/uploadcertificateimage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Data["certificateImage"] = dataImage.data.path.replace(/\\/g, '/').replace("public/", "/");
    } else {
      Data["certificateImage"] = state.certificateImage;
    }
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
        seTdisplaySave(true);
      })
      .catch((err) =>{
        seTdisplaySave(true);
        console.log(err)
      } );
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
          console.log("datavariant", res.data)
          for (const i in res.data) {
            details.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          
          setDataVariants({ options: details, data: res.data });
          if(id){
            setTimeout(() => {
              selectBeforeVariants(res.data);
            }, 500);
          }
          
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(()=>{
    if(dataVariants){
      console.log("dataVariants",dataVariants);
    }
  },[dataVariants])
  const selectBeforeVariants = async (variantsData) => {
    const formData = form.getFieldsValue();

    const variant = formData.variants;

    const datas = variantsOp.options;

    for (const i in variant) {
      const dataVariant = variantsData.filter(
        (x) => x._id === variant[i].master
      );

      const dataManipulate = [];
      const datas = variantsOp.options;

      for (const i in dataVariant[0].variants) {
        dataManipulate.push({
          label: dataVariant[0].variants[i].name,
          value: dataVariant[0].variants[i]._id,
        });
      }
      datas[i] = dataManipulate;

      seTvariantsOp({ options: datas, data: dataVariant.variants });
    }

    seTvariantsOp({ options: datas });
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
    var newFieldsValue=formData;
    const varib = [];
    if (formData.variants.length > 0) {
      for (const i in formData.variants) {
        var variantDetails = dataVariants.data.filter((variant)=>variant._id==formData.variants[i].master)[0];
        const varib2 = [];
        for (const j in formData.variants[i].selectedValues) {
          var selectedValueDetail= variantDetails.variants.filter((variant)=>variant._id==formData.variants[i].selectedValues[j])[0]
          varib2.push(selectedValueDetail);
        }
        varib[formData.variants[i].master] = varib2;
      }
      const objToArr = getAllCombinations(varib);
      const DataS = [];
      for (const i in objToArr) {
        const variantsP = Object.entries(objToArr[i]).map(
          ([key, initialValue]) => ({ key, initialValue })
        );
        DataS.push(variantsP);
        if(!newFieldsValue.variant_products[i])
          newFieldsValue.variant_products[i]={};
        newFieldsValue.variant_products[i].variantCombination = variantsP.map((options)=>options.initialValue._id)
      }
      setVariantCombinations(DataS);
      form.setFieldsValue(newFieldsValue)
    } else {
      setVariantCombinations([[]]);
    }
  };

  const updateMetalComponents = () => {
    const formData = form.getFieldsValue();
    const compList = [];
    if (formData.productMetalComponents.length > 0) {
      for (const i in formData.productMetalComponents) {
        if(formData.productMetalComponents[i].metalType){
          let shortName = [];
          let componentName;
          let componentType;
          let price = 0;
          var selectedMetal = metals.filter((metal)=> metal._id===formData.productMetalComponents[i].metalType)[0];
          if(formData.productMetalComponents[i].metalPurity){
            var selectedPurity = selectedMetal.purity.filter((purity)=>purity._id == formData.productMetalComponents[i].metalPurity)[0]
            shortName.push(selectedPurity.name);
            price = selectedPurity.price?selectedPurity.price:(selectedMetal.price?selectedMetal.price:0)
          }
          componentName = selectedMetal.name
          //price = selectedMetal.price?selectedMetal.price:1000
          componentType = 'metal';
          if(componentName){
            if(!productMetalComponents[i])
              compList[i] = { };
            else
              compList[i] = productMetalComponents[i];

            compList[i].shortName = `${componentName} (${shortName.join(" - ")})`;
            
            compList[i].defaultPrice = price
            compList[i].componentType = componentType
          }
        }
        
      }
      setProductMetalComponents(compList);
    } else {
      setProductMetalComponents([]);
    }
  }

  const updateStoneComponents = () => {
    const formData = form.getFieldsValue();
    const compList = [];
    if (formData.productStoneComponents.length > 0) {
      for (const i in formData.productStoneComponents) {
        if(formData.productStoneComponents[i].stoneType){
          let shortName = [];
          let componentName;
          let componentType;
          let price = 0;
          let priceType = null;
          let weightUnit = null;
          
          var selectedStone = stones.filter((stone)=> stone._id===formData.productStoneComponents[i].stoneType)[0];
          componentName = selectedStone.name
          var componentVariants = formData.productStoneComponents[i].stoneVariants;
          if(componentVariants){
            var priceDependentIds=[];
            /* for (const [key, value] of Object.entries(componentVariants)) {
              if(value){
                var selectedVariantGroup = selectedStone.variants.filter((variant)=>variant.name===key)[0];
                var selectedVariant = selectedVariantGroup.variants.filter((variant)=>variant._id==value)[0]
                shortName.push(selectedVariant.name);
                if(selectedVariantGroup.priceDependant){
                  priceDependentIds.push(value);
                }
              }
            } */
            for (const componentVariant of componentVariants) {
              if(componentVariant.variantValue){
                var selectedVariantGroup = selectedStone.variants.filter((variant)=>variant._id===componentVariant.variantMaster)[0];
                var selectedVariant = selectedVariantGroup.variants.filter((variant)=>variant._id==componentVariant.variantValue)[0];
                shortName.push(selectedVariant.name);
                if(selectedVariantGroup.priceDependant){
                  priceDependentIds.push(componentVariant.variantValue);
                }
              }
            }
            var variantPrices = selectedStone.variant_price;
            var priceExists = variantPrices.findIndex((varPrice)=>{
              let subset = varPrice.variant_id.every(a => priceDependentIds.some(b => a === b));
              let sameLength = varPrice.variant_id.length === priceDependentIds.length;
              return subset && sameLength;
            });
            price = priceExists!=-1 ? variantPrices[priceExists].price : (selectedStone.price?selectedStone.price:0)
            priceType = selectedStone.priceType;
            weightUnit = selectedStone.weightUnit;
          }
          //price = selectedStone.price?selectedStone.price:1000
          componentType = 'stone';
          if(componentName){
            if(!productStoneComponents[i])
              compList[i] = { };
            else
              compList[i] = productStoneComponents[i];

            compList[i].shortName = `${componentName} (${shortName.join(" - ")})`;
            
            compList[i].defaultPrice = price
            compList[i].priceType = priceType
            compList[i].weightUnit = weightUnit
            compList[i].componentType = componentType
          }
        }
        
      }
      setProductStoneComponents(compList);
    } else {
      setProductStoneComponents([]);
    }
  }

  const updateDiamondComponents = () => {
    const formData = form.getFieldsValue();
    const compList = [];
    if (formData.productDiamondComponents.length > 0) {
      for (const i in formData.productDiamondComponents) {
        let shortName = [];
        let componentName;
        let componentType;
        let price = 0;
        let priceType = null;
        let weightUnit = null;
        
        //var selectedStone = stones.filter((stone)=> stone._id===formData.productStoneComponents[i].stoneType)[0];
        componentName = "Diamond"
        var componentVariants = formData.productDiamondComponents[i].diamondVariants;
        if(componentVariants){
          var priceDependentIds=[];
          for (const componentVariant of componentVariants) {
            if(componentVariant.variantValue){
              var selectedVariantGroup = diamondVariants.filter((variant)=>variant._id===componentVariant.variantMaster)[0];
              var selectedVariant = selectedVariantGroup.variants.filter((variant)=>variant._id==componentVariant.variantValue)[0];
              shortName.push(selectedVariant.name);
              if(selectedVariantGroup.priceDependant){
                priceDependentIds.push(componentVariant.variantValue);
              }
            }
          }
          var variantPrices = diamondVariantsPrice;
          var priceExists = variantPrices.findIndex((varPrice)=>{
            let subset = varPrice.variant_id.every(a => priceDependentIds.some(b => a === b));
            let sameLength = varPrice.variant_id.length === priceDependentIds.length;
            return subset && sameLength;
          });
          price = priceExists!=-1 ? variantPrices[priceExists].price : 0
        }
        if(componentName && shortName.length>0){
          if(!productDiamondComponents[i])
            compList[i] = { };
          else
            compList[i] = productDiamondComponents[i];

          compList[i].shortName = `${componentName} (${shortName.join(" - ")})`;
          
          compList[i].defaultPrice = price
        }
      }
      console.log(compList);
      setProductDiamondComponents(compList);
    } else {
      setProductDiamondComponents([]);
    }
  }

  const updateComponents = () => {
    const formData = form.getFieldsValue();
    const compList = [];
    if (formData.components.length > 0) {
      for (const i in formData.components) {
        let shortName = [];
        let componentName;
        let componentType;
        let price = 0;
        if(i==0 && formData.components[i].metalType){
          var selectedMetal = metals.filter((metal)=> metal._id===formData.components[i].metalType)[0];
          if(formData.components[i].metalPurity){
            var selectedPurity = selectedMetal.purity.filter((purity)=>purity._id == formData.components[i].metalPurity)[0]
            shortName.push(selectedPurity.name);
            price = selectedPurity.price?selectedPurity.price:(selectedMetal.price?selectedMetal.price:1000)
          }
          componentName = selectedMetal.name
          //price = selectedMetal.price?selectedMetal.price:1000
          componentType = 'metal';
        }
        else if(formData.components[i].stoneType){
          var selectedStone = stones.filter((stone)=> stone._id===formData.components[i].stoneType)[0];
          componentName = selectedStone.name
          var componentVariants = formData.components[i].stoneVariants;
          /*for (const [key, value] of Object.entries(formData.components[i])) {
            if(!["componentType","weight","noOfStones", "stoneType"].includes(key) && value){
              shortName.push(value)
            }
          }*/
          if(componentVariants){
            var priceDependentIds=[];
            for (const [key, value] of Object.entries(componentVariants)) {
              if(value){
                var selectedVariantGroup = selectedStone.variants.filter((variant)=>variant.name===key)[0];
                var selectedVariant = selectedVariantGroup.variants.filter((variant)=>variant._id==value)[0]
                shortName.push(selectedVariant.name);
                if(selectedVariantGroup.priceDependant){
                  priceDependentIds.push(value);
                }
              }
            }
            var variantPrices = selectedStone.variant_price;
            var priceExists = variantPrices.findIndex((varPrice)=>{
              let subset = varPrice.variant_id.every(a => priceDependentIds.some(b => a === b));
              let sameLength = varPrice.variant_id.length === priceDependentIds.length;
              return subset && sameLength;
            });
            price = priceExists!=-1 ? variantPrices[priceExists].price : (selectedStone.price?selectedStone.price:1000)
            
          }
          //price = selectedStone.price?selectedStone.price:1000
          componentType = 'stone';
        }
        if(componentName){
          if(!productComponents[i])
            compList[i] = { };
          else
            compList[i] = productComponents[i];

          compList[i].shortName = `${componentName} (${shortName.join(" - ")})`;
          if(formData.components[i]?.weight){
            compList[i].weight = `${formData.components[i]?.weight} ${formData.components[i]?.weightUnit}`;
            compList[i].weightInGm = formData.components[i]?.weightUnit=='gm'?formData.components[i]?.weight:formData.components[i]?.weight/5
          }
          compList[i].defaultPrice = price
          compList[i].componentType = componentType
        }
      }
      setProductComponents(compList);
    } else {
      setProductComponents([]);
    }
  }

  const updatePrice = (priceIndex) =>{
    const formData = form.getFieldsValue();
    const priceFormData = formData.variant_products[priceIndex];
    /* if(formData.making.priceType!= makingPriceType)
      setMakingPriceType(formData.making.priceType); */
    let totalPrice=0;
    let totalFinalPrice=0;
    var newFieldsValue = formData;
    if(formData.priceType=="distributed"){
      //newFieldsValue.priceComponents=[];
      var metalPriceComponents = priceFormData.metalDetails;
      metalPriceComponents?.forEach((priceComponent,index)=>{
        var prodComp = productMetalComponents[index];
        var compPriceType = priceComponent.priceType;
        if(compPriceType=="weight"){
          if(priceComponent.weight && prodComp.defaultPrice){
            priceComponent.price = parseFloat(priceComponent.weight)*parseFloat(prodComp.defaultPrice);
          }else{
            priceComponent.price = 0;
          }
        }
        var {price, finalPrice} = calculateRowPrice(priceComponent);
        totalPrice+=price;
        totalFinalPrice+=finalPrice;
        //newFieldsValue.priceComponents[index]={};
        newFieldsValue.variant_products[priceIndex].metalDetails[index].price = price;
        newFieldsValue.variant_products[priceIndex].metalDetails[index].finalPrice = finalPrice;
      })

      var diamondPriceComponents = priceFormData.diamondDetails;
      diamondPriceComponents?.forEach((priceComponent,index)=>{
        console.log("productDiamondComponents",productDiamondComponents);
        var prodComp = productDiamondComponents[index];
        var compPriceType = priceComponent.priceType;
        if(compPriceType=="weight"){
          if(priceComponent.weight && prodComp.defaultPrice){
            if(priceComponent.weightUnit == "ct")
              priceComponent.price = parseFloat(priceComponent.weight)*parseFloat(prodComp.defaultPrice);
            else{
              priceComponent.price = parseFloat(priceComponent.weight*5)*parseFloat(prodComp.defaultPrice);
            }
          }else{
            priceComponent.price = 0;
          }
        }        
        var {price, finalPrice} = calculateRowPrice(priceComponent);
        totalPrice+=price;
        totalFinalPrice+=finalPrice;
        //newFieldsValue.priceComponents[index]={};
        newFieldsValue.variant_products[priceIndex].diamondDetails[index].price = price;
        newFieldsValue.variant_products[priceIndex].diamondDetails[index].finalPrice = finalPrice;
      })

      var stonePriceComponents = priceFormData.stoneDetails;
      stonePriceComponents?.forEach((priceComponent,index)=>{
        var prodComp = productStoneComponents[index];
        var compPriceType = priceComponent.priceType;
        if(compPriceType=="weight"){
          if(priceComponent.weight && prodComp.defaultPrice){
            if(priceComponent.weightUnit == prodComp.weightUnit)
              priceComponent.price = parseFloat(priceComponent.weight)*parseFloat(prodComp.defaultPrice);
            else if(priceComponent.weightUnit=="gm" && prodComp.weightUnit=="ct"){
              priceComponent.price = parseFloat(priceComponent.weight*5)*parseFloat(prodComp.defaultPrice);
            }
            else if(priceComponent.weightUnit=="ct" && prodComp.weightUnit=="gm"){
              priceComponent.price = parseFloat(priceComponent.weight/5)*parseFloat(prodComp.defaultPrice);
            }
          }else{
            priceComponent.price = 0;
          }
        }
        else if(compPriceType=="stone"){
          if(priceComponent.noOfStones && prodComp.defaultPrice){
            priceComponent.price = parseFloat(priceComponent.noOfStones)*parseFloat(prodComp.defaultPrice);
          }else{
            priceComponent.price = 0;
          }
        }
        var {price, finalPrice} = calculateRowPrice(priceComponent);
        totalPrice+=price;
        totalFinalPrice+=finalPrice;
        //newFieldsValue.priceComponents[index]={};
        newFieldsValue.variant_products[priceIndex].stoneDetails[index].price = price;
        newFieldsValue.variant_products[priceIndex].stoneDetails[index].finalPrice = finalPrice;
      })

      var makingComponent = priceFormData.making;
      let makingPrice = makingComponent.price?makingComponent.price:0;
      if(makingComponent.priceType == "weight"){
        var metalWeight =  metalPriceComponents?metalPriceComponents.reduce(function (acc, obj) { return acc + obj.weight?obj.weight:0; }, 0):0;
        var makingRate = makingComponent.rate?makingComponent.rate:0;
        makingPrice = Math.round(makingRate*metalWeight);
        /* var metalComponentIndex = productComponents.findIndex((comp)=>comp.componentType=="metal");
        if(metalComponentIndex != -1){
          
        } */
      }
      else if(makingComponent.priceType == "percent"){
        var metalTotalPrice =  metalPriceComponents?metalPriceComponents.reduce(function (acc, obj) { return acc + obj.price?obj.price:0; }, 0):0;
        var makingRate = makingComponent.rate?makingComponent.rate:0;
        makingPrice = Math.round(makingRate*metalTotalPrice/100)
        /* var metalComponentIndex = productComponents.findIndex((comp)=>comp.componentType=="metal");
        if(metalComponentIndex != -1){
          makingPrice = Math.round(makingRate*priceComponents[metalComponentIndex].price/100)
        } */
      }
      makingComponent.price = makingPrice;
      var {price, finalPrice} = calculateRowPrice(makingComponent);
      totalPrice+=price;
      totalFinalPrice+=finalPrice;
      //newFieldsValue.making = {}
      newFieldsValue.variant_products[priceIndex].making.price = price;
      newFieldsValue.variant_products[priceIndex].making.finalPrice = finalPrice;
    }
    else{
      totalPrice = priceFormData.price?priceFormData.price:0;
      var {price, finalPrice} = calculateRowPrice({
        price: priceFormData.price,
        discount: priceFormData.discount,
        discountType: priceFormData.discountType,
        finalPrice: priceFormData.finalPrice
      });
      totalFinalPrice+=finalPrice;
      //newFieldsValue.finalPrice = finalPrice;
    }
    var gstAmount = parseInt(totalFinalPrice * (gst/100));
    var grandTotal = totalFinalPrice+gstAmount;
    newFieldsValue.variant_products[priceIndex].price = totalPrice;
    newFieldsValue.variant_products[priceIndex].finalPrice = totalFinalPrice;
    newFieldsValue.variant_products[priceIndex].gst = gstAmount;
    newFieldsValue.variant_products[priceIndex].grandTotal = grandTotal;
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
    console.log("price", price, Math.round(price));
    return {
      price: Math.round(price),
      finalPrice: Math.round(finalPrice)
    }
  }
  
  useEffect(()=>{
    if(promiseList.length && !id){
      const formData = form.getFieldsValue();
      form.setFieldsValue({
        ...formData,
        promises:promiseList.map((promise)=> promise.value)
      })
      
    }
  },[promiseList])
  return (
    <div>
      <Form
        layout = "vertical"
        form={form}
        name="add"
        onFinishFailed={onFinishFailed}
        onFinish={onSubmit}
        fields={fields}
        initialValues={initialValues}
        scrollToFirstError
      >
        <Form.Item name="_id" hidden={true}>
          <Input  />
        </Form.Item>
        <Card className="card" title={intl.messages["app.pages.product.addd"]}>
          <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="categories_id"
                  label={intl.messages["app.pages.common.category"]}
                  rules={[
                    {
                      required: true,
                      message: intl.messages["app.pages.common.pleaseFill"],
                    },
                  ]}
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
            </Row>
            <Row gutter={24}>
              <Col span={6}>
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
                        productName: value,
                        seo: func.replaceSeoUrl(value),
                        meta_title: value,
                      });
                      seTfields(
                        Object.entries({
                          seo: func.replaceSeoUrl(e.target.value),
                          meta_title: value
                        }).map(([name, value]) => ({ name, value }))
                      );
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="seo" label="Seo Url" value={state.seo} 
                  rules={[
                    {
                      required: true,
                      message: intl.messages["app.pages.common.pleaseFill"],
                    },
                    {validator: checkUniqueSeoUrl}
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="styleNo" label="Style Number">
                  <Input />
                </Form.Item>
              </Col>
              
              <Col span={6}>
                <Form.Item name="warranty" label="Product Warranty">
                  <InputNumber
                    addonAfter={
                      <Form.Item name="warrantyUnit" initialValue="years" noStyle>
                        <Select>
                          <Select.Option value="days">Days</Select.Option>
                          <Select.Option value="months">Months</Select.Option>
                          <Select.Option value="years">Years</Select.Option>
                        </Select>
                      </Form.Item>
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="features">
                  <Checkbox.Group options={[
                    {label:"Best Seller",value:"bestSeller"},
                    {label:"New Arrival",value:"newArrival"},
                    {label:"Virtual Try",value:"virtualTry"},
                    {label:"Premium Product",value:"premium"},
                    {label:"Featured Product",value:"featured"},
                    {label:"Customizable Product", value:"customizable"},
                  ]} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  name="meta_title"
                  label="Meta Title"
                  value={state.productName}
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
                  name="meta_keywords"
                  label="Meta Keywords"
                >
                  <Input />
                </Form.Item>
                
              </Col>
              <Col span={12}>
                <Form.Item
                  name="meta_description"
                  label="Meta Description"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          

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
            <Editor form={form} fieldName="description" />
          </Form.Item>
          <Row gutter={24}>
           
           
           
            <Col span={24}>
              <Form.Item name="occassions" label="Occasions"
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  options={occassionList}
                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="shopFor" label="Shop For">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                >
                  <Select.Option value="men">Men</Select.Option>
                  <Select.Option value="women">Women</Select.Option>
                  <Select.Option value="kids">Kids</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item name="tags" label="Tags"
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  options={tagList}
                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note" label="Note" >
                <Input addonBefore="Note: " />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="certifications" label="Product Certifications">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  options={certificationList}
                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="promises" label="Promises"
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  options={promiseList}
                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="purchaseIncludes" label="Purchase Includes"
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  options={purchaseIncludeList}
                  placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="productCare"
                label="Product Care"
              >
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
         
        </Card>

        <Card
          className="card"
          title="Metal Components"
        >
          <Form.List name="productMetalComponents">
            {(fields, { add, remove }) => (
              <>
               
                {fields.map((field, i) => (
                  <>
                  <Form.Item name={[field.name, "_id"]} hidden={true}>
                    <Input  />
                  </Form.Item>
                  <Form.Item name={[field.name, "componentType"]} hidden={true} initialValue="metal">
                    <Input  />
                  </Form.Item>
                  <Row gutter={12}>
                    <Col span={22}>
                      <Row gutter={12}>
                        <Col span={6}>
                          <Form.Item name={[field.name, "metalType"]} fieldKey={0} label="Metal Type"
                            rules={[
                              {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                              },
                            ]}
                          >
                            <Select
                              style={{ width: "100%" }}
                              options={metalsList}
                              placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                              onChange={
                                (value)=>{
                                  handleMetalChange(value,i);
                                  updateMetalComponents();
                                }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name={[field.name, "metalPurity"]} fieldKey={0} label="Metal Purity"
                            rules={[
                              {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                              },
                            ]}
                          >
                            <Select
                              style={{ width: "100%" }}
                              options={metalPurityList[i]}
                              placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                              onChange={updateMetalComponents}
                              
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name={[field.name, "metalColor"]} fieldKey={0} label="Metal Color"
                            rules={[
                              {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                              },
                            ]}
                          >
                            <Select
                              style={{ width: "100%" }}
                              options={metalColorList}
                              placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                            />
                          </Form.Item>
                        </Col>
                       
                      </Row>
                    </Col>
                    <Col span={2}>
                      <Button
                        type="primary"
                        size="sm"
                        shape="circle"
                        onClick={() => {
                          remove(field.name);
                          updateMetalComponents();
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
                    Add Metal
                  </Button>
                </Form.Item>
                <Divider />
              </>
            )}
          </Form.List>
          
        </Card>
        
        <Card
          className="card"
          title="Diamond Components"
        >
          <Form.List name="productDiamondComponents">
            {(fields, { add, remove }) => (
              <>
               
                {fields.map((field, i) => (
                  <>
                  <Form.Item name={[field.name, "_id"]} hidden={true}>
                    <Input  />
                  </Form.Item>
                  
                  <Row gutter={12}>
                    <Col span={22}>
                      <Row gutter={12}>
                      <Form.List name={[field.name, "diamondVariants"]} key={i}>
                          {()=>(
                            <>
                              {diamondVariants?.map((diamondVariant,j)=>(
                                <Col span={6} key={diamondVariant._id}>
                                  <Form.List name={j}  key={j}>
                                    {()=>(
                                      <>
                                        <Form.Item name="variantMaster" hidden={true} initialValue={diamondVariant._id}>
                                          <Input />
                                        </Form.Item>
                                        <Form.Item name="variantValue" label={diamondVariant.name}>
                                          <Select
                                            style={{ width: "100%" }}
                                            options={diamondVariant.variants.map((variant)=>({label:variant.name,value:variant._id}))}
                                            placeholder="Select"
                                            onChange={updateDiamondComponents}
                                          />
                                        </Form.Item>
                                      </>
                                    )}
                                  </Form.List>
                                  
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
                          updateDiamondComponents();
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
                    Add Diamond
                  </Button>
                </Form.Item>
                <Divider />
              </>
            )}
          </Form.List>
          
        </Card>

        <Card
          className="card"
          title="Stone Components"
        >
          <Form.List name="productStoneComponents">
            {(fields, { add, remove }) => (
              <>
               
                {fields.map((field, i) => (
                  <>
                  <Form.Item name={[field.name, "_id"]} hidden={true}>
                    <Input  />
                  </Form.Item>
                  <Form.Item name={[field.name, "componentType"]} hidden={true} initialValue="stone">
                    <Input  />
                  </Form.Item>
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
                            rules={[
                              {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                              },
                            ]}
                          >
                            <Select
                              style={{ width: "100%" }}
                              options={stonesList}
                              placeholder="Please Select Stone Type"
                              onChange={
                                (value)=>{
                                  handleStoneChange(value,i);
                                  updateStoneComponents();
                                }
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name={[field.name, "stoneColor"]} fieldKey={0} label="Stone Color"
                            rules={[
                              {
                                required: true,
                                message: intl.messages["app.pages.common.pleaseFill"],
                              },
                            ]}
                          >
                            <Select
                              style={{ width: "100%" }}
                              options={stoneColorList}
                              placeholder={intl.messages["app.pages.common.pleaseSelect"]}
                            />
                          </Form.Item>
                        </Col>
                        <Form.List name={[field.name, "stoneVariants"]} key={i}>
                          {()=>(
                            <>
                              {stoneAttributes[i]?.map((stoneVariant,j)=>(
                                <Col span={6} key={stoneVariant._id}>
                                  <Form.List name={j}  key={j}>
                                    {()=>(
                                      <>
                                        <Form.Item name="variantMaster" hidden={true} initialValue={stoneVariant._id}>
                                          <Input />
                                        </Form.Item>
                                        <Form.Item name="variantValue" label={stoneVariant.name}>
                                          <Select
                                            style={{ width: "100%" }}
                                            options={stoneVariant.variants.map((variant)=>({label:variant.name,value:variant._id}))}
                                            placeholder="Select"
                                            onChange={updateStoneComponents}
                                          />
                                        </Form.Item>
                                      </>
                                    )}
                                  </Form.List>
                                  
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
                          updateStoneComponents();
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
          title="Product Certificate"
        >
          <Form.Item
            name="certificateImage"
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
          <div style={{textAlign: "left", paddingBottom:"10px"}}>
            <Text type="danger">allowed files: jpeg,png,jpg,gif, mp4</Text><br/>
            <Text type="danger">Maximum Size: 512 kb</Text><br/>
            <Text type="danger">Recomended Size: 400 X 300</Text><br/>
          </div>
          {
            state.certificateImage &&
            <Image src={IMG_URL + state.certificateImage} width={200} />
          }
          
          
          <Form.Item
            name="description_certificate"
            label="Description"
          >
            <Input.TextArea rows={1} />
          </Form.Item>
        </Card>

        <Card
          className="card"
          title="Product Details"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="productType"
                label="Product Type"
                initialValue={productType}
              >
                <Select
                  style={{ width: "100%" }}
                  options={[
                    {
                      label: "Single Product",
                      value: false,
                    },
                    {
                      label: "Variant Product",
                      value: true,
                    },
                  ]}
                  rules={[
                    {
                      required: true,
                      message: intl.messages["app.pages.common.pleaseFill"],
                    },
                  ]}
                  onChange={(newValue) => {
                    //seTstate({ ...state, type: newValue });
                    setProductType(newValue);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priceType"
                label="Price Type" 
                initialValue={priceType}
                rules={[
                  {
                    required: true,
                    message: intl.messages["app.pages.common.pleaseFill"],
                  },
                ]}
              >
                <Select
                  
                  onChange={(value)=>{setPriceType(value)}}
                  placeholder="Please Select"
                >
                  <Select.Option value="fixed"> Fixed Price </Select.Option>
                  <Select.Option value="distributed"> Distributed Price </Select.Option>
                </Select>
                
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card
          className="card"
          style={{ display: productType ? "" : "none" }}
          title="Product Variants"
        >
          <Form.List name="variants" style={{ width: "100%" }}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, i) => (
                  <Row className="float-left w-full " key={i} gutter={[8, 8]}>
                    <Col xs={8}>
                      <Form.Item
                        {...field}
                        {...formItemLayout}
                        className="float-left w-full  mx-0 px-0"
                        name={[field.name, "master"]}
                        label={intl.messages["app.pages.common.variants"]}
                        fieldKey={[field.fieldKey, "variants"]}
                        value="Size"
                        hasFeedback
                        rules={[
                          {
                            message:
                              intl.messages["app.pages.common.confirmPassword"],
                          },
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              console.log("value", value)
                              const item = getFieldValue("variants").filter(
                                (x) => x.master === value
                              );

                              if (!value || item.length <= 1) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                intl.messages["app.pages.common.duplicate"]
                              );
                            },
                          }),
                        ]}
                      >
                        <Select
                          showSearch
                          options={dataVariants.options}
                          placeholder={
                            intl.messages["app.pages.common.searchVariant"]
                          }
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={(selected) => {
                            const dataVariant = dataVariants.data.filter(
                              (x) => x._id === selected
                            );
                            const dataManipulate = [];
                            const datas = variantsOp.options;

                            for (const i in dataVariant[0].variants) {
                              dataManipulate.push({
                                label: dataVariant[0].variants[i].name,
                                value: dataVariant[0].variants[i]._id,
                              });
                            }
                            dataManipulate.sort((a,b)=>a.label.localeCompare(b.label))
                            datas[i] = dataManipulate;

                            seTvariantsOp({
                              options: datas,
                              data: dataVariant.variants,
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={15}>
                      <Form.Item
                        {...field}
                        {...formItemLayout}
                        className="float-left w-full  mx-0 px-0"
                        label={intl.messages["app.pages.common.values"]}
                        name={[field.name, "selectedValues"]}
                        fieldKey={[field.fieldKey, "value"]}
                        rules={[
                          {
                            required: true,
                            message:
                              intl.messages["app.pages.common.pleaseFill"],
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          mode="multiple"
                          showArrow
                          options={variantsOp.options[i]}
                          placeholder="Search Variant Name"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={() => {
                            selectVariants();
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={1}>
                      <Form.Item className="float-left">
                        <Button
                          type="primary"
                          shape="circle"
                          onClick={() => {
                            remove(field.name);
                            selectVariants();
                          }}
                          icon={<DeleteOutlined />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
                <Form.Item className="float-right">
                  <Button
                    className="float-right"
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    icon={<PlusOutlined />}
                  >
                    <IntlMessages id="app.pages.common.addVariant" />
                  </Button>
                </Form.Item>
                <Divider />
              </>
            )}
          </Form.List>

          
        </Card>

        <Form.List name="variant_products">
            {() => (
              <>
                {variantCombinations.map((combinations, i) => (
                  <>
                    <Form.List name={i} key={i}>
                      {() => (
                        <>
                         <Card
                            className="card"
                            title={
                              <div>
                                <h5 className="float-left text-xl pr-2">Product Details</h5>
                                {combinations.map((variantOption)=>( variantOption.initialValue &&
                                  <Tag color="blue" className="float-left">{variantOption.initialValue.name}</Tag>
                                ))}
                              </div>
                            }
                          >
                          <div>
                          <Form.Item name="_id" hidden={true}>
                            <Input  />
                          </Form.Item>
                            <Row gutter={12}>
                              <Col span={8}>
                                <Form.Item
                                  name="productCode"
                                  label="Product Code"
                                  rules={[
                                    {
                                      required: true,
                                      message: intl.messages["app.pages.common.pleaseFill"],
                                    },
                                    { validator: checkUniqueProductCode },
                                    ({ getFieldValue }) => ({
                                      validator(rule, value) {
                                        
                                        const item = getFieldValue("variant_products").filter(
                                          (x) => x.productCode === value
                                        );
          
                                        if (item.length <= 1) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(
                                          intl.messages["app.pages.common.duplicate"]
                                        );
                                      },
                                    }),
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={8}>
                                <Form.Item name="totalWeight" label="Total Weight"
                                  rules={[
                                      {
                                        required: true,
                                        message: intl.messages["app.pages.common.pleaseFill"],
                                      },
                                    ]}
                                >
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
                              <Col span={4}>
                                {
                                  !id &&
                                  <Form.Item
                                    name="vendor"
                                    label="Select Vendor"
                                    rules={[
                                      {
                                        required: true,
                                        message: intl.messages["app.pages.common.pleaseFill"],
                                      },
                                    ]}
                                  >
                                    <Select
                                      style={{ width: "100%" }}
                                      options={vendorList}
                                      placeholder="Select Vendor"
                                    />
                                  </Form.Item>
                                }
                                
                              </Col>
                              <Col span={4}>
                                {
                                  !id &&
                                  <Form.Item
                                    name="initialQuantity"
                                    label="Initial Quantity"
                                    rules={[
                                      {
                                        required: true,
                                        message: intl.messages["app.pages.common.pleaseFill"],
                                      },
                                    ]}
                                  >
                                    <InputNumber defaultValue={1} style={{width:"100%"}}/>
                                  </Form.Item>
                                }
                                
                              </Col>
                              <Col span={8}>
                                <Form.Item name="width" label="Product Width" >
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
                              <Col span={8}>
                                <Form.Item name="length" label="Product Length">
                                  <InputNumber 
                                    addonAfter={
                                      <Form.Item name="lengthUnit" initialValue="cm" noStyle>
                                        <Select>
                                          <Select.Option value="cm">cm</Select.Option>
                                          <Select.Option value="mm">mm</Select.Option>
                                        </Select>
                                      </Form.Item>
                                    }
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={8}>
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
                              
                            </Row>
                            <Divider />
                          <div><Title level={3}>Price Details</Title></div>
                          <Row gutter={12}>
                            <Col span = {3}>
                              <Title level={5}>Particular</Title>
                            </Col>
                            <Col span = {3}>
                              <Title level={5}>Rate</Title>
                            </Col>
                            <Col span = {3}>
                              <Title level={5}>Weight</Title>
                            </Col>
                            <Col span = {3}>
                              <Title level={5}>No. Of Stone</Title>
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
                          
                              <Form.List name="metalDetails">
                                {() => (
                                  <>
                                    {productMetalComponents?.map((field, j) => (
                                      <Form.List name={j} key={j}>
                                        {() => (
                                          <> 
                                          <Form.Item name="_id" hidden={true}>
                                            <Input  />
                                          </Form.Item>
                                          <Row gutter={12}>
                                            <Col span = {3}>
                                              {field.shortName}
                                              <Form.Item name="shortName" initialValue={field.shortName} hidden={true}>
                                                <Input />
                                              </Form.Item>
                                            </Col>
                                            <Col span = {3}>
                                              {
                                                field.defaultPrice &&
                                                `₹ ${field.defaultPrice}/gm`
                                              }
                                             
                                            </Col>
                                            <Col span={3}>
                                              {/* {field.weight} */}
                                              <Form.Item name="weight"
                                                rules={[
                                                  /* {
                                                    required: true,
                                                    message: intl.messages["app.pages.common.pleaseFill"],
                                                  }, */
                                                ]}
                                              >
                                                <InputNumber 
                                                  placeholder="Weight"
                                                  size="small"
                                                  onChange={()=>updatePrice(i)}
                                                  addonAfter={
                                                    <Form.Item name="weightUnit" initialValue="gm" noStyle onChange={()=>updatePrice(i)}>
                                                      <Select size="small">
                                                        <Option value="gm">gm</Option>
                                                      </Select>
                                                    </Form.Item>
                                                  }
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span = {3}>
                                              
                                            </Col>
                                            <Col span = {3} >
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item name="priceType" initialValue="fixed" >
                                                    <Select onChange={()=>updatePrice(i)} size="small">
                                                      <Select.Option value="fixed">Fixed</Select.Option>
                                                      <Select.Option value="weight" disabled={field.defaultPrice?false:true}>Weight Based</Select.Option>
                                                      
                                                    </Select>
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                            <Col span={3}>
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item
                                                    name="price"
                                                    rules={[
                                                      {
                                                        required: true,
                                                        message: intl.messages["app.pages.common.pleaseFill"],
                                                      },
                                                    ]}
                                                  >
                                                    <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} onChange={()=>updatePrice(i)}/>
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                            <Col span={3}>
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item name="discount" 
                                                    initialValue={0}
                                                    rules={[
                                                      {
                                                        required: true,
                                                        message: intl.messages["app.pages.common.pleaseFill"],
                                                      },
                                                    ]}
                                                  >
                                                    <InputNumber  
                                                      initialValue={0}
                                                      onChange={()=>updatePrice(i)}
                                                      size="small"
                                                      addonAfter={
                                                        <Form.Item name="discountType" initialValue="percent" noStyle>
                                                          <Select  onChange={()=>updatePrice(i)}>
                                                            <Select.Option value="percent">%</Select.Option>
                                                            <Select.Option value="fixed">Rs</Select.Option>
                                                          </Select>
                                                        </Form.Item>
                                                      }
                                                    />
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                            <Col span={3}>
                                              { priceType=="distributed" &&
                                                <>  
                                                  <Form.Item
                                                    name="finalPrice"
                                                  >
                                                    <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} />
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                          </Row>
                                          </>
                                        )}
                                      </Form.List>
                                      
                                    ))}
                                  </>
                                )}
                              </Form.List>
                              <Form.List name="diamondDetails">
                                {() => (
                                  <>
                                    {productDiamondComponents?.map((field, j) => (
                                      <Form.List name={j} key={j}>
                                        {() => (
                                          <> 
                                          <Form.Item name="_id" hidden={true}>
                                            <Input  />
                                          </Form.Item>
                                          <Row gutter={12}>
                                            <Col span = {3}>
                                              {field.shortName}
                                              <Form.Item name="shortName" initialValue={field.shortName} hidden={true}>
                                                <Input />
                                              </Form.Item>
                                            </Col>
                                            <Col span = {3}>
                                              {
                                                field.defaultPrice &&
                                                `₹ ${field.defaultPrice}/ct`
                                              }
                                            </Col>
                                            <Col span={3}>
                                              {/* {field.weight} */}
                                              <Form.Item name="weight"
                                                /* rules={[
                                                  {
                                                    required: true,
                                                    message: intl.messages["app.pages.common.pleaseFill"],
                                                  },
                                                ]} */
                                              >
                                                <InputNumber 
                                                  placeholder="Weight"
                                                  size="small"
                                                  onChange={()=>updatePrice(i)}
                                                  addonAfter={
                                                    <Form.Item name="weightUnit" initialValue="ct" noStyle>
                                                      <Select  onChange={()=>updatePrice(i)} size="small">
                                                        <Option value="ct">ct</Option>
                                                      </Select>
                                                    </Form.Item>
                                                  }
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span = {3}>
                                              <Form.Item name="noOfStones"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message: intl.messages["app.pages.common.pleaseFill"],
                                                  },
                                                ]}
                                              >
                                                <InputNumber size="small" style={{width:"100%"}} placeholder="No. Of Stone"/>
                                              </Form.Item>
                                            </Col>
                                            <Col span = {3} >
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item name="priceType" initialValue="fixed" >
                                                    <Select onChange={()=>updatePrice(i)} size="small">
                                                      <Select.Option value="fixed">Fixed</Select.Option>
                                                      <Select.Option value="weight">Weight Based</Select.Option>
                                                    </Select>
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                            <Col span={3}>
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item
                                                    name="price"
                                                    rules={[
                                                      {
                                                        required: true,
                                                        message: intl.messages["app.pages.common.pleaseFill"],
                                                      },
                                                    ]}
                                                  >
                                                    <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} onChange={()=>updatePrice(i)}/>
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                            <Col span={3}>
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item name="discount" 
                                                    initialValue={0}
                                                    rules={[
                                                      {
                                                        required: true,
                                                        message: intl.messages["app.pages.common.pleaseFill"],
                                                      },
                                                    ]}
                                                  >
                                                    <InputNumber  
                                                      initialValue={0}
                                                      onChange={()=>updatePrice(i)}
                                                      size="small"
                                                      addonAfter={
                                                        <Form.Item name="discountType" initialValue="percent" noStyle>
                                                          <Select  onChange={()=>updatePrice(i)}>
                                                            <Select.Option value="percent">%</Select.Option>
                                                            <Select.Option value="fixed">Rs</Select.Option>
                                                          </Select>
                                                        </Form.Item>
                                                      }
                                                    />
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                            <Col span={3}>
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item
                                                    name="finalPrice"
                                                  >
                                                    <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} />
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                          </Row>
                                          </>
                                        )}
                                      </Form.List>
                                      
                                    ))}
                                  </>
                                )}
                              </Form.List>
                              <Form.List name="stoneDetails">
                                {() => (
                                  <>
                                    {productStoneComponents?.map((field, j) => (
                                      <Form.List name={j} key={j}>
                                        {() => (
                                          <> 
                                          <Form.Item name="_id" hidden={true}>
                                            <Input  />
                                          </Form.Item>
                                          <Row gutter={12}>
                                            <Col span = {3}>
                                              {field.shortName}
                                              <Form.Item name="shortName" initialValue={field.shortName} hidden={true}>
                                                <Input />
                                              </Form.Item>
                                            </Col>
                                            <Col span = {3}>
                                              {
                                                field.defaultPrice &&
                                                `₹ ${field.defaultPrice}/${field.priceType=="stone"?"stone":field.weightUnit}`
                                              }
                                            </Col>
                                            <Col span={3}>
                                              {/* {field.weight} */}
                                              <Form.Item name="weight"
                                               /*  rules={[
                                                  {
                                                    required: true,
                                                    message: intl.messages["app.pages.common.pleaseFill"],
                                                  },
                                                ]} */
                                              >
                                                <InputNumber 
                                                  placeholder="Weight"
                                                  size="small"
                                                  onChange={()=>updatePrice(i)}
                                                  addonAfter={
                                                    <Form.Item name="weightUnit" initialValue="ct" noStyle>
                                                      <Select  onChange={()=>updatePrice(i)} size="small">
                                                        <Option value="gm">gm</Option>
                                                        <Option value="ct">ct</Option>
                                                      </Select>
                                                    </Form.Item>
                                                  }
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span = {3}>
                                              <Form.Item name="noOfStones"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message: intl.messages["app.pages.common.pleaseFill"],
                                                  },
                                                ]}
                                              >
                                                <InputNumber size="small" style={{width:"100%"}} placeholder="No. Of Stone" onChange={()=>updatePrice(i)}/>
                                              </Form.Item>
                                            </Col>
                                            <Col span = {3} >
                                              { priceType=="distributed" &&
                                                <>
                                                   <Form.Item name="priceType" initialValue="fixed" >
                                                    <Select onChange={()=>updatePrice(i)} size="small">
                                                      <Select.Option value="fixed">Fixed</Select.Option>
                                                      <Select.Option value="weight" disabled={field.priceType=="weight"?false:true}>Weight Based</Select.Option>
                                                      <Select.Option value="stone" disabled={field.priceType=="stone"?false:true}>Stone Based</Select.Option>
                                                      
                                                      
                                                    </Select>
                                                  </Form.Item>
                                                </>
                                              }
                                             
                                            </Col>
                                            <Col span={3}>
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item
                                                    name="price"
                                                    rules={[
                                                      {
                                                        required: true,
                                                        message: intl.messages["app.pages.common.pleaseFill"],
                                                      },
                                                    ]}
                                                  >
                                                    <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} onChange={()=>updatePrice(i)}/>
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                            <Col span={3}>
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item name="discount" 
                                                    initialValue={0}
                                                    rules={[
                                                      {
                                                        required: true,
                                                        message: intl.messages["app.pages.common.pleaseFill"],
                                                      },
                                                    ]}
                                                  >
                                                    <InputNumber  
                                                      initialValue={0}
                                                      onChange={()=>updatePrice(i)}
                                                      size="small"
                                                      addonAfter={
                                                        <Form.Item name="discountType" initialValue="percent" noStyle>
                                                          <Select  onChange={()=>updatePrice(i)}>
                                                            <Select.Option value="percent">%</Select.Option>
                                                            <Select.Option value="fixed">Rs</Select.Option>
                                                          </Select>
                                                        </Form.Item>
                                                      }
                                                    />
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                            <Col span={3}>
                                              { priceType=="distributed" &&
                                                <>
                                                  <Form.Item
                                                    name="finalPrice"
                                                  >
                                                    <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} />
                                                  </Form.Item>
                                                </>
                                              }
                                              
                                            </Col>
                                          </Row>
                                          </>
                                        )}
                                      </Form.List>
                                      
                                    ))}
                                  </>
                                )}
                              </Form.List>
                          { priceType=="distributed" &&
                            <>
                              <Form.List name="making">
                                {() => (
                                  <> 
                                  <Row gutter={12}>
                                    <Col span = {3}>
                                      Making Charges
                                    </Col>
                                    <Col span={3}>
                                      {
                                        makingPriceType =="weight" && 
                                        <Form.Item name="rate" >
                                          <InputNumber size="small" addonAfter="/gm" onChange={()=>updatePrice(i)}/>
                                        </Form.Item>
                                      }
                                      {
                                        makingPriceType =="percent" && 
                                        <Form.Item name="rate">
                                          <InputNumber size="small" addonAfter="%" min={1} max={100} onChange={()=>updatePrice(i)} />
                                        </Form.Item>
                                      }
                                    </Col>
                                    <Col span={3}>
                                      
                                    </Col>
                                    <Col span={3}>
                                      
                                    </Col>
                                    <Col span={3}>
                                      <Form.Item name="priceType" initialValue="fixed" >
                                        <Select size="small" onChange={(value)=>{
                                          setMakingPriceType(value)
                                          updatePrice(i)
                                          }}>
                                          <Select.Option value="fixed">Fixed</Select.Option>
                                          <Select.Option value="weight">Weight Based</Select.Option>
                                          <Select.Option value="percent">Percentage Based</Select.Option>
                                        </Select>
                                      </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                      <Form.Item
                                        name="price"
                                      >
                                        <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} onChange={()=>updatePrice(i)}/>
                                      </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                      <Form.Item name="discount" >
                                        <InputNumber 
                                          onChange={()=>updatePrice(i)} 
                                          size="small"
                                          addonAfter={
                                            <Form.Item name="discountType" initialValue="percent" noStyle>
                                              <Select size="small" onChange={()=>updatePrice(i)}>
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
                                        <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  </>
                                )}
                              </Form.List>
                              
                            </>
                          }
                          
                          
                          <Row gutter={12}>
                            <Col span = {3}>
                              Total Price
                            </Col>
                            <Col span={3}>
                              
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
                                <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} onChange={()=>updatePrice(i)} />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              {
                                priceType=="fixed" &&
                                <Form.Item name="discount" >
                                  <InputNumber  
                                    onChange={()=>updatePrice(i)}
                                    addonAfter={
                                      <Form.Item name="discountType" initialValue="percent" noStyle>
                                        <Select  onChange={()=>updatePrice(i)} size="small">
                                          <Select.Option value="percent">%</Select.Option>
                                          <Select.Option value="fixed">Rs</Select.Option>
                                        </Select>
                                      </Form.Item>
                                    }
                                  />
                                </Form.Item>
                              }
                              
                            </Col>
                            <Col span={3}>
                              <Form.Item
                                name="finalPrice"
                              >
                                <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={12}>
                            <Col span = {3}>
                              Gst ({gst}%)
                            </Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}>
                              <Form.Item
                                name="gst"
                              >
                                <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={12}>
                            <Col span = {3}>
                              Grand Total
                            </Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}></Col>
                            <Col span={3}>
                              <Form.Item
                                name="grandTotal"
                              >
                                <InputNumber size="small" addonBefore="Rs." style={{width:"100%"}} />
                              </Form.Item>
                            </Col>
                          </Row>
                          </div>
                          </Card>
                        </>
                      )}
                      
                    </Form.List>
                   
                    
                  </>
                  
                ))}
                <Divider />
              </>
            )}
          </Form.List>
        
          <Card
            className="card"
            title="Other Specifications">
              <Form.List name="otherSpecs">
                {(fields, { add, remove }) => (
                  <>
                  
                    {fields.map((field, i) => (
                      <>
                      <Form.Item name={[field.name, "_id"]} hidden={true}>
                        <Input  />
                      </Form.Item>
                      <Row gutter={12}>
                        <Col span={2}>
                          <Button
                            type="primary"
                            size="sm"
                            shape="circle"
                            onClick={() => {
                              remove(field.name);
                              updateMetalComponents();
                            }}
                            icon={<DeleteOutlined />}
                          />
                        </Col>
                        <Col span={22}>
                          <Form.Item name={[field.name, "heading"]} label="Specification Heading">
                            <Input  />
                          </Form.Item>
                        </Col>
                        
                      </Row>
                      


                      <Form.List name={[field.name, "specs"]} key={i}>
                        {(specFields, { add, remove }) => (
                          <>
                          
                            {specFields.map((specField, j) => (
                              <>
                              <Row gutter={12}>
                                <Col span={6}>
                                </Col>
                                <Col span={8}>
                                  <Form.Item name={[specField.name, "name"]} label="Name">
                                    <Input  />
                                  </Form.Item>
                                </Col>
                                
                                <Col span={8}>
                                  <Form.Item name={[specField.name, "value"]} label="Value">
                                    <Input  />
                                  </Form.Item>
                                </Col>
                                <Col span={2}>
                                  <Button
                                    type="primary"
                                    size="sm"
                                    shape="circle"
                                    onClick={() => {
                                      remove(specField.name);
                                    }}
                                    icon={<DeleteOutlined />}
                                  />
                                </Col>
                              </Row>
                            
                              
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
                                Add More
                              </Button>
                            </Form.Item>
                            <Divider />
                          </>
                        )}
                      </Form.List>
                      
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
                        Add Specifications
                      </Button>
                    </Form.Item>
                    <Divider />
                  </>
                )}
              </Form.List>

          </Card>

        <Card className="card">
          <Form.Item className="float-right">
            <Button type="primary" htmlType="submit" disabled={!displaySave}>
              Save
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};


export default Default;
