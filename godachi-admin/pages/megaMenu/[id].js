import MegaMenuForm from '../../app/components/MegaMenu/addEdit';
import axios from "axios";
import { API_URL } from "../../config/config";
import func from "../../util/helpers/func";
import router from "next/router";
const MegaMenu = ({ getCategories = [], getData = [], getAdminFilterList=[] }) => {
  const { id } = router.query;

  return (
    <>
      <MegaMenuForm 
        getCategories={getCategories} 
        getData={getData} 
        id={id} 
        getAdminFilterList={getAdminFilterList} 
      />
    </>
      
  );
}

export async function getServerSideProps({ req, query }) {
  console.log("hi")
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const getData = await axios.get(API_URL + "/homeMenu/" + query.id, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });
    
    const getAdminFilterList = await axios.post(`${API_URL}/filterMaster/adminFilterList`,{
      category: getData.data.category
    }, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });
    console.log(getAdminFilterList.data)
    const getDataCategories = await axios.get(`${API_URL}/categories`, {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });
    var geTdataCategoriesManipulate = [];
    if (getDataCategories.data.length > 0) {
      geTdataCategoriesManipulate = getDataCategories.data
                                    .filter((cat)=>cat.categories_id==null)
                                    .map((cat)=>{
                                      return {
                                        label:cat.title,
                                        value:cat._id,
                                        seo: cat.seo
                                      }
                                    })

    }
    return {
      props:{
        getData: getData.data,
        getAdminFilterList: getAdminFilterList.data,
        getCategories: geTdataCategoriesManipulate,
      }
      
    };
  }
};

export default MegaMenu;