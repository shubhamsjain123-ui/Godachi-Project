import {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterProducts_r } from "../../../redux/actions";
import {useRouter} from "next/router";
import func from "../../../util/helpers/func"
const Page = () => {
    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
    const dispatch = useDispatch();
    const router = useRouter();
    const [selected, setSelected]=useState(filterProducts.sort)
    const setSortBy = (value)=>{
        var newFilter = { ...filterProducts, sort: value, skip: 0 }
        var urlParams = func.generateUrlParams(newFilter);
        if(router.pathname.includes("")){
            urlParams.seo = router.query.seo;
        }
        router.push({
            query: urlParams
        },undefined, { shallow: true, scroll: false });
      //dispatch(filterProducts_r({ ...filterProducts, sort: value, skip: 0 }));
    }
   return (
    <div className="top-bar-right">
        <div className="product-short">
            <p style={{ paddingTop: 4, fontSize: 13 }}>
            Sort By :{" "}
            </p>
        
            <div
            className="nice-select"
            tabIndex={0}
            style={{ fontSize: 13 }}
            >
            <span className="current">Relevance</span>
                <ul className="list">
                    <li
                        onClick={()=>setSortBy("relevance")}
                        className={`option ${selected=="relevance"?"selected":""}`}
                    >
                        Relevance
                    </li>
                    <li
                        onClick={()=>setSortBy("pricehigh")}
                        className={`option ${selected=="pricehigh"?"selected":""}`}
                    >
                        Price: High to Low
                    </li>
                    <li
                        onClick={()=>setSortBy("pricelow")}
                        className={`option ${selected=="pricelow"?"selected":""}`}
                    >
                        Price: Low to High
                    </li>
                    <li
                        onClick={()=>setSortBy("new")}
                        className={`option ${selected=="new"?"selected":""}`}
                    >
                        New Arrival
                    </li>
                    <li
                        onClick={()=>setSortBy("best")}
                        className={`option ${selected=="best"?"selected":""}`}
                    >
                        Best Seller
                    </li>
                    <li
                        onClick={()=>setSortBy("discount")}
                        className={`option ${selected=="discount"?"selected":""}`}
                    >
                        Discount
                    </li>
                    <li
                        onClick={()=>setSortBy("rating")}
                        className={`option ${selected=="rating"?"selected":""}`}
                    >
                        Rating
                    </li>
                </ul>
            </div>
        </div>
    </div>
   );
};

export default Page;
