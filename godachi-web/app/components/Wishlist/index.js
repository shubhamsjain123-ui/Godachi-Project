import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Form, Button, message } from "antd";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";
import ProductHeader from "./productHeader";
import ProductRow from "./productRow";
import { API_URL, IMG_URL } from "../../../config/config";
import CustomizeJewellery from "../Forms/CustomizeJewellery"
import { useDispatch, useSelector } from "react-redux";
import { getWishlist_r, updateWishlist_r } from "../../../redux/actions";
const Default = (props) => {
    const dispatch = useDispatch();

    const { wishlist } = useSelector((state) => state.wishlist);
    const { isAuthenticated, user } = useSelector(({ login }) => login);
    const [state, seTstate] = useState([]);
    const [showCustomizeJewellery , setShowCustomizeJewellery] = useState(false);

    const getWishlistProducts = (dbData = [], products = []) => {
        const WishlistAllProducts = [];
        products.map((wishlistProduct) => {
        const dbProduct = dbData.find((dbProduct) => dbProduct._id == wishlistProduct.selectedVariant);
            if (dbProduct) {
                const allImages = dbProduct.productImages.filter((img)=>img.mimeType.includes("image"));
                const img = allImages.length>0 ? IMG_URL + allImages[0].image : "/images/nofoto.jpg";
                WishlistAllProducts.push({
                    _id: dbProduct.product._id,
                    image: img,
                    title: dbProduct.product.productName,
                    selectedVariant: wishlistProduct.selectedVariant,
                    seo: dbProduct.product.seo,
                    price: dbProduct.priceDetails.grandTotal,
                    inStock: dbProduct.quantity>0?true:false,
                    product: dbProduct.product,
                    variantDetails: dbProduct
                });
            }
        });

        seTstate(  WishlistAllProducts );
    };

    const getProducts = async () => {
        if (wishlist.length > 0) {
            const arrayId = [];
            const variantIds = [];
            wishlist.map((x) => {
                arrayId.push(x.product_id);
                variantIds.push(x.selectedVariant);
            });
            await axios
                .post(`${API_URL}/wishlist/allproducts`, { _id: arrayId, variantIds })
                .then((res) => {
                    getWishlistProducts(res.data, wishlist);
                });
        }
        else{
            seTstate([]);
        }
    };

    const removeWishlist = async (selectedVariantId) => {
        try{
            if (isAuthenticated) {
                await  axios.delete(`${API_URL}/wishlist/${selectedVariantId}`);
            }
            message.success({ content: "Product Removed From Wishlist!", duration: 3 });
            var updateData = wishlist.filter((wishlistProduct)=> wishlistProduct.selectedVariant!=selectedVariantId);
            dispatch(updateWishlist_r(updateData));
        }
        catch(error){
            message.error({
                content: "Some Error, Please Try Again " + error,
                duration: 3,
            });
        }
    };

    useEffect(() => {
        getProducts();
    }, [wishlist]);
    
    if (wishlist.length == 0) {
        return(
            <>
                <section className="policy-section section-padding">
                    <div className="container">
                        <div className="row">
                        <div className="col-4">
                            <div className="policy-list">
                            <h3 className="policy-title">Sorry! No item found. </h3>
                            <p>
                                If you want any customize jewellery : 
                                <a href="javascript:void(0)" 
                                    onClick={()=>setShowCustomizeJewellery(true)}
                                >
                                    Click Here.
                                </a>
                            </p>
                            </div>
                            <div className="policy-list">
                            <h3 className="policy-title">OR</h3>
                            <p>
                                Write us your requirement at <a href="mailto:contact@godachi.com">contact@godachi.com</a>.
                            </p>
                            </div>
                            {/* policy list end */}
                        </div>
                        <div className="col-6">
                            <img src="assets/img/no-item.png" />
                        </div>
                        </div>
                    </div>
                </section>
                <CustomizeJewellery
                    show={showCustomizeJewellery}
                    setShow={setShowCustomizeJewellery}
                />
            </>
        )
    }
    else{
        return (
            <div className="wishlist-main-wrapper section-padding">
                <div className="container">
                {/* Wishlist Page Content Start */}
                <div className="section-bg-color">
                    <div className="row">
                    <div className="col-lg-12">
                        {/* Wishlist Table Area */}
                        <div className="cart-table table-responsive">
                        <table className="table table-bordered">
                            <ProductHeader />
                            <tbody>
                                {
                                    state.map((data)=>{
                                        return <ProductRow {...data} removeWishlist={removeWishlist} />
                                    })
                                }
                            
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Wishlist Page Content End */}
                </div>
            </div>
        );
    }
   
};

export default Default;
