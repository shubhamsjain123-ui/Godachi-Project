import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Drawer, Layout} from "antd";

import SidebarContent from "./SidebarContent";
import {changeCollapsed_r, updateWindowWidth} from "../../../redux/actions/Setting";
import {TAB_SIZE} from "../../../constants/ThemeSetting";

const {Sider} = Layout;

const Sidebar = () => {

  const dispatch = useDispatch();

  const {collapsed, width} = useSelector(({settings}) => settings);


  const onToggleCollapsedNav = () => {
    dispatch(changeCollapsed_r(!collapsed));
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(updateWindowWidth(window.innerWidth));
    })
  }, [dispatch]);


  let drawerStyle = "";
  if(!collapsed)
    drawerStyle = "gx-mini-sidebar";

  if (width < TAB_SIZE) {
    drawerStyle = "gx-collapsed-sidebar"
  }
  return (
    <Sider
      className={`gx-app-sidebar ${drawerStyle}`}
      trigger={null}
      collapsed={(width < TAB_SIZE ? false : collapsed)}
      theme="lite"
      collapsible>
      {
        width < TAB_SIZE ?
          <Drawer
            className="gx-drawer-sidebar"
            placement="left"
            closable={false}
            onClose={onToggleCollapsedNav}
            visible={collapsed}>
            <SidebarContent/>
          </Drawer> :
          <SidebarContent/>
      }
    </Sider>)
};
export default Sidebar;
