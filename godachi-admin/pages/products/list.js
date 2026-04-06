import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { message, Popconfirm, Button, Switch, Image } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
  UploadOutlined,
  LinkOutlined,
  CheckOutlined,
  CloseOutlined,
  FileExcelOutlined,
  SearchOutlined,
  FileImageTwoTone,
  VideoCameraTwoTone
} from "@ant-design/icons";
import { Table, SearchTableInput, ExportTableButton} from "ant-table-extensions";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IMG_URL, API_URL, WEBSITE_URL } from "../../config/config";
import Price from "../../app/components/Price";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";
import Date from "../../app/components/Date";
import ProductFilter from "../../app/components/Product/filters"
import { setPageDetails } from "../../redux/ProductList";
const Default = ({ getData = [] }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [data, seTdata] = useState(getData);
  const [searchDataSource, setSearchDataSource] = useState(data);
  const [selectedFilters, setSelectedFilters] = useState({});
  const { user } = useSelector(({ login }) => login);
  const { pageNumber, pageSize } = useSelector(({ productList }) => productList);
  const { role } = user;
  const [adminProductFilter, setAdminProductFilter] = useState([]);
  const [materialFilters, setMaterialFilters] = useState([]);

  useEffect(()=>{
    console.log(pageNumber)
  },[pageNumber])

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
  const getVariantPrice = (data) => {
    if(data.length==1){
      return (
        <Price data={data[0].grandTotal} />
      );
    }
    else if (data.length > 1) {
      const newData = data.sort((a, b) => {
        return a.grandTotal - b.grandTotal;
      });
      return (
        <span>
          {" "}
          <Price data={newData[0].grandTotal} /> -{" "}
          <Price data={newData[data.length - 1].grandTotal} />{" "}
        </span>
      );
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => {
        return record.image ? <Image src={IMG_URL + record.image} height={80} width={80} /> :<></>
      },
    },
    {
      title: "P. Code",
      dataIndex: "productCodeArray",
      key: "productCodeArray",
      render: (text, record) => {
        return <span className="link">{record.productCode}</span>
      },
      sorter: (a, b) => a.productCode.localeCompare(b.productCode),
    },
    {
      title: "P. Name",
      width: 200,
      dataIndex: "productName",
      key: "productName",
      render: (text) => <span className="link">{text}</span>,
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
    /* {
      title: "Metal",
      dataIndex: "metalComponent",
      key: "metalComponent",
      render: (text, record) => {
        return <span className="link">{text}</span>
      },
      filters: adminProductFilter.find((filter)=>filter.shortName === "metals")?.options
                .map((option)=>{return{text:option.label, value:option.label}}),
      onFilter: (value, record) => record.metalComponent.includes(value),
    },
    {
      title: "Diamond",
      dataIndex: "diamondComponent",
      key: "diamondComponent",
      render: (text, record) => {
        return <span className="link">{text}</span>
      },
    },
    {
      title: "Stone",
      dataIndex: "stoneComponent",
      key: "stoneComponent",
      render: (text, record) => {
        return <span className="link">{text}</span>
      },
      filters: adminProductFilter.find((filter)=>filter.shortName === "stones")?.options
                .map((option)=>{return{text:option.label, value:option.label}}),
      onFilter: (value, record) => record.stoneComponent.includes(value),
    }, */
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
      dataIndex: "price",
      key: "price",
      render: (text, record) => <Price data={text} />,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: intl.messages["app.pages.common.image"],
      width: 80,
      dataIndex: "imageCount",
      key: "imageCount",
      render: (text, record) => (
        record.imageCount &&
        <>
          <span className="link">
            {record.imageCount}
            <FileImageTwoTone />
            ,
          </span>
          <span className="link" style={{marginLeft:"5px"}}>
            {record.videoCount}
            <VideoCameraTwoTone />
          </span>
        </>
      ),
      sorter: (a, b) => a.imageCount - b.imageCount,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      width:90,
      key: "createdAt",
      render: (text) => <Date data={text} />,
      sorter: (a, b) => a.createdAt > b.createdAt,
    },
    {
      title: "Verify",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (text, record) => record._id && <span> 
                          <Switch
                            size="small"
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={text}
                            onChange={(value)=>changeProductApproval(record._id,value)}
                          />
                        </span>,
      filters: [
        {text: "Approved", value:true},
        {text: "Disapproved", value:false}
      ],
      onFilter: (value, record) => record.isApproved==value,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) =>record._id &&  <span> 
                          <Switch
                            size="small"
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={text}
                            onChange={(value)=>changeProductActive(record._id,value)}
                          />
                        </span>,
      filters: [
        {text: "Active", value:true},
        {text: "Inactive", value:false}
      ],
      onFilter: (value, record) => record.isActive==value,
    },
    {
      title: intl.messages["app.pages.common.action"],
      key: "_id",
      width: 180,
      render: (text, record) => (
        record._id && 
        <span className="link ant-dropdown-link">
          <Link href={WEBSITE_URL +"/product/"+ record.seo} >
            <a target="_blank"  title="Open Product Page">
              {" "}
              <LinkOutlined
                style={{ fontSize: "130%", marginLeft: "15px", color:"orange" }}
              />
            </a>
          </Link>
          {role["productimagesview"] ? (
            <Link
              href={"/productimages/list?id=" + record._id}
              className="link ant-dropdown-link"
            >
              <a  style={{ color:"#ff00f7" }} title="Upload Product Image">
                <UploadOutlined
                  style={{ fontSize: "130%", marginLeft: "15px", color:"#ff00f7" }}
                />
              </a>
            </Link>
          ) : (
            ""
          )}
          {role["products/id"] ? (
            <Link href={"/products/" + record._id}>
              <a>
                {" "}
                <EditOutlined
                  style={{ fontSize: "130%", marginLeft: "15px", color:"#1890ff" }}
                />
              </a>
            </Link>
          ) : (
            ""
          )}
          {role["productsdelete"] ? (
            <Popconfirm
              placement="left"
              title={intl.messages["app.pages.common.sureToDelete"]}
              onConfirm={() => deleteData(record._id)}
            >
              <a>
                <DeleteOutlined
                  style={{ fontSize: "130%", marginLeft: "15px", color:"red" }}
                />{" "}
              </a>
            </Popconfirm>
          ) : (
            ""
          )}
          
        </span>
      ),
    },
  ];

  const getDataFc = () => {
    axios
      .get(API_URL + "/products",selectedFilters)
      .then((response) => {
        if (response.data.length > 0) {
          var dbProductList = response.data.filter((product)=>product.variant_products && product?.variant_products.length>0)
          dbProductList= dbProductList.map((product)=>{
            var variant = product.variant_products[0];
            var isDiamond = product?.productDiamondComponents?.length>0?true:null;
            var materialMetal = product.productMetalComponents.map((metal)=>metal.metalType.name)
            var materialStone = product.productStoneComponents.map((stone)=>stone.stoneType?.name)
            var materials = [];
            if(isDiamond)
              materials.push("Diamond");
            if(materialMetal.length>0)
              materials.push(...materialMetal);
            if(materialStone.length>0)
              materials.push(...materialStone);
            var images = product.allImages;
            var allVideos = images?.filter((img)=>img.mimeType.includes("video"))
            var allImages = images?.filter((img)=>img.mimeType.includes("image"))
            return{
              _id:product._id,
              productCode: variant.productCode,
              productCodeArray: product.variant_products.map((variant)=>variant.productCode),
              productName: product.productName,
              price: variant.grandTotal,
              createdAt: product.createdAt,
              isApproved: product.isApproved,
              isActive: product.isActive,
              seo: product.seo,
              category: product.categories_id.title,
              categoryId: product.categories_id._id,
              materials: materials,
              imageCount: allImages?allImages.length:0,
              videoCount: allVideos?allVideos.length:0,
              image: allImages?allImages[0]?.image:null,
              children:product.variant_products.length>1
                        ?
                          product.variant_products.map((variant)=>{
                            return{
                              productCode: variant.productCode,
                              price: variant.grandTotal,
                            }
                          })
                        :
                        null
            }
          })
          seTdata(dbProductList);
          setSearchDataSource(dbProductList);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFc();
    getProductFilters();
  }, []);
  useEffect(() => {
    updateMaterialFilter();
  },[adminProductFilter])
  const deleteData = (id) => {
    axios.delete(`${API_URL}/products/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      seTdata(data.filter((item) => item._id !== id));
      getDataFc();
      Router.push("/products/list");
    });
  };

  const changeProductApproval = (id,value) => {
    axios.post(`${API_URL}/products/changeApproval/${id}/${value}`).then(() => {
      message.success("Product State Change Successfully");
      getDataFc();
      Router.push("/products/list");
    });
  };
  const changeProductActive = (id,value) => {
    axios.post(`${API_URL}/products/changeActive/${id}/${value}`).then(() => {
      message.success("Product State Change Successfully");
      getDataFc();
      Router.push("/products/list");
    });
  };

  const onFilterChange = (filterName, value)=>{
    setSelectedFilters({
      ...selectedFilters,
      [filterName]: value
    })
  }
/*   useEffect(() => {
    getDataFc();
  },[selectedFilters]) */
  return (
    <div>
      {role["products/add"] ? (
        <Link href="/products/add">
          <Button
            type="primary"
            className="float-right addbtn"
            icon={<AppstoreAddOutlined />}
          >
            <IntlMessages id="app.pages.common.create" />
          </Button>
        </Link>
      ) : (
        ""
      )}
      {/* <ProductFilter 
        onFilterChange={onFilterChange}
        search={ <SearchTableInput
                    columns={columns}
                    dataSource={data}
                    setDataSource={setSearchDataSource} 
                    inputProps={{
                      placeholder: "Search this table...",
                      prefix: <SearchOutlined />,
                    }}
                  />
              }
      /> */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px"
        }}>
        <ExportTableButton
          dataSource={data}
          columns={columns}
          btnProps={{ type: "default", icon: <FileExcelOutlined /> }}
          showColumnPicker
          fileName="Product Table" 
        >
          Export to CSV
        </ExportTableButton>

        <SearchTableInput
          columns={columns}
          dataSource={data}
          setDataSource={setSearchDataSource} 
          showColumnPicker={true}
          inputProps={{
            placeholder: "Search this table...",
            prefix: <SearchOutlined />,
          }}
          fuzzySearch={true}
          fuseProps={{
            threshold: 0,
            ignoreLocation: true
          }}
        />
      </div>
      
      <Table
        title={() => `Showing: ${searchDataSource.length} Products`}
        columns={columns}
        pagination={{ 
          position: "bottom",
          defaultCurrent: pageNumber,
          defaultPageSize: pageSize, 
          onChange:(page, pageSize)=>{
            dispatch(setPageDetails({
              page: page,
              pageSize: pageSize
            }))
          }
        }}
        dataSource={searchDataSource}
        expandable={{ defaultExpandAllRows: true }}
        rowKey="_id"
      />
    </div>
  );
};

Default.getInitialProps = async ({ req }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const res = await axios.get(API_URL + "/products", {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

    return { getData: res.data };
  }
};

export default Default;
