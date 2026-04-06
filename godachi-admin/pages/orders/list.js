import OrderListTable from '../../app/components/Order/orderList';
import axios from "axios";
import { API_URL } from "../../config/config";
const OrderList = ({ getData = [] }) => {
  return (
    <>
      < OrderListTable getData={getData} />
    </>
  );
}

OrderList.getInitialProps = async ({ req, query }) => {
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

export default OrderList;