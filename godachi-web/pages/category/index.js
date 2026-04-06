import Link from "next/link";
import axios from "axios";
import { API_URL, IMG_URL, NEXT_API_URL } from "../../config/config";
import dynamic from "next/dynamic";
import Image from "next/image";
const BreadCrumb = dynamic(() => import("../../app/components/BreadCrumb"));
const Page = ({
    categoryList = []
}) => {
    return (
        <>
            <BreadCrumb />
            <section className="product-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* section title start */}
                            <div className="section-title text-center">
                                <h2 className="title">Shop by Category</h2>
                                <p className="sub-title">Select products matching to your requirements</p>
                            </div>
                            {/* section title start */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-container categorySection">
                                <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2">
                                    {
                                        categoryList.map((cat, index) => {
                                            return (
                                                <div className="col-md-3 col-xs-6 owl-item" key={index}>
                                                    <Link href={`/jewellery/${cat.seo}`}>
                                                        <div className="cat-item">
                                                            <div className="cat-wapper">
                                                                <div className="cat-img">
                                                                    <Image
                                                                        src={(cat.image ? IMG_URL + cat.image : "/images/default-image.jpg")}
                                                                        title={cat.title}
                                                                        alt={cat.title}
                                                                        width={250}
                                                                        height={250}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="cat-description">
                                                                <div className="cat-title">
                                                                    {cat.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>


    );
};

export const getServerSideProps = async ({ query }) => {
    const response = await axios.get(`${NEXT_API_URL}/categoriespublic/web`);


    return {
        props: {
            categoryList: response.data,
        },
    };
};

export default Page;
