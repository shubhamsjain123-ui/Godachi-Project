

import dynamic from "next/dynamic";

const Head = dynamic(() => import("../../app/core/Head"));
const BreadCrumb = dynamic(() => import("../../app/components/BreadCrumb"));
const Checkout = dynamic(() => import("../../app/components/Cart/Checkout"));

const Page = () => {
   return (
    <>
        <Head title="Checkout" />
        <BreadCrumb />
        <Checkout />
    </>
   );
};

export default Page;
