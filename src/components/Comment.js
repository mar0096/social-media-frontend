import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import { BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import moment from "moment";
function Comment({ comment, postId }) {
  const { user, updatePost, postsUser, users, defaultImage } = useAppContext();

  // let date = moment(Number(comment.time));
  let date = moment(comment.time);

  let duration = moment.duration(moment().diff(date));
  if (duration.days() > 3) {
    date = date.format("MMM Do,YYYY");
  } else if (duration.days() > 0) {
    date = duration.days() + `day${duration.days() === 1 ? "" : "s"} ago`;
  } else if (duration.hours() > 0) {
    date = duration.hours() + `hour${duration.hours() === 1 ? "" : "s"} ago`;
  } else if (duration.minutes() > 0) {
    date =
      duration.minutes() + `minute${duration.minutes() === 1 ? "" : "s"} ago`;
  } else {
    date = "few seconds ago";
  }

  const handleDelete = () => {
    updatePost({
      postId: postId,
      action: "deleteComment",
      comment: comment.time,
    });
    // setIsDelete(true);
  };

  return (
    <div className={`single-comment-box`}>
      <NavLink
        to={`/profile/${
          comment.commentId === user._id ? "" : comment.commentId
        }`}
      >
        <div className="profile-photo point">
          <img
            src={
              users[comment.commentId]
                ? users[comment.commentId].profileImage || defaultImage
                : null
            }
            alt=""
          />
        </div>
      </NavLink>
      <div className="single-comment">
        <NavLink
          to={`/profile/${
            comment.commentId === user._id ? "" : comment.commentId
          }`}
        >
          <h4 className="point">
            {users[comment.commentId]
              ? users[comment.commentId].username
              : null}
          </h4>
        </NavLink>
        <p>
          {comment.comment.split("\n").map(function (item, idx) {
            return (
              <span key={idx}>
                {item}
                <br />
              </span>
            );
          })}
        </p>
        <p>{date}</p>
      </div>

      <div className="action-buttons">
        <button className="delete" type="button" onClick={handleDelete}>
          {comment.commentId == user._id ? (
            <span>
              <BiTrash />
            </span>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
}

export default Comment;
