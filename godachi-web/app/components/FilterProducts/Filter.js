import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Row,Col } from "antd";
import Tab from 'react-bootstrap/Tab';
import { SearchOutlined } from "@ant-design/icons";
import filterRouteLinkGenerate from "./filterRouterLink";
import { useRouter } from 'next/router'
import func from "../../../util/helpers/func"
import { filterProducts_r, getFilterMaster } from "../../../redux/actions";

const Page = ({ filterDetails, type = "normal" }) => {
   const router = useRouter();
   //const { filterMasters } = useSelector(({ filterMasters }) => filterMasters);
   const filterName = filterDetails.shortName;
   const { filterProducts } = useSelector(
      ({ filterProducts }) => filterProducts
   );
   const [state, seTstate] = useState({ [filterName]: [], allData: [] });
   const dispatch = useDispatch();

   const getFilterOptions = () => {
      const dataManipulate = filterDetails.options.map((filter) => {
         return {
            label: filter.label,
            value: filter.value,
         }
      });

      seTstate({ ...state, [filterName]: dataManipulate, allData: dataManipulate });
   };

   useEffect(() => {
      getFilterOptions();
   }, []);

   useEffect(() => {
      console.log(state)
   }, [state]);

   function onChange(checkedValues) {
      var newFilterProducts = { ...filterProducts, [filterName]: checkedValues, skip: 0 }
      var urlParams = func.generateUrlParams(newFilterProducts);
      if(router?.query?.seo){
         urlParams.seo = router.query.seo
      }
      router.push({query: urlParams},undefined, { shallow: true, scroll: false });
      //dispatch(filterProducts_r(newFilterProducts));
      //dispatch(getFilterMaster(newFilterProducts));
   }

   /* useEffect(()=>{
      var urlParams = filterRouteLinkGenerate(filterProducts);
      if(router?.query?.seo){
         urlParams.seo = router.query.seo
      }
      router.push({query: urlParams},undefined, { shallow: true });
      
   },[filterProducts]) */

   return (
      <>
         {
            type == "modal" ?
               <Tab.Pane eventKey={filterName}>
                  <Checkbox.Group
                     options={state[filterName]}
                     value={[...filterProducts[filterName]]}
                     onChange={onChange}
                     className="dropdown-list curreny-list"
                     style={{ 
                        //display: 'flex', 
                        //flexDirection: 'column', 
                        lineHeight: 2 }}
                  />
               </Tab.Pane>
               :
               <li
                  className="curreny-wrap"
                  style={{
                     background: "#e7eff2",
                     padding: "5px 16px",
                     fontSize: 13,
                     marginLeft: 0,
                     borderRadius: 4
                  }}
               >
                  {filterDetails.name}
                  <i
                     className="fa fa-angle-down"
                     style={{ float: "right", paddingTop: 3, marginLeft:5 }}
                  />
                  
                  <Checkbox.Group
                     options={state[filterName]}
                     value={[...filterProducts[filterName]]}
                     onChange={onChange}
                     className="dropdown-list curreny-list"
                     style={{
                        //display:'flex',
                        //flexDirection:'column',
                        lineHeight:2
                     }}
                  />
                  <Checkbox.Group/>
               </li>
         }
      </>
   );
};

export default Page;
