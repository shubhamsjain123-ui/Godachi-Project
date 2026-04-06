import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import {
  Select,
  message,
  Table,
  Popconfirm,
  Button,
  Tooltip,
  Radio,
  Modal
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../config/config";
import moment from "moment";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";
import Price from "../../app/components/Price";
import PackOrder from "../../app/components/Order/packOrder"
import UpdateHsn from "../../app/components/Order/updateHsn"
import DirectShipment from "../../app/components/Order/directShipment"
import OrderDetailsCommon from "../../app/components/Order/orderDetailsCommon"
import TrackOrder from "../../app/components/Order/trackOrder"
const Default = ({ getData = [] }) => {
  const intl = useIntl();
  const [data, seTdata] = useState(getData);
  const [orderStatus, seTorderStatus] = useState([]);
  const { user } = useSelector(({ login }) => login);
  const { role } = user;

  const [showPackOrderModal, setShowPackOrderModal] = useState(false);
  const [showHsnModal, setShowHsnModal] = useState(false);
  const [showDirectShipmentModal, setShowDirectShipmentModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [confirmLoadingPackOrder, setConfirmLoadingPackOrder] = useState(false);
  const [confirmLoadingHsn, setConfirmLoadingHsn] = useState(false);
  const [confirmLoadingDirectShipment, setConfirmLoadingDirectShipment] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [showTrackOrder, setShowTrackOrder] = useState(false)
  const [selectedWayBill, setSelectedWayBill] = useState(null)
  const columns = [
    {
      title: intl.messages["app.pages.common.date"],
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <Tooltip placement="top" title={moment(text).fromNow()}>
          {moment(text).format("DD-MMM-YY hh:mm A")}
        </Tooltip>
      ),
    },
    {
      title: intl.messages["app.pages.orders.orderNumber"],
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: intl.messages["app.pages.orders.totalPrice"],
      dataIndex: "finalPrice",
      key: "finalPrice",
      render: (text, record) => <Price data = {text} />,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text, record) => text?.title,
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
            <Popconfirm
              placement="left"
              title="Are you sure to approve this order? Payment will be set as Cash On Delivery for this order."
              onConfirm={()=>approveOrder(record._id)}
            >
              <Button className="approveOrderButton" size="small" >Approve Order</Button>
            </Popconfirm>
            
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
        }
      })
      .catch((err) => console.log(err));
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
      .get(API_URL + "/orders")
      .then((res) => {
        if (res.data.length > 0) {
          const data = res.data;
          seTdata(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const getDataStatusFc = (target = "All") => {
    if (target == "All") {
      return getDataFc();
    }
    axios
      .get(API_URL + "/orders/status/" + target)
      .then((res) => {
        seTdata(res.data);
      })
      .catch((err) => console.log(err));
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
    getDataFc();
  }, []);

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
    <div>
      {role["ordersview"] ? (
        <>
          <h5 className="mr-5 ">
            <IntlMessages id="app.pages.orders.list" />{" "}
          </h5>
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
          <Table
            columns={columns}
            pagination={{ position: "bottom",  defaultPageSize: 50}}
            dataSource={[...data]}
            expandable={{ defaultExpandAllRows: true }}
            rowKey="_id"
          />

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
      ) : (
        ""
      )}
    </div>
  );
};

Default.getInitialProps = async ({ req }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const res = await axios.get(API_URL + "/orders", {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

    const dataManipulate = res.data;

    return { getData: dataManipulate };
  }
};

export default Default;
