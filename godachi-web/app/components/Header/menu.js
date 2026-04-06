import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, IMG_URL } from "../../../config/config";
import MenuItem from "./MenuItems"
import Image from "next/image";
const Default = () => {
    const { topmenu } = useSelector((state) => state.topmenu);

    const renderMenuItems = (menuItem) => {
        var renderedResponse = [];
        var menuItemList = menuItem.items;
        if (menuItemList.length > 0) {
            var maxColumn = Math.max(...menuItemList.map(o => o.column));
            for (let colNumber = 1; colNumber <= parseInt(maxColumn); colNumber++) {
                var itemLists = menuItemList.filter((items) => items.column == colNumber);
                if (itemLists.length > 0) {
                    renderedResponse.push(
                        <li className="mega-title">
                            {
                                itemLists.map((itemList, index) => {
                                    return (
                                        <div key={index}>
                                            <MenuItem
                                                itemList={itemList}
                                                routeTo={`/jewellery/${menuItem.seo}`}
                                                seo={menuItem.seo}
                                                menuCategory={menuItem.category}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </li>
                    )
                }
                else {
                    renderedResponse.push(<li className="mega-title"></li>)

                }
            }
        }
        return (renderedResponse)
    }
    return (
        <div className="main-menu-area">
            <div className="main-menu">
                <nav className="desktop-menu">
                    <ul>
                        {
                            topmenu.map((menuItem, index) => {
                                return (
                                    <li className="position-static" key={index}>
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

                                            <li className="mbanner d-none d-lg-block">
                                                {
                                                    menuItem.image &&
                                                    <Link href={`/jewellery/${menuItem.seo}`}>
                                                        <a>
                                                            {/* <img
                                                                src={`${IMG_URL + menuItem.image}`}
                                                                alt=""
                                                                style={{ width: "100%" }}
                                                            /> */}
                                                            <Image
                                                                src={`${IMG_URL + menuItem.image}`}
                                                                alt="menu-category"
                                                                sizes="(max-width: 100%, height:100px)"
                                                                width={400}
                                                                height={250}
                                                            />
                                                        </a>
                                                    </Link>
                                                }

                                                <div className="banner_text">
                                                    {
                                                        menuItem.description &&
                                                        <p style={{ marginBottom: 0, textAlign: "center" }}>
                                                            {menuItem.description}
                                                        </p>
                                                    }

                                                    <Link href={`/jewellery/${menuItem.seo}`}>
                                                        <a
                                                            className="banner_cta hover_cta_"
                                                            data-menu="Rings/View all designs"
                                                        >
                                                            View All Designs{" "}
                                                            <span>
                                                                <i
                                                                    className="fa fa-angle-right"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </a>
                                                    </Link>

                                                </div>
                                            </li>



                                        </ul>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </nav>
            </div>
        </div>

    );
};

export default Default;
