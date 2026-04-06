import { useSelector, useDispatch } from "react-redux";
import { Tag } from "antd";
import { filterProducts_r, getFilterMaster } from "../../../redux/actions";
import filterRouteLinkGenerate from "./filterRouterLink";
import Badge from 'react-bootstrap/Badge';
import CloseButton from 'react-bootstrap/CloseButton';
import {useRouter} from "next/router";
import func from "../../../util/helpers/func"
const Page = () => {
   const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
   const { filterMasters } = useSelector(({ filterMasters }) => filterMasters);
   const dispatch = useDispatch();
   const router = useRouter();
   const removeFilter = (shortName, value) => {
      const newValues = filterProducts[shortName].filter((tag) => tag !== value);
      var newFilterProducts = { ...filterProducts, [shortName]: newValues, skip: 0 }
      
        var urlParams = func.generateUrlParams(newFilterProducts);
        if(router.pathname.includes("")){
            urlParams.seo = router.query.seo;
        }
        router.push({
            query: urlParams
        },undefined, { shallow: true, scroll: false });
      dispatch(filterProducts_r(newFilterProducts));
      dispatch(getFilterMaster(newFilterProducts));
   };

   const removeTextFilter = () => {
      var newFilter = { ...filterProducts, text: "", skip: 0 }
      var urlParams = func.generateUrlParams(newFilter);
      if(router.pathname.includes("")){
         urlParams.seo = router.query.seo;
      }
      router.push({
         query: urlParams
      },undefined, { shallow: true, scroll: false });
      //dispatch(filterProducts_r({ ...filterProducts, text: "", skip: 0 }));
   };

   var ignoreKeys= ["sort","text","skip","limit"]

   return (
      <div className="filtered_by"
	  style={{paddingTop:"10px",paddingBottom:"15px"}}
	  > Filtered By : 
         {
            filterProducts.text && filterProducts.text!="" &&
            <span key="textFilter" style={{ display: "inline-block" }}>
               <Badge pill  bg="secondary">
                  {filterProducts.text}
                  <CloseButton
                     variant="black"
                     onClick={()=>removeTextFilter()}
                  />
               </Badge>
            </span>
         }
         {
            Object.keys(filterProducts).map((shortName)=>{
               return (
                  filterProducts[shortName].length>0 && !ignoreKeys.includes(shortName)?
                  <>
                     {
                        filterProducts[shortName].map((val)=>(
                           <span key={val} style={{ display: "inline-block" }}>
                              <Badge pill  bg="secondary">
                                 {filterMasters.find(
                                    (master) => master.shortName == shortName
                                 ).options.find((find) => find.value == val).label}
                                 <CloseButton
                                    variant="black"
                                    onClick={()=>removeFilter(shortName,val)}
                                 />
                              </Badge>
                              {/* <Tag
                                 color="#000"
                                 closable
                                 onClose={(e) => {
                                    e.preventDefault();
                                    //changeBrandsClose(val);
                                 }}
                              >
                                 
                              </Tag> */}
                           </span>
                        ))
                     }
                  </>
                  :null
               )
            })
         }
      </div>
   );
};

export default Page;
