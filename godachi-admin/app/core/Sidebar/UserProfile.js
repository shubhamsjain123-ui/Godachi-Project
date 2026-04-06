import React from "react";
import {Avatar, Popover} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  logout_r
} from "../../../redux/actions";
import Link from "next/link";
import router from "next/router";
import AuthService from "../../../util/services/authservice";
import { IMG_URL } from "../../../config/config";
const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ login }) => login);
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li><Link href={"/staff/" + user.id}>My Account</Link></li>
      <li  onClick={async () => {
                await dispatch(logout_r());
                AuthService.logout();
                router.push("/");
              }}>
        Logout
      </li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Avatar src={user.image?IMG_URL+user.image:"/images/avatar.jpg"} className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
        <span className="gx-avatar-name">{user.name}<i className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
      </Popover>
    </div>
  )
};

export default UserProfile;
