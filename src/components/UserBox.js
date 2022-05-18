import React from "react";

import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
function UserBox({ userId, action }) {
  const { users, user, followUser, defaultImage } = useAppContext();

  const handleFollow = (e) => {
    e.preventDefault();
    followUser(
      userId,
      action === "follow"
        ? users[userId].private
          ? "request"
          : "follow"
        : "accept"
    );
  };

  if (!users[userId]) return;
  return (
    <NavLink
      to={`/profile/${userId === user._id ? "" : userId}`}
      className="user-box"
    >
      <div className="profile-photo">
        <img src={users[userId].profileImage || defaultImage} />
      </div>
      <div className="handle">
        <h4>{users[userId].name}</h4>
        <p className="text-muted">@{users[userId].username}</p>
      </div>

      <div className="action">
        {action && userId !== user._id ? (
          (
            action === "follow"
              ? users[userId].private
                ? users[userId].followRequest.includes(user._id)
                : users[userId].follower.includes(user._id)
              : !user.followRequest.includes(userId)
          ) ? (
            <button className="btn btn-secondary">
              {action === "follow"
                ? users[userId].private
                  ? "requested"
                  : "following"
                : "accepted"}
            </button>
          ) : (
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleFollow}
            >
              {action === "follow" ? "follow" : "accept"}
            </button>
          )
        ) : null}
      </div>
    </NavLink>
  );
}

export default UserBox;
