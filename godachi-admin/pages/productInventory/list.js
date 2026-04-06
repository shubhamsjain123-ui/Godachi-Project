import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { message, Popconfirm, Button, Modal, Rate, Image } from "antd";
import {
  EyeOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
  UploadOutlined,
  LinkOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FlagFilled
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, WEBSITE_URL, IMG_URL } from "../../config/config";
import AddNote from "./note";
import AddInventory from "./add";
import RemoveInventory from "./remove";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";
import { Table, SearchTableInput } from "ant-table-extensions";

const Default = ({ getData = [] }) => {
  const intl = useIntl();
  const [data, seTdata] = useState(getData);
  const { user } = useSelector(({ login }) => login);
  const { role } = user;

  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmLoadingAdd, setConfirmLoadingAdd] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [confirmLoadingAddNote, setConfirmLoadingAddNote] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [confirmLoadingRemove, setConfirmLoadingRemove] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [vendorList, setVendorList] = useState([]);
  const exportableColumns = {
    productCode: "Product Code",
    productName: {
      header: "Name",
      formatter: (_fieldValue, record) => {
        return record.product.productName;
      },
    },
    quantity: "Quantity",

  }
  const columns = [
    {
      title: "Important",
      dataIndex: "inventoryMarkAsImportant",
      key: "inventoryMarkAsImportant",
      render: (important, record) => {
        return(
          <Rate 
            count={1} 
            value={important?1:0} 
            character={<FlagFilled />} 
            onChange={()=>{
              markAsImportant(record._id)
            }}  
          />
        )
      },
      sorter: (a, b) => b.inventoryMarkAsImportant - a.inventoryMarkAsImportant,
    },
    {
      title: "Product Image",
      dataIndex: "images",
      key: "images",
      render: (text, record) => {
        var images = record.product.allImages;
        var allImages = images?.filter((img)=>img.mimeType.includes("image"))
        var img = allImages?allImages[0]?.image:null   
        return img ? <Image src={IMG_URL + img} height={80} width={80} /> :<></>
      },
    },
    {
      title: "Product Code",
      dataIndex: "productCode",
      key: "productCode",
      render: (text) => <span className="link">{text}</span>,
      sorter: (a, b) => a.productCode.localeCompare(b.productCode),
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => <span className="link">{record.product.productName}</span>,
      sorter: (a, b) => a.product.productName.localeCompare(b.product.productName),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <span className="link">{text}</span>,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Note",
      dataIndex: "inventoryNote",
      key: "inventoryNote",
      render: (text) => <span className="link">{text}</span>,
      sorter: (a, b) => a.inventoryNote - b.inventoryNote,
    },
    {
      title: intl.messages["app.pages.common.action"],
      key: "_id",
      width: 360,
      render: (text, record) => (
        <span className="link ant-dropdown-link">
          {role["products/id"] ? (
            <Link href={`/productInventory/${record._id}`}   >
              <EyeOutlined
                style={{ fontSize: "150%", marginLeft: "15px", color:"orange" }}
              />
            </Link>
          ) : (
            ""
          )}  
          {role["products/id"] ? (
            <span 
              onClick={()=>{
                setSelectedVariantId(record._id)
                setShowAddNoteModal(true)
              }}
            >
              {" "}
              <FileTextOutlined
                style={{ fontSize: "150%", marginLeft: "15px", color:"green" }}
              />
            </span>
          ) : (
            ""
          )}    
          {role["products/id"] && record.product.isDeleted != true ? (
            <span 
              onClick={()=>{
                setSelectedVariantId(record._id)
                setShowAddModal(true)
              }}
            >
              {" "}
              <PlusCircleOutlined
                style={{ fontSize: "150%", marginLeft: "15px", color:"#1890ff" }}
              />
            </span>
          ) : (
            ""
          )}       
          {role["products/id"] && record.product.isDeleted != true ? (
            <span 
              onClick={()=>{
                setSelectedVariantId(record._id)
                setShowRemoveModal(true)
              }}
            >
              {" "}
              <MinusCircleOutlined
                style={{ fontSize: "150%", marginLeft: "15px", color:"red" }}
              />
            </span>
          ) : (
            ""
          )}    
              
        </span>
      ),
    },
  ];

  const markAsImportant = (id) =>{
    axios
      .post(`${API_URL}/productInventory/markImportant/${id}`, {})
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Updated Successfully");
          getDataFc();
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
  
  const getDataFc = () => {
    axios
      .get(API_URL + "/productInventory")
      .then((response) => {
        if (response.data.length > 0) {
          seTdata(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFc();
    getVendors();
  }, []);

  const deleteData = (id) => {
    axios.delete(`${API_URL}/products/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      seTdata(data.filter((item) => item._id !== id));
      getDataFc();
      Router.push("/products/list");
    });
  };

  return (
    <div>
      <Table
        title={() => "Product Inventory"}
        columns={columns}
        pagination={{ position: "bottom",  defaultPageSize: 50}}
        dataSource={data}
        expandable={{ defaultExpandAllRows: true }}
        searchable={true}
        exportable={true}
        exportableProps={{ 
          showColumnPicker: true,
          fileName:"Product Inventory Table",
          fields: exportableColumns,
          btnProps: {
            icon: <FileExcelOutlined />,
            children: <span>Export to CSV</span>,
          },
  
        }}
        rowKey="_id"
      />

      <Modal
        title="Add Inventory"
        visible={showAddModal}
        onOk={() => setConfirmLoadingAdd(true)}
        confirmLoading={confirmLoadingAdd}
        onCancel={() => setShowAddModal(false)}
        footer={null}
      >
        <AddInventory 
          selectedVariantId={selectedVariantId}
          vendorList={vendorList}
          onSuccess={()=>{
            setShowAddModal(false);
            getDataFc();
          }}
        />
      </Modal>

      <Modal
        title="Remove Inventory"
        visible={showRemoveModal}
        onOk={() => setConfirmLoadingRemove(true)}
        confirmLoading={confirmLoadingRemove}
        onCancel={() => setShowRemoveModal(false)}
        footer={null}
      >
        <RemoveInventory 
          selectedVariantId={selectedVariantId}
          onSuccess={()=>{
            setShowRemoveModal(false);
            getDataFc();
          }}
        />
      </Modal>

      <Modal
        title="Add Note"
        visible={showAddNoteModal}
        onOk={() => setConfirmLoadingAddNote(true)}
        confirmLoading={confirmLoadingAddNote}
        onCancel={() => setShowAddNoteModal(false)}
        footer={null}
      >
        <AddNote 
          selectedVariantId={selectedVariantId}
          onSuccess={()=>{
            setShowAddNoteModal(false);
            getDataFc();
          }}
        />
      </Modal>
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
