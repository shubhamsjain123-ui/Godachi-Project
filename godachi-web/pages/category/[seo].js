import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import func from "../../util/helpers/func"
import dynamic from "next/dynamic";
import { filterProducts_r } from "../../redux/actions";
const Head = dynamic(() => import("../../app/core/Head"));
const BreadCrumb = dynamic(() => import("../../app/components/BreadCrumb"));
const FilterProductPage = dynamic(() => import("../../app/components/FilterProducts"));
const FilterProductArea = dynamic(() => import("../../app/components/FilterProducts/FilterProductArea"));
const FilterList = dynamic(() => import("../../app/components/FilterProducts/FilterList"));


const FilterSelectedTop = dynamic(() => import("../../app/components/FilterProducts/FilterSelectedTop"));


const Page = ({seo}) => {
    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
    const { categories } = useSelector(({ categories }) => categories);
    const [bannerImage, setBannerImage] = useState(null)
    const dispatch = useDispatch();

    const setCategoryFilter = () =>{
         var seoCategory = categories.find((category)=>category.seo==seo);
         var routerQuery = router.query;
         console.log(routerQuery)
         if(!routerQuery?.categories?.includes(seoCategory._id)){
            if(!routerQuery.categories)
               routerQuery.categories=[];
            routerQuery.categories.push(seoCategory._id)
         }
         router.push({query: routerQuery},undefined, { shallow: true, scroll: false });
        if(seoCategory){
            setBannerImage(seoCategory.banner?seoCategory.banner:null);
        }
    }
   

   useEffect(() => {
      setCategoryFilter();
   }, [router.router?.asPath]);

   return (
      <>
        <Head
            title="Gold & Diamond Jewellery Online in India | Latest Designs"
         />
        <BreadCrumb />
        <FilterProductPage banner={bannerImage} />
      </>
   );
};

export const getServerSideProps = async ({ query }) => {    
    return {
       props: {
          seo: query.seo
       },
    };
 };

export default Page;
