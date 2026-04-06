import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../../config/config";
import Link from "next/link";
import { Drawer } from "antd";
import { Table } from "ant-table-extensions";
import { useDispatch, useSelector } from "react-redux";
import func from "../../../util/helpers/func";
import IntlMessages from "../../../util/IntlMessages";
import { useIntl } from "react-intl";
import ProductCard from "./productCard";
import Price from "../Price";
import Date from "../Date";
const Default = (props) => {
    const {
        offerId,
        openDrawer,
        setOpenDrawer,
        selectedProducts,
        selectedDate,
        onProductSelect,
        onSelectChange,
        onBulkUpdate
    } = props;

    const intl = useIntl();
    const [productList, setProductList]= useState([]);
    const [adminProductFilter, setAdminProductFilter] = useState([]);
    const [materialFilters, setMaterialFilters] = useState([]);
    const [selectedRowKeys,setSelectedRowKeys] = useState([])
    
    const getProductFilters = ()=>{
        axios
        .post(`${API_URL}/filterMaster/adminProductFilters`,)
        .then((res) => {
          if (res.data) {
              setAdminProductFilter(res.data);
          }
        })
        .catch((err) => console.log(err));
      }
    const updateMaterialFilter = ()=>{
      var filterOptions = [{text:"Diamond", value:"Diamond"}]
      var metalFilters = adminProductFilter.find((filter)=>filter.shortName === "metals")?.options
                          .map((option)=>{return{text:option.label, value:option.label}})
      var stoneFilters = adminProductFilter.find((filter)=>filter.shortName === "stones")?.options
                          .map((option)=>{return{text:option.label, value:option.label}})
      if(metalFilters?.length>0){
        filterOptions.push(
          ...metalFilters
        )
      }
      if(stoneFilters?.length>0){
        filterOptions.push(
          ...stoneFilters
        )
      }
  
      setMaterialFilters(filterOptions)
    }

    const showOfferDetails = (offer)=>{
      var offerName = offer.offer.name;
      var offerPeriod = offer.offer.offerPeriod;
      var defaultDisplay = offer.offer.display;
      let discount = defaultDisplay=="percent"?offer.offerPercent+"%":<Price data={offer.offerValue} />
      return (
        <div className="offerListOfferDetails">
          <div>
            <span>{offer.offer.name}</span>
            <span>({discount} off)</span>
          </div>
          <div>
            <Date data={offerPeriod[0]} /> to <Date data={offerPeriod[1]} />
          </div>
        </div>
      )
    }
    const columns = [
        {
          title: "P. Code",
          dataIndex: "productCode",
          key: "productCode",
          render: (text, record) => {
            return <span className="link">{text}</span>
          },
          sorter: (a, b) => a.productCode.localeCompare(b.productCode),
        },
        {
          title: "P. Name",
          width: 200,
          dataIndex: "productName",
          key: "productName",
          render: (text, record) => 
            <div>
              <div className="link">{text}</div>
              {
                record.offer &&
                showOfferDetails(record.offer)
              }
              
            </div>,
          sorter: (a, b) => a.productName.localeCompare(b.productName),
        },
        {
          title: "Cat.",
          dataIndex: "category",
          key: "category",
          render: (text, record) => {
            return <span className="link">{text}</span>
          },
          filters: adminProductFilter.find((filter)=>filter.shortName === "categories")?.options
                    .map((option)=>{return{text:option.label, value:option.value}}),
          onFilter: (value, record) => record.categoryId.indexOf(value) === 0,
          sorter: (a, b) => a.category.localeCompare(b.category),
        },
        {
          title: "Item",
          dataIndex: "materials",
          key: "materials",
          render: (text, record) => {
            return <span className="link">{text?.join(", ")}</span>
          },
          filters: materialFilters,
          onFilter: (value, record) => record.materials.includes(value),
        },
        {
          title: intl.messages["app.pages.common.price"],
          dataIndex: "sellingPrice",
          key: "sellingPrice",
          render: (text, record) => <Price data={text} />,
          sorter: (a, b) => a.price - b.price,
        },
    ];

    const getProducts = () => {
        //var selectedProductIds = selectedProducts.map((product)=>product.variant)
        axios
          .post(API_URL + "/products/offerSearch",{
            offerId: offerId,
            //selected:selectedProductIds,
            selectedDate: selectedDate
          })
          .then((response) => {
            if (response.data.length > 0) {
                var dbProductList = response.data;
                dbProductList= dbProductList.map((variant)=>{
                    var product = variant.product;
                    var isDiamond = variant.productDiamondComponents.length>0?true:null;
                    var materialMetal = variant.metalType.map((metal)=>metal.name)
                    var materialStone = variant.stoneType.map((stone)=>stone.name)
                    var materials = [];
                    if(isDiamond)
                      materials.push("Diamond");
                    if(materialMetal.length>0)
                      materials.push(...materialMetal);
                    if(materialStone.length>0)
                      materials.push(...materialStone);
                    return{
                      _id:variant._id,
                      productCode: variant.productCode,
                      productName: product.productName,
                      mrp: variant.price,
                      sellingPrice: variant.finalPrice,
                      category: product.categories_id.title,
                      categoryId: product.categories_id._id,
                      materials: materials,
                      offer: variant.offers
                    }
                  })
                setProductList(dbProductList);
            }
            else{
                setProductList([]);
            }
          })
          .catch((err) => console.log(err));
    };

    useEffect(() => {
        getProductFilters();
    }, []);

    useEffect(() => {
        getProducts();
    //},[selectedProducts, selectedDate])
    },[selectedDate])
    
    useEffect(()=>{
      setSelectedRowKeys(selectedProducts.map((selectedProduct)=>selectedProduct.key));
    },[selectedProducts])

    useEffect(() => {
        updateMaterialFilter();
    },[adminProductFilter])
    return(
        <Drawer 
            title="Search Products" 
            placement="right" 
            onClose={()=>setOpenDrawer(false)} 
            open={openDrawer}
            size="large"
        >
            <Table
                title={() => `Showing: ${productList.length} Products`}
                columns={columns}
                pagination={{ 
                  position: "bottom", 
                  defaultPageSize: 8, 
                  showTotal:(total, range) => `Showing ${range[0]}-${range[1]} of ${total} products`,
                }}
                dataSource={productList}
                rowKey="_id"
                searchable={true}
                rowSelection={{
                    type: 'checkbox',
                    //columnTitle: "Pick",
                    onChange: (selectedKeys, selectedRows, {type})=>{
                      if(type=="all"){
                        console.log("on Change")
                        //setSelectedRowKeys(selectedRowKeys);
                        console.log(selectedRows)
                        var newProducts = selectedRows.filter((row)=> !selectedRowKeys.includes(row._id))
                        var removedProductKeys = selectedRowKeys.filter((key)=>!selectedKeys.includes(key))
                       
                        onBulkUpdate(newProducts, removedProductKeys)
                      }
                      
                      
                    },
                    selectedRowKeys:selectedRowKeys,
                    onSelect: (record, selected, selectedRows, nativeEvent)=>{
                      console.log("onSelect")
                      onSelectChange(record,selected);
                    },
                    getCheckboxProps: (record) => ({
                      disabled: record.offer!=null,
                    }),
                }}
            />
            {/* {
                productList.map((product)=>{
                    return(
                        <ProductCard 
                            productDetails={product} 
                            onProductSelect={()=>onProductSelect(product)}
                        />
                    )
                })
            } */}
        </Drawer>
    )
};

export default Default;
