import React from "react";
import { NavLink } from "react-router-dom";

function SmallPost({ imageSrc, _id }) {
  return (
    <NavLink to={`/post/${_id}`} className="small-post-image point">
      <img src={imageSrc} alt="" />
    </NavLink>
  );
}

export default SmallPost;
