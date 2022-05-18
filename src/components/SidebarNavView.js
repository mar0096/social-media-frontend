import { AiOutlineHome } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import {
  MdStorefront,
  MdOutlineExplore,
  MdNotificationsNone,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

import UserBox from "./UserBox.js";
function SidebarNavView({ handleLogout, user, handleShowRecommend }) {
  return (
    <div className="left">
      <div className="profile">
        <UserBox userId={user._id} />
      </div>
      <div className="sidebar">
        <NavLink
          className="menu-item"
          to={"/"}
          key={1}
          onClick={handleShowRecommend}
        >
          <span>
            <AiOutlineHome />
          </span>
          <h3>Home</h3>
        </NavLink>
        <NavLink
          className="menu-item"
          to={"/Explore"}
          key={2}
          onClick={handleShowRecommend}
        >
          <span>
            <MdOutlineExplore />
          </span>
          <h3>Explore</h3>
        </NavLink>
        {/* <a className="menu-item">
          <span>
            <MdNotificationsNone />
          </span>
          <h3>Nofitications</h3>
        </a> */}
        {/* <NavLink className="menu-item" to={"/marketplace"} key={3}>
          <span>
            <MdStorefront />
          </span>
          <h3>Market Place</h3>
        </NavLink> */}
        <NavLink className="menu-item" to={"/Saved"} key={4}>
          <span>
            <BiBookmark />
          </span>
          <h3>Saved</h3>
        </NavLink>
      </div>
      <NavLink className="btn btn-primary" to={"/createpost"} key={5}>
        Create Post
      </NavLink>
      <button className="btn btn-gray" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default SidebarNavView;
