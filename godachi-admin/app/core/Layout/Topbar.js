import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Layout, Menu, Dropdown, Button, Select, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  logout_r,
  changeCollapsed_r,
  switchLanguage,
} from "../../../redux/actions";

import AuthService from "../../../util/services/authservice";
import { languageData } from "../../../config/config";
import router from "next/router";
import SearchBox from "../../components/SearchBox";
const { Header } = Layout;
import {TAB_SIZE} from "../../../constants/ThemeSetting";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [size, setSize] = useState([0, 0]);
  const { user } = useSelector(({ login }) => login);
  const { collapsed, width } = useSelector(({ settings }) => settings);
  const [searchText, setSearchText] = useState('');

  const handleKeywordsSearch = (evt) => {
    setSearchText(evt.target.value);
  };

  useEffect(() => {
    if (size[0] > 770) {
      dispatch(changeCollapsed_r(false));
    }

    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {}, []);

  return (
    <Header>
        {/* <div className="gx-linebar gx-mr-3">
            <i className="gx-icon-btn icon icon-menu"
            onClick={() => dispatch(changeCollapsed_r(!collapsed))}
            />
        </div> */}
        <Link href="/">
            <img alt="" className="gx-d-block gx-d-lg-none gx-pointer" src="/images/logo.png"/>
        </Link>
        <SearchBox styleName="gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg"
            placeholder="Search in app..."
            onChange={handleKeywordsSearch}
            value={searchText}/>

        <ul className="gx-header-notifications gx-ml-auto">
            <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
            <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={
                <SearchBox styleName="gx-popover-search-bar"
                        placeholder="Search in app..."
                        onChange={handleKeywordsSearch}
                        value={searchText}/>
            } trigger="click">
                <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>
            </Popover>
            </li>
            {width >= TAB_SIZE ? null :
            <>
                {/* <li className="gx-notify">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification/>}
                        trigger="click">
                    <span className="gx-pointer gx-d-block"><i className="icon icon-notification"/></span>
                </Popover>
                </li>

                <li className="gx-msg">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                        content={<MailNotification/>} trigger="click">
                    <span className="gx-pointer gx-status-pos gx-d-block">
                        <i className="icon icon-chat-new"/>
                        <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                    </span>
                </Popover>
                </li> */}
            </>
            }
            {width >= TAB_SIZE ? null :
            <>
                <li className="gx-user-nav">{/* <UserInfo/> */}</li>
            </>
            }
        </ul>    
    </Header>
  );
};

export default Sidebar;
