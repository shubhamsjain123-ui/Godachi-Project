import EditProductForm from '../../app/components/Product/addEdit';
import axios from "axios";
import { API_URL } from "../../config/config";
import func from "../../util/helpers/func";
import router from "next/router";
const EditProduct = ({ getCategories = [], getData = [] }) => {
  const { id } = router.query;

  return (
    <>
      < EditProductForm getCategories={getCategories} getData={getData} id={id} />
    </>
      
  );
}

EditProduct.getInitialProps = async ({ req, query }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const getData = await axios.get(API_URL + "/products/" + query.id, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

    const getDataCategories = await axios.get(`${API_URL}/categories`, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });
    const geTdataCategoriesManipulate = [];
    if (getDataCategories.data.length > 0) {
      geTdataCategoriesManipulate.push(
        func.getCategoriesTreeOptions(getDataCategories.data, true)
      );
    }
    return {
      getData: getData.data,
      getCategories: geTdataCategoriesManipulate,
    };
  }
};

export default EditProduct;