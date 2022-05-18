import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BiLock } from "react-icons/bi";

function ProfileUserView({
  handleFollow,
  handleUnfollow,
  handleRequest,
  tragetUser,
  user,
  handleShowFollowing,
  handleShowFollower,
  defaultImage,
}) {
  let navigate = useNavigate();
  // const handleHashtag = (e) => {
  //   );
  // };
  return (
    <div className="profile">
      <div className="profile-data">
        <div className="profile-photo-box">
          <div className="profile-photo">
            <img src={tragetUser.profileImage || defaultImage} alt="" />
          </div>
        </div>
        <h3 className="profile-username">@{tragetUser?.username}</h3>
        <h2 className="profile-name">
          {tragetUser.private ? <BiLock /> : null}
          {tragetUser?.name}
        </h2>

        <p className="profile__category">{tragetUser?.category}</p>
        <div className="profile__bio_box">
          <p className="profile__bio">
            {tragetUser?.bio.split("\n").map(function (item, idx) {
              return (
                <span key={idx}>
                  {item
                    .trim()
                    .split(/\s+/)
                    .map((str, index) => {
                      return (
                        <span
                          key={index}
                          className={
                            str.length > 2 &&
                            str[0] === "#" &&
                            str.split("#").length === 2
                              ? "hashtag point"
                              : null
                          }
                          onClick={
                            str.length > 2 &&
                            str[0] === "#" &&
                            str.split("#").length === 2
                              ? (e) => {
                                  console.log(str);
                                  navigate(
                                    `/search/?search=%23${str.slice(
                                      1,
                                      str.length
                                    )}`
                                  );
                                }
                              : null
                          }
                        >
                          {`${str + "  "}`}
                        </span>
                      );
                    })}
                  <br />
                </span>
              );
            })}
          </p>
        </div>
      </div>

      <div className="profile__info_box ">
        <div className="profile__info-group">
          <h3 className="profile__info-number">{tragetUser?.posts.length}</h3>
          <p className="profile__info-description">Post</p>
        </div>
        <div className="profile__info-group point" onClick={handleShowFollower}>
          <h3 className="profile__info-number">
            {tragetUser?.follower.length}
          </h3>
          <p className="profile__info-description">Follower</p>
        </div>
        <div
          className="profile__info-group point"
          onClick={handleShowFollowing}
        >
          <h3 className="profile__info-number">
            {tragetUser?.following.length}
          </h3>
          <p className="profile__info-description">Following</p>
        </div>
      </div>

      <div className="profile__buttons">
        {tragetUser._id === user._id ? (
          <NavLink to={"/editprofile"} className="btn btn-primary">
            Edit Profile
            <AiOutlineEdit />
          </NavLink>
        ) : tragetUser.followRequest.includes(user._id) ? (
          <button className="btn btn-secondary">Requested</button>
        ) : tragetUser.follower.includes(user._id) ? (
          <button className="btn btn-gray" onClick={handleUnfollow}>
            UnFollow
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={tragetUser.private ? handleRequest : handleFollow}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileUserView;
