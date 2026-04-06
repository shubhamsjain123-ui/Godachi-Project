import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts_r } from "../../../redux/actions";
import { useRouter } from "next/router";
import func from "../../../util/helpers/func"

const Default = ({ itemList, routeTo, seo, menuCategory }) => {
    const { filterMasters } = useSelector((state) => state.filterMasters);
    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
    const { categories } = useSelector(({ categories }) => categories);
    const [filterOptions, setFilterOptions] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();
    const selectFilterOptions = () => {
        var filterShortName = itemList.filter;
        if (filterShortName == "otherCategories") {
            var dbOptions = itemList.filterOptions;
            if (dbOptions.length == 1) {
                var selectedCategoryOptions = categories.filter((category) => category.categories_id == dbOptions[0]);
                if (selectedCategoryOptions.length > 0) {
                    setFilterOptions(selectedCategoryOptions.map((category) => {
                        return {
                            key: category._id,
                            label: category.title,
                            value: category._id,
                            seo: category.seo
                        }
                    }));
                }
            }
        }
        else if (filterShortName == "categories") {
            var selectedCategoryOptions = categories.filter((category) => category.categories_id == menuCategory);
            if (selectedCategoryOptions.length > 0) {
                var dbOptions = itemList.filterOptions;
                let options;
                if (dbOptions && dbOptions.length > 0) {
                    options = selectedCategoryOptions.filter((option) => dbOptions.includes(option._id))
                }
                else {
                    options = selectedCategoryOptions
                }
                setFilterOptions(options.map((category) => {
                    return {
                        filterShortName: "categories",
                        label: category.title,
                        value: category._id,
                        seo: category.seo
                    }
                }));
            }
        }
        else if (filterShortName) {
            console.log(filterMasters)
            var selectedFilterMaster = filterMasters.find((filter) => filter.shortName === filterShortName);
            if (selectedFilterMaster) {
                var dbOptions = itemList.filterOptions;
                let options;
                if (dbOptions && dbOptions.length > 0) {
                    options = selectedFilterMaster.options.filter((option) => dbOptions.includes(option.value))
                }
                else {
                    options = selectedFilterMaster.options
                }
                //setFilterOptions(options);
                setFilterOptions(options.map((opt) => {
                    return {
                        filterShortName: filterShortName,
                        label: opt.label,
                        value: opt.value
                    }
                }));
            }
        }
    }
    const onFilterClick = (filterOption) => {
        var filterShortName = itemList.filter;
        let urlParams = {};
        urlParams.seo = seo
        let routeToParams = routeTo;
        if (filterShortName == "otherCategories")
            filterShortName = "categories"
        var selectedFilter = filterProducts[filterShortName] ? filterProducts[filterShortName] : [];
        if (filterShortName == "categories") {
            routeToParams = `${filterOption.seo}`;
            urlParams.seo = filterOption.seo
        }
        if (!selectedFilter.includes(filterOption.value)) {
            selectedFilter.push(filterOption.value);
            var newFilterProducts = {
                //...filterProducts, 
                [filterShortName]: selectedFilter,
                skip: 0
            }
            if (filterShortName != "categories") {
                newFilterProducts.categories = [menuCategory]
            }
            //dispatch(filterProducts_r(newFilterProducts));
            urlParams = func.generateUrlParams(newFilterProducts)
        }



        router.push({
            pathname: routeToParams,
            query: urlParams
        });
    }
    useEffect(() => {
        selectFilterOptions();
    }, [filterMasters])
    return (

        filterOptions.length > 0 &&
        <>
            <span>{itemList.title}</span>
            <ul>
                {
                    filterOptions.map((filterOption, key) => {
                        return (
                            <li key={key}>
                                <a onClick={() => onFilterClick(filterOption)}>{filterOption.label}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </>

    )
};

export default Default;
