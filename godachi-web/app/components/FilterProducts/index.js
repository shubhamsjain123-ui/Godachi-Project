import { useEffect, useState } from "react";
import router from "next/router";
import dynamic from "next/dynamic";
import { IMG_URL } from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts_r, getFilterMaster } from "../../../redux/actions";
import Image from "next/image";

const FilterProductArea = dynamic(() => import("./FilterProductArea"));
const FilterList = dynamic(() => import("./FilterList"));
const MobileFilterList = dynamic(() => import("./MobileFilterList"));
const SortFilter = dynamic(() => import("./Sort"));
const FilterSelectedTop = dynamic(() => import("./FilterSelectedTop"));

const Page = ({
    banner
}) => {
    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
    const dispatch = useDispatch();
    const callUrltoRedux = async () => {
        const urlToRedux = {};
        for await (const [key, value] of Object.entries(router.query)) {
            if (["text", "sort", "limit", "skip"].includes(key)) {
                urlToRedux[key] = value;
            }
            else if (key != "seo") {
                /*const arr = "[\"" + value?.replaceAll(",", "\",\"") + "\"]";
                urlToRedux[key] = JSON.parse(arr);*/
                var valueArray = value?.split(",");
                valueArray = valueArray.map((val) => {
                    if (val === "true") return true;
                    else if (val === "false") return false;
                    else return val;
                })
                urlToRedux[key] = valueArray;
            }

        }
        var newFilterProducts = { ...filterProducts, ...urlToRedux, skip: 0 }
        await dispatch(filterProducts_r(newFilterProducts));
        await dispatch(getFilterMaster(newFilterProducts));
    };

    useEffect(() => {
        callUrltoRedux();
        console.log("router as path triggered")
    }, [router.router?.asPath]);

    return (
        <div className="shop-main-wrapper section-padding" >
            {
                banner &&
                // <img className="shop-product-banner" src={IMG_URL+banner} />
                <Image className="shop-product-banner" src={IMG_URL + banner} width={1920} height={400} />
            }

            <div
                className="d-lg-none"

            >
                <div className="d-flex justify-content-between align-items-center mobile-filters ">
                    <div
                        className="mobile-filter-section"

                    >
                        <MobileFilterList />
                    </div>
                    <div
                        className="mobile-sorting-section"
                    >
                        <SortFilter />
                    </div>
                </div>

            </div>

            <div className="container filter-container">
                <div className="row">
                    {/* shop main wrapper start */}
                    <div className="col-lg-12">

                        <div className="shop-product-wrapper">
                            {/* shop product top wrap start */}
                            <div className="shop-top-bar">

                                <div className="row align-items-center">



                                    <div className="container">
                                        <div
                                            className="row web-filters d-none d-lg-block"

                                        >
                                            <div
                                                className="col-lg-9 col-md-8 order-2 order-md-1"

                                            >
                                                <FilterList />
                                            </div>
                                            <div
                                                className="col-lg-3 col-md-4 order-1 order-md-2"

                                            >
                                                <SortFilter />
                                            </div>
                                        </div>

                                        <p >
                                            <FilterSelectedTop />
                                        </p>
                                    </div>


                                </div>
                            </div>

                            <FilterProductArea />


                        </div>
                    </div>
                    {/* shop main wrapper end */}
                </div>
            </div>
        </div>
    );
};

export default Page;
