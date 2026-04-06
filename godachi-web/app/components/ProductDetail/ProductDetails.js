import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Radio, Form, message  } from "antd";
import Modal from 'react-bootstrap/Modal';
import { getBasket_r } from "../../../redux/actions";
import { getWishlist_r } from "../../../redux/actions";
import Price from "../Price";
import AddProductButton from "../Cart/AddProductButton";
import WishlistButton from "../Wishlist/WishlistButton";
import ProductSpecs from "./ProductSpecs";
import ProductGallery from "./ProductGallery";
import ProductReview from "./ProductReview";
import func from "../../../util/helpers/func";
import { API_URL,IMG_URL } from "../../../config/config";
import Link from "next/link";
import axios from "axios";
import { ArrowsAltOutlined } from "@ant-design/icons";
const Page = ({ data = {}, faqList=[] }) => {
   const { isAuthenticated, user } = useSelector(({ login }) => login);
   const { settings } = useSelector(({ settings }) => settings);
   const { basket } = useSelector(({ basket }) => basket);
   const { wishlist } = useSelector(({ wishlist }) => wishlist);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalHeading, setModalHeading] = useState("Size Guide");
   const [modalData, setModalData] = useState(null);
   const state = data;
   const [quantity, setQuantity]=useState(1);
   const [selectedVariant, setSelectedVariant]=useState(0);
   const [metalPrice,setMetalPrice] = useState(0);
   const [diamondPrice,setDiamondPrice] = useState(0);
   const [metalName,setMetalName] = useState("");
   const [stonePrice,setStonePrice] = useState(0);
   const [stoneNames,setStoneNames] = useState([]);
   const [loadingButton, seTloadingButton] = useState(true);
   const [disabledVariant, seTdisabledVariant] = useState(true);
   const [productHighlights, setProductHighlights] = useState([]);
   const [selectedVariantList, setSelectedVariantList] = useState({});
   const [priceAdd, seTpriceAdd] = useState({
      before_price: 0,
      price: 0,
      qty: 1,
   });
   const [contentDescription, seTcontentDescription] = useState("<p></p>");
   const [contentProductCare, setContentProductCare] = useState("<p></p>");
   const [pinCode, setPinCode] = useState("");
   const [pinCodeResult, setPinCodeResult] = useState(null);
   const [form] = Form.useForm();

   const dispatch = useDispatch();
   // const seo = router.query.seo

   const getBasket = (id) => {
      dispatch(getBasket_r(id));
   };

   const getWishlist = (id) => {
    dispatch(getWishlist_r(id));
   };

   useEffect(() => {
      //getBasket(user.id);
      getWishlist(user.id);
   }, []);

   const onFinishFailed = (errorInfo) => {
      console.log(errorInfo);
   };
   const getVariantPrice = (data) => {
      if (data.length > 0) {
         const newData = data.sort((a, b) => {
            return a.price - b.price;
         });
         return (
            <span>
               <Price data={newData[0].price} /> -
               <Price data={newData[data.length - 1].price} />
            </span>
         );
      }
   };

  function createMarkup() {
    return { __html: contentDescription };
  }
  const replaceStyle = (dataHtml) => {
      return dataHtml
        .replaceAll("<p>", "<p style='min-height:25px' >")
        .replaceAll(
            "<pre>",
            "<pre  style='min-height:30px; background-color:#dbdbdb; padding:15px' >"
        )
        .replaceAll("<img ", "<img className='w-full sm:w-auto' ")
        .replaceAll(
            "<div className='media-wrap image-wrap' ",
            "<div className='media-wrap image-wrap  w-full sm:w-auto' "
        );
  };

  const updateProductHighlights = () => {
    var array = [];
    if(state.variant_products[selectedVariant].quantity>0){
      array.push("In Stock")
    } 
    if(state.warranty){
      array.push(`${state.warranty} ${state.warrantyUnit} Warranty`);
    }
    if(state.occassions?.length>0){
      array.push(state.occassions[0].name);
    }
    if(state.promises?.length>0){
      array.push(state.promises[0].name);
    }
    setProductHighlights(array);
  }

  useEffect(() => {
    seTcontentDescription(replaceStyle(state.description));
 }, [state.description]);

  useEffect(() => {
    /* if(state.productCare)
      setContentProductCare(replaceStyle(state.productCare)); */
  }, [state.productCare]);

  useEffect(()=>{
    console.log("-------------state-----------------");
    console.log(state)
    updateProductHighlights();
    
    setInitialSelectedVariant();
  },[state])

  const setInitialSelectedVariant = ()=>{
    if(state.productType){
      var minCostVariant = state.variant_products.reduce((prev, curr) => prev.grandTotal < curr.grandTotal ? prev : curr);
      //var variantCombination = state.variant_products[0].variantCombination;
      var variantCombination = minCostVariant.variantCombination;
      var returnValue={};
      state.variants.forEach((variant)=>{
        var variantSelection = variant.selectedValues.map((selected)=>selected._id)
        variantCombination.forEach((combinationValue)=>{
          if(variantSelection.includes(combinationValue)){
            returnValue[variant.master._id]=combinationValue;
          }
        })
      })
      setSelectedVariantList(returnValue);
    }
  }
  const updateSelectedVariant=(master, value)=>{
    setSelectedVariantList({
      ...selectedVariantList,
      [master]: value
    });
  }

  const showSizeGuide = (name, file)=>{
    setModalHeading(`Size Guide`);
    if('PDF Viewer' in window.navigator.plugins){
      setModalData(
        <embed src={IMG_URL+ file} frameborder="0" width="100%" height="450px"></embed>
      )
    }
    else{
      setModalData(
        <div
          style={{
            height:400,
            justifyContent:"center",
            alignItems:"center",
            display:"flex",
            flexDirection:"column"
          }}
        >
          <div style={{
            fontSize:30
          }}>
            <i className="fa fa-file-pdf-o" />
          </div>
          <p>Open Pdf to view {name} Guide</p>
          <a className="btn btn-sqr" href={IMG_URL+ file} target="_blank">
            Open
          </a>
        </div>
      )
    }
    
    setIsModalOpen(true);
  }

  const checkPinCode = async () => {
    if(pinCode==""){
      message.error({ content: "Please Enter a valid pin code", duration: 3 });
    }
    else{
      await axios
          .post(`${API_URL}/logistics/checkPinCode`, {
            pinCode: pinCode,
            price: parseInt(state.variant_products[selectedVariant].grandTotal)
          })
          .then((res) => {
             setPinCodeResult(res.data)
          })
          .catch((err) => message.error({ content: err.message, duration: 3 }));
    }
 };

  useEffect(() => {
    if(state.productType){
      var selectedArray = Object.values(selectedVariantList).sort();
      var selectedIndex = state.variant_products.findIndex((product)=> JSON.stringify(product.variantCombination.sort())==JSON.stringify(selectedArray));
      console.log("selectedIndex",selectedIndex)
      if(selectedIndex!=-1)
        setSelectedVariant(selectedIndex);
    }
  },[selectedVariantList])

  useEffect(() => {
    const metalDetails = state?.productMetalComponents;
    if(metalDetails.length>0){
      setMetalName([...new Set(metalDetails.map(item => item.metalType.name))]);
    }
    if(state.priceType=="distributed"){
      if(metalDetails.length>0){
        var price={
          beforePrice: parseInt(state.variant_products[selectedVariant].metalDetails.reduce((total, obj) => obj.price + total,0)),
          price: parseInt(state.variant_products[selectedVariant].metalDetails.reduce((total, obj) => obj.finalPrice + total,0)),
        }
        setMetalPrice(price);
      }
      else{
        setMetalPrice(0);
      } 
      const diamondDetails = state?.productDiamondComponents;
      if(diamondDetails.length>0){
        var price={
          beforePrice: parseInt(state.variant_products[selectedVariant].diamondDetails.reduce((total, obj) => obj.price + total,0)),
          price: parseInt(state.variant_products[selectedVariant].diamondDetails.reduce((total, obj) => obj.finalPrice + total,0)),
        }
        setDiamondPrice(price);
      }
      else{
        setDiamondPrice(0);
      }  
      const stoneDetails = state?.productStoneComponents
        .map((stoneDetail)=>{
          return{
            ...stoneDetail,
            stoneTypeName: stoneDetail.stoneType.name
          }
        });
      if(stoneDetails.length>0){
        setStoneNames([...new Set(stoneDetails.map(item => item.stoneTypeName))].join(" / "));
        var price={
          beforePrice: parseInt(state.variant_products[selectedVariant].stoneDetails.reduce((total, obj) => obj.price + total,0)),
          price: parseInt(state.variant_products[selectedVariant].stoneDetails.reduce((total, obj) => obj.finalPrice + total,0)),
        }
        setStonePrice(price);
      }
      else{
        setStonePrice(0);
      }      
    }
  },[selectedVariant])

   return (
      <main>
  {/* breadcrumb area start */}
  <div className="breadcrumb-area">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="breadcrumb-wrap">
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item" style={{ fontSize: 13 }}>
                  <Link href="/">
                  <a >
                    Home
                  </a>
                  </Link>
                </li>
                <li className="breadcrumb-item" style={{ fontSize: 13 }}>
                  <Link href={`/jewellery/${state.categories_id.seo}`}>
                    <a>{state.categories_id.title}</a>
                  </Link>
                  
                </li>
                {/* <li className="breadcrumb-item" style={{ fontSize: 13 }}>
                  <a href="#shop.html">Women</a>
                </li>
                <li className="breadcrumb-item" style={{ fontSize: 13 }}>
                  <a href="#shop.html">Ring</a>
                </li> */}
                <li
                  className="breadcrumb-item active"
                  style={{ fontSize: 13 }}
                  aria-current="page"
                >
                  {state.productName}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* breadcrumb area end */}
  {/* page main wrapper start */}
  <div className="shop-main-wrapper section-padding pb-0">
    <div className="container">
      <div className="row">
        {/* product details wrapper start */}
        <div className="col-lg-12 order-1 order-lg-2">
          {/* product details inner end */}
          <div className="product-details-inner">
            <div className="row">
              <div className="col-lg-5">
                
                <ProductGallery state={state}/>
                <div className="col-md-12">
                  <span className="imgnote">
                    ** Images are indicative only and it may differ from the
                    final product. Difference in gold weight may occur &amp;
                    will apply on final price.
                  </span>
                </div>
                <div className="col-md-12 certification">
                  
                  <span>Certified By</span>
                  <ul>
                    {
                      state.certifications.map((certification)=>{
                        return(
                          <ol
                            /* style={{
                              background: `url(${IMG_URL+certification.image})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              width: "50px"
                            }} */
                          >
                            <a href={`${IMG_URL+certification.image}`} target="_blank">
                              <img 
                                src={`${IMG_URL+certification.image}`} 
                                style={{
                                  objectFit:"cover",
                                  width: "50px"
                                }} 
                              />
                              <div
                                className="prcs-d"
                                data-p="bis,bsc"
                                title="Bureau of Indian Standards- HALLMARKING"
                              >
                                {certification.name}
                              </div>
                            </a>
                          </ol>
                        )
                        
                      })
                    }
                    
                  </ul>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="product-details-des">
                  <div className="manufacturer-name">
                    <a href="product-details.html">{state.categories_id.title}</a>
                    {
                      state.shopFor && state.shopFor.length>0 &&
                        <a href=""> (For: {state.shopFor.join(", ")})</a>
                    }
                  </div>
                  <h3 className="product-name">
                    {state.productName}
                    <WishlistButton 
                      state={state}
                      selectedVariant={state.variant_products[selectedVariant]}
                    />
                  </h3>
                  <div className="manufacturer-name">
                    <a href="">Product Code: {state.variant_products[selectedVariant].productCode}</a>
                  </div>
                  
                  
                  <div className="ratings d-flex">
                    <span>
                      <i className="fa fa-star" />
                    </span>
                    <span>
                      <i className="fa fa-star" />
                    </span>
                    <span>
                      <i className="fa fa-star" />
                    </span>
                    <span>
                      <i className="fa fa-star" />
                    </span>
                    <span>
                      <i className="fa fa-star-half" />
                    </span>
                    <div className="pro-review">
                      <span>Reviews (1)</span>
                    </div>
                  </div>
                  <div className="price-outer pt-30">
                    <span className="font-rglr h4 rmv-margin ">M.R.P : </span>
                    
                    <span className="price-new" id="product-price">
                      <Price data = {parseInt(state.variant_products[selectedVariant].priceDetails.offerPrice)} fraction={0} />
                      
                    </span>
                    {
                      (state.variant_products[selectedVariant].priceDetails.totalDiscountValue>0) &&
                      <>
                        <del id="actual-price">
                          
                          <Price data = {parseInt(state.variant_products[selectedVariant].priceDetails.listedPrice)} fraction={0} />
                        </del>
                        
                        <div className="discount-block">
                        <div className="save-price">
                        
                        <div className="save-amount  save-amount-offline font-semibold">
                        <span id="savedPrice">
                          <Price data = {parseInt(state.variant_products[selectedVariant].priceDetails.totalDiscountValue )} fraction={0} />
                          
                        </span>
                        </div>
                        <label className="rmv-margin">You Save </label>
                        </div>
                        <div className="discount-blk">
                        <div className="">
                        <div className="product-label new">
                          {   
                            state.variant_products[selectedVariant]?.offerDetails?.name &&
                            <span>{state.variant_products[selectedVariant]?.offerDetails?.name}</span>
                          }
                        </div>
                        </div> </div>
                        </div>
                      </>
                    } 
                    

                    <span className="inl-tax">
                    (Inclusive of all Taxes)
                    </span> 
                  </div>
                  {/* <div className="price-box pt-30">
                    <span className="price-regular">MRP : </span>
                    <span className="inclusive_css">
                      (Inclusive of all Taxes)
                    </span>
                    <span className="price-regular1">
                      <i className="fa fa-inr" />
                      {parseInt(state.variant_products[selectedVariant].grandTotal)}
                    </span>
                    {
                      (state.variant_products[selectedVariant].price != state.variant_products[selectedVariant].finalPrice) &&
                      <>
                         <span className="price-old">
                          <del>
                            <i className="fa fa-inr" />
                            {parseInt(state.variant_products[selectedVariant].grandTotal - state.variant_products[selectedVariant].gst)}
                          </del>
                        </span>
                        <div>
                          <div className="price-old1">
                            <i className="fa fa-inr" />
                            {parseInt(state.variant_products[selectedVariant].price - state.variant_products[selectedVariant].finalPrice)}
                          </div>
                          <div className="you-save">You Save</div>
                        </div>
                        
                        <span className="price-old">
                          <div className="product-label new" style={{}}>
                            {
                              (state.variant_products[selectedVariant].discount && state.variant_products[selectedVariant].discount >0) ?
                              (<span>{state.discount}% off on selling price</span>)
                              :
                              ((state.variant_products[selectedVariant].making?.discount && state.variant_products[selectedVariant].making?.discount>0)?
                              (<span>{state.variant_products[selectedVariant].making.discount}% off on making</span>)
                              :
                              null)
                            }
                          </div>
                        </span>
                      </>
                    }
                   
                  </div> */}
                  <div className="price-box pt-20 brdrbtm">
                    <h5 className="offer-text" style={{}}>
                      
                      View Price Breakup
                    </h5>
                    <span className="ic priceBreakupSpan" data-bs-toggle="collapse"
                      data-bs-target="#priceBreakup"
                      role="button"
                      aria-expanded="false"
                      aria-controls="priceBreakup">
                      <i className="fa fa-plus" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="collapse" id="priceBreakup">
                      {
                        state.priceType=="distributed" && metalName!="Silver" &&
                        <>
                          {
                             metalPrice?.price &&
                            <>
                              <div className="each-charge text-center">
                                {metalName}
                                {
                                  metalPrice.price != metalPrice.beforePrice &&
                                  <div className="each-charge-val metal_price font-medium text-secondary"><del><Price data = {metalPrice.beforePrice} fraction={0} /></del></div>
                                }
                                <div className="each-charge-val metal_price font-medium"><Price data = {metalPrice.price} fraction={0} /></div>
                                
                              </div>
                              <span className="divider"></span>
                            </>
                          }
                          {
                             diamondPrice?.price &&
                            <>
                              <div className="each-charge text-center">
                                Diamond
                                {
                                  diamondPrice.price != diamondPrice.beforePrice &&
                                  <div className="each-charge-val metal_price font-medium text-secondary"><del><Price data = {diamondPrice.beforePrice} fraction={0} /></del></div>
                                }
                                <div className="each-charge-val metal_price font-medium"><Price data = {diamondPrice.price} fraction={0} /></div>
                                
                              </div>
                              <span className="divider"></span>
                            </>
                          }
                          {
                            stonePrice?.price && 
                            <>
                              <div className="each-charge text-center">
                                {stoneNames}
                                {
                                  stonePrice.price != stonePrice.beforePrice &&
                                  <div className="each-charge-val metal_price font-medium text-secondary"><del><Price data = {stonePrice.beforePrice} fraction={0} /></del></div>
                                }
                                <div className="each-charge-val metal_price font-medium"><Price data = {stonePrice.price} fraction={0} /></div>
                              </div>
                              <span className="divider"></span>
                            </>
                          }
                          {
                            state.variant_products[selectedVariant]?.making?.finalPrice != 0 &&
                            <div className="each-charge text-center">
                              Making
                              {
                                state.variant_products[selectedVariant]?.making?.price != state.variant_products[selectedVariant]?.making?.finalPrice &&
                                <div className="each-charge-val metal_price font-medium text-secondary"><del><Price data = {state.variant_products[selectedVariant]?.making?.price} fraction={0} /></del></div>
                              }
                              <div className="each-charge-val metal_price font-medium"><Price data = {state.variant_products[selectedVariant]?.making?.finalPrice} fraction={0} /></div>
                            </div>
                          }
                        </>
                      }
                      {
                        (state.priceType=="fixed" || metalName=="Silver") &&
                        <div className="gold each-charge text-center">
                          Price
                          <div className="each-charge-val metal_price font-medium"><Price data = {state.variant_products[selectedVariant].finalPrice} fraction={0} /></div>
                        </div>
                      }
                      {
                        state.variant_products[selectedVariant]?.offerDetails?.value &&
                        <>
                          <span className="divider discount"></span>
                          <div className="gold each-charge text-center">
                            Offer Discount
                            <div className="each-charge-val metal_price font-medium"><Price data = {state.variant_products[selectedVariant].offerDetails.value} fraction={0} /></div>
                          </div>
                        </>
                        
                      }
                      
                      <span className="divider"></span>
                      <div className="gold each-charge text-center">
                        GST @ {settings.gst}%
                        <div className="each-charge-val metal_price font-medium"><Price data = {state.variant_products[selectedVariant].gst} fraction={0} /></div>
                      </div>
                  </div>
                  <div
                    className="price-box"
                    style={{
                      float: "left",
                      width: "100%",
                      borderBottom: "1px solid #efefef",
                      marginBottom: 20,
                      paddingRight: 10
                    }}
                  >
                    <h5
                      className="offer-text"
                      style={{
                        fontSize: 13,
                        width: "50%",
                        float: "left",
                        color: "#222"
                      }}
                    >
                      
                      Try on Your Jewellery
                    </h5>
                    <span
                      style={{ float: "right", fontSize: 13, color: "#aaa" }}
                    >
                      <i className="fa fa-eject" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="availability" style={{ marginTop: 20 }}>
                    {
                      productHighlights.map((highlight)=>{
                        return(
                          <>
                            <i className="fa fa-check-circle" />
                            <span>{highlight}</span>
                          </>
                        )
                      })
                    }
                    
                  </div>
                  <div dangerouslySetInnerHTML={createMarkup()} />
                  
                  <div className="container_pincode">
                    <div className="ctl_pincodediv">
                      <div className="pincode-table">
                        <div className="pincodeDiv">
                          <div className="d-flex">
                            <div className="pincode">
                              <input
                                type="text"
                                id="txtPincode"
                                className="maintxt"
                                keypress-bind="true"
                                placeholder="Enter pincode to check delivery"
                                value = {pinCode}
                                onChange = {({target:{value}})=>setPinCode(value)}
                              />
                            </div>
                            <div className="navbtn">
                              
                              <span className="navbtn_m">
                                <input
                                  type="button"
                                  id="btnCheckLocationShip"
                                  className="mj_btnbg"
                                  defaultValue="Check"
                                  style={{ fontSize: 13 }}
                                  onClick={checkPinCode}
                                />
                              </span>
                              
                            </div>
                          </div>
                          {
                            pinCodeResult?.success &&
                            <div className="text-success">Expected Delivery: <b>{pinCodeResult.result.expected_delivery_date}</b></div>
                          }
                          {
                            pinCodeResult?.success==false &&
                            <div className="text-danger"><b>{pinCodeResult.message}</b></div>
                          }
                        </div>
                        
                        
                        {
                          state.variants &&
                          state.variants.map((variant)=>{
                            return(
                              <div className="quantity-cart-box d-flex align-items-center">
                                <h6 className="option-title ml-30" style={{}}>
                                  {/* {variant.master.name} */}
                                  Size
                                </h6>
                                <select
                                  className="nice-select"
                                  onChange={(event)=>{
                                    updateSelectedVariant(variant.master._id,event.target.value)
                                  }}
                                  value = {selectedVariantList?.[variant.master._id]}
                                >
                                  {
                                    variant.selectedValues.map((selectedOptions)=>{
                                      return(
                                        <option value={selectedOptions._id}>{selectedOptions.name}</option>
                                      )
                                    })
                                  }
                                </select>
                                {/* <div className="nice-select" tabIndex={0} style={{}} onChange={(value)=>{
                                    console.log(value);
                                  }}>
                                  <span className="current">S</span>
                                  <ul className="list">
                                    
                                    {
                                      variant.selectedValues.map((selectedOptions)=>{
                                        return(
                                          <li data-value={selectedOptions.name} className="option">
                                            {selectedOptions.name}
                                          </li>
                                        )
                                      })
                                    }
                                  </ul>
                                </div> */}
                                {
                                  variant.master.image &&
                                  <div style={{ fontSize: 13, marginLeft: 10, cursor: "pointer" }} onClick={()=>showSizeGuide(variant.master.name, variant.master.image)}>
                                    Size Guide?
                                  </div>
                                }
                                
                              </div>
                            )
                          })
                        }
                        
                      </div>
                      <ul className="delivery_options">
                        <li
                          style={{ display: "none" }}
                          id="lblEmpty"
                          className="notavailable"
                        >
                          Please enter a valid pincode
                        </li>
                      </ul>
                      <div className="pincodechecktemplate" id="">
                        
                      </div>
                    </div>
                    <div className="r_bottom">
                      <div className="l_bottom"> </div>
                    </div>
                  </div>
                 
                  {
                    state.variant_products[selectedVariant].quantity>0
                    ?
                    <>
                       <div className="quantity-cart-box d-flex align-items-center">
                        <h6 className="option-title">Quantity:</h6>
                        <div className="quantity">
                          <div className="pro-qty">
                            <input type="text" defaultValue={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <AddProductButton
                      state={state}
                      selectedVariant={state.variant_products[selectedVariant]}
                      quantity={quantity}
                    />
                    </>
                    
                    :
                    <span className="badge bg-danger">Out of Stock</span>
                  }
                  
                  <div className="txt-call-now" style={{ fontSize: 13 }}>
                    <span className="productDetailRetrunClause">{settings.return_exchange_clause}</span>
                    <ul className="productDetailRetrunUl">
                  <li>
                    <Link href = "/shipping-policy">
                      <a>Shipping policy</a>
                    </Link>
                  </li>
                 
                  <li>
                    <Link href = "/return-exchange-policy">
                      <a>Return & Exchange policy</a>
                    </Link>
                  </li>
                  
                </ul>
                  </div>
                 
                  <div className="like-icon">
                    <a className="facebook" href="https://www.facebook.com/godachijewellery">
                      <i className="fa fa-facebook" />
                      like
                    </a>
                    <a className="twitter" href="https://twitter.com/Godachijewels">
                      <i className="fa fa-twitter" />
                      tweet
                    </a>
                    <a className="pinterest" href="https://www.pinterest.com/godachijewellery">
                      <i className="fa fa-pinterest" />
                      save
                    </a>
                    <a className="google" href="https://www.instagram.com/godachijewellery/">
                      <i className="fa fa-instagram" />
                      share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* product details inner end */}
          {/* product details reviews start */}
          <div className="product-details-reviews section-padding pb-0">
            <div className="row">
              <div className="col-lg-7">
                <div className="product-review-info">
                  <ul className="nav review-tab">
                    <li>
                      <a
                        className="active"
                        data-bs-toggle="tab"
                        href="#tab_specs"
                      >
                        Product Details
                      </a>
                    </li>
                    {/* <li>
                      <a
                        data-bs-toggle="tab"
                        href="#tab_policies"
                        className=""
                      >
                        Shipping &amp; Exchange Policy
                      </a>
                    </li> */}
                    <li>
                      <a
                        data-bs-toggle="tab"
                        href="#tab_reviews"
                        className=""
                      >
                        Customer Reviews
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle="tab"
                        href="#tab_lookbook"
                        className=""
                      >
                        Look Book
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle="tab"
                        href="#tab_faqs"
                        className=""
                      >
                        FAQs
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content reviews-tab">
                    <div className="tab-pane fade active show" id="tab_specs">
                      <div className="tab-one">
                        <ProductSpecs state={state} selectedVariant={selectedVariant} metalNameDetail = {metalName} />
                        
                      </div>
                    </div>
                    <div className="tab-pane fade" id="tab_policies">
                      {
                        state.shippingPolicy &&
                        <>
                          <h5>Shipping Policies</h5>
                          <div>
                            {state.shippingPolicy}
                          </div>
                          
                        </>
                      }
                      {
                        state.returnPolicy &&
                        <>
                          <h5>Return Policies</h5>
                          <div>
                            {state.returnPolicy}
                          </div>
                          
                        </>
                      }
                    </div>
                    <div className="tab-pane fade" id="tab_reviews">
                      <ProductReview 
                        productDetails = {state}
                        productId={state._id} 
                        productRating = {state.ratings} 
                        productReview = {state.reviews} 
                      />
                     
                    </div>
                    <div className="tab-pane fade" id="tab_lookbook">
                      
                    </div>
                    <div className="tab-pane fade" id="tab_faqs">
                      {
                        faqList.length>0 &&
                        <div className="accordion" id="accordionExample">
                          {
                            faqList.map((faq,i)=>{
                              return (
                                <div className="accordion-item">
                                  <h2 className="accordion-header" id={`heading${i}`}>
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="true" aria-controls={`collapse${i}`}>
                                      {faq.question}
                                    </button>
                                  </h2>
                                  <div id={`collapse${i}`} className="accordion-collapse collapse show" aria-labelledby={`heading${i}`} data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                    {faq.answer}
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          }

                         
                        </div>
                      }


                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-5">
                {
                  state.certificateImage &&
                  <section id="certificaton" className="clearfix">
                    
                    <span className="title">
                      Certificate of Authenticity
                    </span>
                    <div className="col-lg-6" style={{ float: "left" }}>
                      <span className="title1">Jewellery Certificate: </span>
                    </div>
                    <div
                      className="col-lg-6"
                      style={{ float: "left", paddingLeft: 10 }}
                    >
                      <img
                        src={`${IMG_URL + state.certificateImage}`}
                        style={{ width: 70 }}
                      />
                    </div>
                    <div className="content" style={{ fontSize: 13 }}>
                      {state.description_certificate}
                    </div>
                  </section>
                }
                {
                  state.promises?.length &&
                  <div className="bs-promise-container">
                    <span className="title">GODACHI Promise</span>
                    <div className="bs-promise">
                      <ul>
                        {
                          state.promises.map((promise)=>{
                              return(
                                <li>
                                <span
                                  className="prcs-d"
                                  data-p={promise.name}
                                  title={promise.name}
                                >
                                  <i className="fa fa-star" />
                                  <span>{promise.name}</span>
                                </span>
                              </li>
                              )
                          })
                        }
                      </ul>
                      <div className="clear" />
                    </div>
                    <div className="clear" />
                  </div>
                }
                
                {
                  state.purchaseIncludes?.length &&
                  <div className="bs-promise-container1">
                  
                    <span className="title">included with purchase</span>
                    <div className="bs-promise">
                      <ul>
                      {
                          state.purchaseIncludes.map((purchaseInclude)=>{
                              return(
                                <li>
                                  <span
                                    className="prcs-d"
                                    data-p={purchaseInclude.name}
                                    title={purchaseInclude.name}
                                  >
                                    <i className="fa fa-check-circle" />
                                    <span> {purchaseInclude.name}</span>
                                  </span>
                                </li>
                              )
                          })
                        }
                      </ul>
                      <div className="clear" />
                    </div>
                    <div className="clear" />
                  </div>
                }
               
                <div
                  className="product-details-des"
                  style={{
                    marginBottom: 30,
                    textAlign: "center",
                    marginTop: 25
                  }}
                >
                  <div className="like-icon">
                    <a className="facebook" href="https://www.facebook.com/godachijewellery">
                      <i
                        className="fa fa-facebook"
                        style={{
                          fontFamily: 'var(--fa-style-family,"FontAwesome")'
                        }}
                      />
                      like
                    </a>
                    <a className="twitter" href="https://twitter.com/Godachijewels">
                      <i
                        className="fa fa-twitter"
                        style={{
                          fontFamily: 'var(--fa-style-family,"FontAwesome")'
                        }}
                      />
                      tweet
                    </a>
                    <a className="pinterest" href="https://www.pinterest.com/godachijewellery">
                      <i
                        className="fa fa-pinterest"
                        style={{
                          fontFamily: 'var(--fa-style-family,"FontAwesome")'
                        }}
                      />
                      save
                    </a>
                    <a className="google" href="https://www.instagram.com/godachijewellery/">
                      <i
                        className="fa fa-instagram"
                        style={{
                          fontFamily: 'var(--fa-style-family,"FontAwesome")'
                        }}
                      />
                      share
                    </a>
                  </div>
                </div>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n\t\t\t\t\t\t\t\t\t.single-choose-item i {\n    color: #ff6f52;}\n\t\t\t\t\t\t\t\t\t"
                  }}
                />
                <div className="single-choose-item text-center mb-30">
                  <i className="fa fa-comments" />
                  <span className="title">Need Support</span>
                  <p>
                  Have questions or need to report an issue with a Godachi products? Please mail us at 
                  <a href="mailto:contact@godachi.com" style={{marginLeft:5}}>contact@godachi.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* product details reviews end */}
        </div>
        {/* product details wrapper end */}
      </div>
    </div>
  </div>

  {/* related products area end */}
    <Modal 
      show={isModalOpen} 
      onHide={()=>setIsModalOpen(false)}
      backdrop="static"
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {modalHeading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{padding:0}}>
        {modalData}
      </Modal.Body>
    </Modal>
</main>
   );
};

export default Page;
