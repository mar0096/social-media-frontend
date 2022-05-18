import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import { AiOutlineSearch } from "react-icons/ai";

import { NavLink } from "react-router-dom";
function Navbar() {
  const { logoutUser, user, defaultImage } = useAppContext();
  const [inputSearch, setInputSearch] = useState();
  const handleLogout = () => {
    logoutUser();
  };
  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };
  const handleSearch = (e) => {
    console.log(123);
  };

  return (
    <div className="container">
      <NavLink to={"/"}>
        <h2 className="logo">Instagram</h2>
      </NavLink>
      <div className="search-bar">
        <form action="/search" className="form" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="search"
            name="search"
            // value={inputSearch}
            // onChange={handleChange}
          />
          <button type="submit" className="point">
            <AiOutlineSearch />
          </button>
        </form>
      </div>
      <div>
        <div className="create">
          <NavLink className=" btn btn-primary" to={"/createpost"}>
            Create Post
          </NavLink>
          <NavLink to={"/profile"}>
            <div className="profile-photo">
              <img src={user.profileImage || defaultImage} />
            </div>
          </NavLink>
        </div>

        <button className="logout btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* <button onClick={handleLogout}>Log out</button> */}
    </div>
  );
}

export default Navbar;
