import AddProductForm from '../../app/components/Product/addEdit';
import axios from "axios";
import { API_URL } from "../../config/config";
import func from "../../util/helpers/func";
const AddProduct = ({ getCategories = [] }) => {
    return (
      <>
        < AddProductForm getCategories={getCategories} />
      </>
        
    );
}

AddProduct.getInitialProps = async ({ req }) => {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const getDataCategories = await axios.get(`${API_URL}/categories`, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });
    const geTdataCategoriesManipulate = [];
    if (getDataCategories.data.length > 0) {
      geTdataCategoriesManipulate.push(
        func.getCategoriesTreeOptions(getDataCategories.data, true)
      );
    }
    return { getCategories: geTdataCategoriesManipulate };
  }
};

export default AddProduct;