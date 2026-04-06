import React from "react";
import Link from "next/link";
import { useDispatch, useSelector} from "react-redux";
import {changeCollapsed_r} from "../../../redux/actions/Setting";
const SidebarLogo = () => {
  const dispatch = useDispatch();
  const {collapsed} = useSelector(({settings}) => settings);

  return (
    <div className="gx-layout-sider-header">
      <div className="gx-linebar">
        <i
          className={`gx-icon-btn icon icon-${ !collapsed ? 'menu-unfold' : 'menu-fold'}`}
          onClick={() => {
            dispatch(changeCollapsed_r(!collapsed));
          }}
        />
      </div>

      <Link href="/" >
        <a className="gx-site-logo">
        <img alt="logo1" src={("/images/logo.png")}/>
        </a>
      </Link>
    </div>
  );
};

export default SidebarLogo;
