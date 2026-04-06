

import dynamic from "next/dynamic";

const Head = dynamic(() => import("../../app/core/Head"));
const BreadCrumb = dynamic(() => import("../../app/components/BreadCrumb"));
const Cart = dynamic(() => import("../../app/components/Cart"));

const Page = () => {
   return (
    <>
        <Head title="Cart" />
        <BreadCrumb />
        <Cart />
    </>
   );
};

export default Page;
