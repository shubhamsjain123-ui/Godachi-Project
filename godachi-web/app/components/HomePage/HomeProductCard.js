
import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import Price from "../Price";
const Default = ({product}) => {

    if(!product)
        return(<></>)

    const allImgData = product?.allImages?.filter((img)=>img.mimeType.includes("image")).sort((a, b) => a.order - b.order);
    const img = allImgData[0] ? IMG_URL + allImgData[0].image : "/images/nofoto.jpg";
    return (
        <div className="group-slide-item">
            <div className="group-item">
            <div className="group-item-thumb">
                <Link href={`/product/${product.seo}`} >
                    <a>
                        <img src={img} alt="" />
                    </a>
                </Link>
            </div>
            <div className="group-item-desc">
                <h5 className="group-product-name">
                <Link href={`/product/${product.seo}`} ><a>{product.productName}</a></Link>
                </h5>
                <div className="price-box-home">
                <span className="price-regular-home">
                    <Price data={product.variantProduct[0].grandTotal} fraction={0} />
                </span>
                <span className="price-old-home">
                    <del><Price data={product.variantProduct[0].price+product.variantProduct[0].gst} fraction={0} /></del>
                </span>
                </div>
            </div>
            </div>
        </div>
   )
}

export default Default;