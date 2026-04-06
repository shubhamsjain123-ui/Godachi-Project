import dynamic from "next/dynamic";

const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));
const Refer = dynamic(() => import("../app/components/MyAccount/Refer"));

const Page = () => {  

   return (
      <>
         <BreadCrumb />
        <Refer />

      </>
   );
};

export default Page;
