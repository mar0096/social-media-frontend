import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links.js";

function NavLinks() {
  return (
    <div className="sidebar_container">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink to={path} key={id}>
            <span>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
