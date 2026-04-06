import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../ProductCard";
//import filterRouteLinkGenerate from "./filterRouterLink";
import axios from "axios";
import { filterProducts_r, getFilterMaster} from "../../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "../../components/CircularProgress";
import { API_URL } from "../../../config/config";
//import Router from "next/router";
import {useRouter} from "next/router";
import func from "../../../util/helpers/func"
const Page = () => {
   const { filterProducts } = useSelector(
      ({ filterProducts }) => filterProducts
   );
   const router = useRouter();
   var seoData = router.query.seo;
   const [fetchingResult, setFetchingResult] = useState(true);
   const [products, seTproducts] = useState([]);
   const [totalResult, setTotalResult] = useState(0);
   const [hasMore, seThasMore] = useState(null);
   const isFirstRun = useRef(true);
   const dispatch = useDispatch();

   const getProducts = () => {
      setFetchingResult(true)
      axios
         .post(`${API_URL}/productspublic`, filterProducts)
         .then((res) => {
            if (res.data?.data.length > 0) {
               // seTproducts([...products, ...res.data])
               if (filterProducts.skip == 0){
                  seTproducts(res.data.data);
                  setTotalResult(res.data.count[0].count);
               } 
               else
                  seTproducts([...products, ...res.data.data]);

            }
            else{
               seTproducts([]);
               setTotalResult(0);
            }
            /* if (res.data.length == 0 && filterProducts.skip == 0) {
               seTproducts([]);
               seThasMore(false);
            } */
            setFetchingResult(false);

         })
         .catch((err) => {
            setFetchingResult(false)
            console.log(err)
         });
   };

   useEffect(() => {
      if (isFirstRun.current) {
         isFirstRun.current = false;
         return;
      }
      if(router.pathname.includes("") && filterProducts?.categories?.length==0){
         return;
      }
      getProducts();
   }, [filterProducts]);

   useEffect(()=>{
      if(products.length<totalResult){
         seThasMore(true);
      }
      else{
         seThasMore(false);
      }
   },[products, totalResult])

   const fetchMoreData = () => {
      var newSkip = filterProducts.skip + filterProducts.limit;
      if(fetchingResult)
         return
      if(totalResult>0 && newSkip>totalResult)
         return;
      var newFilter = {
         ...filterProducts,
         skip: newSkip,
         limit: filterProducts.limit,
      }
      var urlParams = func.generateUrlParams(newFilter);
      if(router.pathname.includes("")){
         urlParams.seo = router.query.seo;
      }
      router.push({
         query: urlParams
      },undefined, { shallow: true, scroll: false });
      dispatch(
         filterProducts_r({
            ...filterProducts,
            skip: filterProducts.skip + filterProducts.limit,
            limit: filterProducts.limit,
         })
      );
      /* filterRouteLinkGenerate({
         ...filterProducts,
         skip: filterProducts.skip + filterProducts.limit,
         limit: filterProducts.limit,
      }); */
   };
   return (
      <>

      <style
         dangerouslySetInnerHTML={{
            __html:
            "\n    .button-group a{background: #f9f9f9;\n\t-webkit-transform: scale(1);\n    -ms-transform: scale(0.6);\n    transform: scale(1);\n    -webkit-transition: 1;\n    -o-transition: 0.4s;\n    transition: 1;\n    opacity: 1;\n    visibility: visible;\n\t}.price-box {\n    font-size: 15px;\n    line-height: 1;\n    padding: 8px 0;\n}.price-regular {\n    color: #ff6f52;\n    font-weight: 700;\n} .new_rating_container {\n    display: flex; \n    align-items: center;justify-content: right;\n}.new_rating_container .number_of_star {\n    font-weight: 500;\n    letter-spacing: 0.1px;\n    font-size: 13px;\n    color: #4E4B66;\n}.new_rating_container .fa-star {\n    color: #ff6f52;\n    margin: 0 ;font-size: 12px;\n}.pipe {\n    display: block;\n    width: 1px;\n    height: 12px;\n    background: #D9DBE9;\n    margin: 0 7px 0 4px;\n}.new_rating_container .star_count_wrapper {\n    font-weight: 400;\n    font-size: 12px;\n    color: #6E7191;\n}\n.shop-product-wrap .col-md-3{padding-left:15px; padding-right:15px;}\n.price-box{text-align: left;}\n.product-thumb1{background: white;text-align: center;vertical-align: middle;height: 250px;padding-top: 35px;padding-bottom: 40px;border: 1px solid #efefef;border-bottom: none;position: relative;}\n.product-thumb1 img{width:175px}\n.product-caption{background: #f9f9f9;padding: 10px;border: 1px solid #efefef;}\n.product-label {\n    background: #e9dbde;\n    border-radius: 3px;color: #444;\n\t}.product-label.discount {\n    background-color: #cbe9ed;\n}\n.product-item {\n    cursor:pointer;\n}\n.product-item:hover {\n    box-shadow: 0 8px 20px #dedede;\n}\n.hidden_content_new{margin-top: 40px;}\n.hidden_content_new h2{font-size: 14px;margin-bottom: 15px;}\n.hidden_content_new p{font-size: 13px;text-align:justify}\n"
         }}
      />
      {/* product item list wrapper start */}
      <div className="shop-product-wrap grid-view row mbn-30">
         {
            products && products.length>0 &&
            <p>
               <span style={{
                  fontSize:"15px", 
                  color:"#ff6f52",
                  fontWeight:"500",
                  paddingRight:5,
                  textTransform: "capitalize"
               }}>{seoData?seoData:"Results"}:</span>
               (Showing 1 - {products.length} of {totalResult} results)
            </p>
         }
        
         <InfiniteScroll
               dataLength={products.length}
               next={fetchMoreData}
               hasMore={hasMore}
               loader={
                  <div className="col-span-12  ">
                     <CircularProgress />
                  </div>
               }
               className="shop-product-wrap grid-view row mbn-30"
               /* endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                } */
            >
               {products &&
                  products.map((data, i) => (
                     <ProductCard
                        key={i}
                        data={data}
                        className="col-6 col-md-3 col-sm-6"
                     />
                  ))
               }
               {
                  products && products.length==0 && !fetchingResult &&
                  <p className="saved-message text-center mb-5">
                     <b>Sorry, No product found</b>
                  </p>
               }
               {
                  products && products.length==0 && fetchingResult &&
                  <div className="col-span-12  ">
                     <CircularProgress />
                  </div>
               }
         </InfiniteScroll>
      </div>  
      </>
   );
};

export default Page;
