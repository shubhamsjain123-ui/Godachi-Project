import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import MenuItem from "./MenuItems"
import { useState, useRef, useCallback } from "react";
import func from "../../../util/helpers/func"
import { useRouter } from "next/router";
import axios from "axios";
import Price from "../Price"

const Default = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);

    const searchRef = useRef(null)

    const [searchTextValue, setSearchTextValue] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [searchResult, setSearchResult] = useState({
        productlist: [],
        categoriesList: []
    });

    const onChange = useCallback(async (event) => {
        const query = event.target.value
        setSearchTextValue(query)

        try {
            var axiosResponse = await axios.post(`${API_URL}/productspublic/getSearchResult`, { query: query });
            if (axiosResponse.data) {
                var response = axiosResponse.data;
                if (response.variant == "error") {

                }
                else if (response.variant == "success") {
                    setSearchResult({
                        productlist: response.productlist,
                        categoriesList: response.categoriesList,
                    })
                }
            }
        }
        catch (error) {
            console.log(error)
        }


        /* if (query.length) {
            fetch(searchEndpoint(query))
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.results)
            })
        } else {
            setSearchResult([])
        } */
    }, [])

    const onFocus = () => {
        setIsActive(true)
        window.addEventListener('click', onClick)
    }
    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsActive(false)
            setSearchTextValue('')
            setSearchResult({
                productlist: [],
                categoriesList: []
            })
            window.removeEventListener('click', onClick)
        }
    }, [])
    const ontextSearch = () => {
        var newFilter = { ...filterProducts, text: searchTextValue, skip: 0 }

        var urlParams = func.generateUrlParams(newFilter);
        let pathName = "/jewellery"
        if (router.pathname.includes("")) {
            pathName = router.pathname;
            urlParams.seo = router.query.seo;
        }
        router.push({
            pathname: pathName,
            query: urlParams
        });
    }
    return (
        <>
            <div className="header-search-container" ref={searchRef}>
                {/* <button className="search-trigger d-xl-none d-lg-block">
                <i className="pe-7s-search" />
                </button> */}

                <input
                    type="text"
                    placeholder="Search on Godachi"
                    className="header-search-field"
                    //onChange={(event)=>setSearchTextValue(event.target.value)}
                    onChange={onChange}
                    onFocus={onFocus}
                    value={searchTextValue}
                />
                <button className="header-search-btn" onClick={ontextSearch}>
                    <i className="pe-7s-search" />
                </button>

                {
                    isActive &&
                    <>
                        {
                            (searchResult.categoriesList?.length > 0 || searchResult.productlist?.length > 0) &&
                            <ul className="searchbar-result-menu">
                                {
                                    searchResult.categoriesList?.length > 0 &&
                                    <>
                                        <li className="searchbar-category-heading">Categories</li>
                                        {searchResult.categoriesList.map((result, index) => {
                                            return (
                                                <li className="searchbar-category-result-li" key={index}>
                                                    <Link href={`/jewellery/${result.seo}`} >
                                                        <a onClick={() => setIsActive(false)}>
                                                            <div className="search-result-category row">
                                                                <div className="search-result-category-image col-3">
                                                                    <img
                                                                        className="pri-img"
                                                                        src={(result.image ? IMG_URL + result.image : "/images/default-image.jpg")}
                                                                        alt="category"
                                                                    />

                                                                </div>
                                                                <div className="col-9">
                                                                    <div className="search-result-category-name">{result.title}</div>

                                                                </div>
                                                            </div>
                                                        </a>
                                                    </Link>


                                                </li>
                                            )
                                        })}
                                    </>
                                }
                                {
                                    searchResult.productlist?.length > 0 &&
                                    <>
                                        <li className="searchbar-products-heading">Products</li>
                                        {searchResult.productlist.map((result, index) => {
                                            const allImgData = result?.allImages?.filter((img) => img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
                                            const img = allImgData[0] ? IMG_URL + allImgData[0].image : "/images/nofoto.jpg";
                                            return (
                                                <li className="searchbar-result-li" key={index}>
                                                    <Link href={`/product/${result.seo}`} >
                                                        <a onClick={() => setIsActive(false)}>
                                                            <div className="search-result-product row">
                                                                <div className="search-result-image col-3">
                                                                    <img
                                                                        className="pri-img"
                                                                        src={img}
                                                                        alt="product"
                                                                    />
                                                                </div>
                                                                <div className="col-9">
                                                                    <div className="search-result-product-name">{result.productName}</div>
                                                                    <div className="search-result-price">
                                                                        <Price data={result.price} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </Link>


                                                </li>
                                            )
                                        })}
                                    </>
                                }
                            </ul>
                        }
                        {/* {
                            searchResult.categoriesList?.length>0 &&
                            <>
                                <div className="searchbaar-category-heading">Categories</div>
                                <ul className="searchbar-category-result-menu">
                                    {searchResult.categoriesList.map((result, index) => {
                                        return(
                                        <li className="searchbar-category-result-li" key={index}>
                                            <Link href={`/jewellery/${result.seo}`} >
                                                <a onClick={()=>setIsActive(false)}>
                                                <div className="search-result-category row">
                                                        <div className="search-result-category-image col-3">
                                                            {
                                                                result.image &&
                                                                <img
                                                                    className="pri-img"
                                                                    src={IMG_URL + result.image}
                                                                    alt="product"
                                                                /> 
                                                            }
                                                            
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="search-result-category-name">{result.title}</div>
                                                            
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                            
                                            
                                        </li>
                                    )})}
                                </ul>
                            </>
                            
                        } */}
                        {/* {
                            searchResult.productlist?.length>0 &&
                            <>
                                <div className="searchbaar-product-heading">Products</div>
                                <ul className="searchbar-result-menu">
                                    {searchResult.productlist.map((result, index) => {
                                        const allImgData = result?.allImages?.filter((img)=>img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
                                        const img = allImgData[0] ? IMG_URL + allImgData[0].image : "/images/nofoto.jpg";
                                        return(
                                        <li className="searchbar-result-li" key={index}>
                                            <Link href={`/product/${result.seo}`} >
                                                <a onClick={()=>setIsActive(false)}>
                                                <div className="search-result-product row">
                                                        <div className="search-result-image col-3">
                                                            <img
                                                                className="pri-img"
                                                                src={img}
                                                                alt="product"
                                                            />    
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="search-result-product-name">{result.productName}</div>
                                                            <div className="search-result-price">
                                                                <Price data={result.price} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                            
                                            
                                        </li>
                                    )})}
                                </ul>
                            </>
                           
                        } */}
                        {
                            searchResult?.productlist?.length == 0 && searchResult?.categoriesList?.length == 0 && searchTextValue != "" &&
                            <div className="searchbar-result-menu">
                                <h4>Sorry No Result Found</h4>
                            </div>
                        }
                    </>

                }

            </div>
        </>
    );
};

export default Default;
