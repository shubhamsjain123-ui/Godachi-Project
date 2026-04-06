import React, {useEffect} from "react";
import {Menu} from "antd";
import Link from "next/link";

import {useRouter} from 'next/router'
import CustomScrollbars from "../../../util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import AuthService from "../../../util/services/authservice";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../../constants/ThemeSetting";
import IntlMessages from "../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {logout_r, setPathName} from "../../../redux/actions";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const SidebarContent = () => {

  const dispatch = useDispatch();
  const router = useRouter()


 /*  useEffect(() => {
    dispatch(setPathName(router.pathname))
  }, [router.pathname]); */

  const selectedKeys = router.pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (
    <>
      <SidebarLogo/>
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications`}>
          <UserProfile/>
          <AppsNavigation/>
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme='lite'
            mode="inline">
              <Menu.Item key="dashboard">
                <Link href="/dashboard"><a><i className="icon icon-home"/>
                  <span>Dashboard</span></a></Link>
              </Menu.Item>
              <Menu.Item key="products">
                <Link href="/products/list"><a><i className="icon icon-product-list"/>
                  <span>Products</span></a></Link>
              </Menu.Item>
              <Menu.Item key="productInventory">
                <Link href="/productInventory/list"><a><i className="icon icon-select"/>
                  <span>Product Inventory</span></a></Link>
              </Menu.Item>
              <SubMenu 
                title={<span><i className="icon icon-extra-components"/>
                <span>Masters</span></span>}
              >
                <Menu.Item key="/categories/list">
                  <Link href="/categories/list"><a><i className="icon icon-crm"/><span>Categories</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/metals/list">
                  <Link href="/masters/metals/list"><a><i className="icon icon-button"/><span>Metal</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/metalColors/list">
                  <Link href="/masters/metalColors/list"><a><i className="icon icon-invert-color"/><span>Metal Colors</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/diamond/list">
                  <Link href="/masters/diamond/list"><a><i className="icon icon-diamond"/><span>Diamond Properties</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/stones/list">
                  <Link href="/masters/stones/list"><a><i className="icon icon-social"/><span>Stone</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/stoneColors/list">
                  <Link href="/masters/stoneColors/list"><a><i className="icon icon-invert-color"/><span>Stone Colors</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/variants/list">
                  <Link href="/variants/list"><a><i className="icon icon-basic-calendar"/><span>Variants</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/promises/list">
                  <Link href="/masters/promises/list"><a><i className="icon icon-check-square"/><span>Promises</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/purchaseincludes/list">
                  <Link href="/masters/purchaseincludes/list"><a><i className="icon icon-tasks"/><span>Purchase Includes</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/occassions/list">
                  <Link href="/masters/occassions/list"><a><i className="icon icon-important"/><span>Occasions</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/tags/list">
                  <Link href="/masters/tags/list"><a><i className="icon icon-tag"/><span>Product Tags</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/certifications/list">
                  <Link href="/masters/certifications/list"><a><i className="icon icon-modal"/><span>Certifications</span></a></Link>
                </Menu.Item>
               
                <Menu.Item key="/masters/faqs/add">
                  <Link href="/masters/faqs/add"><a><i className="icon icon-queries"/><span>Product Faqs</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/masters/vendors/list">
                  <Link href="/masters/vendors/list"><a><i className="icon icon-family"/><span>Vendors</span></a></Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu title={<span><i className="icon icon-pricing-table"/>
                <span>Master Price</span></span>}
              >
                <Menu.Item key="/pricing/metal">
                  <Link href="/pricing/metal"><a><i className="icon icon-button"/><span>Metal</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/pricing/diamond">
                  <Link href="/pricing/diamond"><a><i className="icon icon-diamond"/><span>Diamond</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/pricing/stone">
                  <Link href="/pricing/stone"><a><i className="icon icon-diamond"/><span>Stone</span></a></Link>
                </Menu.Item>
                
              </SubMenu>
              <Menu.Item key="orders">
                <Link href="/orders/list"><a><i className="icon icon-orders"/>
                  <span>Orders</span></a></Link>
              </Menu.Item>

              <Menu.Item key="orders">
                <Link href="/return/list"><a><i className="icon icon-reply"/>
                  <span>Return Request</span></a></Link>
              </Menu.Item>
              
              <Menu.Item key="orderstatus">
                <Link href="/orderstatus/list"><a><i className="icon icon-list-select-o"/>
                  <span>Order Status</span></a></Link>
              </Menu.Item>

              <Menu.Item key="returnStatus">
                <Link href="/returnStatus/list"><a><i className="icon icon-list-select-o"/>
                  <span>Return Order Status</span></a></Link>
              </Menu.Item>

              <SubMenu 
                title={<span><i className="icon icon-tab"/>
                <span>Reportings</span></span>}
              >
                <Menu.Item key="/reporting/order">
                  <Link href="/reporting/order"><a><i className="icon icon-frequent"/><span>Order Reports</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/reporting/product">
                  <Link href="/reporting/product"><a><i className="icon icon-frequent"/><span>Product Reports</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/reporting/customer">
                  <Link href="/reporting/customer"><a><i className="icon icon-frequent"/><span>Customer Reports</span></a></Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="offers">
                <Link href="/offers/list"><a><i className="icon icon-tickets"/>
                  <span>Offers</span></a></Link>
              </Menu.Item>
              <Menu.Item key="coupons">
                <Link href="/coupons/list"><a><i className="icon icon-tickets"/>
                  <span>Coupon Management</span></a></Link>
              </Menu.Item>
              {/* <Menu.Item key="customers">
                <Link href="/customers/list"><a><i className="icon icon-profile"/>
                  <span>Customers</span></a></Link>
              </Menu.Item> */}
              {/* <Menu.Item key="staff">
                <Link href="/staff/list"><a><i className="icon icon-team"/>
                  <span>Manager</span></a></Link>
              </Menu.Item> */}
              <Menu.Item key="megaMenu">
                <Link href="/megaMenu/list"><a><i className="icon icon-wysiwyg"/>
                  <span>Menu Items</span></a>
                </Link>
              </Menu.Item>
              <SubMenu 
                title={<span><i className="icon icon-feedback"/>
                <span>Requests</span></span>}
              >
                <Menu.Item key="/requests/contact">
                  <Link href="/requests/contact"><a><i className="icon icon-queries"/><span>Contact Us</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/requests/customize">
                  <Link href="/requests/customize"><a><i className="icon icon-picker"/><span>Customize</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/requests/bulkOrder">
                  <Link href="/requests/bulkOrder"><a><i className="icon icon-orders"/><span>Bulk Order</span></a></Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu 
                title={<span><i className="icon icon-tab"/>
                <span>CMS</span></span>}
              >
                <Menu.Item key="/cms/faq/list">
                  <Link href="/cms/faq/list"><a><i className="icon icon-frequent"/><span>Faqs</span></a></Link>
                </Menu.Item>
                <Menu.Item key="/cms/awards/list">
                  <Link href="/cms/awards/list"><a><i className="icon icon-tickets"/><span>Awards & Recognition</span></a></Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu 
                title={<span><i className="icon icon-extra-components"/>
                <span>Home Page Management</span></span>}
              >
                <SubMenu 
                  title={<span><i className="icon icon-extra-components"/>
                  <span>Web</span></span>}
                >
                  <Menu.Item key="/homePage/web/slider">
                    <Link href="/homePage/web/slider"><a><i className="icon icon-wysiwyg"/>
                      <span>Banner Management</span></a></Link>
                  </Menu.Item>
                  
                  <Menu.Item key="/homePage/web/video">
                    <Link href="/homePage/web/video"><a><i className="icon icon-wysiwyg"/>
                      <span>Video</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/web/newArrival">
                    <Link href="/homePage/web/newArrival"><a><i className="icon icon-wysiwyg"/>
                      <span>New Arrival</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/web/trending">
                    <Link href="/homePage/web/trending"><a><i className="icon icon-wysiwyg"/>
                      <span>Trending</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/web/bestSeller">
                    <Link href="/homePage/web/bestSeller"><a><i className="icon icon-wysiwyg"/>
                      <span>Best Seller</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/web/explore">
                    <Link href="/homePage/web/explore"><a><i className="icon icon-wysiwyg"/>
                      <span>Explore</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/web/offers">
                    <Link href="/homePage/web/offers"><a><i className="icon icon-wysiwyg"/>
                      <span>Best Offers</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/web/listing">
                    <Link href="/homePage/web/listing"><a><i className="icon icon-wysiwyg"/>
                      <span>Product Listing</span></a></Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu 
                  title={<span><i className="icon icon-extra-components"/>
                  <span>App</span></span>}
                >
                  <Menu.Item key="/homePage/app/slider">
                    <Link href="/homePage/app/slider"><a><i className="icon icon-wysiwyg"/>
                      <span>Banner Management</span></a></Link>
                  </Menu.Item>
                  
                  <Menu.Item key="/homePage/app/video">
                    <Link href="/homePage/app/video"><a><i className="icon icon-wysiwyg"/>
                      <span>Video</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/app/newArrival">
                    <Link href="/homePage/app/newArrival"><a><i className="icon icon-wysiwyg"/>
                      <span>New Arrival</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/app/trending">
                    <Link href="/homePage/app/trending"><a><i className="icon icon-wysiwyg"/>
                      <span>Trending</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/app/bestSeller">
                    <Link href="/homePage/app/bestSeller"><a><i className="icon icon-wysiwyg"/>
                      <span>Best Seller</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/app/explore">
                    <Link href="/homePage/app/explore"><a><i className="icon icon-wysiwyg"/>
                      <span>Explore</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/app/offers">
                    <Link href="/homePage/app/offers"><a><i className="icon icon-wysiwyg"/>
                      <span>Best Offers</span></a></Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu 
                  title={<span><i className="icon icon-extra-components"/>
                  <span>Common</span></span>}
                >
                  <Menu.Item key="/homePage/common/brands">
                    <Link href="/homePage/common/brands"><a><i className="icon icon-wysiwyg"/>
                      <span>Brands</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/common/stats">
                    <Link href="/homePage/common/stats"><a><i className="icon icon-wysiwyg"/>
                      <span>Stats</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/common/blog">
                    <Link href="/homePage/common/blog"><a><i className="icon icon-wysiwyg"/>
                      <span>Blogs</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/common/testimonial">
                    <Link href="/homePage/common/testimonial"><a><i className="icon icon-wysiwyg"/>
                      <span>Testimonials</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/common/story">
                    <Link href="/homePage/common/story"><a><i className="icon icon-wysiwyg"/>
                      <span>Our Story</span></a></Link>
                  </Menu.Item>
                  <Menu.Item key="/homePage/common/news">
                    <Link href="/homePage/common/news"><a><i className="icon icon-wysiwyg"/>
                      <span>News</span></a></Link>
                  </Menu.Item>
                </SubMenu>
                
              </SubMenu>
              
              <Menu.Item key="settings">
                <Link href="/settings/list"><a><i className="icon icon-components"/>
                  <span>Settings</span></a></Link>
              </Menu.Item>
              <Menu.Item 
                key="signin"
                onClick={async () => {
                  await dispatch(logout_r());
                  AuthService.logout();
                }}
              >
                <Link href="/"><a><i className="icon icon-signin"/>
                  <span>Logout</span></a></Link>
              </Menu.Item>

          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;

