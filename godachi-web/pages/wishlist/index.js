

import dynamic from "next/dynamic";

const Head = dynamic(() => import("../../app/core/Head"));
const BreadCrumb = dynamic(() => import("../../app/components/BreadCrumb"));
const WishList = dynamic(() => import("../../app/components/Wishlist"));

const Page = () => {
   return (
    <>
        <Head title="Wishlist" />
        <BreadCrumb />
        <WishList />
    </>
   );
};

export default Page;
