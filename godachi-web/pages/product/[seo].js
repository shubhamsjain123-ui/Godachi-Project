import axios from "axios";
import { API_URL, NEXT_API_URL } from "../../config/config";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import dynamic from "next/dynamic";

const Head = dynamic(() => import("../../app/core/Head"));
const ProductDetails = dynamic(() => import("../../app/components/ProductDetail/ProductDetails"));

const Page = ({ resData = {}, seo = "", faqList=[] }) => {

   const state = resData;

   return (
      <div className="container-custom h-full ">
         <Head
            title={state.meta_title?state.meta_title:state.title}
            description={state.meta_desciption}
            keywords={state?.meta_keywords}
            image={state.allImages.length > 0 ? state.allImages[0].image : ""}
         />
        

         <ProductDetails data={state} seo={seo} faqList={faqList} />



      </div>
   );
};

export const getServerSideProps = async ({ query }) => {
   const response = await axios.get(`${NEXT_API_URL}/productspublic/${query.seo}`);
   var faqList = [];
   if(response.data){
      const getFaqs = await axios.get(`${NEXT_API_URL}/masters/faqsByCategory/${response.data.categories_id._id.toString()}`);
      faqList=getFaqs.data
   }
   
   return {
      props: {
         resData: response.data,
         seo: query.seo,
         faqList:faqList
      },
   };
};

export default Page;
