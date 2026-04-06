import dynamic from "next/dynamic";

const Head = dynamic(() => import("../../app/core/Head"));
const BreadCrumb = dynamic(() => import("../../app/components/BreadCrumb"));
const FilterProductPage = dynamic(() => import("../../app/components/FilterProducts"));

const Page = () => {
   
   return (
      <>
        <Head
            title="Gold & Diamond Jewellery Online in India | Latest Designs"
         />
        <BreadCrumb />
        <FilterProductPage />
      </>
   );
};

export default Page;
