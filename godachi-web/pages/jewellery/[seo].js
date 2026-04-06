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


const Page = ({ seo }) => {
   const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
   const { categories } = useSelector(({ categories }) => categories);
   const [bannerImage, setBannerImage] = useState(null)
   const dispatch = useDispatch();

   const setCategoryFilter = () => {
      var seoCategory = categories.find((category) => category.seo == seo);
      var routerQuery = router.query;
      console.log(routerQuery)
      if (!routerQuery?.categories?.includes(seoCategory._id)) {
         if (!routerQuery.categories)
            routerQuery.categories = [];
         routerQuery.categories.push(seoCategory._id)
      }
      router.push({ query: routerQuery }, undefined, { shallow: true, scroll: false });
      if (seoCategory) {
         setBannerImage(seoCategory.banner ? seoCategory.banner : null);
      }
   }


   useEffect(() => {
      setCategoryFilter();
   }, [router.router?.asPath]);
   const metaData = () => {
      var routerQuery = router.query;
      if (routerQuery && routerQuery?.seo == 'earrings' && routerQuery.categories == '62f63decea0dcdc2ba3206e1') {
         return {
            title: 'Buy silver earrings in Delhi, Pune,Indore Online | Godachi |',
            description: 'Buy silver earrings in Delhi, Pune,Indore Online.Shop from our unique collection of High quality silver earrings suitable for every occasion.',
            keywords: 'buy silver earrings in delhi online, buy silver earrings in pune online, buy silver earrings in indore online, buy silver earrings in bhopal online, buy silver earrings in calcutta online, buy silver earrings in chandigarh online, buy silver earrings in Agra online, buy silver earrings in Ahmedabad online'
            // Add other metadata properties as needed
         };
      } else if (routerQuery && routerQuery?.seo == 'rings' && routerQuery.categories == '62f63df8ea0dcdc2ba3206e8') {
         return {
            title: 'Buy silver ring in in Delhi, Pune,Indore Online | Godachi |',
            description: 'Browse & Buy silver ring in Delhi, Pune,Indore Online. Shop from exclusive collections of Silver ring at attractive prices.Choose from  wide range at best prices.',
            keywords: 'buy ring in delhi online, buy silver ring in pune online, buy silver ring in indore online, buy silver ring in bhopal online, buy silver ring in calcutta online, buy silver ring in chandigarh online, buy silver ring in Agra online, buy silver ring in Ahmedabad online.'
            // Add other metadata properties as needed
         };
      } else if (routerQuery && routerQuery?.seo == 'necklaces' && routerQuery.categories == '62f63e40ea0dcdc2ba3206fd') {
         return {
            title: 'Buy silver necklaces in Delhi,Pune,Indore online | Godachi |',
            description: 'Looking to Buy silver necklaces in Delhi,Pune,Indore online?Look no further than Godachi.Discover an impressive array of stunning jewelry in our collection.',
            keywords: 'buy silver necklaces in delhi online, buy silver necklaces in pune online, buy silver necklaces in indore online, buy silver necklaces in bhopal online, buy silver necklaces in calcutta online, buy silver necklaces in chandigarh online, buy silver necklaces in Agra online, buy silver necklaces in Ahmedabad online.'
            // Add other metadata properties as needed
         };
      } else if (routerQuery && routerQuery?.seo == 'coins' && routerQuery.categories == '63234af0a8f662c752f2b43a') {
         return {
            title: 'Buy lakshmi ganesh coin in Delhi,Pune,Indore online | Godachi |            ',
            description: 'Buy lakshmi ganesh coin in Delhi,Pune,Indore online| at Godachi. Shop the latest collections of Laxmi silver coins at the best prices in India.',
            keywords: 'buy lakshmi ganesh coin in delhi online, buy lakshmi ganesh coin in pune online, buy lakshmi ganesh coin in indore online, buy lakshmi ganesh coin in bhopal online, buy lakshmi ganesh coin in calcutta online, buy lakshmi ganesh coin in chandigarh online, buy lakshmi ganesh coin in Agra online, buy lakshmi ganesh coin in Ahmedabad online.'
            // Add other metadata properties as needed
         };
      }

      // If the condition is not met, return default metadata or null
      return {
         title: "Gold & Diamond Jewellery Online in India | Latest Designs"
      }
   };
   const { title, description, keywords } = metaData();
   return (
      <>
         <Head
            title={title}
            keywords={keywords}
            description={description}
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
