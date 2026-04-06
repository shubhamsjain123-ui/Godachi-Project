import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import MobileMenuItem from "./MobileMenuItem"
const Default = () => {
    const { topmenu } = useSelector((state) => state.topmenu);

    const renderMenuItems = (menuItem) => {
        // console.log("menu Item")
        // console.log(menuItem)
        var renderedResponse = [];
        var menuItemList = menuItem.items;
        if (menuItemList.length > 0) {
            menuItemList.forEach(element => {
                renderedResponse.push(
                    <MobileMenuItem
                        itemList={element}
                        routeTo={`${menuItem.seo}`}
                        seo={menuItem.seo}
                        menuCategory={menuItem.category}
                    />
                )
            });
            /* var maxColumn = Math.max(...menuItemList.map(o => o.column));
            for(let colNumber = 1; colNumber <= parseInt(maxColumn); colNumber++){
                var itemLists = menuItemList.filter((items)=>items.column == colNumber);
                if(itemLists.length>0){
                    renderedResponse.push(
                        <li className="mega-title">
                            {
                                itemLists.map((itemList)=>{
                                    return (
                                        <MenuItem 
                                            itemList={itemList} 
                                            routeTo={`/category/${menuItem.seo}`} 
                                            seo={menuItem.seo}
                                            menuCategory = {menuItem.category}
                                        />
                                    )
                                })
                            }
                        </li>
                    )
                }
                else{
                    renderedResponse.push( <li className="mega-title"></li>)
                    
                }
            } */
        }
        return (renderedResponse)
    }
    return (
        <div className="mobile-navigation">
            <nav>
                <ul className="mobile-menu">
                    {
                        topmenu.map((menuItem, index) => {
                            return (
                                <li className="menu-item-has-children" key={index}>
                                    <span className="menu-expand"><i></i></span>
                                    <Link href={{
                                        pathname: `/jewellery/${menuItem.seo}`,
                                        query: {
                                            categories: menuItem.category,
                                            skip: 0
                                        }
                                    }}  >
                                        <a>{menuItem.title} </a>
                                    </Link>
                                    <ul className="megamenu dropdown">
                                        {renderMenuItems(menuItem)}
                                    </ul>
                                </li>
                            )
                        })
                    }

                    {/* <li className="menu-item-has-children1">
                    <Link href="/jewellery/earrings">
                        <a>Earrings</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li className="mega-title menu-item-has-children1">
                        <a href="index.html">Shop By Metal</a>
                        <ul className="dropdown">
                            <li>
                            <a href="index.html">Gold</a>
                            </li>
                            <li>
                            <a href="index.html">Silver</a>
                            </li>
                            <li>
                            <a href="index.html">Diamond</a>
                            </li>
                            <li>
                            <a href="index.html">Gemstone</a>
                            </li>
                            <li>
                            <a href="index.html">Pearl</a>
                            </li>
                            <li>
                            <a href="index.html">Moissanite</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-2.html">Shop By Price</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">
                                Up to <i className="fa fa-inr" />
                                2,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                2,000 - <i className="fa fa-inr" />
                                5,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                5,000 - <i className="fa fa-inr" />
                                10,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                10,000 - <i className="fa fa-inr" />
                                25,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                25,000 - <i className="fa fa-inr" />
                                50,000
                            </a>
                            </li>
                            <li>
                            <a href="privacy-policy.html">
                                <i className="fa fa-inr" />
                                50,000 and Above{" "}
                            </a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-3.html">Shop For</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">Women</a>
                            </li>
                            <a href="product-details.html"></a>
                            <li>
                            <a href="product-details.html" />
                            <a href="product-details-affiliate.html">Men</a>
                            </li>
                            <a href="product-details-affiliate.html"></a>
                            <li>
                            <a href="product-details-affiliate.html" />
                            <a href="privacy-policy.html">Kids</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-4.html">Shop By Occasion</a>
                        <ul className="dropdown">
                            <li>
                            <a href="my-account.html">Wedding</a>
                            </li>
                            <li>
                            <a href="login-register.html">Party Wear</a>
                            </li>
                            <li>
                            <a href="about-us.html">Traditional &amp; Ethnic</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Office Wear</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Daily Wear</a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li className="menu-item-has-children1">
                    <Link href="/jewellery/rings">
                        <a>Rings</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li className="mega-title menu-item-has-children1">
                        <a href="index.html">Shop By Metal</a>
                        <ul className="dropdown">
                            <li>
                            <a href="index.html">Gold</a>
                            </li>
                            <li>
                            <a href="index.html">Silver</a>
                            </li>
                            <li>
                            <a href="index.html">Diamond</a>
                            </li>
                            <li>
                            <a href="index.html">Gemstone</a>
                            </li>
                            <li>
                            <a href="index.html">Pearl</a>
                            </li>
                            <li>
                            <a href="index.html">Moissanite</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-2.html">Shop By Price</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">
                                Up to <i className="fa fa-inr" />
                                2,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                2,000 - <i className="fa fa-inr" />
                                5,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                5,000 - <i className="fa fa-inr" />
                                10,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                10,000 - <i className="fa fa-inr" />
                                25,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                25,000 - <i className="fa fa-inr" />
                                50,000
                            </a>
                            </li>
                            <li>
                            <a href="privacy-policy.html">
                                <i className="fa fa-inr" />
                                50,000 and Above{" "}
                            </a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-3.html">Shop For</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">Women</a>
                            </li>
                            <a href="product-details.html"></a>
                            <li>
                            <a href="product-details.html" />
                            <a href="product-details-affiliate.html">Men</a>
                            </li>
                            <a href="product-details-affiliate.html"></a>
                            <li>
                            <a href="product-details-affiliate.html" />
                            <a href="privacy-policy.html">Kids</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-4.html">Shop By Occasion</a>
                        <ul className="dropdown">
                            <li>
                            <a href="my-account.html">Wedding</a>
                            </li>
                            <li>
                            <a href="login-register.html">Party Wear</a>
                            </li>
                            <li>
                            <a href="about-us.html">Traditional &amp; Ethnic</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Office Wear</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Daily Wear</a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li className="menu-item-has-children1">
                    <Link href="/jewellery/bangles-bracelets">
                        <a>Bangles &amp; Bracelets</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li className="mega-title menu-item-has-children1">
                        <a href="index.html">Shop By Metal</a>
                        <ul className="dropdown">
                            <li>
                            <a href="index.html">Gold</a>
                            </li>
                            <li>
                            <a href="index.html">Silver</a>
                            </li>
                            <li>
                            <a href="index.html">Diamond</a>
                            </li>
                            <li>
                            <a href="index.html">Gemstone</a>
                            </li>
                            <li>
                            <a href="index.html">Pearl</a>
                            </li>
                            <li>
                            <a href="index.html">Moissanite</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-2.html">Shop By Price</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">
                                Up to <i className="fa fa-inr" />
                                2,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                2,000 - <i className="fa fa-inr" />
                                5,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                5,000 - <i className="fa fa-inr" />
                                10,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                10,000 - <i className="fa fa-inr" />
                                25,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                25,000 - <i className="fa fa-inr" />
                                50,000
                            </a>
                            </li>
                            <li>
                            <a href="privacy-policy.html">
                                <i className="fa fa-inr" />
                                50,000 and Above{" "}
                            </a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-3.html">Shop For</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">Women</a>
                            </li>
                            <a href="product-details.html"></a>
                            <li>
                            <a href="product-details.html" />
                            <a href="product-details-affiliate.html">Men</a>
                            </li>
                            <a href="product-details-affiliate.html"></a>
                            <li>
                            <a href="product-details-affiliate.html" />
                            <a href="privacy-policy.html">Kids</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-3.html">Shop By Category</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">Bangles</a>
                            </li>
                            <a href="product-details.html"></a>
                            <li>
                            <a href="product-details.html" />
                            <a href="product-details-affiliate.html">Bracelets</a>
                            </li>
                            <a href="product-details-affiliate.html"></a>
                            <li>
                            <a href="product-details-affiliate.html" />
                            <a href="privacy-policy.html">Mangalsutra Bracelets</a>
                            </li>
                            <li>
                            <a href="privacy-policy.html">Kadas</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-4.html">Shop By Occasion</a>
                        <ul className="dropdown">
                            <li>
                            <a href="my-account.html">Wedding</a>
                            </li>
                            <li>
                            <a href="login-register.html">Party Wear</a>
                            </li>
                            <li>
                            <a href="about-us.html">Traditional &amp; Ethnic</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Office Wear</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Daily Wear</a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li className="menu-item-has-children1">
                    <Link href="/jewellery/chains">
                        <a>Chains &amp; Pendants</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li className="mega-title menu-item-has-children1">
                        <a href="index.html">Shop By Metal</a>
                        <ul className="dropdown">
                            <li>
                            <a href="index.html">Gold</a>
                            </li>
                            <li>
                            <a href="index.html">Silver</a>
                            </li>
                            <li>
                            <a href="index.html">Diamond</a>
                            </li>
                            <li>
                            <a href="index.html">Gemstone</a>
                            </li>
                            <li>
                            <a href="index.html">Pearl</a>
                            </li>
                            <li>
                            <a href="index.html">Moissanite</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-2.html">Shop By Price</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">
                                Up to <i className="fa fa-inr" />
                                2,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                2,000 - <i className="fa fa-inr" />
                                5,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                5,000 - <i className="fa fa-inr" />
                                10,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                10,000 - <i className="fa fa-inr" />
                                25,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                25,000 - <i className="fa fa-inr" />
                                50,000
                            </a>
                            </li>
                            <li>
                            <a href="privacy-policy.html">
                                <i className="fa fa-inr" />
                                50,000 and Above{" "}
                            </a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-3.html">Shop For</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">Women</a>
                            </li>
                            <a href="product-details.html"></a>
                            <li>
                            <a href="product-details.html" />
                            <a href="product-details-affiliate.html">Men</a>
                            </li>
                            <a href="product-details-affiliate.html"></a>
                            <li>
                            <a href="product-details-affiliate.html" />
                            <a href="privacy-policy.html">Kids</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-3.html">Shop By Category</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">Chains</a>
                            </li>
                            <a href="product-details.html"></a>
                            <li>
                            <a href="product-details.html" />
                            <a href="product-details-affiliate.html">Pendants</a>
                            </li>
                            <a href="product-details-affiliate.html"></a>
                            <li>
                            <a href="product-details-affiliate.html" />
                            <a href="privacy-policy.html">Mangalsutra</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-4.html">Shop By Occasion</a>
                        <ul className="dropdown">
                            <li>
                            <a href="my-account.html">Wedding</a>
                            </li>
                            <li>
                            <a href="login-register.html">Party Wear</a>
                            </li>
                            <li>
                            <a href="about-us.html">Traditional &amp; Ethnic</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Office Wear</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Daily Wear</a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li className="menu-item-has-children1">
                    <Link href="/jewellery/necklaces">
                        <a>Necklaces</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li className="mega-title menu-item-has-children1">
                        <a href="index.html">Shop By Metal</a>
                        <ul className="dropdown">
                            <li>
                            <a href="index.html">Gold</a>
                            </li>
                            <li>
                            <a href="index.html">Silver</a>
                            </li>
                            <li>
                            <a href="index.html">Diamond</a>
                            </li>
                            <li>
                            <a href="index.html">Gemstone</a>
                            </li>
                            <li>
                            <a href="index.html">Pearl</a>
                            </li>
                            <li>
                            <a href="index.html">Moissanite</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-2.html">Shop By Price</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">
                                Up to <i className="fa fa-inr" />
                                2,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                2,000 - <i className="fa fa-inr" />
                                5,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                5,000 - <i className="fa fa-inr" />
                                10,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                10,000 - <i className="fa fa-inr" />
                                25,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                25,000 - <i className="fa fa-inr" />
                                50,000
                            </a>
                            </li>
                            <li>
                            <a href="privacy-policy.html">
                                <i className="fa fa-inr" />
                                50,000 and Above{" "}
                            </a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-4.html">Shop By Occasion</a>
                        <ul className="dropdown">
                            <li>
                            <a href="my-account.html">Wedding</a>
                            </li>
                            <li>
                            <a href="login-register.html">Party Wear</a>
                            </li>
                            <li>
                            <a href="about-us.html">Traditional &amp; Ethnic</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Office Wear</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Daily Wear</a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li className="menu-item-has-children1">
                    <Link href="/jewellery/anklets">
                        <a>Anklets</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li className="mega-title menu-item-has-children1">
                        <a href="index.html">Shop By Metal</a>
                        <ul className="dropdown">
                            <li>
                            <a href="index.html">Gold</a>
                            </li>
                            <li>
                            <a href="index.html">Silver</a>
                            </li>
                            <li>
                            <a href="index.html">Diamond</a>
                            </li>
                            <li>
                            <a href="index.html">Gemstone</a>
                            </li>
                            <li>
                            <a href="index.html">Pearl</a>
                            </li>
                            <li>
                            <a href="index.html">Moissanite</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-2.html">Shop By Price</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">
                                Up to <i className="fa fa-inr" />
                                2,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                2,000 - <i className="fa fa-inr" />
                                5,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                5,000 - <i className="fa fa-inr" />
                                10,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                10,000 - <i className="fa fa-inr" />
                                25,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                25,000 - <i className="fa fa-inr" />
                                50,000
                            </a>
                            </li>
                            <li>
                            <a href="privacy-policy.html">
                                <i className="fa fa-inr" />
                                50,000 and Above{" "}
                            </a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-4.html">Shop for</a>
                        <ul className="dropdown">
                            <li>
                            <a href="my-account.html">Women</a>
                            </li>
                            <li>
                            <a href="login-register.html">Kids</a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li className="menu-item-has-children1">
                    <Link href="/jewellery/jewellery-sets">
                        <a>Jewellery Sets</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li className="mega-title menu-item-has-children1">
                        <a href="index.html">Shop By Metal</a>
                        <ul className="dropdown">
                            <li>
                            <a href="index.html">Gold</a>
                            </li>
                            <li>
                            <a href="index.html">Silver</a>
                            </li>
                            <li>
                            <a href="index.html">Diamond</a>
                            </li>
                            <li>
                            <a href="index.html">Gemstone</a>
                            </li>
                            <li>
                            <a href="index.html">Pearl</a>
                            </li>
                            <li>
                            <a href="index.html">Moissanite</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-2.html">Shop By Price</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">
                                Up to <i className="fa fa-inr" />
                                2,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                2,000 - <i className="fa fa-inr" />
                                5,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                5,000 - <i className="fa fa-inr" />
                                10,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                10,000 - <i className="fa fa-inr" />
                                25,000
                            </a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                <i className="fa fa-inr" />
                                25,000 - <i className="fa fa-inr" />
                                50,000
                            </a>
                            </li>
                            <li>
                            <a href="privacy-policy.html">
                                <i className="fa fa-inr" />
                                50,000 and Above{" "}
                            </a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-4.html">Shop By Occasion</a>
                        <ul className="dropdown">
                            <li>
                            <a href="my-account.html">Wedding</a>
                            </li>
                            <li>
                            <a href="login-register.html">Party Wear</a>
                            </li>
                            <li>
                            <a href="about-us.html">Traditional &amp; Ethnic</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Office Wear</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Daily Wear</a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li className="menu-item-has-children1">
                    <Link href="/jewellery/other-jewellery">
                        <a>Other Jewellery</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li className="mega-title menu-item-has-children1">
                        <a href="index.html">Shop By Category</a>
                        <ul className="dropdown">
                            <li>
                            <a href="shop-grid-right-sidebar.html">Mang Tikka</a>
                            </li>
                            <li>
                            <a href="shop-list-right-sidebar.html">Brooch</a>
                            </li>
                            <li>
                            <a href="shop-list-right-sidebar.html">Hair Pins</a>
                            </li>
                            <li>
                            <a href="shop-list-right-sidebar.html">
                                Notepins/Noserings
                            </a>
                            </li>
                            <li>
                            <a href="shop-list-left-sidebar.html">Waist Chain</a>
                            </li>
                            <li>
                            <a href="shop-list-right-sidebar.html">Toe Ring</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Cufflinks</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-2.html">Shop By Metal</a>
                        <ul className="dropdown">
                            <li>
                            <a href="index.html">Gold</a>
                            </li>
                            <li>
                            <a href="index.html">Silver</a>
                            </li>
                            <li>
                            <a href="index.html">Diamond</a>
                            </li>
                            <li>
                            <a href="index.html">Gemstone</a>
                            </li>
                            <li>
                            <a href="index.html">Pearl</a>
                            </li>
                            <li>
                            <a href="index.html">Moissanite</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-3.html">Shop For</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">Women</a>
                            </li>
                            <a href="product-details.html"></a>
                            <li>
                            <a href="product-details.html" />
                            <a href="product-details-affiliate.html">Men</a>
                            </li>
                            <a href="product-details-affiliate.html"></a>
                            <li>
                            <a href="product-details-affiliate.html" />
                            <a href="privacy-policy.html">Kids</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-3.html">Other</a>
                        <ul className="dropdown">
                            <li>
                            <a href="my-account.html">Multi Stone</a>
                            </li>
                            <li>
                            <a href="login-register.html">Solitaires </a>
                            </li>
                            <li>
                            <a href="about-us.html">Polki</a>
                            </li>
                            <li>
                            <a href="contact-us.html">Navratna</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-4.html">Precious stones</a>
                        <ul className="dropdown">
                            <li>
                            <a href="cart.html">Heera (Diamond)</a>
                            </li>
                            <li>
                            <a href="checkout.html">Neelam (Blue Sapphire)</a>
                            </li>
                            <li>
                            <a href="compare.html">Pukhraj (Yellow Sapphire)</a>
                            </li>
                            <li>
                            <a href="wishlist.html">Panna (Emerald)</a>
                            </li>
                            <li>
                            <a href="wishlist.html">Manik (Ruby)</a>
                            </li>
                            <li>
                            <a href="wishlist.html">Gomed (Hessonite)</a>
                            </li>
                            <li>
                            <a href="wishlist.html">Moonga (Coral Red)</a>
                            </li>
                            <li>
                            <a href="wishlist.html">Moti (Pearl)</a>
                            </li>
                            <li>
                            <a href="wishlist.html">Lehsunia</a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li className="menu-item-has-children1">
                    <Link href="/jewellery/coins">
                        <a>Coins</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li className="mega-title menu-item-has-children1">
                        <a href="index.html">Shop By Metal</a>
                        <ul className="dropdown">
                            <li>
                            <a href="index.html">Gold</a>
                            </li>
                            <li>
                            <a href="index.html">Silver</a>
                            </li>
                        </ul>
                        </li>
                        <li className="mega-title menu-item-has-children1">
                        <a href="index-2.html">Shop By Category</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">Floral</a>
                            </li>
                            <a href="product-details.html"></a>
                            <li>
                            <a href="product-details.html" />
                            <a href="product-details-affiliate.html">
                                Laxmi Ganesh
                            </a>
                            </li>
                            <a href="product-details-affiliate.html"></a>
                            <li>
                            <a href="product-details-affiliate.html" />
                            <a href="product-details-affiliate.html">Kalash</a>
                            </li>
                            <a href="product-details-affiliate.html"></a>
                        </ul>
                        <a href="product-details-affiliate.html"></a>
                        </li>
                        <a href="product-details-affiliate.html"></a>
                        <li className="mega-title menu-item-has-children1">
                        <a href="product-details-affiliate.html" />
                        <a href="index-4.html">Shop By Weight</a>
                        <ul className="dropdown">
                            <li>
                            <a href="product-details.html">Up to 2 gms</a>
                            </li>
                            <li>
                            <a href="product-details-affiliate.html">
                                2 gms - 4 gms
                            </a>
                            </li>
                            <li>
                            <a href="product-details-variable.html">
                                4 gms - 6 gms
                            </a>
                            </li>
                            <li>
                            <a href="product-details-group.html">6 gms - 8 gms</a>
                            </li>
                            <li>
                            <a href="product-details-group.html">8 gms - 16 gms</a>
                            </li>
                            <li>
                            <a href="product-details-group.html">16 gms - 32 gms</a>
                            </li>
                            <li>
                            <a href="product-details-group.html">
                                32 gms &amp; Above
                            </a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li className="menu-item-has-children1">
                    <Link href="/jewellery/gift-items">
                        <a>Gifts</a>
                    </Link>
                    <ul className="megamenu dropdown">
                        <li>
                        <a href="index.html">Watches</a>
                        </li>
                        <li>
                        <a href="index-2.html">Belt Buckle</a>
                        </li>
                        <li>
                        <a href="index-3.html">Golden Roses</a>
                        </li>
                        <li>
                        <a href="index-4.html">Gold Shirt Buttons</a>
                        </li>
                        <li>
                        <a href="index-5.html">Custom Eye Glasses</a>
                        </li>
                        <li>
                        <a href="index-6.html">Customized Ring Box</a>
                        </li>
                        <li>
                        <a href="index-6.html">Unique Coin Box</a>
                        </li>
                        <li>
                        <a href="index-6.html">Gift Card</a>
                        </li>
                        <li>
                        <a href="index-6.html">Gift Voucher</a>
                        </li>
                        <li>
                        <a href="index-6.html">Gold Greeting Card</a>
                        </li>
                        <li>
                        <a href="index-6.html">Silver Greeting Card</a>
                        </li>
                    </ul>
                    </li> */}
                </ul>
            </nav>
        </div>

    );
};

export default Default;
