import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import {
  Select,
  message,
  Popconfirm,
  Button,
  Tooltip,
  Radio,
  Modal,
  DatePicker,
  Typography,
  Popover
} from "antd";
const { Text } = Typography;
const { RangePicker } = DatePicker;

import { Table, SearchTableInput, ExportTableButton} from "ant-table-extensions";

import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
  FileExcelOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config/config";
import moment from "moment";
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";
import Price from "../Price";
import PackOrder from "./packOrder"
import UpdateHsn from "./updateHsn"
import DirectShipment from "./directShipment"
import OrderDetailsCommon from "./orderDetailsCommon"
import TrackOrder from "./trackOrder"
const Default = ({ 
    getData = [],
    showFilters= true,
    dateFilter=null,
    tableTitle,
    showHeading = true,
    limit=null,
    viewAll=false
}) => {
  const intl = useIntl();
  const [data, seTdata] = useState(getData);
  const [searchDataSource, setSearchDataSource] = useState(data);
  const [orderStatus, seTorderStatus] = useState([]);
  const { user } = useSelector(({ login }) => login);
  const { role } = user;

  const [showPackOrderModal, setShowPackOrderModal] = useState(false);
  const [showHsnModal, setShowHsnModal] = useState(false);
  const [showApproveOrderModal, setShowApproveOrderModal] = useState(false);
  const [showDirectShipmentModal, setShowDirectShipmentModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [confirmLoadingPackOrder, setConfirmLoadingPackOrder] = useState(false);
  const [confirmLoadingHsn, setConfirmLoadingHsn] = useState(false);
  const [confirmLoadingDirectShipment, setConfirmLoadingDirectShipment] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const [showTrackOrder, setShowTrackOrder] = useState(false)
  const [selectedWayBill, setSelectedWayBill] = useState(null)

  const [orderFilter,setOrderFilter] = useState({
    status:null,
    paymentType: null,
    date: dateFilter,
    limit: limit
  })

  const columns = [
    {
      title: intl.messages["app.pages.common.date"],
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <Tooltip placement="top" title={moment(text).fromNow()}>
          {moment(text).format("DD-MMM-YY HH:mm")}
        </Tooltip>
      ),
      sorter: (a, b) => a.createdAt > b.createdAt,
    },
    {
      title: intl.messages["app.pages.orders.orderNumber"],
      dataIndex: "orderNumber",
      key: "orderNumber",
      sorter: (a, b) => a.orderNumber.localeCompare(b.orderNumber),
    },
    {
      title: "Customer",
      dataIndex: ["customer","name"],
      key: "customer",
      render: (text, record) => <div>
                                  <Popover content={()=>(
                                    <div>
                                      Name: {record.customer.name}<br />
                                      Mobile: {record.customer.origPhoneInput}<br />
                                      Email: {record.customer.email}<br />
                                    </div>
                                  )} title="Customer Details">
                                    <Button size="small">{record.customer.name}</Button>
                                  </Popover>
                                  
                                </div>,
    },
    {
      title: intl.messages["app.pages.orders.totalPrice"],
      dataIndex: "finalPrice",
      key: "finalPrice",
      render: (text, record) => <Price data = {text} />,
      sorter: (a, b) => a.finalPrice - b.finalPrice,
    },
    {
      title: "Status",
      dataIndex: ['orderStatus', 'title'],
      key: "status",
      render: (text, record) => text,
      filters: orderStatus.map((option)=>{return{text:option.title, value:option._id}}),
      onFilter: (value, record) => record.orderStatus._id==value,
      sorter: (a, b) => a.orderStatus.title.localeCompare(b.orderStatus.title),
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (text, record) => {
                                var paymentOptions = [];
                                if(record?.payment?.walletAmount > 0){
                                  paymentOptions.push("Wallet")
                                  
                                }
                                if(record?.payment.paymentAmount > 0){
                                  paymentOptions.push(record?.payment?.paymentType=="cash"?"COD":"Prepaid")
                                }

                                return(
                                  <div>
                                    {paymentOptions.join(", ")}
                                  </div>
                                )
                                
                              },
      sorter: (a, b) => a.paymentType.localeCompare(b.paymentType),
      filters: [
        {text:"Wallet", value: "wallet"},
        {text:"COD", value: "cash"},
        {text:"Prepaid", value: "gateway"},
      ],
      onFilter: (value, record) => {
        if(record?.payment?.walletAmount > 0 && value=="wallet"){
          return true
        }
        else if(record?.payment?.paymentType == value)
          return true
        return false
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentType",
      key: "paymentStatus",
      render: (text, record) => {
                                var paymentReceievedData = {};
                                if(record?.payment?.walletAmount > 0){
                                  if(record?.payment.paymentAmount > 0 && record?.payment?.isPaymentAmountPaid == false){
                                    paymentReceievedData = {
                                      name:"Partially Received",
                                      type:"warning"
                                    }
                                  }
                                  else{
                                    paymentReceievedData = {
                                      name:"Fully Received",
                                      type:"success"
                                    }
                                  }
                                }
                                else{
                                  if(record?.payment?.isPaymentAmountPaid == true){
                                    paymentReceievedData = {
                                      name:"Fully Received",
                                      type:"success"
                                    }
                                  }
                                  else{
                                    paymentReceievedData = {
                                      name:"Not Yet Received",
                                      type:"danger"
                                    }
                                  }
                                }

                                return(
                                  <div>
                                    <Text type={paymentReceievedData.type}>{paymentReceievedData?.name}</Text>
                                  </div>
                                )
                                
                              },
      sorter: (a, b) => a.paymentType.localeCompare(b.paymentType),
      filters: [
        {text:"Fully Received", value: "full"},
        {text:"Partially Received", value: "partial"},
        {text:"Payment Not Received", value: "not"},
      ],
      onFilter: (value, record) => {
        if(record?.payment?.walletAmount > 0){
          if(record?.payment.paymentAmount > 0 && record?.payment?.isPaymentAmountPaid == false){
            if(value=="partial")
              return true
          }
          else{
            if(value=="full")
              return true
            }
        }
        else{
          if(record?.payment?.isPaymentAmountPaid == true){
            if(value=="full")
              return true
          }
          else{
            if(value=="not")
              return true
            }
        }
        return false
      },
    },
    {
      title: "Shipment Status",
      dataIndex: "current_logistics_status",
      key: "current_logistics_status",
      render: (text, record) => text,
      sorter: (a, b) => a.current_logistics_status.localeCompare(b.current_logistics_status),
    },
    {
      title: intl.messages["app.pages.common.action"],
      key: "_id",
      width: 360,
      render: (text, record) => (
        <span className="link ant-dropdown-link">
          {
            ["pending", "confirmed"].includes(record.orderStatus?.type) &&
            <Button className="packOrderButton" size="small" onClick={()=>updateHsnCode(record._id)}>Update HSN Code</Button>
            
          }
          <Button className="orderDetailsButton" size="small" onClick={()=>showOrderDetails(record._id)}>Order Details</Button>
          {
            ["pending", "confirmed","packed", "dispached"].includes(record.orderStatus?.type) &&
            <Popconfirm
              placement="left"
              title="Are you sure to cancel this order?"
              onConfirm={()=>cancelOrder(record._id)}
            >
              <Button className="cancelOrderButton" size="small">Cancel Order</Button>
            </Popconfirm>
            
          }
          
          {
            ["pending"].includes(record.orderStatus?.type) &&
            <>
              <Button className="approveOrderButton" size="small" onClick={()=>onApproveClick(record)}>Approve Order</Button>

              {/* <Popconfirm
                  placement="left"
                  title="Are you sure to approve this order? Payment will be set as Cash On Delivery for this order."
                  onConfirm={()=>approveOrder(record._id)}
                >
                  <Button className="approveOrderButton" size="small" >Approve Order</Button>
                </Popconfirm> */}
            </>
            
            
          }
          {
            ["confirmed"].includes(record.orderStatus?.type) &&
            <>
              <Button className="packOrderButton" size="small" onClick={()=>packOrder(record._id)}>Pack Order</Button>
              <Button className="packOrderButton" size="small" onClick={()=>directShipment(record._id)}>Direct Shipment</Button>
            </>
            
          }
          {
            ["packed"].includes(record.orderStatus?.type) &&
            <Popconfirm
              placement="left"
              title="Are you sure to mark this order as delivered?"
              onConfirm={()=>orderDelivered(record._id)}
            >
              <Button className="markDeliveredButton" size="small">Mark as Delivered</Button>
            </Popconfirm>
            
          }
         {/*  {
            ["delivered"].includes(record.orderStatus?.type) &&
            <Button className="returnOrderButton" size="small" onClick={()=>returnOrder(record._id)}>Return Order</Button>
          } */}
          {
            record.waybill &&
            <>
              <Button className="trackOrderButton" size="small" onClick={()=>trackOrder(record.waybill)}>Track Order</Button>
              <Button className="printShipmentButton" size="small" onClick={()=>printShipment(record.waybill)}>Print Shipment label</Button>
              <Button className="printManifestButton" size="small" onClick={()=>printManifest(record.waybill)}>Print Manifest</Button>
            </>
            
          }
        </span>
      ),
    },
  ];


  const cancelOrder = async (orderId)=>{
    axios
      .post(API_URL + "/orders/cancelOrderAdmin/"+orderId)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Order Updated");
          getDataFc();
        }
      })
      .catch((err) => console.log(err));
  }
  const approveOrder = async (orderId)=>{
    axios
      .post(API_URL + "/orders/approveOrderAdmin/"+orderId)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Order Updated");
          getDataFc();
          setShowApproveOrderModal(false)
        }
      })
      .catch((err) => console.log(err));
  }
  const convertToCod = async (orderId)=>{
    axios
      .post(API_URL + "/orders/convertToCodAdmin/"+orderId)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Order Updated");
          getDataFc();
          setShowApproveOrderModal(false)
        }
      })
      .catch((err) => console.log(err));
  }
  const markPaymentReceived = async (orderId)=>{
    axios
      .post(API_URL + "/orders/markPaymentReceivedAdmin/"+orderId)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Order Updated");
          getDataFc();
          setShowApproveOrderModal(false)
        }
      })
      .catch((err) => console.log(err));
  }
  const onApproveClick = async (orderDetails) =>{
    setSelectedOrderId(orderDetails._id);
    setSelectedOrderDetails(orderDetails)
    setShowApproveOrderModal(true)
  }
  const packOrder = async (orderId)=>{
    setSelectedOrderId(orderId)
    setShowPackOrderModal(true)
  }
  const updateHsnCode = async (orderId)=>{
    setSelectedOrderId(orderId)
    setShowHsnModal(true)
  }
  const directShipment = async (orderId)=>{
    setSelectedOrderId(orderId)
    setShowDirectShipmentModal(true)
  }
  const showOrderDetails = async (orderId)=>{
    setSelectedOrderId(orderId)
    setOpenDrawer(true)
  }
  const orderDelivered = async (orderId)=>{
    axios
      .post(API_URL + "/orders/markDelivered/"+orderId)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Order Updated");
          getDataFc();
        }
      })
      .catch((err) => console.log(err));
  }
  const printShipment = async (wayBill) =>{
    try{
        var axiosResponse = await axios.get(`${API_URL}/logistics/printShipment/${wayBill}`)
        if(axiosResponse && axiosResponse.data){
            var response = axiosResponse.data;
            if(response.success){
              //window.open(response.result,"_blank")
              let alink = document.createElement('a');
              alink.href = response.result;
              alink.download = `label-${wayBill}.pdf`;
              alink.click();
              alink.remove();
            }
        }
    }
    catch(error){
     console.log(error)
    }
}
const printManifest = async (wayBill) =>{
  try{
      var axiosResponse = await axios.get(`${API_URL}/logistics/printManifest/${wayBill}`)
      if(axiosResponse && axiosResponse.data){
          var response = axiosResponse.data;
          if(response.success){
            //window.open(response.result,"_blank")
            let alink = document.createElement('a');
            alink.href = response.result;
            alink.download = `manifest-${wayBill}.pdf`;
            alink.click();
            alink.remove();
          }
      }
  }
  catch(error){
   console.log(error)
  }
}
  const returnOrder = async (orderId)=>{
    
  }

  const trackOrder = async (waybill)=>{
    setShowTrackOrder(true);
    setSelectedWayBill(waybill)
  }
  const getDataFc = () => {
    axios
      .post(API_URL + "/orders", orderFilter)
      .then((res) => {
        if (res.data && res.data?.variant!="error") {
          const data = res.data;
          seTdata(data);
          setSearchDataSource(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const getDataStatusFc = (target = "All") => {
    var statusOption = null
    if (target != "All") {
      statusOption = target
    }
    setOrderFilter(orderFilter =>({
      ...orderFilter,
      status: statusOption
    }))
    /* axios
      .get(API_URL + "/orders/status/" + target)
      .then((res) => {
        seTdata(res.data);
        setSearchDataSource(res.data);
      })
      .catch((err) => console.log(err)); */
  };

  const updatePaymentType = (target = "All") => {
    var statusOption = null
    if (target != "All") {
      statusOption = target
    }
    setOrderFilter(orderFilter =>({
      ...orderFilter,
      paymentType: statusOption
    }))
  };
  const updateDateRange = (dates,dateStrings) => {
    console.log(dates)
    console.log(dateStrings)
    setOrderFilter(orderFilter =>({
      ...orderFilter,
      date: dates
    }))
  };

  const getOrderStatus = () => {
    axios
      .get(API_URL + "/orderstatus")
      .then((res) => {
        if (res.data.length > 0) {
          const data = res.data;
          seTorderStatus(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrderStatus();
  }, []);
  useEffect(() => {
    getDataFc();
  }, [orderFilter]);
  
  useEffect(() => {
    setOrderFilter(orderFilter=>({
        ...orderFilter,
        date:dateFilter
    }))
  }, [dateFilter]);


  const deleteData = (id, imagePath = 0) => {
    axios.delete(`${API_URL}/orders/${id}`).then(() => {
      message.success(intl.messages["app.pages.common.deleteData"]);
      getDataFc();
      Router.push("/orders/list");
    });

    if (imagePath != 0) {
      axios
        .post(`${API_URL}/upload/deleteproductimage`, { path: imagePath })
        .then(() => {
          message.success(intl.messages["app.pages.common.deleteData"]);
          getDataFc();
          Router.push("/orders/list");
        });
    }
  };

  return (
    <>
    {
        showHeading &&
        <h5 className="mr-5 ">
            <IntlMessages id="app.pages.orders.list" />{" "}
        </h5>
    }
    
    {/* <Select
      defaultValue="All"
      className="w-full float-left mt-3 sm:hidden block"
      onChange={(val) => {
        console.log(val)
        getDataStatusFc(val);
      }}
    >
      <Select.Option value="All">
        <IntlMessages id="app.pages.orders.all" />
      </Select.Option>
      {orderStatus.map((item) => (
        <Select.Option ghost key={item._id} value={item._id}>
          {item.title}
        </Select.Option>
      ))}
    </Select> */}
  
    {
      showFilters &&
      <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px"
        }}
      >
        <Radio.Group
          defaultValue="All"
          className=" w-full mr-0 h-0 overflow-hidden sm:h-auto sm:overflow-auto  text-center  mx-auto   "
          buttonStyle="solid"
          onChange={(val) => {
            getDataStatusFc(val.target.value);
          }}
        >
          <Radio.Button value="All">
            <IntlMessages id="app.pages.orders.all" />
          </Radio.Button>
          {orderStatus.map((item) => (
            <Radio.Button ghost key={item._id} value={item._id}>
              {item.title}
            </Radio.Button>
          ))}
        </Radio.Group>
        <Radio.Group
          defaultValue="All"
          className=" w-full mr-0 h-0 overflow-hidden sm:h-auto sm:overflow-auto  text-center  mx-auto   "
          buttonStyle="solid"
          onChange={(val) => {
            updatePaymentType(val.target.value);
          }}
        >
          <Radio.Button value="All">
            All
          </Radio.Button>
          <Radio.Button value="cash">
            COD
          </Radio.Button>
          <Radio.Button value="gateway">
            Prepaid
          </Radio.Button>
        </Radio.Group>
        <RangePicker 
          allowEmpty={[true, true]}
          onChange = {updateDateRange}
          format='DD-MMM-YYYY'
        />
      </div>
    }
    
    

  
  
  <Table
    title={() => (
      <>
          {
              showFilters &&
              <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems:"center"
                }}
              >
                <div>
                  Showing: {searchDataSource.length} Orders
                </div>
                <ExportTableButton
                  dataSource={data}
                  columns={columns}
                  btnProps={{ type: "default", icon: <FileExcelOutlined /> }}
                  showColumnPicker
                  fileName="Order Details" 
                >
                  Export to CSV
                </ExportTableButton>
      
                <SearchTableInput
                  columns={columns}
                  dataSource={data}
                  setDataSource={setSearchDataSource} 
                  showColumnPicker={true}
                  inputProps={{
                    placeholder: "Search for Orders",
                    prefix: <SearchOutlined />,
                  }}
                  fuzzySearch={true}
                  fuseProps={{
                    threshold: 0,
                    ignoreLocation: true
                  }}
                />
              </div>
          }
          {
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center"
              }}
            >
              {tableTitle}
              {
                viewAll &&
                <Link href="/orders/list">
                  <a>View All</a>
                </Link>
              }
            </div>
          }
      </>
    )
      
    }
    columns={columns}
    /* pagination={{ 
      position: "bottom",
      defaultCurrent: pageNumber,
      defaultPageSize: pageSize, 
      onChange:(page, pageSize)=>{
        dispatch(setPageDetails({
          page: page,
          pageSize: pageSize
        }))
      }
    }} */
    dataSource={searchDataSource}
    expandable={{ defaultExpandAllRows: true }}
    rowKey="_id"
  />
   {/*  <Table
      columns={columns}
      //pagination={{ position: "bottom",  defaultPageSize: 50}}
      dataSource={[...data]}
      expandable={{ defaultExpandAllRows: true }}
      rowKey="_id"
    /> */}

    <Modal
      title="Pack Order"
      visible={showPackOrderModal}
      onOk={() => setConfirmLoadingPackOrder(true)}
      confirmLoading={confirmLoadingPackOrder}
      onCancel={() => setShowPackOrderModal(false)}
      footer={null}
      width={1000}
    >
      <PackOrder 
        selectedOrderId={selectedOrderId}
        onSuccess={()=>{
          setShowPackOrderModal(false);
          getDataFc();
        }}
      />
    </Modal>

    <Modal
      title="Update HSN Codes"
      visible={showHsnModal}
      onOk={() => setConfirmLoadingHsn(true)}
      confirmLoading={confirmLoadingHsn}
      onCancel={() => setShowHsnModal(false)}
      footer={null}
      width={1000}
    >
      <UpdateHsn 
        selectedOrderId={selectedOrderId}
        onSuccess={()=>{
          setShowHsnModal(false);
          getDataFc();
        }}
      />
    </Modal>

    <Modal
      title="Direct Shipment"
      visible={showDirectShipmentModal}
      onOk={() => setConfirmLoadingDirectShipment(true)}
      confirmLoading={confirmLoadingDirectShipment}
      onCancel={() => setShowDirectShipmentModal(false)}
      footer={null}
      width={1000}
    >
      <DirectShipment 
        selectedOrderId={selectedOrderId}
        onSuccess={()=>{
          setShowDirectShipmentModal(false);
          getDataFc();
        }}
      />
    </Modal>

    <Modal
      title="Approve Order"
      visible={showApproveOrderModal}
      onCancel={() => setShowApproveOrderModal(false)}
      footer={null}
      width={1000}
    >
      {
        selectedOrderDetails &&
        <div>   
          {
            (selectedOrderDetails.paymentType=="cash" ||
              (selectedOrderDetails?.payment?.paymentType=="gateway" && selectedOrderDetails?.payment?.isPaymentAmountPaid==true)
            ) &&
            <>
              <p>
                Are you sure you want to approve this order?
              </p>
              <Button type="primary" onClick={()=>approveOrder(selectedOrderId)}>
                  Approve Order
              </Button>
            </>
          }  
          {
            selectedOrderDetails?.payment?.paymentType=="gateway" && selectedOrderDetails?.payment?.isPaymentAmountPaid==false &&
            <>
              <p>
                This order is a prepaid order and according to our system we haven't received any payment from the customer. Are you sure you want to approve this order?
              </p>
              <Button type="primary" onClick={()=>convertToCod(selectedOrderId)}>
                  Yes, Convert To COD Order
              </Button>
              <Button type="danger" onClick={()=>markPaymentReceived(selectedOrderId)}>
                  Yes, We Received Online Payment
              </Button>
            </>
            
          }    
          
        </div>
      }
      
    </Modal>

    <TrackOrder 
      show = {showTrackOrder}
      setShow = {setShowTrackOrder}
      wayBill = {selectedWayBill}
    />
    <OrderDetailsCommon 
      openDrawer={openDrawer}
      setOpenDrawer={setOpenDrawer}
      selectedOrderId={selectedOrderId}
    />
  </>
  );
};



export default Default;
