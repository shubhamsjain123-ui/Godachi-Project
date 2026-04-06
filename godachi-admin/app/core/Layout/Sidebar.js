import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  DashboardOutlined,
  CheckSquareOutlined,
  OrderedListOutlined,
  DollarOutlined,
  CodeSandboxOutlined,
  DeleteRowOutlined,
  PartitionOutlined,
  PullRequestOutlined,
  FileDoneOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  CloseSquareOutlined,
  ControlOutlined,
  ChromeOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { logout_r, changeCollapsed_r } from "../../../redux/actions";

import AuthService from "../../../util/services/authservice";

import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const { Sider } = Layout;

const Sidebar = () => {
  const intl = useIntl();

  const dispatch = useDispatch();

  const { collapsed } = useSelector(({ settings }) => settings);
  const { isAuthenticated, user } = useSelector(({ login }) => login);

  const { role } = user;

  function updateSize() {
    if (window.innerWidth < 770) {
      dispatch(changeCollapsed_r(true));
    } else {
      dispatch(changeCollapsed_r(false));
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        maxWidth: "100%!important",
        width: "100%",
        height: "100%",
        borderRight: "1px solid #cccccc54",
      }}
    >
      <div
        className="sidebarOpenBtn"
        onClick={() => dispatch(changeCollapsed_r(!collapsed))}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="p-2">
        <a href="/">
          <img src="/images/logo.png" alt="Brand Logo" />
        </a>
      </div>
      <Menu
       
        mode="inline"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
          <Link href="/dashboard">
            <a>
              <span>
                <IntlMessages id="layout.sidebar.dashboard" />
              </span>
            </a>
          </Link>
        </Menu.Item>

        <Menu.SubMenu title="Masters" icon={<DashboardOutlined />}>
          <Menu.Item key="/categories/list">
            <Link href="/categories/list"><a>Categories</a></Link>
          </Menu.Item>
          <Menu.Item key="/variants/list">
            <Link href="/variants/list"><a>Variants</a></Link>
          </Menu.Item>
          <Menu.Item key="/masters/promises/list">
            <Link href="/masters/promises/list"><a>Promises</a></Link>
          </Menu.Item>
          <Menu.Item key="/masters/purchaseincludes/list">
            <Link href="/masters/purchaseincludes/list"><a>Purchase Includes</a></Link>
          </Menu.Item>
          <Menu.Item key="/masters/occassions/list">
            <Link href="/masters/occassions/list"><a>Occasions</a></Link>
          </Menu.Item>
          <Menu.Item key="/masters/tags/list">
            <Link href="/masters/tags/list"><a>Product Tags</a></Link>
          </Menu.Item>
          <Menu.Item key="/masters/certifications/list">
            <Link href="/masters/certifications/list"><a>Certifications</a></Link>
          </Menu.Item>
          <Menu.Item key="/masters/metals/list">
            <Link href="/masters/metals/list"><a>Metal</a></Link>
          </Menu.Item>
          <Menu.Item key="/masters/metalColors/list">
            <Link href="/masters/metalColors/list"><a>Metal Colors</a></Link>
          </Menu.Item>
          <Menu.Item key="/masters/stones/list">
            <Link href="/masters/stones/list"><a>Stone</a></Link>
          </Menu.Item>
          <Menu.Item key="/masters/faqs/add">
            <Link href="/masters/faqs/add"><a>Faqs</a></Link>
          </Menu.Item>
          {/*<Menu.Item key="/masters/purity/list">
            <Link href="/masters/purity/list"><a>Purity</a></Link>
          </Menu.Item>*/}
        </Menu.SubMenu>
        
        <Menu.SubMenu title="Master Price" icon={<DollarOutlined />}>
          <Menu.Item key="/pricing/metal">
            <Link href="/pricing/metal"><a>Metal</a></Link>
          </Menu.Item>
          
          <Menu.Item key="/pricing/stone">
            <Link href="/pricing/stone"><a>Stone</a></Link>
          </Menu.Item>
          
        </Menu.SubMenu>

        {role?.ordersview ? (
          <Menu.Item key="orders" icon={<DollarOutlined />}>
            <Link href="/orders/list">
              <a>
                <span>
                  {" "}
                  <IntlMessages id="layout.sidebar.orders" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}

        {role?.productsview ? (
          <Menu.Item key="products" icon={<CheckSquareOutlined />}>
            <Link href="/products/list">
              <a>
                <span>
                  <IntlMessages id="layout.sidebar.products" />
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {/*{role?.variantsview ? (
          <Menu.Item key="variants" icon={<DeleteRowOutlined />}>
            <Link href="/variants/list">
              <a>
                <span>
                  {" "}
                  <IntlMessages id="layout.sidebar.variants" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}*/}
        {/*{role?.categoriesview ? (
          <Menu.Item key="categories" icon={<OrderedListOutlined />}>
            <Link href="/categories/list">
              <a>
                <span>
                  <IntlMessages id="layout.sidebar.categories" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}*/}
        {/*{role?.brandsview ? (
          <Menu.Item key="brands" icon={<ChromeOutlined />}>
            <Link href="/brands/list">
              <a>
                <span>
                  <IntlMessages id="layout.sidebar.brands" />
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}*/}

        {/*{role?.cargoesview ? (
          <Menu.Item key="cargoes" icon={<CodeSandboxOutlined />}>
            <Link href="/cargoes/list">
              <a>
                <span>
                  {" "}
                  <IntlMessages id="layout.sidebar.cargoes" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}*/}

        {role?.orderstatusview ? (
          <Menu.Item key="orderstatus" icon={<PartitionOutlined />}>
            <Link href="/orderstatus/list">
              <a>
                <span>
                  {" "}
                  <IntlMessages id="layout.sidebar.orderStatus" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
       {/* {role?.paymentmethodsview ? (
          <Menu.Item key="paymentmethods" icon={<PullRequestOutlined />}>
            <Link href="/paymentmethods/list">
              <a>
                <span>
                  {" "}
                  <IntlMessages id="layout.sidebar.paymentMethods" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}*/}
        {/* {role?.homesliderview ? (
          <Menu.Item key="homeslider" icon={<FileImageOutlined />}>
            <Link href="/homeslider/list">
              <a>
                <span>
                  {" "}
                  <IntlMessages id="layout.sidebar.homeSlider" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role?.topmenuview ? (
          <Menu.Item key="topmenu" icon={<FileDoneOutlined />}>
            <Link href="/topmenu/list">
              <a>
                <span>
                  {" "}
                  <IntlMessages id="layout.sidebar.topMenuContent" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )} */}
        {role?.customersview ? (
          <Menu.Item key="customers" icon={<UsergroupAddOutlined />}>
            <Link href="/customers/list">
              <a>
                <span>
                  <IntlMessages id="layout.sidebar.customers" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role?.staffview ? (
          <Menu.Item key="staff" icon={<TeamOutlined />}>
            <Link href="/staff/list">
              <a>
                <span>
                  {" "}
                  <IntlMessages id="layout.sidebar.manager" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role?.superadmin ? (
          <Menu.Item key="settings" icon={<ControlOutlined />}>
            <Link href="/settings/list">
              <a>
                <span>
                  {" "}
                  <IntlMessages id="layout.sidebar.settings" />{" "}
                </span>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        <Menu.Item
          key="/signin"
          icon={<CloseSquareOutlined />}
          onClick={async () => {
            await dispatch(logout_r());
            AuthService.logout();
          }}
        >
          <Link href="/">
            <a>
              <span>
                {" "}
                Logout
              </span>
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
