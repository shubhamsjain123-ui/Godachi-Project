import MegaMenuForm from '../../app/components/MegaMenu/addEdit';
import axios from "axios";
import { API_URL } from "../../config/config";
const MegaMenu = ({ getCategories = [], getAdminFilterList=[] }) => {
    return (
      <>
        <MegaMenuForm 
          getCategories={getCategories} 
          getAdminFilterList={getAdminFilterList} 
        />
      </>
        
    );
}

export async function getServerSideProps({ req }) {
  if (!req?.headers?.cookie) {
    return {};
  } else {
    const getAdminFilterList = await axios.post(`${API_URL}/filterMaster/adminFilterList`,{
      category: null
    },{
      headers: req ? { cookie: req.headers.cookie } : undefined,
    });

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
        getCategories: geTdataCategoriesManipulate, 
        getAdminFilterList: getAdminFilterList.data,
      }
    };
  }
};

export default MegaMenu;