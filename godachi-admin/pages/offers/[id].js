import EditOfferForm from '../../app/components/Offers/addEdit';
import axios from "axios";
import { API_URL } from "../../config/config";
import router from "next/router";
const EditProduct = ({ getData = [] }) => {
  const { id } = router.query;

  return (
    <>
      < EditOfferForm getData={getData} id={id} />
    </>
      
  );
}

EditProduct.getInitialProps = async ({ req, query }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const getData = await axios.get(API_URL + "/offers/" + query.id, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

    return {
      getData: getData.data
    };
  }
};

export default EditProduct;