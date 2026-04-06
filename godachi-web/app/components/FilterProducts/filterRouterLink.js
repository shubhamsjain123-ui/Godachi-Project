import router from "next/router";

const filterRouteLinkGenerate = (filterProducts) => {
   var filterNonArrayKeys = ["text", "sort", "limit", "skip"];
   /* const urlBrands =
    filterProducts.brands.length > 0 ? `&brands=${filterProducts.brands}` : "";
   const urlCategory =
    filterProducts.categories.length > 0
       ? `&categories=${filterProducts.categories}`
       : "";
   const urlMinPrice =
    filterProducts.minPrice > 0 ? `&minprice=${filterProducts.minPrice}` : "";
   const urlMaxPrice =
    filterProducts.maxPrice > 0 ? `&maxprice=${filterProducts.maxPrice}` : "";
   const urlText =
    filterProducts.text != "" ? `&text=${filterProducts.text}` : ""; */

   /* var filterUrlArray = Object.keys(filterProducts)
                        .filter(
                           (key)=> 
                              (!filterNonArrayKeys.includes(key) && filterProducts[key].length>0) ||
                              (filterNonArrayKeys.includes(key) && !["",0].includes(filterProducts[key]))
                        ) 
                        .map((key)=>{
                           return `${key}=${filterProducts[key]}`
                        })
   router.push({}, `/jewellery?${filterUrlArray.join("&")}`, { shallow: true }); */
   /* const totalUrl =
    urlText + urlBrands + urlCategory + urlMinPrice + urlMaxPrice; */
   
   
   
   var filterUrlArray = Object.keys(filterProducts)
                           .filter(
                              (key)=> !filterNonArrayKeys.includes(key) && (filterProducts[key]?.length>0 && !["",0].includes(filterProducts[key]))
                                 
                           ) 
                           .reduce((obj, key) => {
                              obj[key] = filterProducts[key].join(",");
                              return obj;
                            }, {});
   //console.log(filterUrlArray)
   return filterUrlArray;
};

export default filterRouteLinkGenerate;
