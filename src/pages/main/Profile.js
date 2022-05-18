import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { SmallPost, ProfileUserView } from "../../components/index.js";

function Profile() {
  const {
    user,
    userPosts,
    getSingleUser,
    getUserPosts,
    followUser,
    targetUser,
    isLoading,
    getAllPosts,
    users,
    switchRightBar,
    rightUsers,
    getUserList,
    defaultImage,
    getAllUsers,
    toggleRight,
  } = useAppContext();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!users[id || user._id]) return;
    getAllPosts({ userList: id || user._id, store: "userPosts" });
    getSingleUser(id || user._id);
  }, [location.pathname]);

  const handleFollow = (e) => {
    e.preventDefault();
    followUser(id, "follow");
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    followUser(id, "unfollow");
  };

  const handleRequest = (e) => {
    e.preventDefault();
    followUser(id, "request");
  };

  const handleAccept = (e) => {
    e.preventDefault();
    followUser(id, "accept");
  };

  useEffect(() => {
    if (rightUsers.length === 0) return;

    let listStr = "";
    rightUsers.map((id) => {
      listStr += id + ",";
    }, []);
    getAllUsers({ idList: listStr.slice(0, -1) });
  }, [rightUsers]);

  const handleShowFollowing = (e) => {
    switchRightBar("following", users[id || user._id].following);
    toggleRight(true);
  };

  const handleShowFollower = (e) => {
    switchRightBar("follower", users[id || user._id].follower);
    toggleRight(true);
  };

  // useEffect(() => {
  //   // getSingleUser(id || user._id);
  // }, [id]);

  if (!users[id || user._id]) return;
  return (
    <div>
      <ProfileUserView
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
        handleRequest={handleRequest}
        handleShowFollowing={handleShowFollowing}
        handleShowFollower={handleShowFollower}
        tragetUser={users[id || user._id]}
        user={user}
        defaultImage={defaultImage}
      />

      {users[id || user._id].private === false ||
      users[id || user._id].follower.includes(user._id) ||
      !id ? (
        userPosts.length > 0 ? (
          <div className="small-post">
            {userPosts.map((post) => {
              return <SmallPost key={post._id} {...post} />;
            })}
          </div>
        ) : null
      ) : (
        <h3>The Account is Private</h3>
      )}
    </div>
  );
}

export default Profile;
