import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import { NavLink } from "react-router-dom";
function UserBar({ postsUser, handleEdit }) {
  const { user, followUser, defaultImage } = useAppContext();

  const handleFollow = (e) => {
    e.preventDefault();
    followUser(postsUser._id, "follow");
  };

  if (!postsUser) return;
  return (
    <div className="head">
      <NavLink
        className="user"
        to={
          postsUser._id === user._id ? "/profile" : `/profile/${postsUser._id}`
        }
      >
        <div className="profile-photo">
          <img src={postsUser.profileImage || defaultImage} />
        </div>
        <div className="info">
          <h3>@{postsUser.username}</h3>
          <p>{postsUser.name}</p>
        </div>
      </NavLink>

      {postsUser._id === user._id ? (
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit Post
        </button>
      ) : postsUser.follower.includes(user._id) ? null : (
        <button className="btn btn-primary" onClick={handleFollow}>
          Follow
        </button>
      )}
    </div>
  );
}

export default UserBar;
