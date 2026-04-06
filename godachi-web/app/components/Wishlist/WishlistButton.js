import { useSelector, useDispatch } from "react-redux";
import { message, Button } from "antd";
import { ShoppingCartOutlined, LoadingOutlined, CreditCardOutlined } from "@ant-design/icons";
import { updateWishlist_r, getWishlist_r } from "../../../redux/actions";
import axios from "axios";
import { API_URL } from "../../../config/config";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const Page = ({
   state,
   selectedVariant,
   displayPage=null
}) => {
   const dispatch = useDispatch();
   // const seo = router.query.seo
   const router = useRouter();
    const [wishlisted, setWishlisted] = useState(false);
    const { isAuthenticated, user } = useSelector(({ login }) => login);
    const { wishlist } = useSelector(({ wishlist }) => wishlist);

    const getWishlist = (id) => {
      dispatch(getWishlist_r(id));
     };
    const addWishlist = () => {
      var selectedVariantId = selectedVariant._id
      if(!wishlisted){
        var product =  {
            product_id: state._id,
            seo: state.seo,
            selectedVariant: selectedVariantId,
        }
        if (isAuthenticated) {
            axios
               .post(`${API_URL}/wishlist/add`, product)
               .then(() => {
                  getWishlist(user.id);
                  message.success({ content: "Product Added in Wishlist!", duration: 3 });
               })
               .catch((err) => {
                  message.error({
                     content: "Some Error, Please Try Again " + err,
                     duration: 3,
                  });
               });
         } else {
            message.success({ content: "Product Added in Wishlist!", duration: 3 });
            var updateData = [...wishlist];
            updateData.push(product);
            dispatch(updateWishlist_r(updateData));
         }
      }
    };
    const removeWishlist = () => {
        var selectedVariantId = selectedVariant._id
        if(wishlisted){
          if (isAuthenticated) {
              axios
                 .delete(`${API_URL}/wishlist/${selectedVariantId}`)
                 .then(() => {
                    getWishlist(user.id);
                    message.success({ content: "Product Removed from Wishlist!", duration: 3 });
                 })
                 .catch((err) => {
                    message.error({
                       content: "Some Error, Please Try Again " + err,
                       duration: 3,
                    });
                 });
           } else {
                message.success({ content: "Product Removed from Wishlist!", duration: 3 });
                var updateData = wishlist.filter((wishlistProduct)=> wishlistProduct.selectedVariant!=selectedVariantId);
                dispatch(updateWishlist_r(updateData));
           }
        }
    };
   var checkIsWishlisted = () =>{
        var alreadyWishlisted= false;
        var selectedVariantId = selectedVariant._id
        if(wishlist.length>0){
            var findProduct = wishlist.find((product)=>product.selectedVariant==selectedVariantId)
            if(findProduct)
             alreadyWishlisted = true;
        }
        setWishlisted(alreadyWishlisted);
        return checkIsWishlisted;
   }

   useEffect(()=>{
    checkIsWishlisted();
   },[wishlist, selectedVariant])

   const onButtonClick = ()=>{
        if (!wishlisted) {
            addWishlist();
        }
        else{
            removeWishlist();
        }
   }
   return (
        <>
         {
            displayPage?
               <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  title=""
                  data-bs-original-title="Add to wishlist"
                  aria-label="Add to wishlist"
                  onClick={onButtonClick}
				  style={{background: "#f9f9f9", borderRadius: "50%", height: "32px", width: "32px", display: "flex", padding: "8px",marginTop: "-4px",marginBottom: "3px",position: "absolute",top: "15px",right: "15px"}}
                  >
                  <i className={`fa fa-heart${!wishlisted?"-o":""} wishi`} />
               </a>
            :
               <a
                  className="wisha"
                  data-bs-toggle="tooltip"
                  title=""
                  data-bs-original-title="Wishlist"
                  onClick={onButtonClick}
               >   
                  <i className={`fa fa-heart${!wishlisted?"-o":""} wishi`} />
                  Wishlist
               </a>
         }
            
        </>
     

   );
};

export default Page;
