import Link from "next/link";
import func from "../../../util/helpers/func";
import { useSelector } from "react-redux";
import Price from "../Price";
import { Button } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import { IMG_URL } from "../../../config/config";
import WishlistButton from "../Wishlist/WishlistButton";
import AddProductButton from "../Cart/AddProductButton";
import Image from "next/image";
const styles = {
   productBatch: {
      width: 'fit-content',
      height: 'inherit',
      border: 'none',
      padding: '5px 9px',
      fontSize: '11px',
      fontWeight: 'bold',
      color: '#666',
      position: 'absolute',
      marginTop: '15px',
      left: '15px'
   },
   likeIcon: {
      fontWeight: 600,
      width: '30px',
      height: '30px',
      color: 'black',
      backgroundColor: '#edf2f5',
      borderRadius: '50%',
      boxShadow: '0 0 0 1px #edf2f5',
      paddingTop: '8px'
   },
   cardLayout: {
      padding: '40px 0px'
   },
   centerLayout: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   bold: {
      fontWeight: 700
   },
   ratingLayout: {
      float: "left",
      width: "30%",
      padding: 0,
      marginTop: "-5px",
      marginBottom: 4
   }
}


const Default = ({ data = null, className }) => {
   const { settings } = useSelector(({ settings }) => settings);


   const getVariantPrice = (data) => {
      if (data.length > 0) {
         const newData = data.sort((a, b) => {
            return a.price - b.price;
         });
         return (
            <span>
               <Price data={newData[0].price} /> -{" "}
               <Price data={newData[data.length - 1].price} />{" "}
            </span>
         );
      }
   };
   const allImgData = data?.allImages?.filter((img) => img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
   const img = allImgData[0] ? IMG_URL + allImgData[0].image : "/images/nofoto.jpg";

   return (
      <>
         <div className={className} key={data._id}>
            <div className="product-item mb-4">
               <figure className="product-thumb1" style={styles.cardLayout}>
                  <div className='row' style={styles.centerLayout}>
                     {
                        data.variantProduct.priceDetails.totalDiscountPercent > 0 &&
                        <div className="product-badge col-8 mb-0">
                           <div className="product-label discount" style={styles.productBatch}>
                              <span>{data.variantProduct.priceDetails.totalDiscountPercent.toFixed(0)}% Off</span>
                           </div>
                        </div>
                     }

                     <div className="col-4 mb-0">

                        <WishlistButton
                           state={data}
                           selectedVariant={data.variantProduct}
                           displayPage="short"
                        />
                     </div>
                  </div>
                  <Link href={`/product/${data.seo}`} >
                     <a target="_blank">
                        <Image
                           className="pri-img"
                           src={img}
                           alt="product"
                           width={175}
                           height={155}
                        />
                        {/* <img
                        className="pri-img"
                        src={img}
                        alt="product"
                     /> */}
                     </a>
                  </Link>
               </figure>
               <div className="product-caption text-left">
                  <div className="product-identity">
                     <h6 className="product-name text-truncate" style={styles.bold}>
                        <Link href={`/product/${data.seo}`} >
                           <a>
                              {data.productName}
                           </a>
                        </Link>
                     </h6>
                  </div>
                  <div
                     style={{
                        float: "left",
                        width: "100%",
                        padding: 0,
                        marginBottom: 2
                     }}
                  >
                     <div
                        className="price-box"
                        style={{ float: "left", width: "70%", padding: 0 }}
                     >
                        <span className="price-regular" style={{ fontSize: 15 }}>
                           <Price data={data.variantProduct.priceDetails.grandTotal} fraction={0} />
                        </span>
                        <span className="price-old" style={{ fontSize: '16px', marginLeft: '6px' }}>
                           <del>
                              <Price data={data.variantProduct.priceDetails.priceWithGst} fraction={0} />
                           </del>
                        </span>
                     </div>
                     {
                        data.rating > 0 &&
                        <div
                           className="star"
                           style={styles.ratingLayout}
                        >
                           <div className="new_rating_container ratings">
                              <span className="number_of_star">{data.rating} </span>
                              <i className="fa fa-star" aria-hidden="true" />
                              <span className="pipe" />
                              <span className="star_count_wrapper">({data.review})</span>
                           </div>
                        </div>
                     }
                     <div
                        className="star"
                        style={styles.ratingLayout}
                     >
                        <div className="new_rating_container ratings">
                           <span className="number_of_star">4 </span>
                           <i className="fa fa-star" aria-hidden="true" />
                           <span className="pipe" />
                           <span className="star_count_wrapper">(10)</span>
                        </div>
                     </div>
                  </div>
                  <div className='row'>
                     <p
                        className="manufacturer-name col-9 mb-0"
                        style={{
                           float: "left",
                           width: "70%",
                           textAlign: "left",
                           paddingTop: 6
                        }}
                     >
                        <Link href={`/product/${data.seo}`} >
                           <a style={{ color: "#ff6f52", fontSize: 12 }}>
                              {
                                 data.variantProduct.offers ? data.variantProduct.offers.name : "Offer Detail"
                              }
                           </a>
                        </Link>
                     </p>
                     {
                        data.variantProduct.quantity > 0
                           ?
                           <AddProductButton
                              state={data}
                              selectedVariant={data.variantProduct}
                              displayPage="shortDetail"
                           />
                           :
                           <button
                              className="btn bg-danger col-3 mb-0 pt-1 pb-1"
                              style={{
                                 color: "#fff",
                                 fontSize: "11px",
                              }}
                           >
                              Out of Stock
                           </button>
                     }

                     {/* <button
                     className="btn col-3 mb-0"
                     style={{
                        color: "#fff",
                        backgroundColor: "#c29958",
                        fontSize: "11px",
                     }}
                  >
                     Add To Cart
                  </button> */}
                  </div>
               </div>
            </div>
         </div>

      </>

   );
};

export default Default;
