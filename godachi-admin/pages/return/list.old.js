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
  Modal,
  Image
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../config/config";
import moment from "moment";
import { useIntl } from "react-intl";
import IntlMessages from "../../util/IntlMessages";
import Price from "../../app/components/Price";
import PackOrder from "../../app/components/Return/packOrder"
import TrackOrder from "../../app/components/Return/trackOrder"
import RefundReturnAmount from "../../app/components/Return/refundReturnAmount"
import OrderDetailsCommon from "../../app/components/Order/orderDetailsCommon"
const Default = ({ getData = [] }) => {
  const intl = useIntl();
  const [data, seTdata] = useState(getData);
  const [returnStatus, seTreturnStatus] = useState([]);
  const { user } = useSelector(({ login }) => login);
  const { role } = user;

  const [showPackOrderModal, setShowPackOrderModal] = useState(false);
  const [showApproveReturnModal, setShowApproveReturnModal] = useState(false);
  const [selectedOrderReason, setSelectedOrderReason] = useState(false);
  const [selectedOrderDescription, setSelectedOrderDescription] = useState(false);
  const [selectedOrderUserImages, setSelectedOrderUserImages] = useState([]);
  const [showRefundAmountModal, setShowRefundAmountModal] = useState(false);
  const [confirmLoadingPackOrder, setConfirmLoadingPackOrder] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [defaultRefundPrice, setDefaultRefundPrice ] = useState(0);
  const [showTrackOrder, setShowTrackOrder] = useState(false)
  const [selectedWayBill, setSelectedWayBill] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false);
  const columns = [
    {
      title: "Return Number",
      dataIndex: "returnNumber",
      key: "returnNumber",
    },
    {
      title: intl.messages["app.pages.orders.totalPrice"],
      dataIndex: "total_price",
      key: "total_price",
      render: (text, record) => <Price data = {text} />,
    },
    {
      title: "Status",
      dataIndex: "returnStatus",
      key: "returnStatus",
      render: (text, record) => text?.title,
    },
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
      title: intl.messages["app.pages.common.action"],
      key: "_id",
      width: 360,
      render: (text, record) => (
        <span className="link ant-dropdown-link">
          <Button className="orderDetailsButton" size="small" onClick={()=>showOrderDetails(record.order)}>Order Details</Button>
          {
            ["pending", "confirmed"].includes(record.returnStatus?.type) &&
            <Popconfirm
              placement="left"
              title="Are you sure to cancel this request?"
              onConfirm={()=>cancelRequest(record._id)}
            >
              <Button size="small">Cancel Request</Button>
            </Popconfirm>
            
          }
          {
            ["pending"].includes(record.returnStatus?.type) &&
            <Popconfirm
              placement="left"
              title="Are you sure to approve this request?"
              onConfirm={()=>onApproveRequest(record._id, record.reason, record.description, record.userImages)}
            >
              <Button size="small" >Approve Request</Button>
            </Popconfirm>
            
          }
          {/* {
            ["confirmed"].includes(record.returnStatus?.type) &&
            <Button size="small" onClick={()=>packOrder(record._id)}>Pack Order</Button>
          } */}
          {
            ["packed"].includes(record.returnStatus?.type) &&
            <Popconfirm
              placement="left"
              title="Are you sure to mark this order as recieved?"
              onConfirm={()=>orderRecieved(record._id)}
            >
              <Button size="small">Mark as Received</Button>
            </Popconfirm>
            
          }
          {
            ["received"].includes(record.returnStatus?.type) &&
            <Button size="small" onClick={()=>initiateRefund(record._id, record.total_price)}>Initiate Refund</Button>
          }
          {
            record.waybill &&
            <>
              <Button size="small" onClick={()=>trackOrder(record.waybill)}>Track Order</Button>
              <Button size="small" onClick={()=>printShipment(record.waybill)}>Print Shipment label</Button>
              <Button size="small" onClick={()=>printManifest(record.waybill)}>Print Manifest</Button>
            </>
            
          }
        </span>
      ),
    },
  ];

  const showOrderDetails = async (orderId)=>{
    setSelectedOrderId(orderId)
    setOpenDrawer(true)
  }

  const cancelRequest = async (orderId)=>{
    axios
      .post(API_URL + "/orders/cancelReturnAdmin/"+orderId)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Request Cancelled");
          getDataFc();
        }
      })
      .catch((err) => console.log(err));
  }
  const onApproveRequest = async (orderId, reason, description, userImages)=>{
    setShowApproveReturnModal(true)
    setSelectedOrderId(orderId)
    setSelectedOrderReason(reason)
    setSelectedOrderDescription(description)
    setSelectedOrderUserImages(userImages)
  }
  const approveRequest = async (orderId)=>{
    axios
      .post(API_URL + "/orders/approveReturnAdmin/"+orderId)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          setShowApproveReturnModal(false)
          message.success("Request Approved");
          getDataFc();
        }
      })
      .catch((err) => console.log(err));
  }
  const initiateRefund = async (orderId, total_price)=>{
    console.log(total_price)
    setDefaultRefundPrice(total_price);
    setSelectedOrderId(orderId)
    setShowRefundAmountModal(true)
  }
  const orderRecieved = async (orderId)=>{
    axios
      .post(API_URL + "/orders/return/markReceived/"+orderId)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Request Updated");
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
      .get(API_URL + "/orders/return")
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
      .get(API_URL + "/orders/return/status/" + target)
      .then((res) => {
        seTdata(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getOrderStatus = () => {
    axios
      .get(API_URL + "/orderstatus/return")
      .then((res) => {
        if (res.data.length > 0) {
          const data = res.data;
          seTreturnStatus(data);
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
            Return Requests
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
            {returnStatus.map((item) => (
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
            {returnStatus.map((item) => (
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
          <Modal
            title="Initiate Refund"
            visible={showRefundAmountModal}
            onOk={() => setConfirmLoadingPackOrder(true)}
            confirmLoading={confirmLoadingPackOrder}
            onCancel={() => setShowRefundAmountModal(false)}
            footer={null}
          >
            <RefundReturnAmount
              selectedOrderId={selectedOrderId}
              defaultRefundPrice={defaultRefundPrice}
              onSuccess={()=>{
                setShowRefundAmountModal(false);
                getDataFc();
              }}
            />
          </Modal>
          <Modal
            title="Approve Return"
            visible={showApproveReturnModal}
            onCancel={() => setShowApproveReturnModal(false)}
            footer={null}
          >
            <div>
              <p><b>Reason:</b> {selectedOrderReason}</p>
              <p><b>Description:</b> {selectedOrderDescription}</p>
              {
                selectedOrderUserImages.length>0 &&
                <>
                  <p><b>User Images</b></p>
                  {
                    selectedOrderUserImages.map((userImage)=>(
                      <Image src={IMG_URL+userImage} width={150}/>
                    ) )
                  }
                  
                </>
               
               
              }
              <div style={{marginTop:10}}>
                <Button onClick={()=>approveRequest(selectedOrderId)}>Approve</Button>
              </div>
              
            </div>
          </Modal>
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
