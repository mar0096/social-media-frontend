import React from "react";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import {
  MdStorefront,
  MdOutlineExplore,
  MdNotificationsNone,
} from "react-icons/md";

import { useAppContext } from "../context/appContext";
import { NavLink } from "react-router-dom";

function BottomBar() {
  const { user, defaultImage } = useAppContext();
  return (
    <div className="bottom container menu-item">
      <NavLink className="menu-item" to={"/"} key={1}>
        <span>
          <AiOutlineHome />
        </span>
      </NavLink>
      <NavLink className="menu-item" to={"/explore"} key={2}>
        <span>
          <MdOutlineExplore />
        </span>
      </NavLink>
      <NavLink className="menu-item" to={"/createpost"} key={3}>
        <span>
          <AiOutlinePlusCircle />
        </span>
      </NavLink>
      <NavLink className="menu-item" to={"/saved"} key={4}>
        <span>
          <BiBookmark />
        </span>
      </NavLink>

      <NavLink className="menu-item" to={"/profile"} key={5}>
        <div className="profile-photo">
          <img src={user.profileImage || defaultImage} />
        </div>
      </NavLink>
    </div>
  );
}

export default BottomBar;
